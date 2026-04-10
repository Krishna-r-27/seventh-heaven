/** @type {import('tailwindcss').Config} */
export default {

    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    // ─────────────────────────────────────
    // Bootstrap container
    // ─────────────────────────────────────
    container: {
        center: true,
        margin: "auto",
        padding: "0.75rem",
        screens: {
            sm: "540px",
            md: "720px",
            lg: "960px",
            xl: "1140px",
            "2xl": "1320px",
        },
    },

    theme: {

        // Bootstrap breakpoints
        screens: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            "2xl": "1400px",
        },

        // Colors
        colors: {
            transparent: "transparent",
            current: "currentColor",

            white: "#FFFFFF",
            black: "#000000",
            theme: "#292929",

            primary: {
                DEFAULT: "#005AA4",
                "overlay-light": "rgba(0,90,164,0.37)",
                "overlay-mid": "rgba(0,90,164,0.51)",
            },

            gold: "#C5A553",
            blue: "#005AA4",

            dark: {
                DEFAULT: "#292929",
                overlay: "rgba(0,0,0,0.62)",
            },

            gray: {
                light: "#F5F5F5",
                silver: "#F1F1F1",
            },

            bg: {
                peach: "#FFEFE1",
                cream: "#FFF8F2",
                blue: "#E8EEF7",
                ice: "#F0F4FF",
            },

            accent: {
                purple: "#8A38F5",
            },
        },

        // Fonts
        fontFamily: {
            primary: ["Montserrat", "sans-serif"],
            sans: ["Montserrat", "sans-serif"],
            montserrat: ["Montserrat", "sans-serif"],
            manrope: ["Manrope", "sans-serif"],
        },


        // Border radius
        borderRadius: {
            xs: "5px",
            sm: "8px",
            md: "10px",
            lg: "15px",
            xl: "20px",
            "2xl": "30px",
            "3xl": "40px",
            pill: "50px",
            full: "9999px",
        },

        // Font weights
        fontWeight: {
            regular: "400",
            medium: "500",
            semibold: "600",
            bold: "700",
        },

        extend: {

            // Bootstrap gutter
            spacing: {
                gutter: "1.5rem",
            },

            // Shadows
            boxShadow: {
                card: "0 4px 20px rgba(0,90,164,0.10)",
                "card-lg": "0 8px 40px rgba(0,90,164,0.15)",
                btn: "0 4px 14px rgba(197,165,83,0.30)",
                nav: "0 2px 20px rgba(0,0,0,0.08)",
            },

        },

    },

    // ─────────────────────────────────────
    // Plugins
    // ─────────────────────────────────────
    plugins: [

        function ({ addComponents }) {

            addComponents({

                /* ROW */

                ".row": {
                    display: "flex",
                    flexWrap: "wrap",
                    marginLeft: "-0.75rem",
                    marginRight: "-0.75rem",
                },

                ".row > *": {
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    width: "100%",
                },

                /* COL */

                ".col": {
                    flex: "1 0 0%",
                },

                ".col-auto": {
                    flex: "0 0 auto",
                    width: "auto",
                },

                ".col-1": { width: "8.333333%" },
                ".col-2": { width: "16.666667%" },
                ".col-3": { width: "25%" },
                ".col-4": { width: "33.333333%" },
                ".col-5": { width: "41.666667%" },
                ".col-6": { width: "50%" },
                ".col-7": { width: "58.333333%" },
                ".col-8": { width: "66.666667%" },
                ".col-9": { width: "75%" },
                ".col-10": { width: "83.333333%" },
                ".col-11": { width: "91.666667%" },
                ".col-12": { width: "100%" },

            });

        },

        function ({ addUtilities, theme }) {

            addUtilities({

                ".g-gutter": {
                    gap: theme("spacing.gutter"),
                },

                ".gx-gutter": {
                    columnGap: theme("spacing.gutter"),
                },

                ".gy-gutter": {
                    rowGap: theme("spacing.gutter"),
                },

            });

        }

    ]

}