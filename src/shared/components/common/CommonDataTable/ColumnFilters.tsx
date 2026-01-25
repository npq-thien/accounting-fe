import { CommonActionIcon, CommonIcon } from "@/shared/components/common";
import { ICON_MAP } from "@/shared/constants/icons";
import { ActionIcon, Button, MultiSelect, Stack, TextInput } from "@mantine/core";
import { DatePicker, type DatesRangeValue } from "@mantine/dates";
import dayjs from "dayjs";

const DEBOUNCE_INPUT_FILTER = 500;

export interface TextFilterProps {
    value: string;
    onChange: (_value: string) => void;
    placeholder?: string;
    label?: string;
    description?: string;
}

export function TextFilter({
    value,
    onChange,
    placeholder = "Tìm kiếm...",
    label,
    description,
}: TextFilterProps) {
    const [innerValue, setInnerValue] = useState(value);
    const [debounced] = useDebouncedValue(innerValue, DEBOUNCE_INPUT_FILTER);

    useDidUpdate(() => {
        if (value !== innerValue) {
            setInnerValue(value);
        }
    }, [value]);

    useEffect(() => {
        if (debounced !== value) {
            onChange(debounced);
        }
    }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <TextInput
            label={label}
            description={description}
            placeholder={placeholder}
            leftSection={<CommonIcon icon={ICON_MAP.search} size={16} />}
            rightSection={
                innerValue ? (
                    <ActionIcon
                        size="sm"
                        variant="transparent"
                        c="dimmed"
                        onClick={() => setInnerValue("")}>
                        <CommonIcon icon={ICON_MAP.close} size={14} />
                    </ActionIcon>
                ) : null
            }
            value={innerValue}
            onChange={(e) => setInnerValue(e.currentTarget.value)}
        />
    );
}

export interface MultiSelectFilterProps {
    value: string[];
    onChange: (_value: string[]) => void;
    data: string[];
    placeholder?: string;
    label?: string;
    description?: string;
    searchable?: boolean;
    clearable?: boolean;
}

export function MultiSelectFilter({
    value,
    onChange,
    data,
    placeholder = "Chọn...",
    label,
    description,
    searchable = true,
    clearable = true,
}: MultiSelectFilterProps) {
    const [innerValue, setInnerValue] = useState(value);
    const [debounced] = useDebouncedValue(innerValue, DEBOUNCE_INPUT_FILTER);

    useDidUpdate(() => {
        if (value !== innerValue) {
            setInnerValue(value);
        }
    }, [value]);

    useEffect(() => {
        if (debounced !== value) {
            onChange(debounced);
        }
    }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <MultiSelect
            label={label}
            description={description}
            data={data}
            value={innerValue}
            placeholder={placeholder}
            onChange={(value) => setInnerValue(value || [])}
            leftSection={<CommonIcon icon={ICON_MAP.search} size={16} />}
            comboboxProps={{ withinPortal: false }}
            clearable={clearable}
            searchable={searchable}
        />
    );
}

export interface DateRangeFilterProps {
    value: DatesRangeValue;
    onChange: (_value: DatesRangeValue) => void;
    label?: string;
    description?: string;
    maxDate?: Date;
    minDate?: Date;
    onClose?: () => void;
}

export function DateRangeFilter({
    value,
    onChange,
    maxDate,
    minDate,
    onClose,
}: DateRangeFilterProps) {
    const today = dayjs();

    return (
        <Stack gap="sm">
            <DatePicker
                maxDate={maxDate}
                minDate={minDate}
                type="range"
                value={value}
                onChange={onChange}
                presets={[
                    {
                        value: [
                            today.subtract(2, "day").format("YYYY-MM-DD"),
                            today.format("YYYY-MM-DD"),
                        ],
                        label: "2 ngày trước",
                    },
                    {
                        value: [
                            today.subtract(7, "day").format("YYYY-MM-DD"),
                            today.format("YYYY-MM-DD"),
                        ],
                        label: "1 tuần trước",
                    },
                    {
                        value: [
                            today.startOf("month").format("YYYY-MM-DD"),
                            today.format("YYYY-MM-DD"),
                        ],
                        label: "Tháng này",
                    },
                    {
                        value: [
                            today.subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
                            today.subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
                        ],
                        label: "Tháng trước",
                    },
                    {
                        value: [
                            today.subtract(1, "year").startOf("year").format("YYYY-MM-DD"),
                            today.subtract(1, "year").endOf("year").format("YYYY-MM-DD"),
                        ],
                        label: "Năm trước",
                    },
                ]}
            />
            {value && (value[0] || value[1]) && (
                <Button
                    variant="light"
                    onClick={() => {
                        onChange([null, null]);
                        onClose?.();
                    }}>
                    Xóa
                </Button>
            )}
        </Stack>
    );
}

// src/shared/components/Filters/NumberRangeFilter.tsx
import { Group, NumberInput, Text } from "@mantine/core";
import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import { useEffect, useState } from "react";

export interface NumberRangeValue {
    min: number | null;
    max: number | null;
}

export interface NumberRangeFilterProps {
    value: NumberRangeValue;
    onChange: (_value: NumberRangeValue) => void;
    label?: string;
    placeholderMin?: string;
    placeholderMax?: string;
    currency?: string;
}

export function NumberRangeFilter({
    value,
    onChange,
    label,
    placeholderMin = "Từ",
    placeholderMax = "Đến",
    currency,
}: NumberRangeFilterProps) {
    const handleMinChange = (val: number | string) => {
        onChange({ ...value, min: val === "" ? null : Number(val) });
    };

    const handleMaxChange = (val: number | string) => {
        onChange({ ...value, max: val === "" ? null : Number(val) });
    };

    const handleReset = () => {
        onChange({ min: null, max: null });
    };

    return (
        <div style={{ width: "100%" }}>
            <Group justify="space-between">
                {label && (
                    <Text size="sm" fw={500} mb={4}>
                        {label}
                    </Text>
                )}
                <CommonActionIcon icon={ICON_MAP.rotateLeft} size="sm" onClick={handleReset} />
            </Group>

            <Group gap="xs">
                <NumberInput
                    placeholder={placeholderMin}
                    value={value.min ?? ""}
                    onChange={handleMinChange}
                    thousandSeparator=","
                    rightSection={
                        currency ? (
                            <Text size="xs" c="dimmed">
                                {currency}
                            </Text>
                        ) : null
                    }
                />
                <Text c="dimmed">-</Text>
                <NumberInput
                    placeholder={placeholderMax}
                    value={value.max ?? ""}
                    onChange={handleMaxChange}
                    thousandSeparator=","
                    rightSection={
                        currency ? (
                            <Text size="xs" c="dimmed">
                                {currency}
                            </Text>
                        ) : null
                    }
                />
            </Group>
        </div>
    );
}
