import { isNullOrEmpty } from "@/utils";
import { Box, Divider, Group, Select, Text, useMantineColorScheme } from "@mantine/core";
import {
    DataTable,
    type DataTableColumn,
    type DataTableProps,
    type DataTableSortStatus,
} from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { renderColumnFilter, type ColumnFilterConfig } from "./columnFilterRenderer";
import type { NumberRangeValue } from "./ColumnFilters";

const PAGE_SIZES = [5, 10, 25, 50, 100] as const;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_MAX_HEIGHT = 600;
const DEFAULT_NUMBER_RANGE_MIN = -9999999999;
const DEFAULT_NUMBER_RANGE_MAX = 9999999999;

export type CommonDataTableColumn<T = Record<string, unknown>> = DataTableColumn<T> & {
    filterConfig?: ColumnFilterConfig<T>;
};

export interface CommonDataTableProps<T = Record<string, unknown>> extends Omit<
    DataTableProps<T>,
    | "page"
    | "onPageChange"
    | "recordsPerPage"
    | "totalRecords"
    | "records"
    | "columns"
    | "groups"
    | "customLoader"
    | "sortStatus"
    | "onSortStatusChange"
> {
    // Data
    records: T[];
    columns: CommonDataTableColumn<T>[];

    // Pagination (optional - controlled externally for server-side pagination)
    onPageChange?: (_page: number) => void;
    pageSize?: number;

    // Sorting (optional - controlled externally, always enabled)
    sortStatus?: DataTableSortStatus<T>;
    onSortStatusChange?: (_sortStatus: DataTableSortStatus<T>) => void;

    // UI customization
    maxHeight?: number | string;

    // Loading state
    fetching?: boolean;
}

