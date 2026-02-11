import type { Icon } from "@tabler/icons-react";
import { ICON_MAP } from "./icons";


import { type UserRole } from "@/shared/constants";

export interface MenuItem {
    key: string;
    title: string;
    path: string;
    roles: UserRole[];
    icon?: Icon;
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
                title: "DataTable (will remove)",
                icon: ICON_MAP.table,
                path: "/template/data-table",
                roles: ["admin", "user"],
            },
            {
                key: "products-table",
                title: "Products API (will remove)",
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
        title: "Tổng quan",
        path: "/",
        icon: ICON_MAP.home,
        roles: ["admin", "user"],
    },
    {
        key: "cash",
        title: "Tiền mặt",
        path: "/cash",
        icon: ICON_MAP.cash,
        roles: ["admin", "user"],
    },
    {
        key: "bank",
        title: "Ngân hàng",
        path: "/bank",
        icon: ICON_MAP.bank,
        roles: ["admin", "user"],
    },
    {
        key: "receivable",
        title: "Phải thu",
        path: "/receivable",
        icon: ICON_MAP.receivable,
        roles: ["admin", "user"],
    },
    {
        key: "payable",
        title: "Phải chi",
        path: "/payable",
        icon: ICON_MAP.payable,
        roles: ["admin", "user"],
    },
    {
        key: "inventory",
        title: "NVL/Tài sản",
        path: "/inventory",
        icon: ICON_MAP.inventory,
        roles: ["admin", "user"],
    },
    {
        key: "cost",
        title: "Chi phí",
        path: "/cost",
        icon: ICON_MAP.cost,
        roles: ["admin", "user"],
    },
    {
        key: "report",
        title: "Báo cáo",
        path: "/report",
        icon: ICON_MAP.report,
        roles: ["admin", "user"],
    },
    {
        key: "category",
        title: "Danh mục",
        path: "/category",
        icon: ICON_MAP.category,
        roles: ["admin", "user"],
    },
    ...TEMPLATE_PAGES,
];
