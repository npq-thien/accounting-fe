/**
 * CommonAgGridTable - Simple AG Grid wrapper with validation
 *
 * Features:
 * - Inline editing (AG Grid built-in)
 * - Keyboard navigation: Arrow keys, Tab, Enter (AG Grid built-in)
 * - Zod validation per column
 * - Auto number/currency formatting
 */

import { Box } from "@mantine/core";
import type { CellValueChangedEvent, ColDef, GridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef } from "react";
import { z } from "zod";

export interface CommonAgGridColumn<T = any> extends ColDef<T> {
    validation?: z.ZodSchema<any>;
}

export interface CommonAgGridTableProps<T = any> {
    rowData: T[];
    columnDefs: CommonAgGridColumn<T>[];
    onCellValueChanged?: (_event: CellValueChangedEvent<T>) => void;
    height?: number | string;
    gridOptions?: GridOptions<T>;
    pinnedBottomRowData?: any[];
}

export function CommonAgGridTable<T = any>(props: CommonAgGridTableProps<T>) {
    const {
        rowData,
        columnDefs,
        onCellValueChanged,
        height = 500,
        gridOptions,
        pinnedBottomRowData,
    } = props;

    const gridRef = useRef<AgGridReact<T>>(null);
    const validationErrors = useRef<Map<string, string>>(new Map());

    // Validate and handle cell changes
    const handleCellValueChanged = useCallback(
        (event: CellValueChangedEvent<T>) => {
            const { colDef, newValue, node } = event;
            const column = colDef as CommonAgGridColumn<T>;

            // Validate if schema exists
            if (column.validation && node && (colDef as any).field) {
                const key = `${node.id}_${(colDef as any).field}`;
                try {
                    column.validation.parse(newValue);
                    validationErrors.current.delete(key);
                } catch (error) {
                    if (error instanceof z.ZodError) {
                        const message = error.issues.map((e) => e.message).join(", ");
                        validationErrors.current.set(key, message);
                        console.warn(`Validation error at ${key}:`, message);
                    }
                }
            }

            if (onCellValueChanged) {
                onCellValueChanged(event);
            }
        },
        [onCellValueChanged]
    );

    return (
        <Box style={{ height, width: "100%" }}>
            <AgGridReact<T>
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                pinnedBottomRowData={pinnedBottomRowData}
                defaultColDef={{
                    editable: true,
                    sortable: true,
                    filter: true,
                    resizable: true,
                }}
                pagination={true}
                paginationPageSize={20}
                paginationPageSizeSelector={[20, 50, 100]}
                onCellValueChanged={handleCellValueChanged}
                singleClickEdit={true}
                stopEditingWhenCellsLoseFocus={true}
                enterNavigatesVertically={true}
                enterNavigatesVerticallyAfterEdit={true}
                undoRedoCellEditing={true}
                {...gridOptions}
            />
        </Box>
    );
}
