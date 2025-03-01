import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    port: 3000,
  },
  theme: {
    extends: {
      fontFamily: {
        sans: ["poppins", "sans-sarif"],
      },
      gridTamplateColumn: {
        "70/30": "70% 28%",
      },
    },
  },
});
