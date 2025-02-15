<template>
  <TitlePage title="Consulta de Alunos" />

  <!-- Campo de pesquisa -->
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
import TitlePage from "../components/ui/titlePage.vue";

export default defineComponent({
  name: "Index",
  components: {
    TitlePage
  },
  data() {
    return {
      search: "", // Campo de pesquisa
      students: [],
      items: [],
      paginatedItems: [],
      loading: false, // Indica quando os dados estão carregando
      page: 1, // Página atual
      itemsPerPage: 5, // Número de itens por página
      headers: [
        { title: "Nome", value: "name" },
        { title: "E-mail", value: "email" },
        { title: "RA", value: "registration_number" },
        { title: "CPF", value: "document_number" }
      ]
    };
  },
  computed: {
    // Filtra alunos pelo nome, CPF ou RA
    filteredItems() {
      if (!this.search) return this.items; // Retorna todos se não houver busca

      const searchLower = this.search.toLowerCase();

      return this.items.filter(
        (student) =>
          student.name.toLowerCase().includes(searchLower) ||
          student.document_number.includes(searchLower) ||
          student.registration_number.includes(searchLower)
      );
    }
  },
  watch: {
    // Atualiza a paginação quando os itens filtrados mudam
    filteredItems() {
      this.updatePagination();
    }
  },
  mounted() {
    this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      try {
        this.loading = true;
        const response = await fetch("/mocks/getStudents.json");
        if (!response.ok) throw new Error("Erro ao buscar alunos!");

        const data = await response.json();
        console.log("Dados recebidos:", data);

        this.items = data.students.map((student) => ({
          ...student,
          key: student.id
        }));

        this.updatePagination(); // Atualiza a exibição paginada
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      } finally {
        this.loading = false;
      }
    },
    updatePagination() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedItems = this.filteredItems.slice(start, end);
    },
    updatePage(newPage) {
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
