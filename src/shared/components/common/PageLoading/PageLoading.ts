let globalLoaderInstance: { show: () => void; hide: () => void } | null = null;

export const setGlobalLoader = (loader: { show: () => void; hide: () => void }) => {
    globalLoaderInstance = loader;
};

export const loader = {
    show: () => {
        if (globalLoaderInstance) {
            globalLoaderInstance.show();
        } else {
            console.warn("Global loader not initialized. Make sure LoadingProvider is mounted.");
        }
    },
    hide: () => {
        if (globalLoaderInstance) {
            globalLoaderInstance.hide();
        } else {
            console.warn("Global loader not initialized. Make sure LoadingProvider is mounted.");
        }
    },
};
