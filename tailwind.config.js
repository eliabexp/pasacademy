/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'bg': '#fff',
                'bg-dark': '#09090b',
                'primary': '#1912a1',
                'shadow4': 'rgba(0, 0, 0, 0.4)',
                'shadow4-dark': 'rgba(255, 255, 255, 0.4)',
                'hover': '#eee',
                'hover-dark': '#333',
            }
        }
    },
    plugins: []
}
