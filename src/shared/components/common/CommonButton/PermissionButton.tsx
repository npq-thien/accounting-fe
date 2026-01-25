import type { ReactNode } from "react";

import type { Permission } from "@/shared/constants/permissions";
import { usePermission } from "@/shared/hooks/usePermission";

import { CommonButton } from "./CommonButton";

import { Tooltip, type ButtonProps, type ElementProps } from "@mantine/core";

export interface PermissionButtonProps
    extends ButtonProps, ElementProps<"button", keyof ButtonProps> {
    /**
     * Required permission(s) to show the button
     * Can be a single permission or an array of permissions
     */
    permission?: Permission | Permission[];

    /**
     * Permission check mode when multiple permissions are provided
     * - 'all': User must have ALL permissions (default)
     * - 'any': User must have ANY of the permissions
     */
    permissionMode?: "all" | "any";

    /**
     * What to render when user doesn't have permission
     * - null: Render nothing (default)
     * - ReactNode: Custom fallback content
     */
    fallback?: ReactNode;

    /**
     * Whether to show disabled button instead of hiding it
     * Default: false (button is hidden)
     */
    showDisabled?: boolean;

    /**
     * Tooltip message to show when button is disabled due to lack of permission
     */
    disabledTooltip?: string;
}

/**
 * PermissionButton - A button component with built-in permission checking
 *
 * This component wraps CommonButton and automatically handles permission checks.
 * If the user doesn't have the required permission(s), the button can be:
 * - Hidden (default behavior)
 * - Disabled (when showDisabled=true)
 * - Replaced with custom fallback content
 *
 * @example
 * ```tsx
 * // Simple usage - hide button if no permission
 * <PermissionButton permission="order:delete">
 *   Delete Order
 * </PermissionButton>
 *
 * // Show disabled button if no permission
 * <PermissionButton
 *   permission="order:approve"
 *   showDisabled
 *   disabledTooltip="You don't have permission to approve orders"
 * >
 *   Approve Order
 * </PermissionButton>
 *
 * // Require any of multiple permissions
 * <PermissionButton
 *   permission={["order:edit", "order:delete"]}
 *   permissionMode="any"
 * >
 *   Manage Order
 * </PermissionButton>
 *
 * // Require all permissions
 * <PermissionButton
 *   permission={["finance:view-reports", "finance:export-reports"]}
 *   permissionMode="all"
 * >
 *   Export Financial Report
 * </PermissionButton>
 *
 * // Custom fallback content
 * <PermissionButton
 *   permission="staff:delete"
 *   fallback={<Text c="dimmed">Access Restricted</Text>}
 * >
 *   Delete Staff
 * </PermissionButton>
 * ```
 */
export function PermissionButton({
    permission,
    permissionMode = "all",
    fallback = null,
    showDisabled = false,
    disabledTooltip,
    children,
    disabled,
    ...rest
}: PermissionButtonProps) {
    const { hasPermission, hasAllPermissions, hasAnyPermission } = usePermission();

    // If no permission specified, render the button normally
    if (!permission) {
        return (
            <CommonButton disabled={disabled} {...rest}>
                {children}
            </CommonButton>
        );
    }

    let hasRequiredPermission = false;

    if (Array.isArray(permission)) {
        if (permissionMode === "any") {
            hasRequiredPermission = hasAnyPermission(permission);
        } else {
            hasRequiredPermission = hasAllPermissions(permission);
        }
    } else {
        hasRequiredPermission = hasPermission(permission);
    }

    // If user doesn't have permission, display disabled button or fallback content
    if (!hasRequiredPermission) {
        if (showDisabled) {
            return (
                <Tooltip
                    label={disabledTooltip || "You don't have permission to perform this action"}
                    position="bottom">
                    <CommonButton
                        disabled
                        {...rest}>
                        {children}
                    </CommonButton>
                </Tooltip>
            );
        }

        return <>{fallback}</>;
    }

    return (
        <CommonButton disabled={disabled} {...rest}>
            {children}
        </CommonButton>
    );
}
