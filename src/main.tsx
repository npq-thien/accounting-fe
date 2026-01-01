import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./app/providers/auth/AuthProviders.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme/mantine-theme.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <MantineProvider theme={theme}>
                <App />
            </MantineProvider>
        </AuthProvider>
    </StrictMode>
);
