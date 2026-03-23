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
              background: '#0a1018',
              surface: '#121922',
              'surface-bright': '#19212c',
              'surface-light': '#24303d',
              primary: '#d7a24c',
              secondary: '#6aa7b8',
              error: '#cf6a6a',
              success: '#7ea58a',
              info: '#7e99b3',
              warning: '#c7913f',
              'on-background': '#eef2f4',
              'on-surface': '#e4e9ed',
              'on-primary': '#11161c'
            }
          }
        }
      },
      defaults: {
        VCard: {
          elevation: 0,
          rounded: 'lg'
        },
        VSheet: {
          rounded: 'lg'
        },
        VBtn: {
          variant: 'tonal',
          elevation: 0
        },
        VChip: {
          label: true
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
          density: 'comfortable',
          color: 'primary'
        },
        VAlert: {
          rounded: 'lg'
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
          content: '#0a1018'
        }
      ]
    }
  }
})
