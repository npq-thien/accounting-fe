import { Container, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { CommonButton } from "../components";

export function Unauthorized() {
    const navigate = useNavigate();

    return (
        <Container size="md" h="100vh">
            <Group h="100%" justify="center" align="center">
                {/* Left content */}
                <Stack gap="lg" align="center">
                    <Title order={1} c="red">
                        403
                    </Title>
                    <Title order={2}>Access Denied</Title>
                    <Text size="lg" c="dimmed" ta="center">
                        You don't have permission to access this page.
                    </Text>
                    <CommonButton onClick={() => navigate("/")}>
                        Back to Home Page
                    </CommonButton>
                </Stack>

                {/* Right image */}
                <Image src="/images/forbidden.gif" alt="Not found" w={500} fit="cover" />
            </Group>
        </Container>
    );
}
