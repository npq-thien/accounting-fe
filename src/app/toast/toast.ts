import { toast, type ToastOptions } from "react-toastify";

import { CustomToast } from "./CustomToast";

const baseOptions: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

// Helper function to create toast with title support
function createToastWithTitle(
    toastFunction: typeof toast.success,
    defaultTitle: string,
    messageOrTitle: string,
    message?: string,
    options?: ToastOptions
) {
    const title = message ? messageOrTitle : defaultTitle;
    const finalMessage = message || messageOrTitle;

    toastFunction(
        (toastProps) => CustomToast({ ...toastProps, title, message: finalMessage }),
        { ...baseOptions, ...options }
    );
}

export const notify = {
    success: (messageOrTitle: string, message?: string, options?: ToastOptions) =>
        createToastWithTitle(toast.success, "Thành công", messageOrTitle, message, options),

    error: (messageOrTitle: string, message?: string, options?: ToastOptions) =>
        createToastWithTitle(toast.error, "Lỗi", messageOrTitle, message, options),

    warning: (messageOrTitle: string, message?: string, options?: ToastOptions) =>
        createToastWithTitle(toast.warning, "Cảnh báo", messageOrTitle, message, options),

    info: (messageOrTitle: string, message?: string, options?: ToastOptions) =>
        createToastWithTitle(toast.info, "Thông tin", messageOrTitle, message, options),
};
