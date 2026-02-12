import { BORDER_RADIUS_MENU_NAVBAR } from "@/styles/commonStyles";
import { Drawer, type DrawerProps, Stack, Title, Box, Divider, Group, Center } from "@mantine/core";
import { useMemo, type ReactNode } from "react";

export type CommonDrawerProps = Omit<DrawerProps, "title"> & {
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    withDivider?: boolean;
    footerHeight?: string;
};

export function CommonDrawer(props: CommonDrawerProps) {
    const {
        title,
        children,
        footer,
        withDivider = true,
        position = "right",
        size = "md",
        footerHeight = "100px",
        ...restProps
    } = props;

    const drawerTitle = (
        <Center>
            <Title order={2}>{title}</Title>
        </Center>
    );

    const drawerHeight = useMemo(() => {
        return `calc(100vh - ${footerHeight})`;
    }, [footerHeight]);

    return (
        <Drawer
            position={position}
            size={size}
            radius={BORDER_RADIUS_MENU_NAVBAR}
            trapFocus
            title={drawerTitle}
            {...restProps}>
            <Stack gap={0} h={drawerHeight} style={{ display: "flex", flexDirection: "column" }}>
                {/* Content Section - Scrollable */}
                <Box
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        overflowX: "hidden",
                        minHeight: 0,
                        paddingBottom: "1rem",
                    }}>
                    {children}
                </Box>

                {/* Footer Section - Fixed at Bottom */}
                {footer && (
                    <Box pt="md">
                        {withDivider && <Divider mb="md" />}
                        <Group justify="flex-end" gap="sm">
                            {footer}
                        </Group>
                    </Box>
                )}
            </Stack>
        </Drawer>
    );
}
