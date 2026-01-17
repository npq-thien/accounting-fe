import { CommonIcon } from "@/shared/components/common";
import { ICON_MAP } from "@/shared/constants/icons";
import { ActionIcon, Button, MultiSelect, Stack, TextInput } from "@mantine/core";
import { DatePicker, type DatesRangeValue } from "@mantine/dates";
import dayjs from "dayjs";

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
    return (
        <TextInput
            label={label}
            description={description}
            placeholder={placeholder}
            leftSection={<CommonIcon icon={ICON_MAP.search} size={16} />}
            rightSection={
                value ? (
                    <ActionIcon
                        size="sm"
                        variant="transparent"
                        c="dimmed"
                        onClick={() => {
                            onChange("");
                        }}>
                        <CommonIcon icon={ICON_MAP.close} size={14} />
                    </ActionIcon>
                ) : null
            }
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
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
    return (
        <MultiSelect
            label={label}
            description={description}
            data={data}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
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
