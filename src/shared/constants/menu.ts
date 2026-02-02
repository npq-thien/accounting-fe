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

const TEMPLATE_PAGES: MenuItem[] = import.meta.env.VITE_SHOW_TEMPLATE_PAGES === "true" ? [
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
                key: "products-table",
                title: "Products (API)",
                icon: ICON_MAP.table,
                path: "/template/products-table",
                roles: ["admin", "user"],
            },
            {
                key: "ag-grid",
                title: "AgGrid",
                icon: ICON_MAP.table,
                path: "/template/ag-grid",
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
] : [];

export const MENU_ITEMS: MenuItem[] = [
    {
        key: "home",
        title: "Trang chủ",
        path: "/",
        icon: ICON_MAP.home,
        roles: ["admin", "user"],
    },
    {
        key: "order-management",
        title: "Quản lý đơn hàng",
        path: "/order-management",
        icon: ICON_MAP.order,
        roles: ["admin", "user"],
        children: [
            {
                key: "order-buy",
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
    ...TEMPLATE_PAGES,
];
