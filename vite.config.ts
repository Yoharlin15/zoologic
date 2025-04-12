import react from "@vitejs/plugin-react-swc";
import { loadEnv, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "./",
    plugins: [react(), tsconfigPaths(), visualizer()],
    esbuild: {
      exclude: [],
      loader: "tsx",
      include: /ClientApp\/.*\.tsx?$/,
    },
    define: {
      "process.env.ZOOLOGIC_SERVER_URL": JSON.stringify(
        env.ZOOLOGIC_SERVER_URL,
      ),
    },
    resolve: {
      alias: {
        leaflet: "leaflet/dist/leaflet.js",
      },
    },
    build: {
      minify: true,
      outDir: "./wwwroot",
      // sourcemap: true,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        preserveEntrySignatures: "strict",
        onwarn(warning, defaultHandler) {
          if (warning.code === "SOURCEMAP_ERROR") return;
          defaultHandler(warning);
        },
      },
    },
  };
});
