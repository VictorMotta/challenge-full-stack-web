<template>
  <TitlePage title="Consulta de Alunos" />

  <div class="container mt-5">
    <div class="box-search ml-5">
      <v-text-field
        v-model="searchQuery"
        label="Digite sua Busca"
        class="input-search"
        clearable
        max-width="70%"
        outlined
        dense
        density="compact"
      />
      <v-btn @click="searchStudents"> Pesquisar </v-btn>
    </div>
    <v-btn class="mr-5" @click="navigateManageStudents">
      Cadastrar Aluno
    </v-btn>
  </div>

  <v-data-table-server
    class="custom-table elevation-5 mt-5"
    :headers="studentsStore.headers"
    :items="studentsStore.paginatedItems"
    :items-length="studentsStore.filteredItems.length"
    :items-per-page="studentsStore.itemsPerPage"
    :server-items-length="studentsStore.filteredItems.length"
    :loading="studentsStore.loading"
    :page="studentsStore.page"
    @update:page="studentsStore.updatePage"
  />

  <v-snackbar
    v-model="notificationStore.showSnackbar"
    :color="notificationStore.color"
    :timeout="3000"
  >
    {{ notificationStore.message }}
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import TitlePage from "../components/ui/TitlePage.vue";
import { useStudentsStore } from "../stores/studentsStore";
import { useNotificationStore } from "../stores/notificationStore";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Index",
  components: { TitlePage },
  setup() {
    const studentsStore = useStudentsStore();
    const searchQuery = ref("");
    const router = useRouter();

    onMounted(() => {
      studentsStore.fetchStudents(false);
    });

    const notificationStore = useNotificationStore();

    const searchStudents = () => {
      studentsStore.search = searchQuery.value;
      studentsStore.fetchStudents(true);
    };

    const navigateManageStudents = () => {
      router.push("/create-student");
    };

    return {
      studentsStore,
      searchQuery,
      searchStudents,
      navigateManageStudents,
      notificationStore
    };
  }
});
</script>

<style scoped>
.container {
  widows: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-search {
  width: 80%;
  display: flex;
  align-items: center;
}

.v-text-field {
  margin-top: 22px;
}
</style>
