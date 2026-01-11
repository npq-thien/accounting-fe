import { Box, Loader, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";

import { setGlobalLoader } from "./PageLoading";

import type React from "react";

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);

    const showLoading = () => setVisible(true);
    const hideLoading = () => setVisible(false);

    // Register global loader instance
    useEffect(() => {
        setGlobalLoader({
            show: showLoading,
            hide: hideLoading,
        });
    }, []);

    return (
        <>
            {children}
            {visible && (
                <LoadingOverlay
                    visible={true}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 3 }}
                    loaderProps={{
                        children: (
                            <Box ta="center">
                                <Loader size="lg" />
                            </Box>
                        ),
                    }}
                />
            )}
        </>
    );
};
