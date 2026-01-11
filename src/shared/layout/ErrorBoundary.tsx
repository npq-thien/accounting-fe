import { Container, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useNavigate, useRouteError } from "react-router-dom";

import { CommonButton } from "../components";

interface RouteError {
    status?: number;
    statusText?: string;
    message?: string;
}

export function ErrorBoundary() {
    const error = useRouteError() as RouteError | Error;
    const navigate = useNavigate();

    const getErrorMessage = () => {
        if (error instanceof Error) {
            return error.message;
        }
        if (typeof error === "object" && error !== null && "message" in error) {
            return (error as RouteError).message || "Unknown error";
        }
        return "Unknown error";
    };

    const is404Error = () => {
        if (error instanceof Error) {
            return false;
        }
        return typeof error === "object" && error !== null && (error as RouteError).status === 404;
    };

    return (
        <Container size="md" h="100vh">
            <Group h="100%" justify="center" align="center">
                {/* Left content */}
                <Stack gap="md">
                    <Title order={2}>Something went wrong</Title>

                    <Text>{getErrorMessage()}</Text>

                    <CommonButton onClick={() => navigate("/")}>Back to home page</CommonButton>
                </Stack>

                {/* Right image */}
                {is404Error() && (
                    <Image src="/images/not-found.png" alt="Not found" w={500} fit="cover" />
                )}
            </Group>
        </Container>
    );
}
