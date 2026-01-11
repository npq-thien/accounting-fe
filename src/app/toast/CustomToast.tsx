import { Box, Text } from "@mantine/core";

import type { ReactNode } from "react";
import type { ToastContentProps } from "react-toastify";

type Props = {
    title?: string;
    message: ReactNode;
} & ToastContentProps;

export const CustomToast = (props: Props) => {
    // Destructure only the props we need, excluding react-toastify specific props
    const { title, message } = props;

    return (
        <Box>
            {title && (
                <Text
                    size="sm"
                    fw={700}
                    c="inherit"
                    style={{
                        marginBottom: "4px",
                        lineHeight: 1.2,
                        textTransform: "capitalize",
                    }}>
                    {title}
                </Text>
            )}
            <Text size="sm" c="inherit" style={{ lineHeight: 1.4 }}>
                {message}
            </Text>
        </Box>
    );
};
