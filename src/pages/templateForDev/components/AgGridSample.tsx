import { CommonButton } from "@/shared/components";
import {
    CommonAgGridTable,
    type CommonAgGridColumn,
} from "@/shared/components/common/CommonAgGridTable";
import { Box, Group, Stack, Text, Title } from "@mantine/core";
import type { GridApi } from "ag-grid-community";
import { useCallback, useMemo, useRef, useState } from "react";
import type { JournalEntry } from "../type";
import { journalEntries } from "./fakeData";
import { convertStringToDateWithFormat } from "@/utils";
import z from "zod";

// Zod validation schemas
const accountSchema = z.string().min(2, "Account must be at least 2 characters");

export const AgGridSample = () => {
    const [rowData, setRowData] = useState<JournalEntry[]>(journalEntries);
    const [totalsData, setTotalsData] = useState({ debit: 0, credit: 0 });

    const columnDefs: CommonAgGridColumn<JournalEntry>[] = [
        // Order column
        {
            headerName: "No",
            width: 60,
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
            cellDataType: "date",
            valueGetter: (params: any) => {
                if (params.node?.rowPinned === "bottom") return "";
                return new Date(params.data.date);
            },
            valueFormatter: (params: any) => {
                if (params.node?.rowPinned === "bottom") return "";
                return convertStringToDateWithFormat(params.data.date, "DD/MM/YYYY");
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
            editable: true,
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
            cellDataType: "number",
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
                    params.node?.setDataValue("credit", 0);
                }
            },
        },

        {
            headerName: "Credit",
            field: "credit",
            width: 140,
            cellDataType: "number",
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
            ...rowData,
        ]);
    };

    const gridApiRef = useRef<GridApi<JournalEntry> | null>(null);

    const handleSubmitRow = () => {
        console.log(rowData);
    };

    // Totals row - uses separate state to avoid re-rendering grid
    const totalsRow = useMemo(() => {
        return [
            {
                account: "TOTAL",
                accountName: "",
                debit: totalsData.debit,
                credit: totalsData.credit,
                note: "",
                date: "",
                voucherNo: "",
                currency: "",
                exchangeRate: 0,
                costCenter: "",
            },
        ];
    }, [totalsData]);

    // Recalculate totals without re-rendering the grid
    const recalculateTotals = useCallback(() => {
        let totalDebit = 0;
        let totalCredit = 0;

        gridApiRef.current?.forEachNode((node) => {
            if (node.data && !node.rowPinned) {
                totalDebit += node.data.debit || 0;
                totalCredit += node.data.credit || 0;
            }
        });

        setTotalsData({ debit: totalDebit, credit: totalCredit });
    }, []);

    // Update totals without causing grid re-render
    const handleCellValueChanged = useCallback(() => {
        recalculateTotals();
    }, [recalculateTotals]);

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
                    height={600}
                    pinnedBottomRowData={totalsRow}
                    onCellValueChanged={handleCellValueChanged}
                    onGridReady={(params) => {
                        gridApiRef.current = params.api;
                        recalculateTotals(); // Calculate initial totals
                    }}
                />
            </Stack>
        </Box>
    );
};
