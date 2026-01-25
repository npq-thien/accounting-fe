import React from "react";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";

import type { UserRole } from "@/shared/constants";

import { Login } from "@/pages/auth/components/Login";
import { HomePage } from "@/pages/HomePage";
import { AdvancedFormSample } from "@/pages/templateForDev/components/AdvancedFormSample";
import { DataTableSample } from "@/pages/templateForDev/components/DataTableSample";
import { ProductsDataTable } from "@/pages/templateForDev/components/ProductsDataTable";
import { FormSample } from "@/pages/templateForDev/components/FormSample";
import { PermissionButtonSample } from "@/pages/templateForDev/components/PermissionButtonSample";
import { MENU_ITEMS, type MenuItem } from "@/shared/constants/menu";
import { useAuth } from "@/shared/hooks";
import { ErrorBoundary } from "@/shared/layout/ErrorBoundary";
import { MainLayout } from "@/shared/layout/MainLayout";
import { Unauthorized } from "@/shared/layout/Unauthorized";


const getRequiredRolesForPath = (path: string): UserRole[] => {
    const findRolesInMenu = (items: MenuItem[]): UserRole[] | null => {
        for (const item of items) {
            if (item.path === path) {
                return item.roles;
            }
            if (item.children) {
                const childRoles = findRolesInMenu(item.children);
                if (childRoles) {
                    return childRoles;
                }
            }
        }
        return null;
    };

    const roles = findRolesInMenu(MENU_ITEMS);
    return roles || [];
};

// Utility function to check if user has permission for a path
const hasPermissionForPath = (userRole: UserRole | undefined, path: string): boolean => {
    if (!userRole) return false;

    const requiredRoles = getRequiredRolesForPath(path);
    return requiredRoles.length === 0 || requiredRoles.includes(userRole);
};

// Component to handle authentication and authorization checks
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const location = useLocation();

    // Check if user is authenticated
    if (!user) {
        return <Login />;
    }

    // Check if user has permission for current path
    const hasPermission = hasPermissionForPath(user.role, location.pathname);
    if (!hasPermission) {
        return <Unauthorized />;
    }

    return <>{children}</>;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/template/form",
                element: <FormSample />,
            },
            {
                path: "/template/advanced-form",
                element: <AdvancedFormSample />,
            },
            {
                path: "/template/data-table",
                element: <DataTableSample />,
            },
            {
                path: "/template/products-table",
                element: <ProductsDataTable />,
            },
            {
                path: "/template/permission-button",
                element: <PermissionButtonSample />,
            },
            // Add more routes here as needed for order management pages
            // {
            //     path: "/order-management/order-buy",
            //     element: <OrderBuyComponent />,
            // },
            // {
            //     path: "/order-management/order-sell",
            //     element: <OrderSellComponent />,
            // },
        ],
        errorElement: <ErrorBoundary />,
    },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}
