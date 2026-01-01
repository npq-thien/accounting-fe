import { CommonTextInput } from "@/shared/components";
import { useAuth } from "@/shared/hooks";
import {
    Alert,
    Anchor,
    Box,
    Button,
    Paper,
    PasswordInput,
    Stack,
    Title
} from "@mantine/core";
import { useState, type FormEvent } from "react";

export function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        const success = await login(username, password);

        if (!success) {
            setError("Tài khoản hoặc mật khẩu không đúng");
        }

        setIsSubmitting(false);
    };

    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}>
            <Paper shadow="md" p="xl" miw={360}>
                <form onSubmit={handleSubmit}>
                    <Stack gap="md">
                        <Title order={2} ta="center">
                            Đăng nhập
                        </Title>

                        {error && (
                            <Alert color="red" variant="light">
                                {error}
                            </Alert>
                        )}
                        <CommonTextInput
                            label="Tài khoản"
                            value={username}
                            onChange={(event) => setUsername(event.currentTarget.value)}
                            autoFocus
                        />
                        <PasswordInput
                            label="Mật khẩu"
                            value={password}
                            onChange={(event) => setPassword(event.currentTarget.value)}
                        />

                        <Anchor
                            size="sm"
                            ta="right"
                            href="#"
                            onClick={() => {}}>
                            Quên mật khẩu
                        </Anchor>
                        <Button type="submit" variant="filled" fullWidth loading={isSubmitting}>
                            Đăng nhập
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
