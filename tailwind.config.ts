import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import { _DEFAULT } from "#tailwind-config/theme/typography";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        primary: {
          light: "#AE7DDD",
          DEFAULT: process.env.PRIMARY_COLOR || "#7F54B2",
          dark: "#754fa3",
        },
      },
      aspectRatio: {
        "9/8": "1 / 1.125",
      },
      screens: {
        "2xl": "1400px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
