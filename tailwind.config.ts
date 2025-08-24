import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '6rem'
      },
      screens: {
        sm: '100%',
        md: '1024px',
        lg: '1280px',
        xl: '1440px',
        '2xl': '1600px',
        '3xl': '1728px'
      }
    },
    textColor: {
      primary: '#3e3e3e',
      secondary: '#757575',
      tertiary: '#8B4513',
      danger: '#E90000',
      white: '#fff',
      'gray-500': '#6b7280',
      'gray-600': '#4b5563',
      'gray-800': '#1f2937',
      'primary-dark': '#18181b'
    },
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        playfair: ['Playfair Display', 'serif']
      },
      colors: {
        primary: {
          light: '#AE7DDD',
          DEFAULT: 'hsl(var(--primary))',
          dark: '#754fa3',
          foreground: 'hsl(var(--primary-foreground))'
        },

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      aspectRatio: {
        '9/8': '1 / 1.125'
      },
      screens: {
        '2xl': '1400px'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        card: '0px 5px 10px -3px rgba(0,0,0,0.1), 0px 0px 0px 0.3px rgba(0,0,0,0.03)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')]
} satisfies Config
