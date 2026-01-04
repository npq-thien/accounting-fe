import { Box, Text } from "@mantine/core";
import type { ReactNode } from "react";

type Props = {
    title?: string;
    message: ReactNode;
};

export const CustomToast = ({ title, message }: Props) => {
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
