<template>
  <TitlePage title="Cadastro de aluno" />
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
      />
    </v-form>
  </div>
  <div class="container-buttons">
    <v-btn color="primary" variant="outlined" @click="navigateStudents">
      Cancel
    </v-btn>
    <v-btn class="ml-5" @click="createStudent"> Salvar </v-btn>
  </div>

  <v-snackbar v-model="snackbar.show" :timeout="3000" color="error">
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { CreateStudentService } from "../services/students/createStudentService";

export default {
  setup() {
    const router = useRouter();
    const form = ref(null);

    const studentData = ref({
      name: "",
      email: "",
      document_number: ""
    });

    const navigateStudents = () => {
      router.push("/");
    };

    const snackbar = ref({
      show: false,
      message: ""
    });

    const rules = {
      required: (v) => !!v || "Campo obrigatório",
      email: (v) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || "E-mail inválido",
      cpf: (v) =>
        v.replace(/\D/g, "").length === 11 || "CPF deve ter 11 números"
    };

    const applyCpfMask = () => {
      let value = studentData.value.document_number.replace(/\D/g, "");

      if (value.length > 3) value = value.slice(0, 3) + "." + value.slice(3);
      if (value.length > 7) value = value.slice(0, 7) + "." + value.slice(7);
      if (value.length > 11) value = value.slice(0, 11) + "-" + value.slice(11);
      if (value.length > 14) value = value.slice(0, 14);

      studentData.value.document_number = value;
    };

    const createStudent = async () => {
      const { valid } = await form.value.validate();
      if (!valid) return;

      const studentDataPayload = { ...studentData.value };

      studentDataPayload.document_number =
        studentDataPayload.document_number.replace(/\D/g, "");

      console.log("Payload enviado:", studentDataPayload);

      try {
        await CreateStudentService.instance.perform(studentDataPayload);
        navigateStudents();
      } catch (error) {
        console.error(error);
        snackbar.value.message = "Erro ao cadastrar aluno!";
        snackbar.value.show = true;
      }
    };

    return {
      studentData,
      form,
      rules,
      applyCpfMask,
      navigateStudents,
      createStudent,
      snackbar
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
