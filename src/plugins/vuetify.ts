import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#802392',
          secondary: '#A0B9C6',
          surface: '#A0B9C6'
        },
      },
    },
  },
})
