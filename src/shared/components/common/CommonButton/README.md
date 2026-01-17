# PermissionButton Component

A centralized permission system for button access control in your accounting application.

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [Permission Configuration](#permission-configuration)
- [Best Practices](#best-practices)

## ✨ Features

- **Centralized Permission Management** - All permissions defined in one place
- **Role-Based Access Control** - Permissions mapped to user roles (admin, user)
- **Flexible Display Options** - Hide buttons or show them disabled
- **Multiple Permission Modes** - Check for ANY or ALL permissions
- **Custom Fallback Content** - Display alternative content when permission denied
- **TypeScript Support** - Fully typed with IntelliSense support
- **UX Friendly** - Better user experience with tooltips and visual feedback

## 📦 Installation

The permission system is already integrated. No installation needed!

## 🚀 Quick Start

```tsx
import { PermissionButton } from '@/shared/components/common/CommonButton';

function OrderActions() {
  return (
    <PermissionButton permission="order:delete" color="red">
      Delete Order
    </PermissionButton>
  );
}
```

## 📖 Usage Examples

### 1. Basic Usage - Hidden by Default

Buttons are completely hidden if the user lacks permission.

```tsx
<PermissionButton permission="order:create" color="blue">
  Create Order
</PermissionButton>

<PermissionButton permission="staff:delete" color="red">
  Delete Staff
</PermissionButton>
```

### 2. Show Disabled Instead of Hidden

Better UX by showing disabled buttons with tooltips.

```tsx
<PermissionButton 
  permission="order:approve" 
  showDisabled
  disabledTooltip="You need 'order:approve' permission to approve orders"
>
  Approve Order
</PermissionButton>
```

### 3. Multiple Permissions - ANY Mode

Button shows if user has **ANY** of the specified permissions.

```tsx
<PermissionButton 
  permission={["order:edit", "order:delete"]} 
  permissionMode="any"
  color="blue"
>
  Manage Orders
</PermissionButton>
```

### 4. Multiple Permissions - ALL Mode

Button shows only if user has **ALL** specified permissions.

```tsx
<PermissionButton 
  permission={["finance:view-reports", "finance:export-reports"]} 
  permissionMode="all"
  color="indigo"
>
  Export Financial Report
</PermissionButton>
```

### 5. Custom Fallback Content

Show custom content when permission is denied.

```tsx
<PermissionButton 
  permission="staff:manage-roles"
  fallback={
    <Text size="sm" c="red">
      ⚠️ Contact admin to manage roles
    </Text>
  }
>
  Manage User Roles
</PermissionButton>
```

### 6. Real-World Example - Order Management

```tsx
function OrderCard({ order }) {
  return (
    <Card>
      <Title>{order.title}</Title>
      <Group>
        <PermissionButton 
          permission="order:view" 
          size="sm" 
          variant="light"
        >
          View Details
        </PermissionButton>
        
        <PermissionButton 
          permission="order:edit" 
          size="sm" 
          variant="light" 
          color="blue"
        >
          Edit
        </PermissionButton>
        
        <PermissionButton 
          permission="order:delete" 
          size="sm" 
          variant="light" 
          color="red"
        >
          Delete
        </PermissionButton>
        
        <PermissionButton 
          permission="order:approve" 
          size="sm" 
          color="green"
          showDisabled
          disabledTooltip="Only admins can approve orders"
        >
          Approve
        </PermissionButton>
      </Group>
    </Card>
  );
}
```

### 7. Programmatic Permission Checking

Use the `usePermission` hook for conditional logic.

```tsx
import { usePermission } from '@/shared/hooks/usePermission';

function InvoiceManager() {
  const { hasPermission, hasAllPermissions } = usePermission();
  
  const canDelete = hasPermission('invoice:delete');
  const canManage = hasAllPermissions(['invoice:edit', 'invoice:delete']);
  
  return (
    <div>
      {canDelete && <DeleteButton />}
      {canManage && <FullManagementPanel />}
      
      <PermissionButton permission="invoice:create">
        Create Invoice
      </PermissionButton>
    </div>
  );
}
```

## 📚 API Reference

### PermissionButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `permission` | `Permission \| Permission[]` | - | Required permission(s) to show the button |
| `permissionMode` | `'all' \| 'any'` | `'all'` | Check mode for multiple permissions |
| `showDisabled` | `boolean` | `false` | Show disabled button instead of hiding |
| `disabledTooltip` | `string` | - | Tooltip text when button is disabled |
| `fallback` | `ReactNode` | `null` | Custom content when permission denied |
| ...rest | `ButtonProps` | - | All standard Mantine Button props |

### usePermission Hook

```tsx
const {
  hasPermission,        // (permission: Permission) => boolean
  hasAllPermissions,    // (permissions: Permission[]) => boolean
  hasAnyPermission,     // (permissions: Permission[]) => boolean
  permissions,          // Permission[] - all user permissions
  user,                 // AuthUser | null
} = usePermission();
```

## ⚙️ Permission Configuration

### Available Permissions

Permissions are organized by feature area:

#### Order Management
- `order:view` - View orders
- `order:create` - Create orders
- `order:edit` - Edit orders
- `order:delete` - Delete orders
- `order:approve` - Approve orders
- `order:export` - Export order data

#### Customer Management
- `customer:view` - View customers
- `customer:create` - Create customers
- `customer:edit` - Edit customer information
- `customer:delete` - Delete customers
- `customer:export` - Export customer data

#### Staff Management
- `staff:view` - View staff
- `staff:create` - Add staff
- `staff:edit` - Edit staff information
- `staff:delete` - Delete staff
- `staff:manage-roles` - Manage staff roles

#### Financial/Accounting
- `finance:view-reports` - View financial reports
- `finance:export-reports` - Export financial reports
- `finance:manage-budget` - Manage budget
- `finance:approve-transactions` - Approve transactions

#### Invoice Management
- `invoice:view` - View invoices
- `invoice:create` - Create invoices
- `invoice:edit` - Edit invoices
- `invoice:delete` - Delete invoices
- `invoice:send` - Send invoices

#### Payment Management
- `payment:view` - View payments
- `payment:create` - Create payments
- `payment:approve` - Approve payments
- `payment:refund` - Process refunds

#### Settings
- `settings:view` - View settings
- `settings:edit` - Edit settings
- `settings:manage-users` - Manage users

### Role Permissions

**Admin Role**
- Has access to ALL permissions

**User Role**
- Limited permissions (view, create, edit for most features)
- Cannot delete, approve, or manage sensitive operations

### Adding New Permissions

1. **Define Permission** in `src/shared/constants/permissions.ts`:

```typescript
export type Permission =
  | "existing:permissions"
  // Add your new permission
  | "feature:new-action";
```

2. **Add to Role Mapping**:

```typescript
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    // ... existing permissions
    "feature:new-action",
  ],
  user: [
    // ... existing permissions
    // optionally add for user role
  ],
};
```

3. **Add Description**:

```typescript
export const PERMISSION_DESCRIPTIONS: Record<Permission, string> = {
  // ... existing descriptions
  "feature:new-action": "Description in Vietnamese",
};
```

4. **Use in Component**:

```tsx
<PermissionButton permission="feature:new-action">
  New Action
</PermissionButton>
```

## 💡 Best Practices

### 1. Choose Appropriate Display Mode

```tsx
// ❌ Bad - Hiding critical navigation
<PermissionButton permission="order:view">
  View Orders
</PermissionButton>

// ✅ Good - Show disabled to indicate feature exists
<PermissionButton permission="order:view" showDisabled>
  View Orders
</PermissionButton>
```

### 2. Use Meaningful Tooltips

```tsx
// ❌ Bad - Generic message
<PermissionButton permission="payment:approve" showDisabled>
  Approve Payment
</PermissionButton>

// ✅ Good - Specific, helpful message
<PermissionButton 
  permission="payment:approve" 
  showDisabled
  disabledTooltip="Only finance managers can approve payments. Contact your administrator."
>
  Approve Payment
</PermissionButton>
```

### 3. Group Related Permissions

```tsx
// ✅ Good - Use ANY mode for related actions
<PermissionButton 
  permission={["order:edit", "order:delete"]} 
  permissionMode="any"
>
  Manage Order
</PermissionButton>
```

### 4. Combine with Programmatic Checks

```tsx
function OrderDetailsPage() {
  const { hasPermission } = usePermission();
  
  // Hide entire sections if no relevant permissions
  if (!hasPermission('order:view')) {
    return <Unauthorized />;
  }
  
  return (
    <div>
      {/* Show action buttons with permission checks */}
      <PermissionButton permission="order:edit">Edit</PermissionButton>
      <PermissionButton permission="order:delete">Delete</PermissionButton>
    </div>
  );
}
```

### 5. Don't Override Backend Security

```tsx
// ⚠️ Important: Frontend permissions are for UX only!
// Always validate permissions on the backend.

// ✅ Good practice
async function deleteOrder(orderId: string) {
  // Frontend check (for UX)
  if (!hasPermission('order:delete')) {
    notify.error('No permission');
    return;
  }
  
  // Backend validates again (security)
  await api.delete(`/orders/${orderId}`);
}
```

### 6. Consider User Experience

```tsx
// For destructive actions - show disabled
<PermissionButton 
  permission="staff:delete" 
  showDisabled 
  color="red"
>
  Delete Staff
</PermissionButton>

// For optional features - hide completely
<PermissionButton permission="report:advanced-analytics">
  Advanced Analytics
</PermissionButton>
```

## 🔍 Testing Permissions

Switch between user roles to test permissions:

1. **Login as Admin**
   - Username: `admin`
   - Password: `admin`
   - Should see all buttons

2. **Login as User**
   - Username: `user`
   - Password: `user`
   - Should see limited buttons

3. **Visit Demo Page**
   - Navigate to `/template/permission-button`
   - See live examples of all permission patterns

## 🤝 Contributing

When adding new features:

1. Define appropriate permissions in `permissions.ts`
2. Add to role mappings
3. Use `PermissionButton` or `usePermission` hook
4. Update this README with examples

## 📝 Notes

- **Frontend permissions are for UX only** - Always validate on the backend
- Permissions are checked against the current user's role
- User role is stored in local storage (development only)
- In production, implement proper JWT-based authentication

## 🔗 Related Files

- `src/shared/constants/permissions.ts` - Permission definitions
- `src/shared/utils/permissions.ts` - Permission utility functions
- `src/shared/hooks/usePermission.ts` - Permission hook
- `src/shared/components/common/CommonButton/PermissionButton.tsx` - Component
- `src/pages/template/components/PermissionButtonSample.tsx` - Live examples