export function CommonDataTable<T = Record<string, unknown>>(props: CommonDataTableProps<T>) {
    const {
        records,
        columns,
        // Pagination
        onPageChange: controlledOnPageChange,
        pageSize: controlledPageSize,
        // Sorting (always enabled)
        sortStatus: controlledSortStatus,
        onSortStatusChange: controlledOnSortStatusChange,
        // UI
        maxHeight = DEFAULT_MAX_HEIGHT,
        fetching = false,
        noRecordsText = "Không tìm thấy dữ liệu",
        ...rest
    } = props;

    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    // Internal state
    const [internalPage, setInternalPage] = useState(1);
    const [internalPageSize, setInternalPageSize] = useState(
        controlledPageSize || DEFAULT_PAGE_SIZE
    );
    const [internalSortStatus, setInternalSortStatus] = useState<DataTableSortStatus<T>>({
        columnAccessor:
            ((columns[0] as DataTableColumn<T>)?.accessor as keyof T) || ("" as keyof T),
        direction: "asc",
    });

    // Column filter state - store filter values for each column
    const [columnFilters, setColumnFilters] = useState<Record<string, unknown>>({});

    // Use controlled or internal state
    const currentPage = internalPage;
    const currentPageSize = controlledPageSize ?? internalPageSize;
    const sortStatus = controlledSortStatus ?? internalSortStatus;

    // Sorting is always enabled - auto-detect sortable columns
    const isSortingEnabled = columns.some((col) => (col as DataTableColumn<T>).sortable !== false);

    // Filter records based on column filters
    const filteredRecords = useMemo(() => {
        return records.filter((record) => {
            return columns.every((col) => {
                const column = col as CommonDataTableColumn<T>;
                const filterConfig = column.filterConfig;
                if (!filterConfig) return true;

                const accessor = (column as DataTableColumn<T>).accessor;
                if (!accessor) return true;

                const filterValue = columnFilters[String(accessor)];
                if (!filterValue) return true;

                // Use custom filter function if provided
                if (filterConfig.filterFunction) {
                    return filterConfig.filterFunction(record, filterValue);
                }

                // Default filter logic based on filter type
                const recordValue = record[accessor as keyof T];

                switch (filterConfig.filterType) {
                    case "text": {
                        const textValue = filterValue as string;
                        if (!textValue) return true;
                        const query = textValue.toLowerCase();
                        return String(recordValue || "")
                            .toLowerCase()
                            .includes(query);
                    }

                    case "multiselect": {
                        const selectedValues = filterValue as string[];
                        if (selectedValues.length === 0) return true;
                        return selectedValues.includes(String(recordValue));
                    }

                    case "date": {
                        const dateRange = filterValue as [string | null, string | null];
                        if (!dateRange || (!dateRange[0] && !dateRange[1])) return true;

                        // Handle both Date objects and date strings
                        let recordDate: Date;
                        if (recordValue instanceof Date) {
                            recordDate = recordValue;
                        } else if (typeof recordValue === "string") {
                            recordDate = new Date(recordValue);
                        } else {
                            return true; // Skip if not a valid date type
                        }

                        if (isNaN(recordDate.getTime())) return true;

                        // Compare dates (ignore time)
                        const recordDateOnly = new Date(
                            recordDate.getFullYear(),
                            recordDate.getMonth(),
                            recordDate.getDate()
                        );

                        if (dateRange[0]) {
                            const year = dateRange[0].split("-")[0];
                            const month = dateRange[0].split("-")[1];
                            const day = dateRange[0].split("-")[2];
                            const startDateOnly = new Date(
                                Number(year),
                                Number(month),
                                Number(day)
                            );
                            if (recordDateOnly < startDateOnly) return false;
                        }

                        if (dateRange[1]) {
                            const year = dateRange[1].split("-")[0];
                            const month = dateRange[1].split("-")[1];
                            const day = dateRange[1].split("-")[2];
                            const endDateOnly = new Date(Number(year), Number(month), Number(day));
                            if (recordDateOnly > endDateOnly) return false;
                        }

                        return true;
                    }

                    case "numberRange": {
                        const numberRange = filterValue as NumberRangeValue;
                        const recordNumber =
                            typeof recordValue === "number" ? recordValue : Number(recordValue);
                        if (!numberRange.min && !numberRange.max) return true;
                        return (
                            recordNumber >= (numberRange.min || DEFAULT_NUMBER_RANGE_MIN) &&
                            recordNumber <= (numberRange.max || DEFAULT_NUMBER_RANGE_MAX)
                        );
                    }

                    default:
                        return true;
                }
            });
        });
    }, [records, columns, columnFilters]);

    // Sort records
    const sortedRecords = useMemo(() => {
        if (!isSortingEnabled || !sortStatus) return filteredRecords;

        const { columnAccessor, direction } = sortStatus;
        const accessor = columnAccessor as keyof T;

        return [...filteredRecords].sort((a, b) => {
            const aValue = a[accessor];
            const bValue = b[accessor];

            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return 1;
            if (bValue == null) return -1;

            // Handle different types
            if (typeof aValue === "number" && typeof bValue === "number") {
                return direction === "asc" ? aValue - bValue : bValue - aValue;
            }

            const aStr = String(aValue).toLowerCase();
            const bStr = String(bValue).toLowerCase();

            if (aStr === bStr) return 0;
            const comparison = aStr > bStr ? 1 : -1;
            return direction === "asc" ? comparison : -comparison;
        });
    }, [filteredRecords, sortStatus, isSortingEnabled]);

    // Paginate records
    const displayRecords = useMemo(() => {
        const start = (currentPage - 1) * currentPageSize;
        const end = start + currentPageSize;
        return sortedRecords.slice(start, end);
    }, [sortedRecords, currentPage, currentPageSize]);

    const totalRecords = sortedRecords.length;

    // Calculate height based on the number of rows and the height of the header and footer
    const height = useMemo(() => {
        const rowHeight = 40;
        const headerHeight = 37;
        const footerHeight = 47;
        return Math.min(headerHeight + footerHeight + currentPageSize * rowHeight, 600);
    }, [currentPageSize]);

    // Handlers
    const handlePageChange = (newPage: number) => {
        if (controlledOnPageChange) {
            controlledOnPageChange(newPage);
        } else {
            setInternalPage(newPage);
        }
    };

    const handlePageSizeChange = (newPageSize: string | null) => {
        const size = Number(newPageSize) || DEFAULT_PAGE_SIZE;

        setInternalPageSize(size);
        setInternalPage(1);
        handlePageChange(1);
    };

    const handleColumnFilterChange = (accessor: string, value: unknown) => {
        setColumnFilters((prev) => ({
            ...prev,
            [accessor]: value,
        }));
        handlePageChange(1); // Reset to first page on filter change
    };

    const handleSortStatusChange = (newSortStatus: DataTableSortStatus<T>) => {
        if (controlledOnSortStatusChange) {
            controlledOnSortStatusChange(newSortStatus);
        } else {
            setInternalSortStatus(newSortStatus);
        }
        handlePageChange(1); // Reset to first page on sort
    };

    // Create columns with filter UI
    const columnsWithFilters = useMemo(() => {
        return columns.map((col) => {
            const column = col as CommonDataTableColumn<T>;
            if (!column.filterConfig) {
                return col as DataTableColumn<T>;
            }

            const accessor = String((column as DataTableColumn<T>).accessor);
            const filterValue = columnFilters[accessor] as any;

            const isNumberRangeFiltering = isNullOrEmpty(filterValue)
                ? false
                : filterValue.min !== null || filterValue.max !== null;

            const isFiltering =
                column.filterConfig?.filterType === "numberRange"
                    ? isNumberRangeFiltering
                    : !isNullOrEmpty(filterValue) &&
                      (Array.isArray(filterValue) ? filterValue.length > 0 : true);

            return {
                ...col,
                filter: ({ close }: { close: () => void }) =>
                    renderColumnFilter<T>(
                        column.filterConfig!,
                        filterValue,
                        (value) => handleColumnFilterChange(accessor, value),
                        close
                    ),
                filtering: isFiltering,
            } as DataTableColumn<T>;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columns, columnFilters]);

    // Reset page when records change
    useEffect(() => {
        if (currentPage > 1 && displayRecords.length === 0) {
            handlePageChange(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [records, currentPage, displayRecords.length]);

    // Header styles based on theme
    const headerBackgroundColor = isDark
        ? "rgba(52, 58, 64, 0.9)" // Dark mode - subtle dark gray
        : "rgba(248, 249, 250, 1)"; // Light mode - very light gray

    return (
        <Box>
            {/* @ts-expect-error mantine-datatable typing issue */}
            <DataTable
                withTableBorder
                withColumnBorders
                borderRadius="md"
                highlightOnHover
                records={displayRecords}
                columns={columnsWithFilters}
                fetching={fetching}
                totalRecords={totalRecords}
                recordsPerPage={currentPageSize}
                page={currentPage}
                onPageChange={handlePageChange}
                sortStatus={isSortingEnabled ? sortStatus : undefined}
                onSortStatusChange={isSortingEnabled ? handleSortStatusChange : undefined}
                noRecordsText={noRecordsText}
                height={height}
                maxHeight={maxHeight}
                styles={{
                    header: {
                        backgroundColor: headerBackgroundColor,
                        // TODO: setup color from common styles
                        color: isDark ? "rgba(193, 194, 197, 1)" : "rgba(73, 80, 87, 1)",
                    },
                }}
                paginationText={({ from, to, totalRecords }) => (
                    <Group gap="xs" align="center">
                        <Text size="sm">
                            {from} - {to} / {totalRecords}
                        </Text>
                        {/* Page size selector - always shown */}
                        <Group gap="xs" align="center">
                            <Divider size="sm" orientation="vertical" />
                            <Select
                                size="xs"
                                value={String(currentPageSize)}
                                onChange={handlePageSizeChange}
                                data={PAGE_SIZES.map((size) => ({
                                    value: String(size),
                                    label: String(size),
                                }))}
                                w={70}
                                styles={{
                                    input: {
                                        fontWeight: 500,
                                    },
                                }}
                            />
                        </Group>
                    </Group>
                )}
                {...(rest as Partial<DataTableProps<T>>)}
            />
        </Box>
    );
}
