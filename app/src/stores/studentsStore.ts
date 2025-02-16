import { defineStore } from "pinia";
import { GetRecentBalanceService } from "@/services/students/getAllStudentsService";
import type { GetAllStudentsUseCase } from "@/domain/useCases/students/getAllStudentsUseCase";
import type { StudentStoreProps } from "@/domain/types/studentsTypes";
import { CreateStudentService } from "@/services/students/createStudentService";
import { useNotificationStore } from "./notificationStore";

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
    async createStudent(studentData: {
      name: string;
      email: string;
      document_number: string;
    }): Promise<boolean> {
      const notificationStore = useNotificationStore();
      try {
        const document_number = studentData.document_number.replace(/\D/g, "");

        const body = {
          name: studentData.name,
          email: studentData.email,
          document_number
        };

        await CreateStudentService.instance.perform(body);

        notificationStore.showNotification(
          "Aluno cadastrado com sucesso!",
          "success"
        );

        return true;
      } catch (error) {
        console.error(error);
        notificationStore.showNotification("Erro ao cadastrar aluno!", "error");
        return false;
      }
    },
    updatePagination(): void {
      let items = this.filteredItems;

      // Aplicando a ordenação antes da paginação
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedItems = items.slice(start, end);
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
