/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#999999",
          secondary: "#03dac6",
          dark_gray: "#2e2e2e"
        }
      }
    }
  },
  defaults: {
    VBtn: {
      color: "secondary",
      variant: "elevated"
    }
  },
  aliases: {
    PrimaryBtn: {
      component: "VBtn",
      color: "primary",
      variant: "outlined"
    }
  }
});
