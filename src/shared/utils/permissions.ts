import type { AuthUser } from "@/app/providers/auth/AuthContext";
import { ROLE_PERMISSIONS, type Permission } from "@/shared/constants/permissions";

/**
 * Check if a user has a specific permission
 * @param user - The authenticated user
 * @param permission - The permission to check
 * @returns true if user has the permission, false otherwise
 */
export function hasPermission(user: AuthUser | null, permission: Permission): boolean {
    if (!user) return false;

    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
}

/**
 * Check if a user has all of the specified permissions
 * @param user - The authenticated user
 * @param permissions - Array of permissions to check
 * @returns true if user has all permissions, false otherwise
 */
export function hasAllPermissions(user: AuthUser | null, permissions: Permission[]): boolean {
    if (!user || !permissions.length) return false;

    return permissions.every((permission) => hasPermission(user, permission));
}

/**
 * Check if a user has any of the specified permissions
 * @param user - The authenticated user
 * @param permissions - Array of permissions to check
 * @returns true if user has at least one permission, false otherwise
 */
export function hasAnyPermission(user: AuthUser | null, permissions: Permission[]): boolean {
    if (!user || !permissions.length) return false;

    return permissions.some((permission) => hasPermission(user, permission));
}

/**
 * Get all permissions for a user
 * @param user - The authenticated user
 * @returns Array of permissions the user has
 */
export function getUserPermissions(user: AuthUser | null): Permission[] {
    if (!user) return [];

    return ROLE_PERMISSIONS[user.role] || [];
}

/**
 * Check if a user can perform an action based on permission
 * Useful for more semantic checks
 * @param user - The authenticated user
 * @param action - The action/permission to check
 * @returns true if user can perform the action, false otherwise
 */
export function canPerformAction(user: AuthUser | null, action: Permission): boolean {
    return hasPermission(user, action);
}

