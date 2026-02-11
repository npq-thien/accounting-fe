import { Box, Card, Code, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";

import { CommonIcon } from "@/shared/components/common";
import { PermissionButton } from "@/shared/components/common/CommonButton";
import { ICON_MAP } from "@/shared/constants/icons";
import { useAuth, usePermission } from "@/shared/hooks";

/**
 * PermissionButtonSample - Demonstrates the usage of PermissionButton component
 *
 * This sample shows:
 * - Basic permission-based button visibility
 * - Disabled vs Hidden behavior
 * - Multiple permissions with 'all' or 'any' mode
 * - Custom fallback content
 * - Permission checking in code
 */
export function PermissionButtonSample() {
    const { user } = useAuth();
    const { hasPermission, permissions } = usePermission();

    return (
        <Box>
            <Stack gap="lg">
                {/* Header */}
                <Box>
                    <Title order={2} mb="xs">
                        PermissionButton Component Demo
                    </Title>
                    <Text c="dimmed" size="sm">
                        Centralized permission system for button access control
                    </Text>
                    <Paper
                        p="sm"
                        mt="sm"
                        bg="blue.0"
                        style={{ borderLeft: "3px solid var(--mantine-color-blue-6)" }}>
                        <Group gap="xs">
                            <CommonIcon icon={ICON_MAP.info} />
                            <Text size="sm">
                                <strong>Current User:</strong> {user?.username || "Guest"} (
                                {user?.role || "none"})
                            </Text>
                        </Group>
                    </Paper>
                </Box>

                {/* User Permissions Display */}
                <Card withBorder shadow="sm">
                    <Title order={4} mb="sm">
                        Your Current Permissions
                    </Title>
                    <Text size="sm" c="dimmed" mb="md">
                        These are the permissions assigned to your role: <Code>{user?.role}</Code>
                    </Text>
                    <Box
                        p="xs"
                        style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                            backgroundColor: "var(--mantine-color-gray-0)",
                            borderRadius: "4px",
                        }}>
                        <Stack gap="xs">
                            {permissions.length > 0 ? (
                                permissions.map((permission) => (
                                    <Group key={permission} gap="xs">
                                        <CommonIcon icon={ICON_MAP.check} color="green" />
                                        <Code>{permission}</Code>
                                    </Group>
                                ))
                            ) : (
                                <Text size="sm" c="dimmed">
                                    No permissions assigned
                                </Text>
                            )}
                        </Stack>
                    </Box>
                </Card>

                <Divider />

                {/* Section 1: Basic Usage - Hidden by Default */}
                <Card withBorder shadow="sm">
                    <Title order={4} mb="md">
                        1. Basic Usage - Hidden by Default
                    </Title>
                    <Text size="sm" c="dimmed" mb="md">
                        Buttons are completely hidden if the user lacks permission.
                    </Text>

                    <Stack gap="md">
                        <Group gap="md">
                            <PermissionButton permission="order:create" color="blue">
                                Create Order
                            </PermissionButton>
                            <Text size="sm" c="dimmed">
                                ✅ Users & Admins can see this
                            </Text>
                        </Group>

                        <Group gap="md">
                            <PermissionButton permission="order:delete" color="green">
                                Delete Order
                            </PermissionButton>
                            <Text size="sm" c="dimmed">
                                🔒 Only Admins can see this
                            </Text>
                        </Group>

                        <Group gap="md">
                            <PermissionButton permission="staff:create" color="secondary">
                                Add Staff
                            </PermissionButton>
                            <Text size="sm" c="dimmed">
                                🔒 Only Admins can see this
                            </Text>
                        </Group>

                        <Group gap="md">
                            <PermissionButton
                                permission="finance:approve-transactions"
                                color="orange">
                                Approve Transaction
                            </PermissionButton>
                            <Text size="sm" c="dimmed">
                                🔒 Only Admins can see this
                            </Text>
                        </Group>
                    </Stack>
                </Card>

                {/* Section 2: Show Disabled */}
                <Card withBorder shadow="sm">
                    <Title order={4} mb="md">
                        2. Show Disabled Instead of Hidden
                    </Title>
                    <Text size="sm" c="dimmed" mb="md">
                        Buttons are visible but disabled for better UX awareness.
                    </Text>

                    <Stack gap="md">
                        <Group gap="md">
                            <PermissionButton
                                permission="order:approve"
                                color="green"
                                showDisabled
                                disabledTooltip="You need 'order:approve' permission">
                                Approve Order
                            </PermissionButton>
                            <Text size="sm" c="dimmed">
                                Users see it disabled, Admins see it enabled
                            </Text>
                        </Group>

                        <Group gap="md">
                            <PermissionButton
                                permission="staff:delete"
                                color="red"
                                showDisabled
                                disabledTooltip="Only administrators can delete staff">
                                Delete Staff
                            </PermissionButton>
                            <Text size="sm" c="dimmed">
                                Shows why the action is unavailable
                            </Text>
                        </Group>

                        <Group gap="md">
                            <PermissionButton
                                permission="finance:manage-budget"
                                color="violet"
                                showDisabled
                                disabledTooltip="Budget management requires admin access">
                                Manage Budget
                            </PermissionButton>
                            <Text size="sm" c="dimmed">
                                Hover to see the tooltip
                            </Text>
                        </Group>
                    </Stack>
                </Card>

                {/* Section 3: Multiple Permissions - ANY */}
                <Card withBorder shadow="sm">
                    <Title order={4} mb="md">
                        3. Multiple Permissions - "ANY" Mode
                    </Title>
                    <Text size="sm" c="dimmed" mb="md">
                        Button shows if user has ANY of the specified permissions.
                    </Text>

                    <Stack gap="md">
                        <Group gap="md">
                            <PermissionButton
                                permission={["order:edit", "order:delete"]}
                                permissionMode="any"
                                color="blue">
                                Manage Orders
                            </PermissionButton>
                            <Text size="sm" c="dimmed">
                                Requires: order:edit OR order:delete
                            </Text>
                        </Group>

                        <Group gap="md">
                            <PermissionButton
                                permission={["invoice:edit", "invoice:delete"]}
                                permissionMode="any"
                                color="teal">
                                Manage Invoices
                            </PermissionButton>
                            <Text size="sm" c="dimmed">
                                Requires: invoice:edit OR invoice:delete
                            </Text>
                        </Group>
                    </Stack>
                </Card>

                {/* Section 4: Multiple Permissions - ALL */}
                <Card withBorder shadow="sm">
                    <Title order={4} mb="md">
                        4. Multiple Permissions - "ALL" Mode
                    </Title>
                    <Text size="sm" c="dimmed" mb="md">
                        Button shows only if user has ALL specified permissions.
                    </Text>

                    <Stack gap="md">
                        <Group gap="md">
                            <PermissionButton
                                permission={["finance:view-reports", "finance:export-reports"]}
                                permissionMode="all"
                                color="indigo">
                                Export Financial Report
                            </PermissionButton>
                            <Text size="sm" c="dimmed">
                                Requires: finance:view-reports AND finance:export-reports
                            </Text>
                        </Group>

                        <Group gap="md">
                            <PermissionButton
                                permission={["customer:edit", "customer:delete"]}
                                permissionMode="all"
                                color="pink">
                                Full Customer Management
                            </PermissionButton>
                            <Text size="sm" c="dimmed">
                                Requires: customer:edit AND customer:delete
                            </Text>
                        </Group>
                    </Stack>
                </Card>

                {/* Section 5: Custom Fallback */}
                <Card withBorder shadow="sm">
                    <Title order={4} mb="md">
                        5. Custom Fallback Content
                    </Title>
                    <Text size="sm" c="dimmed" mb="md">
                        Show custom content when permission is denied.
                    </Text>

                    <Stack gap="md">
                        <Group gap="md">
                            <PermissionButton
                                permission="staff:manage-roles"
                                color="orange"
                                fallback={
                                    <Text size="sm" c="red" fs="italic">
                                        ⚠️ Contact admin to manage roles
                                    </Text>
                                }>
                                Manage User Roles
                            </PermissionButton>
                        </Group>

                        <Group gap="md">
                            <PermissionButton
                                permission="payment:refund"
                                color="grape"
                                fallback={
                                    <Paper p="xs" bg="yellow.2" withBorder>
                                        <Text size="xs">
                                            <strong>Refund access restricted.</strong> Please
                                            contact finance team.
                                        </Text>
                                    </Paper>
                                }>
                                Process Refund
                            </PermissionButton>
                        </Group>
                    </Stack>
                </Card>

                {/* Section 6: Real-World Scenarios */}
                <Card withBorder shadow="sm">
                    <Title order={4} mb="md">
                        6. Real-World Scenarios
                    </Title>
                    <Text size="sm" c="dimmed" mb="md">
                        Practical examples for accounting operations.
                    </Text>

                    <Stack gap="md">
                        {/* Order Actions */}
                        <Paper p="md" withBorder>
                            <Title order={5} mb="sm">
                                Order Actions
                            </Title>
                            <Group gap="sm">
                                <PermissionButton permission="order:view" size="xs" variant="light">
                                    View
                                </PermissionButton>
                                <PermissionButton
                                    permission="order:edit"
                                    size="xs"
                                    variant="light"
                                    color="blue">
                                    Edit
                                </PermissionButton>
                                <PermissionButton
                                    permission="order:delete"
                                    size="xs"
                                    variant="light"
                                    color="red">
                                    Delete
                                </PermissionButton>
                                <PermissionButton
                                    permission="order:approve"
                                    size="xs"
                                    variant="light"
                                    color="green"
                                    showDisabled>
                                    Approve
                                </PermissionButton>
                                <PermissionButton
                                    permission="order:export"
                                    size="xs"
                                    variant="light"
                                    color="violet"
                                    showDisabled>
                                    Export
                                </PermissionButton>
                            </Group>
                        </Paper>

                        {/* Invoice Actions */}
                        <Paper p="md" withBorder>
                            <Title order={5} mb="sm">
                                Invoice Actions
                            </Title>
                            <Group gap="sm">
                                <PermissionButton
                                    permission="invoice:view"
                                    size="xs"
                                    variant="outline">
                                    View Invoice
                                </PermissionButton>
                                <PermissionButton
                                    permission="invoice:create"
                                    size="xs"
                                    variant="outline"
                                    color="green">
                                    Create Invoice
                                </PermissionButton>
                                <PermissionButton
                                    permission="invoice:send"
                                    size="xs"
                                    variant="outline"
                                    color="blue">
                                    Send Invoice
                                </PermissionButton>
                                <PermissionButton
                                    permission="invoice:delete"
                                    size="xs"
                                    variant="outline"
                                    color="red"
                                    showDisabled>
                                    Delete Invoice
                                </PermissionButton>
                            </Group>
                        </Paper>

                        {/* Payment Actions */}
                        <Paper p="md" withBorder>
                            <Title order={5} mb="sm">
                                Payment Actions
                            </Title>
                            <Group gap="sm">
                                <PermissionButton permission="payment:view" size="xs">
                                    View Payments
                                </PermissionButton>
                                <PermissionButton
                                    permission="payment:create"
                                    size="xs"
                                    color="teal">
                                    Record Payment
                                </PermissionButton>
                                <PermissionButton
                                    permission="payment:approve"
                                    size="xs"
                                    color="green"
                                    showDisabled>
                                    Approve Payment
                                </PermissionButton>
                                <PermissionButton
                                    permission="payment:refund"
                                    size="xs"
                                    color="orange"
                                    showDisabled>
                                    Process Refund
                                </PermissionButton>
                            </Group>
                        </Paper>
                    </Stack>
                </Card>

                {/* Section 7: Programmatic Permission Check */}
                <Card withBorder shadow="sm">
                    <Title order={4} mb="md">
                        7. Programmatic Permission Checking
                    </Title>
                    <Text size="sm" c="dimmed" mb="md">
                        Use the <Code>usePermission</Code> hook for conditional logic in your code.
                    </Text>

                    <Paper p="md" bg="gray.0" withBorder>
                        <Stack gap="xs">
                            <Text size="sm">
                                <Code>hasPermission('order:delete')</Code> ={" "}
                                <strong>
                                    {hasPermission("order:delete") ? "✅ true" : "❌ false"}
                                </strong>
                            </Text>
                            <Text size="sm">
                                <Code>hasPermission('staff:create')</Code> ={" "}
                                <strong>
                                    {hasPermission("staff:create") ? "✅ true" : "❌ false"}
                                </strong>
                            </Text>
                            <Text size="sm">
                                <Code>hasPermission('finance:approve-transactions')</Code> ={" "}
                                <strong>
                                    {hasPermission("finance:approve-transactions")
                                        ? "✅ true"
                                        : "❌ false"}
                                </strong>
                            </Text>
                            <Text size="sm">
                                <Code>hasPermission('invoice:create')</Code> ={" "}
                                <strong>
                                    {hasPermission("invoice:create") ? "✅ true" : "❌ false"}
                                </strong>
                            </Text>
                        </Stack>
                    </Paper>
                </Card>

                {/* Code Example */}
                <Card withBorder shadow="sm" bg="gray.0">
                    <Title order={4} mb="md">
                        📖 Usage Example
                    </Title>
                    <Code block>
                        {`import { PermissionButton } from '@/shared/components/common/CommonButton';

// Basic usage - hidden by default
<PermissionButton permission="order:delete">
  Delete Order
</PermissionButton>

// Show disabled instead of hidden
<PermissionButton 
  permission="order:approve" 
  showDisabled
  disabledTooltip="You need admin access"
>
  Approve Order
</PermissionButton>

// Multiple permissions - ANY mode
<PermissionButton 
  permission={["order:edit", "order:delete"]} 
  permissionMode="any"
>
  Manage Order
</PermissionButton>

// Multiple permissions - ALL mode
<PermissionButton 
  permission={["finance:view-reports", "finance:export-reports"]} 
  permissionMode="all"
>
  Export Report
</PermissionButton>

// Custom fallback
<PermissionButton 
  permission="staff:delete"
  fallback={<Text>Access Denied</Text>}
>
  Delete Staff
</PermissionButton>

// Programmatic check
const { hasPermission } = usePermission();
if (hasPermission('order:delete')) {
  // Show delete functionality
}`}
                    </Code>
                </Card>
            </Stack>
        </Box>
    );
}
