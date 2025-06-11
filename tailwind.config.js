/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: { // Cette section ne doit PAS être dans 'extend'
		montserrat: ['Montserrat', 'sans-serif'],
		lora: ['Lora', 'serif'],
		sans: ['Roboto Flex', 'sans-serif'],
	  },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      borderColor: {
        // "border" devient disponible en tant que classe "border-border"
        border: 'hsl(var(--border))',
      },
      backgroundColor: {
        background: 'hsl(var(--background))',
      },
      textColor: {
        foreground: 'hsl(var(--foreground))',
      },
      colors: {
        // Couleurs principales
        'blue-sky': '#009FE3',    // 🔵 Bleu ciel - Header, boutons, CTA
        'fire-red': '#E30613',    // 🔴 Rouge pompier - Accent important, CTA
        'white': '#FFFFFF',       // ⚪ Blanc - Fond, texte secondaire
        'earth-brown': '#A24C1B', // 🟤 Marron terre - Fond section, footer
        'dark': '#1D1D1B',        // ⚫ Noir/Gris foncé - Texte, icônes
        'drone-purple': '#712C81', // 🟣 Violet (drone) - Détail technique, badges
        'ocre-orange': '#D97629', // 🟠 Orange/ocre - Hover, micro animations
        'light-gray': '#D9D9D9',  // 🔘 Gris clair - Fonds alternatifs, bordures
        
        // Textes (alias pour compatibilité)
        'anthracite': '#1D1D1B',  // Alias pour 'dark'
        'dark-gray': '#4A4A4A',
        'medium-gray': '#6B6B6B',
        'very-light-gray': '#F0F0F0',
        
        // Existant (à conserver)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: 0
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: 0
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
