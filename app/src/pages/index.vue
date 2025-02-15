<template>
  <TitlePage title="Consulta de Alunos" />

  <v-text-field
    v-model="search"
    label="Buscar aluno..."
    class="mt-3"
    clearable
    outlined
    dense
  />

  <div>
    <v-data-table-server
      class="custom-table elevation-5 mt-5"
      :headers="headers"
      :items="paginatedItems"
      :items-length="filteredItems.length"
      :items-per-page="itemsPerPage"
      :server-items-length="filteredItems.length"
      :loading="loading"
      :page="page"
      @update:page="updatePage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitlePage from "../components/ui/TitlePage.vue";
import { GetRecentBalanceService } from "../services/students/getAllStudentsService";
import { GetAllStudentsUseCase } from "../domain/useCases/students/getAllStudentsUseCase";
import { DataProps } from "../domain/types/students";

export default defineComponent({
  name: "Index",
  components: {
    TitlePage
  },
  data(): DataProps {
    return {
      search: "" as string,
      students: [] as GetAllStudentsUseCase.Students[],
      paginatedItems: [] as GetAllStudentsUseCase.Students[],
      loading: false as boolean,
      page: 1 as number,
      itemsPerPage: 5 as number,
      headers: [
        { title: "Nome", value: "name" },
        { title: "E-mail", value: "email" },
        { title: "RA", value: "registration_number" },
        { title: "CPF", value: "document_number" }
      ] as { title: string; value: keyof GetAllStudentsUseCase.Students }[]
    };
  },
  computed: {
    filteredItems(): GetAllStudentsUseCase.Students[] {
      if (!this.search) return this.students;

      const searchLower = this.search.toLowerCase();

      return this.students.filter(
        (student: GetAllStudentsUseCase.Students) =>
          student.name.toLowerCase().includes(searchLower) ||
          student.document_number.includes(searchLower) ||
          student.registration_number.includes(searchLower)
      );
    }
  },
  watch: {
    filteredItems() {
      this.updatePagination();
    }
  },
  mounted() {
    this.fetchStudents();
  },
  methods: {
    async fetchStudents(): Promise<void> {
      try {
        this.loading = true;

        const response = await GetRecentBalanceService.instance.perform();
        console.log("Dados recebidos:", response);
        this.students = response.students;
        this.updatePagination();
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      } finally {
        this.loading = false;
      }
    },
    updatePagination(): void {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedItems = this.filteredItems.slice(start, end);
    },
    updatePage(newPage: number): void {
      this.page = newPage;
      this.updatePagination();
    }
  }
});
</script>

<style scoped>
.custom-table .v-data-table-header {
  background-color: #ff5722 !important;
  color: white !important;
}
</style>
