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
    <v-btn class="mr-5" @click="navigateManageStudents" :disabled="!isAdmin">
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
    :items-per-page-options="[
      { value: 5, title: '5' },
      { value: 10, title: '10' },
      { value: 20, title: '20' },
      { value: 50, title: '50' },
      { value: 100, title: '100' },
      { value: -1, title: 'Todos' }
    ]"
    :loading="studentsStore.loading"
    :page="studentsStore.page"
    @update:page="studentsStore.updatePage"
    @update:items-per-page="
      studentsStore.itemsPerPage = $event;
      studentsStore.updatePagination();
    "
  >
    <template v-slot:[`item.menu`]="{ item }">
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="primary"
            icon="mdi-dots-vertical"
            variant="text"
            :disabled="!isAdmin"
          ></v-btn>
        </template>
        <v-list>
          <v-list-item value="1" @click="editStudent(item)">
            <v-list-item-title>Editar</v-list-item-title>
          </v-list-item>
          <v-list-item value="1" @click="toggleDialogDelete(item.id)">
            <v-list-item-title>Excluir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table-server>

  <DialogDeleteStudent
    :dialog="showDialogDelete"
    :studentId="selectedStudentId"
    @update:dialog="toggleDialogDelete"
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
import { onMounted, ref } from "vue";
import TitlePage from "../components/TitlePage.vue";
import { useStudentsStore } from "../stores/useStudentsStore";
import { useNotificationStore } from "../stores/useNotificationStore";
import DialogDeleteStudent from "../components/DialogDeleteStudent.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore";

export default {
  name: "Index",
  components: { TitlePage, DialogDeleteStudent },
  setup() {
    const studentsStore = useStudentsStore();
    const searchQuery = ref("");
    const router = useRouter();
    const showDialogDelete = ref(false);
    const selectedStudentId = ref<number>(0);
    const notificationStore = useNotificationStore();
    const authStore = useAuthStore();
    const isAdmin = authStore.user.role.toLowerCase() === "admin";

    onMounted(() => {
      searchQuery.value = "";
      studentsStore.search = "";
      studentsStore.fetchStudents(false);
    });

    const toggleDialogDelete = (studentId: number) => {
      selectedStudentId.value = studentId;
      showDialogDelete.value = !showDialogDelete.value;
    };

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
      editStudent,
      showDialogDelete,
      selectedStudentId,
      toggleDialogDelete,
      authStore,
      isAdmin
    };
  }
};
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

<route lang="yaml">
meta:
  layout: default
</route>
