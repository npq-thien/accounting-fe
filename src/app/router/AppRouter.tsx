import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import type { UserRole } from "@/shared/constants";

import { Login } from "@/pages/auth/components/Login";
import { HomePage } from "@/pages/HomePage";
import { AdvancedFormSample } from "@/pages/templateForDev/components/AdvancedFormSample";
import { DataTableSample } from "@/pages/templateForDev/components/DataTableSample";
import { FormSample } from "@/pages/templateForDev/components/FormSample";
import { PermissionButtonSample } from "@/pages/templateForDev/components/PermissionButtonSample";
import { ProductsDataTable } from "@/pages/templateForDev/components/ProductsDataTable";
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

function PageTitleManager() {
    const location = useLocation();

    useEffect(() => {
        const title = PAGE_TITLES[location.pathname] ?? "Accounting App";
        document.title = title;
    }, [location.pathname]);

    return null;
}

// Component to handle authentication and authorization checks
function ProtectedRouteLayout() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // auth redirect
    useEffect(() => {
        if (!user) {
            navigate("/login", {
                state: { from: location.pathname },
                replace: true,
            });
        }
    }, [user, location.pathname, navigate]);

    // permission redirect
    useEffect(() => {
        if (user && !hasPermissionForPath(user.role, location.pathname)) {
            navigate("/unauthorized", { replace: true });
        }
    }, [user, location.pathname, navigate]);

    if (!user) return null;

    // block render if unauthorized (redirect already scheduled)
    if (!hasPermissionForPath(user.role, location.pathname)) {
        return null;
    }

    return <MainLayout />;
}

const PAGE_TITLES: Record<string, string> = {
    "/": "Home",
    "/login": "Login",
    "/template/form": "Form Sample",
    "/template/advanced-form": "Advanced Form",
    "/template/data-table": "Data Table",
    "/template/products-table": "Products",
    "/template/permission-button": "Permission Button",
};

export function AppRouter() {
    return (
        <>
            <PageTitleManager />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRouteLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="template/form" element={<FormSample />} />
                    <Route path="template/advanced-form" element={<AdvancedFormSample />} />
                    <Route path="template/data-table" element={<DataTableSample />} />
                    <Route path="template/products-table" element={<ProductsDataTable />} />
                    <Route path="template/permission-button" element={<PermissionButtonSample />} />
                    {/* Add more routes here as needed for order management pages */}
                    {/* <Route path="order-management/order-buy" element={<OrderBuyComponent />} /> */}
                    {/* <Route path="order-management/order-sell" element={<OrderSellComponent />} /> */}
                </Route>
                {/* <Route path="*" element={<ErrorBoundary />} /> */}
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route
                    path="*"
                    element={
                        <ErrorBoundary status={404} message="Trang bạn tìm kiếm không tồn tại" />
                    }
                />
            </Routes>
        </>
    );
}
