import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSingleFile } from "vite-plugin-singlefile";
import { minifyHtml } from "vite-plugin-html";
import { viteExternalsPlugin } from "vite-plugin-externals";
import viteCompression from "vite-plugin-compression";
import htmlPlugin from "vite-plugin-html-config";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteCompression(),
        viteExternalsPlugin({
            cesium: "Cesium",
        }),
        htmlPlugin({
            links: [
                {
                    rel: "stylesheet",
                    href: "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/cesium/1.90.0/Widgets/widgets.css",
                },
            ],
            scripts: [
                `window['CESIUM_BASE_URL'] = 'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/cesium/1.90.0/'`,
                {
                    src: "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/cesium/1.90.0/Cesium.min.js",
                },
            ],
        }),
        viteSingleFile(),
        minifyHtml(),
    ],
    build: {
        cssCodeSplit: false,
        assetsInlineLimit: 100000000,
        rollupOptions: {
            output: {
                manualChunks: () => "everything.js",
            },
        },
    },
});
