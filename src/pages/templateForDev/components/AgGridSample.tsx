import { notify } from "@/app/toast/toast";
import { CommonActionIcon, CommonButton } from "@/shared/components";
import {
    FormDateInput,
    FormNumberInput,
    FormSelect,
    FormTextarea,
    FormTextInput,
} from "@/shared/components/common";
import {
    CommonAgGridTable,
    type CommonAgGridColumn,
} from "@/shared/components/common/CommonAgGridTable";
import { CommonDrawer } from "@/shared/components/common/CommonDrawer/CommonDrawer";
import { ICON_MAP } from "@/shared/constants/icons";
import { convertStringToDateWithFormat } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Group, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { GridApi } from "ag-grid-community";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { JournalEntryFormSchema } from "../schema";
import type { JournalEntry } from "../type";
import { journalEntries } from "./fakeData";

// Zod validation schemas
const accountSchema = z.string().min(2, "Account must be at least 2 characters");

export const AgGridSample = () => {
    const [rowData, setRowData] = useState<JournalEntry[]>(journalEntries);
    const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
    const [selectedRow, setSelectedRow] = useState<JournalEntry | null>(null);

    const newColumnDefs: CommonAgGridColumn<JournalEntry>[] = [
        {
            headerName: "No",
            width: 60,
            valueGetter: (params) => {
                return params.node?.rowIndex != null ? params.node.rowIndex + 1 : "";
            },
            editable: false,
            filter: false,
        },
        {
            headerName: "Ngày",
            field: "date",
            width: 140,
            editable: true,
            cellDataType: "date",
            valueGetter: (params: any) => {
                return params.data.date ? new Date(params.data.date) : null;
            },
            valueFormatter: (params: any) => {
                const dateStr = params.data.date;
                return dateStr ? convertStringToDateWithFormat(dateStr, "DD/MM/YYYY") : "";
            },
        },
        {
            headerName: "Số chứng từ",
            field: "documentNo",
            width: 150,
        },
        {
            headerName: "Tài khoản",
            field: "account",
            width: 120,
            editable: true,
            validation: accountSchema,
        },
        {
            headerName: "Số tiền",
            field: "amount",
            width: 140,
            cellDataType: "number",
            valueParser: (p) => Number(p.newValue) || 0,
            valueFormatter: (p) => (p.value ? p.value.toLocaleString("vi-VN") : ""),
            cellStyle: { textAlign: "right" },
        },
        {
            headerName: "Phòng ban",
            field: "department",
            width: 130,
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: ["ADMIN", "SALES", "MARKETING", "IT"],
            },
            editable: true,
        },
        {
            headerName: "Tính chất",
            field: "property",
            width: 140,
            cellRenderer: (params: any) => {
                if (Array.isArray(params.value)) {
                    return params.value.join(", ");
                }
                return params.value || "";
            },
        },
        {
            headerName: "Ghi chú",
            field: "note",
            flex: 1,
            editable: true,
        },
        {
            headerName: "Thao tác",
            width: 120,
            editable: false,
            filter: false,
            cellRenderer: (params: any) => {
                return (
                    <Box
                        h="100%"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                        }}>
                        <CommonActionIcon
                            icon={ICON_MAP.edit}
                            onClick={() => handleEditRow(params.data)}
                        />
                        <CommonActionIcon icon={ICON_MAP.delete} />
                    </Box>
                );
            },
        },
    ];

    const handleEditRow = (rowData: JournalEntry) => {
        // open drawer to edit the row
        setSelectedRow(rowData);
        openDrawer();
    };

    const handleAddRow = () => {
        setSelectedRow(null);
        openDrawer();
    };

    const gridApiRef = useRef<GridApi<JournalEntry> | null>(null);

    const handleSubmitRow = (data: JournalEntry) => {
        if (selectedRow) {
            // Edit existing row
            setRowData((prev) =>
                prev.map((row) => (row.id === selectedRow.id ? { ...row, ...data } : row))
            );
            notify.success("Success", "Entry updated successfully!");
        } else {
            // Add new row
            const newEntry: JournalEntry = {
                ...data,
                id: `JE${String(rowData.length + 1).padStart(3, "0")}`,
            };
            setRowData([newEntry, ...rowData]);
            notify.success("Success", "Entry added successfully!");
        }
        closeDrawer();
    };

    return (
        <>
            <DrawerFormWrapper
                opened={drawerOpened}
                onClose={closeDrawer}
                title={selectedRow ? "Chỉnh sửa" : "Thêm mới"}
                onSubmit={handleSubmitRow}
                initialData={selectedRow}
            />
            <Box>
                <Title order={2} mb="lg">
                    AG Grid Sample
                </Title>

                <Text size="sm" c="dimmed" mb="md">
                    AG Grid with new column definitions using date, documentNo, account, amount,
                    department, property, and note.
                </Text>

                <Stack gap="md">
                    <Group justify="space-between">
                        <CommonButton onClick={handleAddRow} size="sm">
                            Add Row
                        </CommonButton>
                    </Group>

                    <CommonAgGridTable
                        rowData={rowData}
                        columnDefs={newColumnDefs}
                        height={600}
                        onGridReady={(params) => {
                            gridApiRef.current = params.api;
                        }}
                    />
                </Stack>
            </Box>
        </>
    );
};

