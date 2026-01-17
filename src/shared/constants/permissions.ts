import type { UserRole } from "./index";

/**
 * Permission keys for the accounting application
 * These permissions control access to specific features and actions
 */
export type Permission =
    // Order Management
    | "order:view"
    | "order:create"
    | "order:edit"
    | "order:delete"
    | "order:approve"
    | "order:export"
    // Customer Management
    | "customer:view"
    | "customer:create"
    | "customer:edit"
    | "customer:delete"
    | "customer:export"
    // Staff Management
    | "staff:view"
    | "staff:create"
    | "staff:edit"
    | "staff:delete"
    | "staff:manage-roles"
    // Financial/Accounting
    | "finance:view-reports"
    | "finance:export-reports"
    | "finance:manage-budget"
    | "finance:approve-transactions"
    // Invoice Management
    | "invoice:view"
    | "invoice:create"
    | "invoice:edit"
    | "invoice:delete"
    | "invoice:send"
    // Payment Management
    | "payment:view"
    | "payment:create"
    | "payment:approve"
    | "payment:refund"
    // Settings
    | "settings:view"
    | "settings:edit"
    | "settings:manage-users";

/**
 * Permission groups for easier management
 * Can be used to check multiple permissions at once
 */
export const PERMISSION_GROUPS = {
    ORDER_FULL_ACCESS: [
        "order:view",
        "order:create",
        "order:edit",
        "order:delete",
        "order:approve",
    ] as Permission[],
    CUSTOMER_FULL_ACCESS: [
        "customer:view",
        "customer:create",
        "customer:edit",
        "customer:delete",
    ] as Permission[],
    STAFF_FULL_ACCESS: ["staff:view", "staff:create", "staff:edit", "staff:delete"] as Permission[],
    FINANCE_FULL_ACCESS: [
        "finance:view-reports",
        "finance:export-reports",
        "finance:manage-budget",
        "finance:approve-transactions",
    ] as Permission[],
    INVOICE_FULL_ACCESS: [
        "invoice:view",
        "invoice:create",
        "invoice:edit",
        "invoice:delete",
    ] as Permission[],
    PAYMENT_FULL_ACCESS: [
        "payment:view",
        "payment:create",
        "payment:approve",
        "payment:refund",
    ] as Permission[],
};

/**
 * Role-based permissions mapping
 * Define which permissions each role has access to
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    admin: [
        ...PERMISSION_GROUPS.ORDER_FULL_ACCESS,
        ...PERMISSION_GROUPS.CUSTOMER_FULL_ACCESS,
        ...PERMISSION_GROUPS.STAFF_FULL_ACCESS,
        ...PERMISSION_GROUPS.FINANCE_FULL_ACCESS,
        ...PERMISSION_GROUPS.INVOICE_FULL_ACCESS,
        ...PERMISSION_GROUPS.PAYMENT_FULL_ACCESS,
    ],
    user: [
        // Regular user has limited permissions
        "order:view",
        "order:create",
        "order:edit",
        "customer:view",
        "customer:create",
        "customer:edit",
        "invoice:view",
        "invoice:create",
        "payment:view",
        "settings:view",
    ],
};

/**
 * Permission descriptions for UI display
 */
export const PERMISSION_DESCRIPTIONS: Record<Permission, string> = {
    "order:view": "Xem đơn hàng",
    "order:create": "Tạo đơn hàng",
    "order:edit": "Sửa đơn hàng",
    "order:delete": "Xóa đơn hàng",
    "order:approve": "Duyệt đơn hàng",
    "order:export": "Xuất dữ liệu đơn hàng",
    "customer:view": "Xem khách hàng",
    "customer:create": "Tạo khách hàng",
    "customer:edit": "Sửa thông tin khách hàng",
    "customer:delete": "Xóa khách hàng",
    "customer:export": "Xuất dữ liệu khách hàng",
    "staff:view": "Xem nhân sự",
    "staff:create": "Thêm nhân sự",
    "staff:edit": "Sửa thông tin nhân sự",
    "staff:delete": "Xóa nhân sự",
    "staff:manage-roles": "Quản lý vai trò nhân sự",
    "finance:view-reports": "Xem báo cáo tài chính",
    "finance:export-reports": "Xuất báo cáo tài chính",
    "finance:manage-budget": "Quản lý ngân sách",
    "finance:approve-transactions": "Duyệt giao dịch",
    "invoice:view": "Xem hóa đơn",
    "invoice:create": "Tạo hóa đơn",
    "invoice:edit": "Sửa hóa đơn",
    "invoice:delete": "Xóa hóa đơn",
    "invoice:send": "Gửi hóa đơn",
    "payment:view": "Xem thanh toán",
    "payment:create": "Tạo thanh toán",
    "payment:approve": "Duyệt thanh toán",
    "payment:refund": "Hoàn tiền",
    "settings:view": "Xem cài đặt",
    "settings:edit": "Sửa cài đặt",
    "settings:manage-users": "Quản lý người dùng",
};
