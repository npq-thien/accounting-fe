import { ICON_MAP } from "./icons";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { type UserRole } from "@/shared/constants";

export interface MenuItem {
    key: string;
    title: string;
    path: string;
    roles: UserRole[];
    icon?: IconDefinition;
    children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
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
            },
            {
                key: "advanced-form",
                title: "Advanced Forms",
                icon: ICON_MAP.form,
                path: "/template/advanced-form",
                roles: ["admin"],
            },
            {
                key: "data-table",
                title: "DataTable",
                icon: ICON_MAP.table,
                path: "/template/data-table",
                roles: ["admin", "user"],
            },
            {
                key: "permission-button",
                title: "Permission Button",
                icon: ICON_MAP.lock,
                path: "/template/permission-button",
                roles: ["admin", "user"],
            },
        ],
    },
];