type DrawerFormWrapperProps = {
    opened: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (_formData: JournalEntry) => void;
    initialData: JournalEntry | null;
};

const DrawerFormWrapper = ({
    opened,
    onClose,
    title,
    onSubmit,
    initialData,
}: DrawerFormWrapperProps) => {
    const defaultValues: Partial<JournalEntry> = initialData || {
        id: "",
        date: "",
        documentNo: "",
        account: "",
        amount: 0,
        department: "",
        property: [],
        note: "",
    };

    const methods = useForm<JournalEntry>({
        defaultValues,
        resolver: zodResolver(JournalEntryFormSchema),
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = methods;

    // Reset form when drawer opens with new data
    useEffect(() => {
        if (opened) {
            const formValues = initialData || defaultValues;
            reset(formValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened, initialData]);

    const handleFormSubmit: SubmitHandler<JournalEntry> = async (formData) => {
        onSubmit(formData);
        reset();
    };

    const formContent = (
        <FormProvider {...methods}>
            <form id="journal-entry-form">
                <Stack gap="sm">
                    <FormDateInput
                        name="date"
                        label="Ngày"
                        placeholder="Select date"
                        withAsterisk
                    />
                    <FormTextInput
                        name="documentNo"
                        label="Số chứng từ"
                        placeholder="Enter document number"
                        withAsterisk
                    />
                    <FormTextInput name="account" label="Tài khoản" placeholder="Enter account" />
                    <FormNumberInput
                        name="amount"
                        label="Số tiền"
                        placeholder="Enter amount"
                        thousandSeparator=","
                    />
                    <FormSelect
                        name="department"
                        label="Phòng ban"
                        placeholder="Select department"
                        data={[
                            { value: "ADMIN", label: "ADMIN" },
                            { value: "SALES", label: "SALES" },
                            { value: "MARKETING", label: "MARKETING" },
                            { value: "IT", label: "IT" },
                        ]}
                    />
                    <FormTextarea name="note" label="Ghi chú" placeholder="Enter note" />
                </Stack>
            </form>
        </FormProvider>
    );

    return (
        <CommonDrawer
            opened={opened}
            onClose={onClose}
            title={title}
            children={formContent}
            footer={
                <>
                    <CommonButton variant="outline" onClick={onClose}>
                        Hủy
                    </CommonButton>
                    <CommonButton
                        type="submit"
                        loading={isSubmitting}
                        onClick={handleSubmit(handleFormSubmit)}>
                        {isSubmitting ? "Lưu..." : "Lưu"}
                    </CommonButton>
                </>
            }></CommonDrawer>
    );
};
