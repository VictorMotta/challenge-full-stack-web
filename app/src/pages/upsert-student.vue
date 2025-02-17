<template>
  <TitlePage :title="isEditing ? 'Editar Aluno' : 'Cadastro de Aluno'" />
  <div class="conteiner-form">
    <v-form ref="form">
      <v-text-field
        v-model="studentData.name"
        label="Nome"
        class="inputs-form"
        clearable
        max-width="70%"
        outlined
        dense
        density="compact"
        :rules="[rules.required]"
      />
      <v-text-field
        v-model="studentData.email"
        label="E-mail"
        class="inputs-form"
        clearable
        max-width="70%"
        outlined
        dense
        density="compact"
        :rules="[rules.required, rules.email]"
      />
      <v-text-field
        v-model="studentData.document_number"
        label="CPF"
        class="inputs-form"
        clearable
        max-width="70%"
        outlined
        dense
        density="compact"
        :rules="[rules.required, rules.cpf]"
        @input="applyCpfMask"
        :disabled="isEditing"
      />
    </v-form>
  </div>
  <div class="container-buttons">
    <v-btn color="primary" variant="outlined" @click="navigateStudents">
      Cancel
    </v-btn>
    <v-btn class="ml-5" @click="handleSaveStudent">{{
      isEditing ? "Atualizar" : "Salvar"
    }}</v-btn>
  </div>

  <v-snackbar
    v-model="notificationStore.showSnackbar"
    :color="notificationStore.color"
    :timeout="3000"
  >
    {{ notificationStore.message }}
  </v-snackbar>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNotificationStore } from "../stores/useNotificationStore";
import { useStudentsStore } from "../stores/useStudentsStore";

export default {
  name: "UpsertStudent",
  setup() {
    const notificationStore = useNotificationStore();
    const studentsStore = useStudentsStore();

    const router = useRouter();
    const route = useRoute();
    const form = ref(null);

    const studentId = ref(route.query.id ? Number(route.query.id) : null);
    const isEditing = ref(!!studentId.value);

    const studentData = ref({
      name: "",
      email: "",
      document_number: ""
    });

    onMounted(async () => {
      await studentsStore.fetchStudents();

      if (isEditing.value) {
        const student = studentsStore.students.find(
          (s) => s.id === studentId.value
        );

        if (student) {
          studentData.value = { ...student };
        }
      }
    });

    const navigateStudents = () => {
      router.push("/");
    };

    const applyCpfMask = () => {
      studentData.value.document_number = studentsStore.formatCpf(
        studentData.value.document_number
      );
    };

    const rules = {
      required: (v) => !!v || "Campo obrigatório",
      email: (v) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || "E-mail inválido",
      cpf: (v) =>
        v.replace(/\D/g, "").length === 11 || "CPF deve ter 11 números"
    };

    const handleSaveStudent = async () => {
      const validationResult = await form.value?.validate();
      if (!validationResult?.valid) return;

      let navigate = false;

      if (isEditing.value) {
        navigate = await studentsStore.updateStudent(
          studentId.value,
          studentData.value
        );
      } else {
        navigate = await studentsStore.createStudent(studentData.value);
      }

      if (navigate) navigateStudents();
    };

    return {
      studentData,
      applyCpfMask,
      form,
      rules,
      navigateStudents,
      handleSaveStudent,
      notificationStore,
      isEditing
    };
  }
};
</script>

<style scope>
.v-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.conteiner-form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10% 0;
}

.inputs-form {
  width: 70%;
  margin-bottom: 20px;
}

.container-buttons {
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
