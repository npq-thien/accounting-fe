# Permission System Migration Guide

This guide helps you migrate existing buttons to use the new centralized permission system.

## 📋 What Changed?

We've implemented a centralized permission system for your accounting application that includes:

1. **Permission Constants** - All permissions defined in one place
2. **PermissionButton Component** - Smart button with built-in permission checks
3. **usePermission Hook** - For programmatic permission checking
4. **Role-Based Access** - Permissions mapped to user roles

## 🚀 Quick Migration Steps

### Before (Old Code)

```tsx
function OrderActions() {
  const { user } = useAuth();
  
  // Manual permission checks scattered everywhere
  const canDelete = user?.role === 'admin';
  const canApprove = user?.role === 'admin';
  
  return (
    <Group>
      {canDelete && (
        <Button color="red" onClick={handleDelete}>
          Delete Order
        </Button>
      )}
      
      {canApprove && (
        <Button color="green" onClick={handleApprove}>
          Approve Order
        </Button>
      )}
      
      <Button onClick={handleEdit}>Edit Order</Button>
    </Group>
  );
}
```

### After (New Code with PermissionButton)

```tsx
import { PermissionButton } from '@/shared/components/common';

function OrderActions() {
  return (
    <Group>
      <PermissionButton 
        permission="order:delete" 
        color="red" 
        onClick={handleDelete}
      >
        Delete Order
      </PermissionButton>
      
      <PermissionButton 
        permission="order:approve" 
        color="green"
        showDisabled
        onClick={handleApprove}
      >
        Approve Order
      </PermissionButton>
      
      <PermissionButton 
        permission="order:edit" 
        onClick={handleEdit}
      >
        Edit Order
      </PermissionButton>
    </Group>
  );
}
```

## 🔄 Migration Patterns

### Pattern 1: Simple Role Check

**Before:**
```tsx
{user?.role === 'admin' && (
  <Button onClick={handleAction}>Admin Action</Button>
)}
```

**After:**
```tsx
<PermissionButton permission="feature:action" onClick={handleAction}>
  Admin Action
</PermissionButton>
```

### Pattern 2: Multiple Role Checks

**Before:**
```tsx
{(user?.role === 'admin' || user?.role === 'manager') && (
  <Button>Action</Button>
)}
```

**After:**
```tsx
// Define permissions for both roles in permissions.ts
<PermissionButton permission="feature:action">
  Action
</PermissionButton>
```

### Pattern 3: Disabled Based on Permission

**Before:**
```tsx
<Button 
  disabled={user?.role !== 'admin'}
  onClick={handleAction}
>
  Admin Action
</Button>
```

**After:**
```tsx
<PermissionButton 
  permission="feature:action"
  showDisabled
  disabledTooltip="Only admins can perform this action"
  onClick={handleAction}
>
  Admin Action
</PermissionButton>
```

### Pattern 4: Programmatic Permission Checks

**Before:**
```tsx
function Component() {
  const { user } = useAuth();
  
  const canDelete = user?.role === 'admin';
  const canEdit = user?.role === 'admin' || user?.role === 'manager';
  
  if (!canEdit) {
    return <AccessDenied />;
  }
  
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

**After:**
```tsx
import { usePermission } from '@/shared/hooks';

