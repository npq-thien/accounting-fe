import { notify } from "@/app/toast/toast";
import { Anchor, Badge, Box, Title } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { users } from "./fakeData";

const PAGE_SIZE = 5;

export const DataTableSample = () => {
    const [page, setPage] = useState(1);

    const records = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <Box p="md" w="100%">
            <Title order={2} mb="lg">
                Data table sample
            </Title>

            <DataTable
                withTableBorder
                borderRadius="sm"
                // striped
                highlightOnHover
                records={records}
                columns={[
                    {
                        accessor: "id",
                        title: "#",
                        textAlign: "right",
                        width: 60,
                    },
                    {
                        accessor: "fullName",
                        title: "Full name",
                        width: 220,
                        render: ({ id, fullName }) => (
                            <Anchor
                                // href={`/users/${id}`}
                                onClick={() =>
                                    notify.info("navigate to user", `navigate to user ${id}`)
                                }>
                                {fullName}
                            </Anchor>
                        ),
                    },
                    {
                        accessor: "email",
                        title: "Email",
                        width: 260,
                    },
                    {
                        accessor: "role",
                        title: "Role",
                    },
                    {
                        accessor: "dob",
                        title: "Date of birth",
                    },
                    {
                        accessor: "status",
                        title: "Status",
                        render: ({ status }) => (
                            status === "Inactive" ? <Badge color="red">Inactive</Badge> : <Badge color="green">Active</Badge>
                        ),
                    },
                ]}
                rowBackgroundColor={({ status }) =>
                    status === "Inactive" ? { light: "#fff5f5", dark: "#3b1d1d" } : undefined
                }
                onRowClick={({ record, index, event }) => {
                    console.log(index, event);
                    if (index !== 0) {
                        notify.success("User selected", record.fullName);
                    }
                }}
                totalRecords={users.length}
                recordsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={setPage}
            />
        </Box>
    );
};
