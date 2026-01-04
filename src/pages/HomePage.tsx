import { Box, Title } from "@mantine/core";
import { useLocation } from "react-router-dom";

export function HomePage() {
    const location = useLocation();

    return (
        <>
            <Title order={4}>Home</Title>
            <Box mt="sm">Current path: {location.pathname}</Box>
        </>
    );
}