function Component() {
  const { hasPermission } = usePermission();
  
  const canDelete = hasPermission('feature:delete');
  const canEdit = hasPermission('feature:edit');
  
  if (!canEdit) {
    return <AccessDenied />;
  }
  
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

## 📝 Step-by-Step Migration Checklist

### Step 1: Identify Permission-Controlled Actions

Look for patterns like:
- `user?.role === 'admin'`
- `user?.role === 'user'`
- Conditional button rendering
- Disabled buttons based on role

### Step 2: Map to Existing Permissions

Check `src/shared/constants/permissions.ts` for available permissions:
- Order: `order:view`, `order:create`, `order:edit`, `order:delete`, `order:approve`
- Customer: `customer:view`, `customer:create`, `customer:edit`, `customer:delete`
- Staff: `staff:view`, `staff:create`, `staff:edit`, `staff:delete`
- Finance: `finance:view-reports`, `finance:export-reports`, etc.
- Invoice: `invoice:view`, `invoice:create`, `invoice:edit`, etc.
- Payment: `payment:view`, `payment:create`, `payment:approve`, etc.

### Step 3: Add New Permissions if Needed

If your feature isn't covered, add to `permissions.ts`:

```typescript
// 1. Add to Permission type
export type Permission =
  | "existing:permissions"
  | "newfeature:view"      // Add this
  | "newfeature:edit"      // Add this
  | "newfeature:delete";   // Add this

// 2. Add to role permissions
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    // ... existing
    "newfeature:view",
    "newfeature:edit",
    "newfeature:delete",
  ],
  user: [
    // ... existing
    "newfeature:view",
  ],
};

// 3. Add descriptions
export const PERMISSION_DESCRIPTIONS: Record<Permission, string> = {
  // ... existing
  "newfeature:view": "Xem tính năng mới",
  "newfeature:edit": "Sửa tính năng mới",
  "newfeature:delete": "Xóa tính năng mới",
};
```

### Step 4: Replace Buttons

Replace `Button` with `PermissionButton`:

```tsx
// Import
import { PermissionButton } from '@/shared/components/common';

// Replace
<Button onClick={handler}>Action</Button>
// With
<PermissionButton permission="feature:action" onClick={handler}>
  Action
</PermissionButton>
```

### Step 5: Choose Display Mode

Decide how to handle denied permissions:

```tsx
// Hide completely (default)
<PermissionButton permission="action">Action</PermissionButton>

// Show disabled with tooltip (better UX for discovery)
<PermissionButton permission="action" showDisabled>
  Action
</PermissionButton>

// Custom fallback
<PermissionButton 
  permission="action"
  fallback={<Text c="dimmed">Restricted</Text>}
>
  Action
</PermissionButton>
```

### Step 6: Test Both Roles

1. Login as **admin** (username: `admin`, password: `admin`)
   - Verify all buttons appear/are enabled
   
2. Login as **user** (username: `user`, password: `user`)
   - Verify appropriate restrictions

## 🎯 Common Use Cases

### Use Case 1: DataTable Row Actions

```tsx
function OrderTable() {
  const columns = [
    // ... other columns
    {
      accessor: 'actions',
      render: (order) => (
        <Group gap="xs">
          <PermissionButton 
            permission="order:edit" 
            size="xs"
            onClick={() => editOrder(order.id)}
          >
            Edit
          </PermissionButton>
          
          <PermissionButton 
            permission="order:delete" 
            size="xs"
            color="red"
            onClick={() => deleteOrder(order.id)}
          >
            Delete
          </PermissionButton>
        </Group>
      ),
    },
  ];
  
  return <CommonDataTable columns={columns} records={orders} />;
}
```

### Use Case 2: Form Actions

```tsx
function InvoiceForm() {
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      
      <Group>
        <PermissionButton permission="invoice:create" type="submit">
          Save Invoice
        </PermissionButton>
        
        <PermissionButton 
          permission="invoice:send" 
          showDisabled
          onClick={sendInvoice}
        >
          Send to Customer
        </PermissionButton>
        
        <PermissionButton 
          permission="invoice:delete" 
          color="red"
          onClick={deleteInvoice}
        >
          Delete Draft
        </PermissionButton>
      </Group>
    </form>
  );
}
```

### Use Case 3: Page-Level Permission

```tsx
function FinancialReportsPage() {
  const { hasPermission } = usePermission();
  
  // Check permission before rendering entire page
  if (!hasPermission('finance:view-reports')) {
    return <Unauthorized />;
  }
  
  return (
    <Box>
      <Title>Financial Reports</Title>
      
      {/* Page content */}
      
      <PermissionButton 
        permission="finance:export-reports"
        onClick={exportReport}
      >
        Export Report
      </PermissionButton>
    </Box>
  );
}
```

### Use Case 4: Bulk Actions

```tsx
function BulkActionsToolbar({ selectedItems }) {
  return (
    <Group>
      <Text>Selected: {selectedItems.length}</Text>
      
      <PermissionButton 
        permission={["order:edit", "order:delete"]}
        permissionMode="any"
        onClick={handleBulkEdit}
      >
        Bulk Edit
      </PermissionButton>
      
      <PermissionButton 
        permission="order:approve"
        onClick={handleBulkApprove}
        showDisabled
      >
        Approve All
      </PermissionButton>
      
      <PermissionButton 
        permission="order:delete"
        color="red"
        onClick={handleBulkDelete}
      >
        Delete Selected
      </PermissionButton>
    </Group>
  );
}
```

## ✅ Migration Verification

After migration, verify:

- [ ] All buttons respect permissions
- [ ] Admin sees all buttons
- [ ] User sees restricted buttons
- [ ] Tooltips are helpful and specific
- [ ] No manual role checks remain (`user?.role === 'admin'`)
- [ ] All permissions are defined in `permissions.ts`
- [ ] Backend still validates permissions (FE is UX only!)

## 📚 Resources

- **Component Demo**: Navigate to `/template/permission-button` in your app
- **API Documentation**: See `src/shared/components/common/CommonButton/README.md`
- **Permission List**: See `src/shared/constants/permissions.ts`
- **Examples**: See `src/pages/template/components/PermissionButtonSample.tsx`

## 🆘 Common Issues

### Issue 1: Button Not Showing

**Problem**: Button doesn't appear even for admin
**Solution**: Check permission spelling in `permissions.ts` and ensure it's added to role permissions

### Issue 2: Wrong Permission Check

**Problem**: User role should see button but doesn't
**Solution**: Add permission to user role in `ROLE_PERMISSIONS.user` array

### Issue 3: TypeScript Error

**Problem**: TypeScript doesn't recognize permission string
**Solution**: Permission must be added to `Permission` type union in `permissions.ts`

## 💡 Best Practices

1. **Always define permissions in constants** - Never hardcode permission strings
2. **Use descriptive permission names** - `order:approve` not `approveOrder`
3. **Show disabled for discovery** - Let users know features exist
4. **Add helpful tooltips** - Explain why action is restricted
5. **Backend is the guard** - Frontend permissions are UX only
6. **Test both roles** - Always verify as admin and user

## 🎉 Benefits After Migration

- ✅ **Centralized** - All permissions in one place
- ✅ **Maintainable** - Easy to change permissions
- ✅ **Type-Safe** - TypeScript catches permission errors
- ✅ **Consistent** - Same pattern across the app
- ✅ **Better UX** - Clear feedback about restrictions
- ✅ **Developer-Friendly** - Easy for new devs to understand
- ✅ **Scalable** - Easy to add new permissions

Happy migrating! 🚀

