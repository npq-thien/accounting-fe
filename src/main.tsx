import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./app/providers/auth/AuthProviders.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme/mantine-theme.ts";
import { ToastContainer } from "react-toastify";
import { LoadingProvider } from "./shared/components/common/PageLoading/PageLoadingOverlay.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <MantineProvider theme={theme}>
                <LoadingProvider>
                    <App />
                <ToastContainer />
                </LoadingProvider>
            </MantineProvider>
        </AuthProvider>
    </StrictMode>
);
