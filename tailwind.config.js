/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#1A6B4A',
            light: '#2A8B62',
            dark: '#0F4A32',
            50: '#f0f9f4',
            100: '#dcf0e6',
            200: '#bbe2ce',
            300: '#8acbae',
            400: '#56ad88',
            500: '#1A6B4A',
            600: '#2A8B62',
            700: '#0F4A32',
            800: '#0a3324',
            900: '#062217',
          },
          accent: {
            DEFAULT: '#E8A020',
            light: '#F0B840',
            dark: '#C4841A',
          },
          resort: {
            bg: '#F7F6F2',
            card: '#FFFFFF',
            foreground: '#0D1A12',
            muted: '#6B7280',
            'muted-bg': '#F0EFE9',
            border: 'rgba(13, 26, 18, 0.08)',
            dark: '#0D1A12',
            'dark-2': '#162318',
          },
        },
        fontFamily: {
          display: ['var(--font-display)', 'DM Sans', 'sans-serif'],
          sans: ['var(--font-sans)', 'Manrope', 'sans-serif'],
        },
        borderRadius: {
          '4xl': '2rem',
          '5xl': '2.5rem',
        },
        boxShadow: {
          premium: '0 20px 60px -15px rgba(26, 107, 74, 0.2), 0 4px 16px -4px rgba(0,0,0,0.08)',
          gold: '0 20px 60px -15px rgba(232, 160, 32, 0.25)',
          soft: '0 8px 32px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.04)',
          card: '0 4px 24px rgba(0,0,0,0.06)',
        },
        animation: {
          'gradient-shift': 'gradientShift 12s ease infinite',
          'blob-morph': 'blobMorph 8s ease-in-out infinite',
          'blob-morph-2': 'blobMorph2 10s ease-in-out infinite',
          'ai-pulse': 'aiPulse 2s ease-in-out infinite',
          'ring-pulse': 'ringPulse 2.5s ease-in-out infinite',
          'bar-grow': 'barGrow 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          'bubble-in': 'bubbleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          'blink': 'blink 1s step-end infinite',
          'shimmer': 'shimmer 1.5s infinite',
        },
        backdropBlur: {
          xs: '2px',
        },
      },
    },
    plugins: [require('tailwindcss-animate')],
  };