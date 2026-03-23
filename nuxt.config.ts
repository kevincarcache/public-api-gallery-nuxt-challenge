// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module'],
  css: ['@mdi/font/css/materialdesignicons.css', '~/assets/css/main.css'],
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'galleryDark',
        themes: {
          galleryDark: {
            dark: true,
            colors: {
              background: '#020617',
              surface: '#0f172a',
              'surface-bright': '#111c35',
              'surface-light': '#1e293b',
              primary: '#fbbf24',
              secondary: '#38bdf8',
              error: '#fb7185',
              success: '#34d399',
              info: '#60a5fa',
              warning: '#f59e0b',
              'on-background': '#f8fafc',
              'on-surface': '#e2e8f0',
              'on-primary': '#020617'
            }
          }
        }
      },
      defaults: {
        global: {
          rounded: 'xl'
        },
        VCard: {
          rounded: 'xl',
          elevation: 0
        },
        VSheet: {
          rounded: 'xl'
        },
        VBtn: {
          rounded: 'pill',
          variant: 'tonal'
        },
        VTextField: {
          variant: 'outlined',
          density: 'comfortable',
          color: 'primary'
        },
        VSelect: {
          variant: 'outlined',
          density: 'comfortable',
          color: 'primary'
        },
        VPagination: {
          rounded: 'pill',
          density: 'comfortable',
          color: 'primary'
        },
        VSkeletonLoader: {
          boilerplate: true
        }
      }
    }
  },
  app: {
    head: {
      titleTemplate: '%s',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'theme-color',
          content: '#020617'
        }
      ]
    }
  }
})
