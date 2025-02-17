<template>
  <div class="container">
    <v-card class="mx-auto sign-up-card">
      <v-toolbar color="primary" dark flat class="toolbar-centered">
        <v-card-title class="text-h6 font-weight-regular"
          >Criar Conta</v-card-title
        >
      </v-toolbar>

      <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
        <v-text-field
          v-model="name"
          color="deep-purple"
          label="Nome"
          type="text"
          variant="filled"
          required
          style="width: 100%"
        ></v-text-field>

        <v-text-field
          v-model="email"
          color="deep-purple"
          label="E-mail"
          type="email"
          variant="filled"
          required
          style="width: 100%"
        ></v-text-field>

        <v-text-field
          v-model="password"
          color="deep-purple"
          counter="6"
          label="Senha"
          type="password"
          variant="filled"
          required
          style="width: 100%"
        ></v-text-field>
        <v-select
          v-model="role"
          :items="roles"
          label="Escolha um tipo de conta"
          color="deep-purple"
          variant="filled"
          required
          style="width: 100%"
        ></v-select>
      </v-form>

      <v-divider></v-divider>

      <div class="container-button">
        <v-btn
          :disabled="!isValid || isLoading"
          :loading="isLoading"
          color="primary"
          variant="elevated"
          @click="handleSignUp"
        >
          Criar Conta
        </v-btn>
      </div>

      <div class="container-button">
        <p>Já tem uma conta?</p>
        <router-link to="/sign-in" class="sign-up-link"
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
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const role = ref("");
    const roles = ["Teacher", "Admin"];

    const isValid = ref(false);
    const isLoading = ref(false);
    const authStore = useAuthStore();
    const router = useRouter();
    const notificationStore = useNotificationStore();

    const handleSignUp = async () => {
      if (!name.value || !email.value || !password.value || !role.value) {
        notificationStore.showNotification(
          "Preencha todos os campos!",
          "error"
        );
        return;
      }

      isLoading.value = true;
      try {
        authStore.signup({
          name: name.value,
          email: email.value,
          password: password.value,
          role: role.value.toLocaleLowerCase() as "teacher" | "admin"
        });
        notificationStore.showNotification(
          "Usuário criado com sucesso!",
          "success"
        );
        router.push("/sign-in");
      } catch (error) {
        notificationStore.showNotification("Erro ao criar conta!", "error");
      } finally {
        isLoading.value = false;
      }
    };

    return {
      name,
      email,
      password,
      role,
      roles,
      isValid,
      isLoading,
      handleSignUp,
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
.sign-up-card {
  width: 100%;
  max-width: 420px;
  min-height: 500px;
  border: 1px solid #e4e4e4;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: white;
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
