import { type ReactNode } from "react";
import { TextFilter, MultiSelectFilter, DateRangeFilter, NumberRangeFilter, type NumberRangeValue } from "./ColumnFilters";
// import { type ColumnFilterConfig, type FilterType } from "./columnFilterTypes";

export type FilterType = "text" | "multiselect" | "date" | "numberRange";

export interface ColumnFilterConfig<T = Record<string, unknown>> {
    // Filter type
    filterType: FilterType;
    // For text filter
    textPlaceholder?: string;
    textLabel?: string;
    textDescription?: string;
    // For multiselect filter
    multiselectData?: string[];
    multiselectPlaceholder?: string;
    multiselectLabel?: string;
    multiselectDescription?: string;
    multiselectSearchable?: boolean;
    multiselectClearable?: boolean;
    // For date filter
    dateLabel?: string;
    dateDescription?: string;
    dateMaxDate?: Date;
    dateMinDate?: Date;
    // For number range filter
    numberRangeLabel?: string;
    numberRangePlaceholderMin?: string;
    numberRangePlaceholderMax?: string;
    numberRangeCurrency?: string;
    // Custom filter function
    filterFunction?: (_record: T, _filterValue: any) => boolean;
}

export interface FilterRendererParams<T = Record<string, unknown>> {
    filterType: FilterType;
    config: ColumnFilterConfig<T>;
    filterValue: unknown;
    onFilterChange: (_value: any) => void;
    onClose?: () => void;
}

export function renderColumnFilter<T = Record<string, any>>(
    config: ColumnFilterConfig<T>,
    filterValue: unknown,
    onFilterChange: (_value: any) => void,
    onClose?: () => void
): ReactNode {
    switch (config.filterType) {
        case "text":
            return (
                <TextFilter
                    value={(filterValue as string) || ""}
                    onChange={(value) => onFilterChange(value)}
                    placeholder={config.textPlaceholder}
                    label={config.textLabel}
                    description={config.textDescription}
                />
            );

        case "multiselect":
            return (
                <MultiSelectFilter
                    value={(filterValue as string[]) || []}
                    onChange={(value) => onFilterChange(value)}
                    data={config.multiselectData || []}
                    placeholder={config.multiselectPlaceholder}
                    label={config.multiselectLabel}
                    description={config.multiselectDescription}
                    searchable={config.multiselectSearchable}
                    clearable={config.multiselectClearable}
                />
            );

        case "date":
            return (
                <DateRangeFilter
                    value={(filterValue as any) || [null, null]}
                    onChange={(value) => onFilterChange(value)}
                    maxDate={config.dateMaxDate}
                    minDate={config.dateMinDate}
                    onClose={onClose}
                />
            );

        case "numberRange":
            return (
                <NumberRangeFilter
                    value={(filterValue as NumberRangeValue) || { min: null, max: null }}
                    onChange={(value) => onFilterChange(value)}
                    label={config.numberRangeLabel}
                    placeholderMin={config.numberRangePlaceholderMin}
                    placeholderMax={config.numberRangePlaceholderMax}
                    currency={config.numberRangeCurrency}
                />
            );

        default:
            return null;
    }
}
