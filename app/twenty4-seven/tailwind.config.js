/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}", 
            'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        //? Light Color
        light_bg: '#ffffff',
        light_bg2: '#f9fafb',
        light_txtZone: '#f3f4f6',
        light_card: '#f3f4f6',
        light_border: '#e5e7eb',
        light_badge: '#eeddfd',
        light_badge2: '#17ef97',
        //? Dark Color
        dark_bg: '#1a1c1f',
        dark_bg2: '#222528',
        dark_txtZone: '#383241',
        dark_card: '#0c1014',
        dark_border: '#363c44',
        dark_badge: '#422f59',
        dark_txtBadge: '#bb76ff',
        dark_badge2: '#2b4e33',
        dark_txtBadge2: '#17ef97',
        //? Commun Color
        greenButton: '#17ef97',
        purpleButton: '#9a50e3',
        txtBlack: '#000000',
        txtWhite: '#ffffff',
        txtPlaceholder: '#939aa6',
        txtGreen: '#17ef97',
        txtPurple: '#9a50e3',

      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui")
  ],
  daisyui: {
    themes: [], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    // darkTheme: "light", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

