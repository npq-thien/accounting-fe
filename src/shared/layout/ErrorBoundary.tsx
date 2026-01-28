import { Container, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { CommonButton } from "../components";

export function ErrorBoundary({ message, status }: { message?: string; status?: number }) {
    const navigate = useNavigate();

    const errorMessage = message || "Đã có lỗi xảy ra hoặc trang không tồn tại.";
    const is404 = status === 404;

    return (
        <Container size="md" h="100vh">
            <Group h="100%" justify="center" align="center">
                <Stack gap="md">
                    <Title order={2}>Oops!</Title>
                    <Text>{errorMessage}</Text>
                    <CommonButton onClick={() => navigate("/")}>Quay lại trang chủ</CommonButton>
                </Stack>

                {is404 && <Image src="/images/not-found.png" alt="Not found" w={500} fit="cover" />}
            </Group>
        </Container>
    );
}
