# CommonDataTable Component

A comprehensive, feature-rich data table component built on top of mantine-datatable with **always-enabled pagination, sorting, and filtering**. Every table automatically includes these essential features - just pass your data and columns!

## ✨ Key Features

### 🚀 Always Enabled Features
- **✅ Pagination**: Always enabled with page size selector (5, 10, 25, 50, 100)
- **✅ Sorting**: Always enabled - click column headers to sort (if `sortable: true`)
- **✅ Column-specific filtering**: Define filter types for each column
- **Zero configuration**: Works out of the box with sensible defaults

### ✅ Built-in Features

#### Pagination
- **Configurable page sizes**: Choose from 5, 10, 25, 50, or 100 rows per page
- **Client-side pagination**: Automatically handles pagination of local data
- **Server-side pagination support**: Pass `totalRecords` for API-driven pagination
- **Controlled or uncontrolled**: Can manage pagination state internally or externally

#### Column-Specific Filtering (Always Enabled)
- **Filter per column**: Define `filterType` and `filterConfig` for each column
- **Multiple filter types**: Text, multiselect, and date range filters
- **Smart filtering**: Each column filters its own data type appropriately
- **Custom filter function**: Override with your own filtering logic per column

#### Sorting (Always Enabled)
- **Column-level sorting**: Set `sortable: true` on columns to enable sorting
- **Auto-detection**: Automatically enables sorting if any column is sortable
- **Multi-column support**: Full mantine-datatable sorting features

#### Styling
- **Theme-aware header**: Automatically adapts to light and dark modes
  - Light mode: Clean, light gray background
  - Dark mode: Subtle dark gray with proper contrast
- **Smooth transitions**: Theme changes animate smoothly
- **Custom scrollbars**: Styled scrollbars for better aesthetics

#### Loading States
- **Loader integration**: Built-in `fetching` prop shows loading overlay
- **Smooth transitions**: Loading states animate gracefully

#### UX Improvements
- **Max height control**: Prevents page scrolling with configurable max height (default: 600px)
- **Dynamic height**: Adjusts based on page size
- **Hover highlighting**: Clear visual feedback
- **Row background colors**: Conditional row styling support
- **Custom empty state**: Configurable "no records" message
- **Responsive pagination info**: Shows "X - Y / Z" format

## Usage

### 🎯 Simplest Example (Recommended)

**Just pass your data and columns - that's it!**

```typescript
import { CommonDataTable, type CommonDataTableColumn } from "@/shared/components/common";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

// Prepare data for multiselect filters
const roles = ["Accountant", "Senior Accountant", "Accounting Manager"];

const columns: CommonDataTableColumn<User>[] = [
  {
    accessor: "id",
    title: "#",
    width: 60,
    sortable: true, // Enable sorting
  },
  {
    accessor: "name",
    title: "Name",
    sortable: true, // Enable sorting
    filterType: "text",
    filterConfig: {
      filterType: "text",
      textPlaceholder: "Tìm kiếm tên...",
      textLabel: "Tên",
    },
  },
  {
    accessor: "email",
    title: "Email",
    sortable: true,
    filterType: "text",
    filterConfig: {
      filterType: "text",
      textPlaceholder: "Tìm kiếm email...",
      textLabel: "Email",
    },
  },
  {
    accessor: "role",
    title: "Role",
    sortable: true,
    filterType: "multiselect",
    filterConfig: {
      filterType: "multiselect",
      multiselectData: roles,
      multiselectPlaceholder: "Chọn vai trò...",
    },
  },
];

function MyComponent() {
  return (
    <CommonDataTable
      records={users}
      columns={columns}
    />
  );
}
```

**What you get automatically (always enabled):**
- ✅ **Pagination** with page size selector (always visible)
- ✅ **Search input** that filters across all columns (always visible)
- ✅ **Column sorting** - click headers to sort (always enabled)
- ✅ All state managed internally
- ✅ No boilerplate code needed!

### Column-Specific Filtering Example

**Define filter types for each column:**

