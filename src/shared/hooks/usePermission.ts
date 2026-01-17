import { useMemo } from "react";

import type { Permission } from "@/shared/constants/permissions";
import { hasAllPermissions, hasAnyPermission, hasPermission, getUserPermissions } from "@/shared/utils/permissions";

import { useAuth } from "./useAuth";

/**
 * Hook to check user permissions
 * Provides convenient methods to check if the current user has specific permissions
 *
 * @example
 * ```tsx
 * const { hasPermission, canDelete, canEdit } = usePermission();
 *
 * if (hasPermission('order:delete')) {
 *   // Show delete button
 * }
 *
 * // Or use convenience methods
 * const canDelete = hasPermission('order:delete');
 * const canEdit = hasPermission('order:edit');
 * ```
 */
export function usePermission() {
    const { user } = useAuth();

    const userPermissions = useMemo(() => getUserPermissions(user), [user]);

    /**
     * Check if user has a specific permission
     */
    const checkPermission = (permission: Permission): boolean => {
        return hasPermission(user, permission);
    };

    /**
     * Check if user has all of the specified permissions
     */
    const checkAllPermissions = (permissions: Permission[]): boolean => {
        return hasAllPermissions(user, permissions);
    };

    /**
     * Check if user has any of the specified permissions
     */
    const checkAnyPermission = (permissions: Permission[]): boolean => {
        return hasAnyPermission(user, permissions);
    };

    return {
        /**
         * Check if user has a specific permission
         */
        hasPermission: checkPermission,

        /**
         * Check if user has all of the specified permissions
         */
        hasAllPermissions: checkAllPermissions,

        /**
         * Check if user has any of the specified permissions
         */
        hasAnyPermission: checkAnyPermission,

        /**
         * Get all permissions the user has
         */
        permissions: userPermissions,

        /**
         * The current user
         */
        user,
    };
}

