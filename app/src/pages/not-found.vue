<template>
  <v-card class="not-found">
    <h1>404 - Página não encontrada</h1>
    <p>A página que você procura não existe.</p>
    <router-link to="/">Voltar para o início</router-link>
  </v-card>
</template>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
h1 {
  font-size: 2rem;
  color: red;
}
</style>
