<template>
  <div class="container">
    <v-card class="mx-auto">
      <v-toolbar color="primary" dark flat>
        <v-card-title class="text-h6 font-weight-regular">
          Fazer Login
        </v-card-title>
      </v-toolbar>

      <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
        <v-text-field
          v-model="email"
          color="deep-purple"
          label="Email address"
          type="email"
          variant="filled"
        ></v-text-field>

        <v-text-field
          v-model="password"
          color="deep-purple"
          counter="6"
          label="Password"
          type="password"
          variant="filled"
        ></v-text-field>
      </v-form>

      <v-divider></v-divider>

      <div class="container-button">
        <v-btn
          :disabled="!isValid || isLoading"
          :loading="isLoading"
          color="primary"
          variant="elevated"
          @click="handleLogin"
        >
          Entrar
        </v-btn>
      </div>

      <div class="container-button">
        <p>Não é um usuário ainda?</p>
        <router-link to="/sign-up" class="sign-up-link"
          >Clique aqui</router-link
        >
      </div>
    </v-card>
  </div>

  <v-snackbar
    v-model="notificationStore.showSnackbar"
    :color="notificationStore.color"
    :timeout="3000"
  >
    {{ notificationStore.message }}
  </v-snackbar>
</template>

<script lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/useAuthStore";
import { useRouter } from "vue-router";
import { useNotificationStore } from "../stores/useNotificationStore";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const isValid = ref(false);
    const isLoading = ref(false);
    const authStore = useAuthStore();
    const router = useRouter();
    const notificationStore = useNotificationStore();

    const handleLogin = async () => {
      isLoading.value = true;
      try {
        await authStore.sigin({ email: email.value, password: password.value });
        router.push("/");
        notificationStore.showNotification("Logado com sucesso!", "success");
      } catch (error) {
        notificationStore.showNotification(
          "Falha ao tentar se logar!",
          "error"
        );
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      password,
      isValid,
      isLoading,
      handleLogin,
      notificationStore
    };
  }
};
</script>

<style scoped>
.toolbar-centered {
  display: flex;
  justify-content: center;
  text-align: center;
}

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
.v-card {
  min-width: 400px;
  border: 1px solid #e4e4e4;
}
.v-btn {
  width: 80%;
}
.container-button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}
.sign-up-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
}
</style>
