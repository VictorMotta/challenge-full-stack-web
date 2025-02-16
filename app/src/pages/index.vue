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
  >
    <template v-slot:[`item.menu`]="{ item }">
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="primary"
            icon="mdi-dots-vertical"
            variant="text"
          ></v-btn>
        </template>
        <v-list>
          <v-list-item @click="editStudent(item)">
            <v-list-item-title>Editar</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteStudent(item)">
            <v-list-item-title>Excluir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table-server>

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
      searchQuery.value = "";
      studentsStore.search = "";
      studentsStore.fetchStudents(false);
    });

    const notificationStore = useNotificationStore();

    const searchStudents = () => {
      studentsStore.search = searchQuery.value;
      studentsStore.fetchStudents(true);
    };

    const editStudent = (student: any) => {
      console.log(student);
      router.push(`/upsert-student?id=${student.id}`);
    };

    const navigateManageStudents = () => {
      router.push("/upsert-student");
    };

    return {
      studentsStore,
      searchQuery,
      searchStudents,
      navigateManageStudents,
      notificationStore,
      editStudent
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
