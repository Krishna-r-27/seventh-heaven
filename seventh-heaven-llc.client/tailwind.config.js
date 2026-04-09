/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            mobile: { max: '767px' },
            tablet: { max: '1023px' },
            xxsm: '340px',
            xsm: '480px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            lg2: '1024px',
            xl: '1280px',
            '2xl': '1440px',
            '3xl': '1630px',
            '4xl': '1920px',
        },
        extend: {
            fontFamily: {
                primary: ["Poppins", "sans-serif"],
                secondary: ["Poppins", "serif"],
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '12px',
                    md: '20px',
                    lg: '24px',
                    lg2: '32px',
                    xl: '96px',
                    '2xl': '128px',
                    '3xl': '160px',
                },
                screens: {
                    md: '768px',
                    lg: '992px',
                    lg2: '1024px',
                    xl: '1280px',
                    '2xl': '1440px',
                    '3xl': '1630px',
                },
            },

            spacing: {
                30: "var(--space-30)",
                50: "var(--space-50)",
                70: "var(--space-70)",
                100: "var(--space-100)",
                200: "var(--space-200)",
            },
            fontSize: {
                xxs: ['0.625rem', '1rem'], //10px
                xs: ['0.75rem', '1.125rem'], //12px
                sm: ['0.875rem', '1.5rem'], //14px
                base: ['1rem', '1.5rem'], //16px
                lg: ['1.125rem', '1.75rem'], //18px
                xl: ['1.25rem', '2rem'], //20px
                '1xl': ['1.375rem', '2rem'], //22px
                '2xl': ['1.5rem', '2.125rem'], //24px
                '3xl': ['2rem', '2.75rem'], //32px
                '3.5xl': ['2.25rem', '3rem'], //36px
                '4xl': ['2.5rem', '3.5rem'], //40px
                '5xl': ['3rem', '4.125rem'], //48px
                '6xl': ['3.5rem', '4.75rem'], //56px
                '7xl': ['4rem', '5rem'], //64px
                '8xl': ['4.5rem', '6.125rem'], //72px
                '9xl': ['5rem', '6.625rem'], //80px
            },
            colors: {
                'gray-f2f2f2': '#F2F2F2',
                'gray-f3f3f3': '#F3F3F3',
                'gray-555555': '#555555',
                'gray-6e6e6e': '#6E6E6E',
                'gray-9e9e9e': '#9E9E9E',
                'gray-404040': '#404040',
                'yellow-ffb200': '#FFB200',
                'gray-333333': '#333333',
                'gray-444444': '#444444',
                'orange-ff8400': '#FF8400',
                'gray-898989': '#898989'
            },
        },
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                ".btn-primary": {
                    padding: "0.5rem 1.5rem",
                    border: "1px solid #000",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#000",
                    transition: "all 0.2s ease",
                },
                ".btn-primary:hover": {
                    backgroundColor: "#000",
                    color: "#fff",
                },
                /* Secondary Button */
                ".btn-secondary": {
                    padding: "0.5rem 1.5rem",
                    border: "1px solid #fff",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#fff",
                    transition: "all 0.2s ease",
                },
                ".btn-secondary:hover": {
                    backgroundColor: "#f5f5f5",
                    color: "#000",
                },
            });
        },
    ],
}