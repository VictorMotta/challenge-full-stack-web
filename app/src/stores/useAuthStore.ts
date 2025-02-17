import type { SignInUserUseCase } from "@/domain/useCases/users/signInUserUseCase";
import type { SignUpUserUseCase } from "@/domain/useCases/users/SignUpUserUseCase";
import { SignInUserService } from "@/services/users/signInUserService";
import { SignUpUserService } from "@/services/users/signUpUserService";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token") || null
  }),
  actions: {
    async signin(userData: SignInUserUseCase.Request): Promise<void> {
      try {
        const user = await SignInUserService.instance.perform(userData);
        this.user = user.user;
        this.token = user.token;
        localStorage.setItem("user", JSON.stringify(user.user));
        localStorage.setItem("token", user.token);
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    },
    async signup(userData: SignUpUserUseCase.Request): Promise<void> {
      try {
        await SignUpUserService.instance.perform(userData);
      } catch (error) {
        console.error("Erro ao fazer cadastro:", error);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    hydrate() {
      this.user = JSON.parse(localStorage.getItem("user") || "null");
      this.token = localStorage.getItem("token") || null;
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
});
