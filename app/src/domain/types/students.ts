import type { GetAllStudentsUseCase } from "../useCases/students/getAllStudentsUseCase";

export interface DataProps {
  search: string;
  students: GetAllStudentsUseCase.Students[];
  paginatedItems: GetAllStudentsUseCase.Students[];
  loading: boolean;
  page: number;
  itemsPerPage: number;
  headers: { title: string; value: keyof GetAllStudentsUseCase.Students }[];
}

export interface ComputedProps {
  filteredItems: GetAllStudentsUseCase.Students[];
}

export interface MethodsProps {
  fetchStudents(): Promise<void>;
  updatePagination(): void;
  updatePage(newPage: number): void;
}

export interface IndexComponent
  extends DataProps,
    ComputedProps,
    MethodsProps {}