```typescript
import { CommonDataTable, type CommonDataTableColumn } from "@/shared/components/common";
import { Badge } from "@mantine/core";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  dob: string;
  status: string;
};

function ColumnFilterExample() {
  // Prepare data for multiselect filters
  const roles = ["Accountant", "Senior Accountant", "Accounting Manager"];
  const departments = ["Finance", "HR", "IT"];
  const statuses = ["Active", "Inactive", "Probation"];

  const columns: CommonDataTableColumn<User>[] = [
    {
      accessor: "id",
      title: "#",
      sortable: true,
      width: 60,
    },
    {
      accessor: "name",
      title: "Name",
      sortable: true,
      // Text filter with custom placeholder
      filterType: "text",
      filterConfig: {
        filterType: "text",
        textPlaceholder: "Tìm kiếm tên...",
        textLabel: "Tên",
      },
    },
    {
      accessor: "email",
      title: "Email",
      sortable: true,
      width: 260,
      // Text filter
      filterType: "text",
      filterConfig: {
        filterType: "text",
        textPlaceholder: "Tìm kiếm email...",
        textLabel: "Email",
      },
    },
    {
      accessor: "role",
      title: "Role",
      width: 200,
      sortable: true,
      // Multiselect filter
      filterType: "multiselect",
      filterConfig: {
        filterType: "multiselect",
        multiselectData: roles,
        multiselectPlaceholder: "Chọn vai trò...",
        multiselectLabel: "Vai trò",
      },
    },
    {
      accessor: "department",
      title: "Department",
      width: 180,
      sortable: true,
      // Multiselect filter
      filterType: "multiselect",
      filterConfig: {
        filterType: "multiselect",
        multiselectData: departments,
        multiselectPlaceholder: "Chọn phòng ban...",
        multiselectLabel: "Phòng ban",
      },
    },
    {
      accessor: "dob",
      title: "Date of birth",
      width: 150,
      sortable: true,
      // Date range filter
      filterType: "date",
      filterConfig: {
        filterType: "date",
        dateLabel: "Ngày sinh",
        dateMaxDate: new Date(), // Prevent future dates
      },
    },
    {
      accessor: "status",
      title: "Status",
      width: 120,
      sortable: true,
      // Multiselect filter
      filterType: "multiselect",
      filterConfig: {
        filterType: "multiselect",
        multiselectData: statuses,
        multiselectPlaceholder: "Chọn trạng thái...",
        multiselectLabel: "Trạng thái",
      },
      render: ({ status }: User) => {
        const color = status === "Active" ? "green" : status === "Probation" ? "yellow" : "red";
        return <Badge color={color}>{status}</Badge>;
      },
    },
  ];

  return (
    <CommonDataTable<User>
      records={users}
      columns={columns}
      maxHeight={600}
      rowBackgroundColor={({ status }: User) =>
        status === "Inactive"
          ? { light: "#fff5f5", dark: "#3b1d1d" }
          : status === "Probation"
          ? { light: "#fffbeb", dark: "#3b2f1d" }
          : undefined
      }
      onRowClick={({ record }: { record: User }) => {
        console.log("Clicked:", record);
      }}
    />
  );
}
```

**Available Filter Types:**
- **`text`**: Text input with search icon and clear button
- **`multiselect`**: Multi-select dropdown with search
- **`date`**: Date range picker with Vietnamese presets

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `records` | `T[]` | **required** | Array of data records to display |
| `columns` | `CommonDataTableColumn<T>[]` | **required** | Column definitions |

### Pagination Props (Always Enabled)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | `1` | Current page (controlled, optional) |
| `onPageChange` | `(page: number) => void` | - | Page change handler (optional) |
| `pageSize` | `number` | `10` | Rows per page (optional) |
| `onPageSizeChange` | `(size: number) => void` | - | Page size change handler (optional) |
| `totalRecords` | `number` | `records.length` | Total record count (for server-side pagination) |

**Note:** Pagination is always enabled. Page size selector is always visible.

### Filtering Props (Always Enabled)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchValue` | `string` | - | Search value (controlled, optional) |
| `onSearchChange` | `(value: string) => void` | - | Search change handler (optional) |
| `searchPlaceholder` | `string` | `"Tìm kiếm..."` | Search input placeholder |
| `searchDebounceMs` | `number` | `300` | Debounce delay in milliseconds |
| `filterFunction` | `(record: T, searchValue: string) => boolean` | - | Custom filter function (optional) |

**Note:** Search input is always visible. Filtering is always enabled.

### Sorting Props (Always Enabled)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortStatus` | `DataTableSortStatus<T>` | - | Sort status (controlled, optional) |
| `onSortStatusChange` | `(sortStatus: DataTableSortStatus<T>) => void` | - | Sort change handler (optional) |

**Note:** Sorting is always enabled for columns with `sortable: true`.

### UI Customization Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxHeight` | `number \| string` | `600` | Maximum table height (prevents page scroll) |
| `fetching` | `boolean` | `false` | Show loading overlay |
| `noRecordsText` | `string` | `"Không tìm thấy dữ liệu"` | Empty state message |

### DataTable Props

All other props from `mantine-datatable`'s `DataTableProps` are supported, including:
- `rowBackgroundColor` - Conditional row styling
- `onRowClick` - Row click handler
- `highlightOnHover` - Row hover effect (default: `true`)
- `withTableBorder` - Table border (default: `true`)
- `withColumnBorders` - Column borders (default: `true`)

## Styling

### Header Styles
- **Light mode**: `rgba(248, 249, 250, 1)` background
- **Dark mode**: `rgba(52, 58, 64, 0.9)` background
- **Font**: Uppercase, 14px, 600 weight, 0.3px letter spacing

### Scrollbar Styles
- Custom thin scrollbars (8px width/height)
- Semi-transparent with hover effects
- Adapts to theme (light/dark)

## Important Notes

### Always Enabled Features
- ✅ **Pagination**: Always enabled with page size selector
- ✅ **Filtering**: Search input always visible, filtering always active
- ✅ **Sorting**: Always enabled for sortable columns

These features cannot be disabled - they are core functionality of CommonDataTable.

## Tips

1. **Client-side vs Server-side Pagination**:
   - For client-side: Don't pass `totalRecords`, component handles everything
   - For server-side: Pass `totalRecords` and handle `onPageChange` to fetch data

2. **Custom Filtering**: Use `filterFunction` prop for advanced filtering logic

3. **TypeScript**: Always specify your record type: `CommonDataTable<User>`

4. **Max Height**: Adjust `maxHeight` based on your layout to prevent page scrolling

5. **Loading States**: Set `fetching={true}` during async operations for better UX

6. **Sorting**: Set `sortable: true` on columns to enable sorting for that column

## Related Components

- See `DataTableSample.tsx` for a complete working example
- Uses `mantine-datatable` under the hood for advanced features

