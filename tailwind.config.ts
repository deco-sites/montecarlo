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
        "inter": ["Inter", "sans-serif"],
        "poppins": ["Poppins", "sans-serif"],
      },
      fontSize: {
        "1.5xl": "22px",
        "7.5xl": "80px",
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
        "perola-intermediario": "#F5F3E7",
        "perola+": "#9F9584",
        "perola-claro": "#F8F7F3",
      },
      lineHeight: {
        "12": "3.75rem",
      },
      spacing: {
        "3/5": "60%",
        "4/5": "80%",
        "1/2": "50%",
      }
    }
  },
};
