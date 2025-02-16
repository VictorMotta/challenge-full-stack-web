<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialogModel" max-width="400" persistent>
      <v-card text="Are you want you sure delete this student?">
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="closeDialog" color="primary" variant="elevated">
            Disagree
          </v-btn>
          <v-btn @click="confirmDelete" color="primary" variant="outlined">
            Agree
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { useStudentsStore } from "../stores/studentsStore";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "DialogDeleteStudent",
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    studentId: {
      type: Number,
      required: true
    }
  },
  emits: ["update:dialog"],
  setup(props, { emit }) {
    const studentStore = useStudentsStore();
    const dialogModel = computed({
      get: () => props.dialog,
      set: (value) => emit("update:dialog", value)
    });

    const closeDialog = () => {
      emit("update:dialog", false);
    };

    const confirmDelete = async () => {
      await studentStore.deleteStudent(props.studentId);
      await studentStore.fetchStudents();
      await studentStore.updatePagination();
      closeDialog();
    };

    return { dialogModel, closeDialog, confirmDelete };
  }
});
</script>
