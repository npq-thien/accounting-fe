import { ICON_MAP } from "@/shared/constants/icons";
import { Box, Menu, Tabs, type TabsProps, UnstyledButton } from "@mantine/core";
import { type ReactNode, useState } from "react";
import { CommonIcon } from "../CommonIcon/CommonIcon";
import classes from "./CommonTabs.module.css";

export interface TabOption {
    label: string;
    onClick: () => void;
}

export interface CommonTabItem {
    value: string;
    label: ReactNode;
    children: ReactNode;
    /** If true, shows chevron and enables dropdown menu */
    hasOptions?: boolean;
    /** Dropdown menu items when hasOptions is true */
    options?: TabOption[];
}

interface CommonTabsProps extends Omit<TabsProps, "children"> {
    items: CommonTabItem[];
}

export function CommonTabs({ items, ...tabsProps }: CommonTabsProps) {
    const [activeTab, setActiveTab] = useState<string | null>(
        tabsProps.defaultValue || items[0]?.value || null
    );

    const handleTabChange = (value: string | null) => {
        setActiveTab(value);
        tabsProps.onChange?.(value);
    };

    return (
        <Tabs {...tabsProps} value={activeTab} onChange={handleTabChange}>
            <Tabs.List>
                {items.map((item) => {
                    const isActive = activeTab === item.value;

                    if (item.hasOptions && item.options) {
                        return (
                            <Menu key={item.value} position="bottom-start" withArrow>
                                <Menu.Target>
                                    <UnstyledButton
                                        className={`${classes.tabWithOptions} ${isActive ? classes.tabActive : ""}`}
                                        data-active={isActive || undefined}
                                        onClick={() => handleTabChange(item.value)}>
                                        <Box className={classes.tabLabel}>{item.label}</Box>
                                        <CommonIcon
                                            icon={ICON_MAP.chevronDown}
                                            size={16}
                                            style={{
                                                color: isActive
                                                    ? "var(--mantine-color-primary-6)"
                                                    : "var(--mantine-color-gray-6)",
                                            }}
                                        />
                                    </UnstyledButton>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    {item.options.map((option, idx) => (
                                        <Menu.Item key={idx} onClick={option.onClick}>
                                            {option.label}
                                        </Menu.Item>
                                    ))}
                                </Menu.Dropdown>
                            </Menu>
                        );
                    }

                    return (
                        <Tabs.Tab key={item.value} value={item.value} className={classes.tabText}>
                            {item.label}
                        </Tabs.Tab>
                    );
                })}
            </Tabs.List>

            {items.map((item) => (
                <Tabs.Panel key={item.value} value={item.value}>
                    {item.children}
                </Tabs.Panel>
            ))}
        </Tabs>
    );
}
