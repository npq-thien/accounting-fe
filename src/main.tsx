import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import { AuthProvider } from "./app/providers/auth/AuthProviders.tsx";
import { LoadingProvider } from "./shared/components/common/PageLoading/PageLoadingOverlay.tsx";
import { theme } from "./theme/mantine-theme.ts";
// Styles
// import "./index.css";
import "@mantine/dates/styles.css";
import "mantine-datatable/styles.css";
import '@mantine/core/styles/default-css-variables.css';
import { QueryProvider } from "./app/providers/QueryProvider.tsx";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <QueryProvider>
                <LoadingProvider>
                    <AuthProvider>
                        <App />
                        <ToastContainer />
                    </AuthProvider>
                </LoadingProvider>
            </QueryProvider>
        </MantineProvider>
    </StrictMode >
);
