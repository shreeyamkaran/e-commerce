export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            screens: {
                "sm": "800px",  // Custom breakpoint at 800px
                "md": "1100px"
            }
        }
    },
    plugins: []
}