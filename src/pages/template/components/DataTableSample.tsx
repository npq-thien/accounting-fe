import { notify } from "@/app/toast/toast";
import {
    CommonDataTable,
    type CommonDataTableColumn,
} from "@/shared/components/common/CommonDataTable/CommonDataTable";
import { Anchor, Badge, Box, Title } from "@mantine/core";
import { useMemo } from "react";
import { users } from "./fakeData";

type User = (typeof users)[0];

export const DataTableSample = () => {
    // Get unique values for multiselect filters
    const departments = useMemo(() => {
        const depts = new Set(users.map((u) => u.department));
        return Array.from(depts);
    }, []);

    // const roles = useMemo(() => {
    //     const roleSet = new Set(users.map((u) => u.role));
    //     return Array.from(roleSet);
    // }, []);

    const statuses = useMemo(() => {
        const statusSet = new Set(users.map((u) => u.status));
        return Array.from(statusSet);
    }, []);

    const columns: CommonDataTableColumn<User>[] = [
        {
            accessor: "id",
            title: "#",
            textAlign: "right",
            width: 60,
            sortable: true,
        },
        {
            accessor: "fullName",
            title: "Full name",
            sortable: true,
            filterConfig: {
                filterType: "text",
                textPlaceholder: "Tìm kiếm tên...",
                textLabel: "Tên",
            },
            render: ({ id, fullName }: User) => (
                <Anchor onClick={() => notify.info("Navigate to user", `Navigate to user ${id}`)}>
                    {fullName}
                </Anchor>
            ),
        },
        {
            accessor: "email",
            title: "Email",
            width: 260,
            sortable: true,
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
            // filterConfig: {
            //     filterType: "multiselect",
            //     multiselectData: roles,
            //     multiselectPlaceholder: "Chọn vai trò...",
            //     multiselectLabel: "Vai trò",
            // },
        },
        {
            accessor: "department",
            title: "Department",
            width: 180,
            sortable: true,
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
            filterConfig: {
                filterType: "date",
                dateLabel: "Ngày sinh",
                dateMaxDate: new Date(),
            },
        },
        {
            accessor: "status",
            title: "Status",
            width: 120,
            sortable: true,
            filterConfig: {
                filterType: "multiselect",
                multiselectData: statuses,
                multiselectPlaceholder: "Chọn trạng thái...",
                multiselectLabel: "Trạng thái",
            },
            render: ({ status }: User) => {
                const color =
                    status === "Inactive" ? "red" : status === "Probation" ? "yellow" : "green";
                return <Badge color={color}>{status}</Badge>;
            },
        },
    ];

    return (
        <Box p="md" w="100%">
            <Title order={2} mb="lg">
                Data table sample
            </Title>
            <CommonDataTable<User>
                records={users}
                columns={columns}
                rowBackgroundColor={({ status }: User) =>
                    status === "Inactive"
                        ? { light: "#fff5f5", dark: "#3b1d1d" }
                        : status === "Probation"
                          ? { light: "#fffbeb", dark: "#3b2f1d" }
                          : undefined
                }
                onRowClick={({ record }: { record: User }) => {
                    notify.success("User selected", record.fullName);
                }}
            />
        </Box>
    );
};
