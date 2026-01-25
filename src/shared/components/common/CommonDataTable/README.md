# CommonDataTable Component

A feature-rich data table component built on top of `mantine-datatable` with built-in pagination, sorting, and column-specific filtering.

## Features

- **Pagination**: Configurable page sizes (5, 10, 25, 50, 100)
- **Sorting**: Click column headers to sort (set `sortable: true` on columns)
- **Column Filtering**: Text, multiselect, and date range filters per column
- **Global Search**: Search across all columns
- **Theme Support**: Auto-adapts to light/dark mode
- **Server/Client Pagination**: Works with both local and API data

## Basic Usage

```typescript
import { CommonDataTable, type CommonDataTableColumn } from "@/shared/components/common";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const columns: CommonDataTableColumn<User>[] = [
  {
    accessor: "id",
    title: "#",
    width: 60,
    sortable: true,
  },
  {
    accessor: "name",
    title: "Name",
    sortable: true,
    filterType: "text",
    filterConfig: {
      filterType: "text",
      textPlaceholder: "Tìm kiếm tên...",
      textLabel: "Tên",
    },
  },
  {
    accessor: "role",
    title: "Role",
    sortable: true,
    filterType: "multiselect",
    filterConfig: {
      filterType: "multiselect",
      multiselectData: ["Admin", "User", "Manager"],
      multiselectPlaceholder: "Chọn vai trò...",
    },
  },
];

function MyComponent() {
  return <CommonDataTable records={users} columns={columns} />;
}
```

## Column Filter Types

| Filter Type | Description | Config Props |
|------------|-------------|--------------|
| `text` | Text input with search | `textPlaceholder`, `textLabel` |
| `multiselect` | Multi-select dropdown | `multiselectData`, `multiselectPlaceholder`, `multiselectLabel` |
| `date` | Date range picker | `dateLabel`, `dateMaxDate`, `dateMinDate` |

## Common Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `records` | `T[]` | **required** | Data to display |
| `columns` | `CommonDataTableColumn<T>[]` | **required** | Column definitions |
| `page` | `number` | `1` | Current page |
| `pageSize` | `number` | `10` | Rows per page |
| `totalRecords` | `number` | `records.length` | Total records (for server-side pagination) |
| `fetching` | `boolean` | `false` | Show loading overlay |
| `maxHeight` | `number \| string` | `600` | Max table height |
| `searchPlaceholder` | `string` | `"Tìm kiếm..."` | Search input placeholder |
| `onPageChange` | `(page: number) => void` | - | Page change handler |
| `onRowClick` | `(row) => void` | - | Row click handler |
| `rowBackgroundColor` | `(record: T) => { light: string; dark: string }` | - | Conditional row styling |

## Server-Side Pagination Example

```typescript
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const { data, isLoading } = useQuery({
  queryKey: ["users", page, pageSize],
  queryFn: () => fetchUsers(page, pageSize),
});

<CommonDataTable
  records={data?.items || []}
  columns={columns}
  page={page}
  pageSize={pageSize}
  totalRecords={data?.total || 0}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  fetching={isLoading}
/>
```

## Notes

- See example code for more advanced usage patterns
- Inherits all props from `mantine-datatable`'s `DataTableProps`
- TypeScript: Always specify record type `CommonDataTable<User>`
