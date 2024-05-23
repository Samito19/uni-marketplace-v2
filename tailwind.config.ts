const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primaryRed: "#d0180d",
      },
      backgroundImage: {
        studentsOnGrass: "url('/students-on-grass.jpeg')",
      },
    },
  },
};

export default config;
