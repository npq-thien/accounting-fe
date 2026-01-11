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
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-datatable/styles.css";

// import './layout.css';

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
