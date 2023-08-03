import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css';


const vuetify = createVuetify({
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#4B81FF',
                    danger: '#FF4B4B',
                    secondary: '#F1F8E9',
                    black: '#000000',
                    grey: '#434242',
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi',
        sets: {},
    },
})


export default vuetify;