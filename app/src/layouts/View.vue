<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <div class="box-logo">
        <img src="../../public/logo.jpg" alt="Grupo a Logo" />
      </div>
      <v-list>
        <v-list-subheader class="box-title">
          Modulo Acadêmico
        </v-list-subheader>
        <router-link v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item :value="item" class="box-menu">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>

      <div class="box-logout">
        <v-btn
          @click="logout"
          variant="elevated"
          color="primary"
          class="logout-btn"
        >
          Logout
        </v-btn>
      </div>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" color="#000" />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { useAuthStore } from "../stores/useAuthStore";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "View",
  data() {
    return {
      drawer: false,
      items: [
        { to: "/", text: "Alunos", icon: "mdi-clock" },
        { to: "/coursers", text: "Cursos", icon: "mdi-account" }
      ]
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const logout = () => {
      authStore.logout();
      router.push("/sign-in");
    };

    return { logout };
  }
});
</script>

<style scoped>
.box-logout {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.logout-btn {
  width: 80%;
}
.box-logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 80%;
  height: 60px;
}
a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
.box-title {
  background-color: #999999;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
}
.box-menu:hover {
  background-color: #e4e4e4;
}
.box-menu:active {
  background-color: #999999;
  color: white;
}
</style>
