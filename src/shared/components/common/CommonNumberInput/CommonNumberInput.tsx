import { NumberInput, type NumberInputProps } from "@mantine/core";

type CommonNumberInputProps = NumberInputProps;

export function CommonNumberInput(props: CommonNumberInputProps) {
    return <NumberInput size="sm" radius="sm" {...props} />;
}
