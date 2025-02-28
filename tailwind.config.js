module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 腾讯蓝色系基础色板
        primary: {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99c7ff',
          300: '#66a9ff',
          400: '#338bff',
          500: '#0067ff', // 主蓝色
          600: '#0052cc',
          700: '#003e99',
          800: '#002966',
          900: '#001433',
          950: '#000a19',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // 腾讯辅助色系
        tencent: {
          green: '#0ABF5B',
          yellow: '#FFC300',
          red: '#ED4114',
          purple: '#6236FF',
        },
      },
      fontFamily: {
        sans: [
          'PingFang SC',
          'Microsoft YaHei',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        'scanning': 'scanning 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-smooth': 'bounce 1.5s infinite cubic-bezier(0.4, 0, 0.6, 1)',
      },
      boxShadow: {
        'tencent-sm': '0 2px 8px rgba(0, 103, 255, 0.08)',
        'tencent': '0 4px 16px rgba(0, 103, 255, 0.12)',
        'tencent-lg': '0 8px 24px rgba(0, 103, 255, 0.16)',
      },
      borderRadius: {
        'tencent': '0.75rem', // 12px
      },
      keyframes: {
        scanning: {
          '0%': { top: '0%' },
          '50%': { top: '97%' },
          '100%': { top: '0%' },
        },
      },
    },
  },
  plugins: [],
};