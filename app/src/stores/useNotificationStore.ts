import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    message: "",
    color: "success",
    showSnackbar: false
  }),
  actions: {
    showNotification(msg: string, type: "success" | "error" = "success") {
      this.message = msg;
      this.color = type;
      this.showSnackbar = true;

      setTimeout(() => {
        this.clearNotification();
      }, 3000);
    },
    clearNotification() {
      this.message = "";
    }
  }
});
