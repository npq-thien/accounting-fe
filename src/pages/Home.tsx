import type { UserRole } from "@/app/providers/auth/AuthContext";
import { CommonButton, CommonIcon } from "@/shared/components/common";
import { ICON_MAP } from "@/shared/constants/icons";
import { useAuth } from "@/shared/hooks";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
    AppShell,
    Box,
    Button,
    Divider,
    Group,
    Image,
    NavLink,
    Stack,
    Title,
    Tooltip,
    useMantineColorScheme,
} from "@mantine/core";
import React, { useState } from "react";
import { FormSample } from "./template/components/FormSample";
import { AdvancedFormSample } from "./template/components/AdvancedFormSample";

export interface MenuItem {
    key: string;
    title: string;
    path: string;
    roles: UserRole[];
    icon?: IconDefinition;
    component?: React.ReactNode;
    children?: MenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
    {
        key: "Home",
        title: "Trang chủ",
        path: "/",
        icon: ICON_MAP.home,
        roles: ["admin", "user"],
    },
    {
        key: "OrderManagement",
        title: "Quản lý đơn hàng",
        path: "/order-management",
        icon: ICON_MAP.order,
        roles: ["admin", "user"],
        children: [
            {
                key: "OrderBuy",
                title: "Mua hàng",
                path: "/order-management/order-buy",
                roles: ["admin", "user"],
            },
            {
                key: "OrderSell",
                title: "Bán hàng",
                path: "/order-management/order-sell",
                roles: ["admin", "user"],
            },
        ],
    },
    {
        key: "template",
        title: "Template",
        path: "/template",
        icon: ICON_MAP.star,
        roles: ["admin", "user"],
        children: [
            {
                key: "form",
                title: "Form",
                icon: ICON_MAP.form,
                path: "/template/form",
                roles: ["admin", "user"],
                component: <FormSample />,
            },
            {
                key: "advanced-form",
                title: "Advanced Forms",
                icon: ICON_MAP.form,
                path: "/template/advanced-form",
                roles: ["admin", "user"],
                component: <AdvancedFormSample />,
            },
        ],
    },
];

// Helper function to find component by path in nested menu structure
const findComponentByPath = (menuItems: MenuItem[], path: string): React.ReactNode | undefined => {
    for (const item of menuItems) {
        if (item.path === path && item.component) {
            return item.component;
        }
        if (item.children) {
            const childComponent = findComponentByPath(item.children, path);
            if (childComponent) {
                return childComponent;
            }
        }
    }
    return undefined;
};

export function Home() {
    const { user, logout } = useAuth();
    const [activePath, setActivePath] = useState("/");
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const toggleColorScheme = () => {
        setColorScheme(colorScheme === "dark" ? "light" : "dark");
    };

    const visibleMenu = MENU_ITEMS.filter((item) => item.roles.includes(user?.role ?? "user"));

    return (
        <AppShell header={{ height: 60 }} navbar={{ width: 260, breakpoint: "sm" }}>
            {/* TODO: move header to new file */}
            {/* HEADER */}
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group gap="md">
                        <Box>
                            <Image
                                src="/images/cat.svg"
                                alt="Logo"
                                width={40}
                                height={40}
                                radius="sm"
                            />
                        </Box>
                        <Title order={3}>Accounting App</Title>
                    </Group>
                    <Group gap={8}>
                        <Group>
                            <Tooltip label="Light mode">
                                <Button onClick={toggleColorScheme} variant="outline" lightHidden>
                                    <CommonIcon icon={ICON_MAP.sun} />
                                </Button>
                            </Tooltip>
                            <Tooltip label="Dark mode">
                                <Button onClick={toggleColorScheme} variant="outline" darkHidden>
                                    <CommonIcon icon={ICON_MAP.moon} />
                                </Button>
                            </Tooltip>
                        </Group>
                        <Divider orientation="vertical" />
                        {/* {user && ( */}
                        <CommonButton variant="subtle" onClick={logout}>
                            Logout ({user?.username})
                        </CommonButton>
                        {/* )} */}
                    </Group>
                </Group>
            </AppShell.Header>

            {/* NAVBAR */}
            <AppShell.Navbar>
                <Stack gap={4}>
                    {visibleMenu.map((item) => (
                        <NavLink
                            key={item.key}
                            label={item.title}
                            leftSection={item.icon && <CommonIcon icon={item.icon} />}
                            active={activePath === item.path}
                            onClick={() => {
                                if (!item.children) {
                                    setActivePath(item.path);
                                }
                            }}
                            childrenOffset={16}>
                            {item.children
                                ?.filter((child) => child.roles.includes(user?.role ?? "user"))
                                .map((child) => (
                                    <NavLink
                                        key={child.key}
                                        label={child.title}
                                        leftSection={child.icon && <CommonIcon icon={child.icon} />}
                                        active={activePath === child.path}
                                        onClick={() => setActivePath(child.path)}
                                    />
                                ))}
                        </NavLink>
                    ))}
                </Stack>
            </AppShell.Navbar>

            {/* MAIN */}
            <AppShell.Main my="md">
                <Title order={4}>Home</Title>
                <Box mt="sm">Selected path: {activePath}</Box>
                {findComponentByPath(visibleMenu, activePath)}
            </AppShell.Main>
        </AppShell>
    );
}
