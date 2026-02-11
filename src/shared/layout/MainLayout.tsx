import {
    AppShell,
    Avatar,
    Box,
    Button,
    Group,
    Image,
    Popover,
    Stack,
    Text,
    UnstyledButton,
    useMantineColorScheme
} from "@mantine/core";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { MENU_ITEMS, type MenuItem } from "../constants/menu";
import { useDeviceType } from "../hooks/useDeviceType";

import { CommonActionIcon, CommonIcon } from "@/shared/components/common";
import { ICON_MAP } from "@/shared/constants/icons";
import { useAuth } from "@/shared/hooks";
import MenuItemRenderer from "./NavBarRenderer";

export function MainLayout() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const { isMobile } = useDeviceType();
    const [navbarCollapsed, setNavbarCollapsed] = useState(false);
    const [userPopupOpen, setUserPopupOpen] = useState(false);
    // TODO: temporary expanded menus
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
        template: true,
    });

    const isMenuExpanded = (item: MenuItem) => {
        if (!item.children) return false;
        return expandedMenus[item.key] ?? false;
    };

    const toggleMenuExpand = (item: MenuItem) => {
        if (!item.children) return;

        setExpandedMenus((prev) => ({
            ...prev,
            [item.key]: !prev[item.key],
        }));
    };

    const toggleColorScheme = () => {
        setColorScheme(colorScheme === "dark" ? "light" : "dark");
    };

    const toggleNavbar = () => {
        setNavbarCollapsed(!navbarCollapsed);
    };

    const visibleMenu = MENU_ITEMS.filter((item) => item.roles.includes(user?.role ?? "user"));

    return (
        <AppShell
            bg={colorScheme === "dark" ? "#1a1b1e" : "#ffff"}
            navbar={{
                width: isMobile ? 260 : navbarCollapsed ? 80 : 260, // Mobile: always full width, Desktop: collapsible
                breakpoint: "sm",
                collapsed: { mobile: navbarCollapsed, desktop: false }, // Mobile: hide/show, Desktop: always visible
            }}>
            <AppShell.Navbar
                bg={colorScheme === "dark" ? "#1a1b1e" : "#ffff"}
                p={0}
                style={{
                    borderRadius: "0 16px 16px 0",
                }}>
                {/* NAVBAR HEADER */}
                <Box
                    p="sm"
                    style={{
                        borderBottom: "1px solid var(--mantine-color-gray-3)",
                    }}>
                    <Group justify={navbarCollapsed ? "center" : "space-between"}>
                        {!isMobile && (
                            <CommonActionIcon
                                icon={ICON_MAP.bars}
                                variant="subtle"
                                onClick={toggleNavbar}
                            />
                        )}

                        <Group gap="sm">
                            <Image src="/images/logo_new_transparent.png" w={40} h={32} />
                        </Group>

                        <CommonActionIcon
                            icon={ICON_MAP.PmsoBusinessApp}
                            variant="subtle"
                            onClick={() => navigate("/")}
                        />
                    </Group>
                </Box>

                {/* NAVBAR BODY */}
                <Box
                    style={{
                        flex: 1,
                        overflowY: "auto",
                    }}
                    px={navbarCollapsed ? "xs" : "sm"}
                    py="sm">
                    <Stack gap={4}>
                        {visibleMenu.map((item) => {
                            const isActive = location.pathname === item.path;

                            return (
                                <Box key={item.key}>
                                    <MenuItemRenderer
                                        item={item}
                                        isMobile={isMobile}
                                        navbarCollapsed={navbarCollapsed}
                                        isActive={isActive}
                                        onClick={() => {
                                            if (item.children) toggleMenuExpand(item);
                                            else navigate(item.path);
                                        }}
                                        isExpanded={isMenuExpanded(item)}
                                    />

                                    {item.children && isMenuExpanded(item) && (
                                        <Stack gap={2} ml={navbarCollapsed ? 0 : "lg"} mt={4}>
                                            {item.children
                                                .filter((c) =>
                                                    c.roles.includes(user?.role ?? "user")
                                                )
                                                .map((child) => (
                                                    <MenuItemRenderer
                                                        key={child.key}
                                                        item={child}
                                                        isMobile={isMobile}
                                                        navbarCollapsed={navbarCollapsed}
                                                        isActive={location.pathname === child.path}
                                                        onClick={() => navigate(child.path)}
                                                        isExpanded={false}
                                                    />
                                                ))}
                                        </Stack>
                                    )}
                                </Box>
                            );
                        })}
                    </Stack>
                </Box>

                {/* NAVBAR FOOTER */}
                <Box p="sm">
                    <Stack gap="xs">
                        <Group gap="xs">
                            <CommonActionIcon
                                icon={ICON_MAP.sun}
                                lightHidden
                                onClick={toggleColorScheme}
                                variant="gradient"
                                gradient={{ from: "red", to: "yellow", deg: 90 }}
                            />
                            <CommonActionIcon
                                icon={ICON_MAP.moon}
                                darkHidden
                                onClick={toggleColorScheme}
                                variant="gradient"
                                gradient={{ from: "violet", to: "blue", deg: 90 }}
                            />
                        </Group>

                        {/* USER INFO - Avatar with Popover */}
                        <Popover
                            width={220}
                            position={isMobile ? "bottom-end" : "right-end"}
                            opened={userPopupOpen}
                            onClose={() => setUserPopupOpen(false)}
                            shadow="md"
                            onChange={setUserPopupOpen}>
                            <Popover.Target>
                                <UnstyledButton
                                    w="100%"
                                    onClick={() => setUserPopupOpen((o) => !o)}
                                    style={{
                                        borderTop: "1px solid var(--mantine-color-gray-3)",
                                    }}>
                                    <Group
                                        gap="md"
                                        p="sm"
                                        display="flex"
                                        align="center"
                                        justify="center">
                                        <Avatar
                                            src="/images/test.png"
                                            alt={user?.username}
                                            size={navbarCollapsed ? "md" : "sm"}
                                            radius="xl"
                                        />
                                        {!navbarCollapsed && (
                                            <Box style={{ flex: 1, minWidth: 0 }}>
                                                <Text size="sm" fw={500}>
                                                    {user?.username}
                                                </Text>
                                                <Text size="xs" c="dimmed">
                                                    {user?.role}
                                                </Text>
                                            </Box>
                                        )}
                                    </Group>
                                </UnstyledButton>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Stack gap="xs">
                                    <Button variant="subtle" size="xs" onClick={() => {}}>
                                        Thông tin tài khoản
                                    </Button>
                                    <Button
                                        variant="subtle"
                                        color="red"
                                        size="xs"
                                        leftSection={
                                            <CommonIcon icon={ICON_MAP.logout} color="red" />
                                        }
                                        onClick={() => {
                                            setUserPopupOpen(false);
                                            logout();
                                        }}>
                                        Đăng xuất
                                    </Button>
                                </Stack>
                            </Popover.Dropdown>
                        </Popover>
                    </Stack>
                </Box>
            </AppShell.Navbar>

            {/* MAIN - This will render the current route's component */}
            <AppShell.Main>
                <Box p="md" mx="0" w="100%">
                    <Outlet />
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}
