import type { StudentStoreProps } from "@/domain/types/students";
import type { GetAllStudentsUseCase } from "@/domain/useCases/students/getAllStudentsUseCase";
import { GetRecentBalanceService } from "@/services/students/getAllStudentsService";
import { defineStore } from "pinia";

export const useStudentsStore = defineStore("student", {
  state: () =>
    ({
      students: [],
      search: "",
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
    }) as StudentStoreProps,
  actions: {
    async fetchStudents(isSearch: boolean = false): Promise<void> {
      try {
        this.loading = true;

        if (isSearch) {
          this.updatePagination();
        } else {
          const response = await GetRecentBalanceService.instance.perform();
          console.log("Dados recebidos:", response);
          this.students = response.students;
          this.updatePagination();
        }
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
  },
  getters: {
    filteredItems(state): GetAllStudentsUseCase.Students[] {
      if (!state.search) return state.students;

      const searchLower = state.search.toLowerCase();

      return state.students.filter(
        (student: GetAllStudentsUseCase.Students) =>
          student.name.toLowerCase().includes(searchLower) ||
          student.document_number.includes(searchLower) ||
          student.registration_number.includes(searchLower)
      );
    }
  }
});
