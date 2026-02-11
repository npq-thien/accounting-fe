// CommonIcon.tsx
import { ICON_SIZE } from "@/styles/commonStyles";
import { Box, type BoxProps, useMantineTheme } from "@mantine/core";
import type { Icon } from "@tabler/icons-react";

type Props = {
    icon: Icon;
    size?: number;
    color?: string;
    backgroundColor?: string;
} & BoxProps;

export function CommonIcon(props: Props) {
    const theme = useMantineTheme();
    const {
        icon: IconComponent,
        size = ICON_SIZE,
        color = theme.colors.gray[6],
        backgroundColor = "transparent",
        ...rest
    } = props;

    if (!IconComponent) {
        console.warn("Icon is not defined, please define in ICON_MAP");
    }

    return (
        <Box
            component="span"
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: color,
                padding: 4,
                backgroundColor: backgroundColor,
            }}
            {...rest}>
            <IconComponent size={size} />
        </Box>
    );
}
