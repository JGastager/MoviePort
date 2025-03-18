export {};

declare global {
    interface Window {
        electron: {
            minimize: () => void;
            maximize: () => void;
            restore: () => void;
            close: () => void;
            onWindowStateChange: (callback: (state: string) => void) => void;
        };
    }
}
