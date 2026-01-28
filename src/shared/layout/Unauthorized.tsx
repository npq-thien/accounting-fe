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
                        Bạn không có quyền truy cập trang này.
                    </Text>
                    <CommonButton onClick={() => navigate("/")}>Quay lại trang chủ</CommonButton>
                </Stack>

                {/* Right image */}
                <Image src="/images/forbidden.gif" alt="Not found" w={500} fit="cover" />
            </Group>
        </Container>
    );
}
