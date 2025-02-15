<template>
  <TitlePage title="Consulta de Alunos" />

  <v-text-field
    v-model="studentsStore.search"
    label="Buscar aluno..."
    class="mt-3"
    clearable
    outlined
    dense
  />

  <div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import TitlePage from "../components/ui/TitlePage.vue";
import { useStudentsStore } from "../stores/Students";

export default defineComponent({
  name: "Index",
  components: { TitlePage },
  setup() {
    const studentsStore = useStudentsStore();

    watchEffect(() => {
      studentsStore.updatePagination();
    });

    studentsStore.fetchStudents();

    return {
      studentsStore
    };
  }
});
</script>
