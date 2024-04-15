import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      fontFamily: {
        "beausiteGrand": ["BeausiteGrand"],
        "poppins": ["Poppins", "sans-serif"],
      },
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      colors: {
        "perola+": "#9F9584",
        "perola-intermediario": "#F5F3E7",
      },
    },
  },
};
