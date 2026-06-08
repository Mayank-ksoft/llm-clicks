import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Split heavy libraries into separate chunks so the initial bundle
        // stays small. The home route only needs react + router + helmet +
        // framer-motion; everything else loads on demand.
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("framer-motion")) return "framer";
          if (id.includes("recharts") || id.includes("d3-")) return "charts";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("react-router")) return "router";
          if (id.includes("react-helmet")) return "helmet";
          if (id.includes("@tanstack")) return "query";
          if (id.includes("embla-carousel")) return "carousel";
          if (id.includes("@supabase")) return "supabase";
          if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("zod")) return "forms";
          if (id.includes("date-fns") || id.includes("react-day-picker")) return "dates";
          return "vendor";
        },
      },
    },
  },
}));
