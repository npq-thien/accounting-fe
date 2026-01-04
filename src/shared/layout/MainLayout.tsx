import { CommonButton, CommonIcon } from "@/shared/components/common";
import { ICON_MAP } from "@/shared/constants/icons";
import { useAuth } from "@/shared/hooks";
import {
    AppShell,
    Box,
    Divider,
    Group,
    Image,
    NavLink,
    Stack,
    Title,
    Tooltip,
    useMantineColorScheme,
} from "@mantine/core";
import { useDeviceType } from "../hooks/useDeviceType";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { MENU_ITEMS } from "../constants/menu";

export function MainLayout() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const { isMobile } = useDeviceType();
    const [navbarCollapsed, setNavbarCollapsed] = useState(false);
    const [menuChildrenExpanded] = useState(true); // TODO: make this dynamic later

    const toggleColorScheme = () => {
        setColorScheme(colorScheme === "dark" ? "light" : "dark");
    };

    const toggleNavbar = () => {
        setNavbarCollapsed(!navbarCollapsed);
    };

    const visibleMenu = MENU_ITEMS.filter((item) => item.roles.includes(user?.role ?? "user"));

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: isMobile ? 260 : navbarCollapsed ? 70 : 260, // Mobile: always full width, Desktop: collapsible
                breakpoint: "sm",
                collapsed: { mobile: navbarCollapsed, desktop: false }, // Mobile: hide/show, Desktop: always visible
            }}>
            {/* HEADER */}
            <AppShell.Header>
                <Group h="100%" px="sm" justify="space-between" style={{ margin: 0 }}>
                    <Group gap="md">
                        <CommonButton
                            variant="subtle"
                            size="sm"
                            onClick={toggleNavbar}
                            style={{ padding: "8px" }}>
                            <CommonIcon icon={ICON_MAP.bars} />
                        </CommonButton>
                        <Box>
                            {/* TODO: update logo and app name */}
                            <Image
                                src="/images/cat.svg"
                                alt="Logo"
                                width={40}
                                height={40}
                                radius="sm"
                            />
                        </Box>
                        {!isMobile && <Title order={3}>Accounting App</Title>}
                    </Group>
                    <Group gap={8}>
                        <Group>
                            <Tooltip label="Light mode">
                                <CommonButton
                                    onClick={toggleColorScheme}
                                    variant="outline"
                                    lightHidden>
                                    <CommonIcon icon={ICON_MAP.sun} />
                                </CommonButton>
                            </Tooltip>
                            <Tooltip label="Dark mode">
                                <CommonButton
                                    onClick={toggleColorScheme}
                                    variant="outline"
                                    darkHidden>
                                    <CommonIcon icon={ICON_MAP.moon} />
                                </CommonButton>
                            </Tooltip>
                        </Group>
                        <Divider orientation="vertical" />
                        <CommonButton variant="subtle" onClick={logout}>
                            Logout ({user?.username})
                        </CommonButton>
                    </Group>
                </Group>
            </AppShell.Header>

            {/* NAVBAR */}
            <AppShell.Navbar>
                <Stack gap={4} p={navbarCollapsed ? "xs" : "sm"}>
                    {visibleMenu.map((item) => (
                        <Box key={item.key}>
                            {isMobile ? (
                                // Mobile: Always show full NavLink when navbar is visible
                                <NavLink
                                    label={item.title}
                                    leftSection={
                                        item.icon ? (
                                            <CommonIcon icon={item.icon} />
                                        ) : (
                                            <CommonIcon icon={ICON_MAP.defaultMenuIcon} />
                                        )
                                    }
                                    active={location.pathname === item.path}
                                    onClick={() => {
                                        if (!item.children) {
                                            navigate(item.path);
                                        }
                                    }}
                                />
                            ) : navbarCollapsed ? (
                                // Desktop collapsed: Show icon-only buttons
                                <Tooltip label={item.title} position="right">
                                    <CommonButton
                                        variant={
                                            location.pathname === item.path ? "light" : "subtle"
                                        }
                                        size="sm"
                                        onClick={() => {
                                            if (!item.children) {
                                                navigate(item.path);
                                            }
                                        }}
                                        style={{
                                            width: "100%",
                                            padding: "12px 4px",
                                            height: "40px",
                                            justifyContent: "center",
                                        }}>
                                        {item.icon ? (
                                            <CommonIcon icon={item.icon} />
                                        ) : (
                                            <CommonIcon icon={ICON_MAP.defaultMenuIcon} />
                                        )}
                                    </CommonButton>
                                </Tooltip>
                            ) : (
                                // Desktop expanded: Show full NavLink
                                <NavLink
                                    label={item.title}
                                    leftSection={
                                        item.icon ? (
                                            <CommonIcon icon={item.icon} />
                                        ) : (
                                            <CommonIcon icon={ICON_MAP.defaultMenuIcon} />
                                        )
                                    }
                                    active={location.pathname === item.path}
                                    onClick={() => {
                                        if (!item.children) {
                                            navigate(item.path);
                                        }
                                    }}
                                />
                            )}

                            {/* Menu Children - Show when menuChildrenExpanded is true */}
                            {item.children && menuChildrenExpanded && (
                                <Stack
                                    gap={2}
                                    ml={isMobile ? "lg" : navbarCollapsed ? 0 : "lg"}
                                    mt={isMobile ? 4 : navbarCollapsed ? 2 : 4}>
                                    {item.children
                                        .filter((child) =>
                                            child.roles.includes(user?.role ?? "user")
                                        )
                                        .map((child) =>
                                            isMobile ? (
                                                // Mobile: Always show full NavLink
                                                <NavLink
                                                    key={child.key}
                                                    label={child.title}
                                                    leftSection={
                                                        child.icon ? (
                                                            <CommonIcon icon={child.icon} />
                                                        ) : (
                                                            <CommonIcon
                                                                icon={ICON_MAP.defaultMenuIcon}
                                                            />
                                                        )
                                                    }
                                                    active={location.pathname === child.path}
                                                    onClick={() => navigate(child.path)}
                                                    style={{
                                                        padding: "8px 12px",
                                                        fontSize: "14px",
                                                    }}
                                                />
                                            ) : navbarCollapsed ? (
                                                // Desktop collapsed: Show icon-only buttons
                                                <Tooltip
                                                    label={child.title}
                                                    position="right"
                                                    key={child.key}>
                                                    <CommonButton
                                                        variant={
                                                            location.pathname === child.path
                                                                ? "light"
                                                                : "subtle"
                                                        }
                                                        size="sm"
                                                        onClick={() => navigate(child.path)}
                                                        style={{
                                                            width: "100%",
                                                            padding: "8px 4px",
                                                            height: "36px",
                                                            justifyContent: "center",
                                                        }}>
                                                        {child.icon ? (
                                                            <CommonIcon icon={child.icon} />
                                                        ) : (
                                                            <CommonIcon
                                                                icon={ICON_MAP.defaultMenuIcon}
                                                            />
                                                        )}
                                                    </CommonButton>
                                                </Tooltip>
                                            ) : (
                                                // Desktop expanded: Show full NavLink
                                                <NavLink
                                                    key={child.key}
                                                    label={child.title}
                                                    leftSection={
                                                        child.icon ? (
                                                            <CommonIcon icon={child.icon} />
                                                        ) : (
                                                            <CommonIcon
                                                                icon={ICON_MAP.defaultMenuIcon}
                                                            />
                                                        )
                                                    }
                                                    active={location.pathname === child.path}
                                                    onClick={() => navigate(child.path)}
                                                    style={{
                                                        padding: "8px 12px",
                                                        fontSize: "14px",
                                                    }}
                                                />
                                            )
                                        )}
                                </Stack>
                            )}
                        </Box>
                    ))}
                </Stack>
            </AppShell.Navbar>

            {/* MAIN - This will render the current route's component */}
            <AppShell.Main my="md">
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
