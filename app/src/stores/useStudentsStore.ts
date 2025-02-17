import { defineStore } from "pinia";
import { GetRecentBalanceService } from "@/services/students/getAllStudentsService";
import type { GetAllStudentsUseCase } from "@/domain/useCases/students/getAllStudentsUseCase";
import type { StudentStoreProps } from "@/domain/types/studentsTypes";
import { CreateStudentService } from "@/services/students/createStudentService";
import { useNotificationStore } from "./useNotificationStore";
import { UpdateStudentService } from "@/services/students/updateStudentService";
import { DeleteStudentService } from "@/services/students/deleteStudentService";

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
        { title: "CPF", value: "document_number" },
        { title: "", value: "menu" }
      ] as { title: string; value: keyof GetAllStudentsUseCase.Students }[]
    }) as StudentStoreProps,
  actions: {
    getStudentById(id: number) {
      return this.students.find((student) => student.id === id) || null;
    },
    async fetchStudents(isSearch: boolean = false): Promise<void> {
      try {
        this.loading = true;

        if (isSearch) {
          this.updatePagination();
        } else {
          const response = await GetRecentBalanceService.instance.perform();
          console.log("Dados recebidos:", response);

          this.students = response.students.map((student) => ({
            ...student,
            document_number: this.formatCpf(student.document_number)
          }));

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
    async updateStudent(
      studentId: number,
      studentData: {
        name: string;
        email: string;
      }
    ): Promise<boolean> {
      const notificationStore = useNotificationStore();
      try {
        const body = {
          select: {
            student_id: studentId
          },
          update: {
            name: studentData.name,
            email: studentData.email
          }
        };

        await UpdateStudentService.instance.perform(body);

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
    async deleteStudent(studentId: number): Promise<boolean> {
      const notificationStore = useNotificationStore();
      try {
        await DeleteStudentService.instance.perform({ student_id: studentId });

        notificationStore.showNotification(
          "Aluno deletado com sucesso!",
          "success"
        );

        return true;
      } catch (error) {
        console.error(error);
        notificationStore.showNotification("Erro ao deletar aluno!", "error");
        return false;
      }
    },
    updatePagination(): void {
      let items = this.filteredItems;

      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;

      this.paginatedItems = items.slice(start, end);
    },
    updatePage(newPage: number): void {
      this.page = newPage;
      this.updatePagination();
    },
    formatCpf(cpf: string): string {
      if (!cpf) return "";

      let value = cpf.replace(/\D/g, "");

      if (value.length > 3) value = value.slice(0, 3) + "." + value.slice(3);
      if (value.length > 7) value = value.slice(0, 7) + "." + value.slice(7);
      if (value.length > 11) value = value.slice(0, 11) + "-" + value.slice(11);
      if (value.length > 14) value = value.slice(0, 14);

      return value;
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
