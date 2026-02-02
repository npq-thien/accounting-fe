import {
    AppShell,
    Box,
    Divider,
    Group,
    Image,
    Stack,
    Title,
    Tooltip,
    useMantineColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { MENU_ITEMS, type MenuItem } from "../constants/menu";
import { useDeviceType } from "../hooks/useDeviceType";

import { CommonActionIcon, CommonButton } from "@/shared/components/common";
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
    // TODO: temporary expanded menus
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
        "order-management": true,
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
            bg={colorScheme === "dark" ? "#1a1b1e" : "#fbfbfb"}
            header={{ height: 60 }}
            navbar={{
                width: isMobile ? 260 : navbarCollapsed ? 70 : 260, // Mobile: always full width, Desktop: collapsible
                breakpoint: "sm",
                collapsed: { mobile: navbarCollapsed, desktop: false }, // Mobile: hide/show, Desktop: always visible
            }}>
            {/* HEADER */}
            <AppShell.Header>
                <Group h="100%" px="sm" justify="space-between" m={0}>
                    <Group gap="md">
                        <CommonActionIcon
                            icon={ICON_MAP.bars}
                            variant="subtle"
                            onClick={toggleNavbar}
                        />
                        <Box>
                            {/* TODO: update logo and app name */}
                            <Image
                                src="/images/logo.ico"
                                alt="Logo"
                                width={40}
                                height={40}
                            />
                        </Box>
                        {!isMobile && <Title order={3}>Accounting App</Title>}
                    </Group>
                    <Group gap={8}>
                        <Group>
                            <Tooltip label="Light mode">
                                <CommonActionIcon
                                    icon={ICON_MAP.sun}
                                    lightHidden
                                    onClick={toggleColorScheme}
                                    variant="gradient"
                                    gradient={{ from: "red", to: "yellow", deg: 90 }}
                                />
                            </Tooltip>
                            <Tooltip label="Dark mode">
                                <CommonActionIcon
                                    icon={ICON_MAP.moon}
                                    darkHidden
                                    onClick={toggleColorScheme}
                                    variant="gradient"
                                    gradient={{ from: "violet", to: "blue", deg: 90 }}
                                />
                            </Tooltip>
                        </Group>
                        <Divider orientation="vertical" />
                        <CommonButton variant="subtle" onClick={logout}>
                            Logout ({user?.username})
                        </CommonButton>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar bg={colorScheme === "dark" ? "#1a1b1e" : "#fbfbfb"}>
                <Stack gap={4} p={navbarCollapsed ? "xs" : "sm"}>
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
                                        if (item.children) {
                                            toggleMenuExpand(item);
                                        } else {
                                            navigate(item.path);
                                        }
                                    }}
                                    isExpanded={isMenuExpanded(item)}
                                />

                                {item.children && isMenuExpanded(item) && (
                                    <Stack
                                        gap={2}
                                        ml={isMobile ? "lg" : navbarCollapsed ? 0 : "lg"}
                                        mt={4}>
                                        {item.children
                                            .filter((c) => c.roles.includes(user?.role ?? "user"))
                                            .map((child) => (
                                                <MenuItemRenderer
                                                    key={child.key}
                                                    item={child}
                                                    isMobile={isMobile}
                                                    navbarCollapsed={navbarCollapsed}
                                                    isActive={location.pathname === child.path}
                                                    onClick={() => navigate(child.path)}
                                                    isExpanded={false} // Chilren don't have children
                                                />
                                            ))}
                                    </Stack>
                                )}
                            </Box>
                        );
                    })}
                </Stack>
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
