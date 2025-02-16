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
      <v-btn @click="searchStudents">Pesquisar</v-btn>
    </div>
    <v-btn class="mr-5"> Cadastrar Aluno </v-btn>
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
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import TitlePage from "../components/ui/TitlePage.vue";
import { useStudentsStore } from "../stores/Students";

export default defineComponent({
  name: "Index",
  components: { TitlePage },
  setup() {
    const studentsStore = useStudentsStore();
    const searchQuery = ref(""); // Valor da pesquisa controlado manualmente

    // Carregar os primeiros itens ao montar a página
    onMounted(() => {
      studentsStore.fetchStudents(false); // Carrega todos os alunos sem filtro
    });

    // Função que chama a pesquisa com o valor da busca
    const searchStudents = () => {
      studentsStore.search = searchQuery.value; // Atribui o valor da busca
      studentsStore.fetchStudents(true); // Passa true para indicar que é uma pesquisa
    };

    return {
      studentsStore,
      searchQuery,
      searchStudents
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
.input-search {
  widows: 50%;
}
</style>
