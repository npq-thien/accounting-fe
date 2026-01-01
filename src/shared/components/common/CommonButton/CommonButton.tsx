import { Button, type ButtonProps, type ElementProps } from "@mantine/core";

interface Props extends ButtonProps, ElementProps<"button", keyof ButtonProps> {}

export function CommonButton(props: Props) {
    const { radius = "sm", size = "sm", variant = "default", ...rest } = props;

    return <Button radius={radius} size={size} variant={variant} {...rest} />;
}
