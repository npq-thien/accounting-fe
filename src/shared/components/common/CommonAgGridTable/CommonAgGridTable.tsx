/**
 * CommonAgGridTable - Simple AG Grid wrapper with validation
 *
 * Features:
 * - Inline editing (AG Grid built-in)
 * - Keyboard navigation: Arrow keys, Tab, Enter (AG Grid built-in)
 * - Zod validation per column
 * - Auto number/currency formatting
 */

import { Box, useMantineColorScheme } from "@mantine/core";
import {
    themeQuartz,
    type CellValueChangedEvent,
    type ColDef,
    type GridOptions,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef } from "react";
import { z } from "zod";
import "./AgGridStyles.css";
import { ValidationTooltip } from "./ValidationTooltip";
import { AG_GRID_LOCALE_VN } from "./vi-VN";

export interface CommonAgGridColumn<T> extends ColDef<T> {
    validation?: z.ZodSchema<any>;
}

export type CommonAgGridTableProps<T> = {
    rowData: T[];
    columnDefs: CommonAgGridColumn<T>[];
    onCellValueChanged?: (_event: CellValueChangedEvent<T>) => void;
    height?: number | string;
    validation?: z.ZodSchema<any>;
} & GridOptions<T>;

export function CommonAgGridTable<T = any>(props: CommonAgGridTableProps<T>) {
    const { rowData, columnDefs, onCellValueChanged, height = 500, ...restProps } = props;
    const { colorScheme } = useMantineColorScheme();

    const gridRef = useRef<AgGridReact<T>>(null);
    const validationErrors = useRef<Map<string, string>>(new Map());

    // TODO: Customize theme based on color scheme
    const themeClass = useMemo(() => {
        const darkMode = {
            headerBackgroundColor: "#25262b",
            accentColor: "#3736fe",
            backgroundColor: "#1a1b1e",
            oddRowBackgroundColor: "#1e1f23",
            rowHoverColor: "#2c2e33",
            headerForegroundColor: "#c1c2c5",
            foregroundColor: "#c1c2c5",
            borderColor: "#373a40",
            rowBorderColor: "#373a40",
            inputDisabledBackgroundColor: "#25262b",
            inputDisabledBorderColor: "#373a40",
            inputFocusBorderColor: "#4dabf7",
            selectedRowBackgroundColor: "#2c2e33",
            rangeSelectionBackgroundColor: "rgba(77, 171, 247, 0.2)",
            rangeSelectionBorderColor: "#4dabf7",
            checkboxBackgroundColor: "#25262b",
            checkboxUncheckedColor: "#868e96",
            inputBorderColor: "#373a40",
            inputBorderColorInvalid: "#fa5252",
            panelBackgroundColor: "#25262b",
            tooltipBackgroundColor: "#25262b",
            tooltipForegroundColor: "#c1c2c5",
            tooltipBorderColor: "#373a40",
            menuBackgroundColor: "#25262b",
            menuForegroundColor: "#c1c2c5",
            menuBorderColor: "#373a40",
            popupShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
        };

        const lightMode = {
            headerBackgroundColor: "#e6eaff",
            accentColor: "#3736fe",
        };

        return themeQuartz.withParams({
            spacing: 12,
            ...(colorScheme === "dark" ? darkMode : lightMode),
        });
    }, [colorScheme]);

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const agColumnDefs: ColDef<T>[] = columnDefs.map(({ validation, ...colDef }) => colDef);

    const handleCellValueChanged = useCallback(
        (event: CellValueChangedEvent<T>) => {
            const field = event.colDef.field;
            if (!field || !event.node) return;

            const column = columnDefs.find((c) => c.field === field);
            if (!column?.validation) return;

            const key = `${event.node.id}_${field}`;
            const result = column.validation.safeParse(event.newValue);

            if (!result.success) {
                validationErrors.current.set(
                    key,
                    result.error.issues.map((i) => i.message).join(", ")
                );
                // event.node.setDataValue(field, event.oldValue);
            } else {
                validationErrors.current.delete(key);
            }

            event.api.refreshCells({
                rowNodes: [event.node],
                columns: [field],
                force: true,
            });

            onCellValueChanged?.(event);
        },
        [columnDefs, onCellValueChanged]
    );

    return (
        <Box
            style={{ height, width: "100%" }}
            // className={themeClass}
            // data-ag-theme={colorScheme === "dark" ? "dark" : "light"}
        >
            <AgGridReact<T>
                ref={gridRef}
                theme={themeClass}
                rowData={rowData}
                columnDefs={agColumnDefs}
                defaultColDef={{
                    editable: true,
                    sortable: true,
                    filter: true,
                    resizable: true,
                    enableCellChangeFlash: true,

                    cellClassRules: {
                        "ag-cell-invalid": (params) => {
                            const key = `${params.node?.id}_${params.colDef.field}`;
                            return validationErrors.current.has(key);
                        },
                    },

                    tooltipValueGetter: (params) => {
                        const key = `${params.node?.id}_${(params.colDef as CommonAgGridColumn<T>).field || ""}`;
                        return validationErrors.current.get(key);
                    },
                    tooltipComponent: ValidationTooltip,
                }}
                rowSelection={{
                    mode: "multiRow",
                }}
                tooltipShowDelay={0}
                tooltipHideDelay={2000}
                pagination={true}
                paginationPageSize={50}
                paginationPageSizeSelector={[20, 50, 100]}
                onCellValueChanged={handleCellValueChanged}
                stopEditingWhenCellsLoseFocus={false}
                undoRedoCellEditing={true}
                localeText={AG_GRID_LOCALE_VN}
                {...restProps}
            />
        </Box>
    );
}
