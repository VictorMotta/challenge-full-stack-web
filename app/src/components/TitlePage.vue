<template>
  <div class="container-title">
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TitlePage",
  props: {
    title: {
      type: String,
      required: true
    }
  }
});
</script>

<style scope>
.container-title {
  width: 100%;
  background-color: #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  color: black;

  padding: 10px;
}
</style>
