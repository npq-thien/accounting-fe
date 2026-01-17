// CommonIcon.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, type BoxProps, useMantineTheme } from "@mantine/core";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
    icon: IconDefinition;
    size?: number;
    color?: string;
    backgroundColor?: string;
} & BoxProps;

export function CommonIcon(props: Props) {
    const theme = useMantineTheme();
    const {
        icon,
        size = 16,
        color = theme.colors.gray[6],
        backgroundColor = "transparent",
        ...rest
    } = props;

    if (!icon) {
        console.warn("Icon is not defined, please define in ICON_MAP")
    }


    return (
        <Box
            component="span"
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: size,
                color: color,
                padding: 4,
                backgroundColor: backgroundColor,
            }}
            {...rest}>
            <FontAwesomeIcon icon={icon} />
        </Box>
    );
}
