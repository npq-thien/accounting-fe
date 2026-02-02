import { CommonButton } from "@/shared/components";
import {
    CommonAgGridTable,
    type CommonAgGridColumn,
} from "@/shared/components/common/CommonAgGridTable";
import { Box, Group, Stack, Text, Title } from "@mantine/core";
import type { GridApi } from "ag-grid-community";
import { useMemo, useRef, useState } from "react";
import { z } from "zod";
import type { JournalEntry } from "../type";
import { journalEntries } from "./fakeData";

// Zod validation schemas
const accountSchema = z.string().regex(/^\d{3,4}$/, "Must be 3-4 digits");

export const AgGridSample = () => {
    const [rowData, setRowData] = useState<JournalEntry[]>(journalEntries);

    const columnDefs: CommonAgGridColumn<JournalEntry>[] = [
        // Order column
        {
            headerName: "No",
            width: 60,
            pinned: "left",
            valueGetter: (params) => {
                // Show empty for pinned bottom row
                if (params.node?.rowPinned === "bottom") return "";
                return params.node?.rowIndex != null ? params.node.rowIndex + 1 : "";
            },
            editable: false,
            filter: false,
        },

        {
            headerName: "Date",
            field: "date",
            width: 110,
            editable: true,
            type: "dateColumn",
            cellEditor: "agDateCellEditor",
            cellEditorParams: {
                dateFormat: "DD/MM/YYYY",
            },
            cellRenderer: (params: any) => {
                if (params.node?.rowPinned === "bottom") return "";
                return params.value;
            },
        },

        {
            headerName: "Voucher No",
            field: "voucherNo",
            width: 130,
            editable: false,
            cellRenderer: (params: any) => {
                if (params.node?.rowPinned === "bottom") return "";
                return params.value;
            },
        },

        {
            headerName: "Account",
            field: "account",
            width: 120,
            editable: true,
            validation: accountSchema,
            cellRenderer: (params: any) => {
                if (params.node?.rowPinned === "bottom") return "TOTAL";
                return params.value;
            },
        },

        {
            headerName: "Account Name",
            field: "accountName",
            flex: 1,
            editable: false,
            cellClass: "ag-text-muted",
            cellRenderer: (params: any) => {
                if (params.node?.rowPinned === "bottom") return "";
                return params.value;
            },
        },

        {
            headerName: "Debit",
            field: "debit",
            width: 140,
            type: "numericColumn",
            valueParser: (p) => Number(p.newValue) || 0,
            valueFormatter: (p) => (p.value ? p.value.toLocaleString("vi-VN") : ""),
            cellStyle: (params: any) => {
                const style: any = { textAlign: "right" };
                if (params.node?.rowPinned === "bottom") {
                    style.fontWeight = "bold";
                }
                return style;
            },
            editable: (params: any) => params.node?.rowPinned !== "bottom",

            // Excel-like rule
            onCellValueChanged: (params) => {
                if (params.newValue > 0) {
                    params.node?.setDataValue("credit", 0);
                }
            },
        },

        {
            headerName: "Credit",
            field: "credit",
            width: 140,
            type: "numericColumn",
            valueParser: (p) => Number(p.newValue) || 0,
            valueFormatter: (p) => (p.value ? p.value.toLocaleString("vi-VN") : ""),
            cellStyle: (params: any) => {
                const style: any = { textAlign: "right" };
                if (params.node?.rowPinned === "bottom") {
                    style.fontWeight = "bold";
                }
                return style;
            },
            editable: (params: any) => params.node?.rowPinned !== "bottom",
            onCellValueChanged: (params) => {
                if (params.newValue > 0) {
                    params.node?.setDataValue("debit", 0);
                }
            },
        },

        {
            headerName: "Cost Center",
            field: "costCenter",
            width: 130,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: ["ADMIN", "SALES", "MARKETING", "IT"],
            },
            editable: (params: any) => params.node?.rowPinned !== "bottom",
            cellRenderer: (params: any) => {
                if (params.node?.rowPinned === "bottom") return "";
                return params.value;
            },
        },
        {
            headerName: "Note",
            field: "note",
            flex: 2,
            editable: true,
            cellRenderer: (params: any) => {
                if (params.node?.rowPinned === "bottom") return "";
                return params.value;
            },
        },
    ];

    const handleAddRow = () => {
        setRowData([
            ...rowData,
            {
                id: "",
                date: "",
                voucherNo: "",
                account: "",
                accountName: "",
                debit: 0,
                credit: 0,
                currency: "",
                exchangeRate: 0,
                costCenter: "",
                note: "",
            },
        ]);
    };

    const gridApiRef = useRef<GridApi<JournalEntry> | null>(null);

    const handleSubmitRow = () => {
        console.log(rowData);
    };

    // Reactive totals calculation - updates when rowData state changes
    const totalsRow = useMemo(() => {
        const totalDebit = rowData.reduce((sum, row) => sum + (row.debit || 0), 0);
        const totalCredit = rowData.reduce((sum, row) => sum + (row.credit || 0), 0);

        return [
            {
                account: "TOTAL",
                accountName: "",
                debit: totalDebit,
                credit: totalCredit,
                note: "",
                date: "",
                voucherNo: "",
                currency: "",
                exchangeRate: 0,
                costCenter: "",
            },
        ];
    }, [rowData]);

    // Sync React state with grid data when cell values change (including setDataValue)
    const handleCellValueChanged = () => {
        // Read current grid data and update React state to trigger recalculation
        const updatedData: JournalEntry[] = [];
        gridApiRef.current?.forEachNode((node) => {
            if (node.data && !node.rowPinned) {
                updatedData.push(node.data);
            }
        });

        // Update state to trigger useMemo recalculation
        if (updatedData.length > 0) {
            setRowData(updatedData);
        }
    };

    return (
        <Box>
            <Title order={2} mb="lg">
                AG Grid Sample
            </Title>

            <Text size="sm" c="dimmed" mb="md">
                Simple AG Grid with inline editing, arrow/tab navigation, and Zod validation.
            </Text>

            <Stack gap="md">
                <Group justify="space-between">
                    <CommonButton onClick={handleAddRow} size="sm">
                        Add Row
                    </CommonButton>
                    <CommonButton onClick={handleSubmitRow} size="sm">
                        Submit
                    </CommonButton>
                </Group>

                <CommonAgGridTable
                    rowData={rowData}
                    columnDefs={columnDefs}
                    height={400}
                    pinnedBottomRowData={totalsRow}
                    onCellValueChanged={handleCellValueChanged}
                    gridOptions={{
                        onGridReady: (params) => {
                            gridApiRef.current = params.api;
                        },
                    }}
                />
            </Stack>
        </Box>
    );
};
