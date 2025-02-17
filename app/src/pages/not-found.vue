<template>
  <v-container class="not-found">
    <v-card class="not-found-card" elevation="10">
      <v-img
        src="/not-found-img.jpg"
        alt="Página não encontrada"
        class="error-image"
        contain
      ></v-img>

      <v-card-title class="error-title"
        >404 - Página não encontrada</v-card-title
      >
      <v-card-text class="error-text">
        A página que você procura não existe ou foi removida.
      </v-card-text>

      <v-card-actions class="button-container">
        <v-btn color="primary" variant="elevated" to="/" class="home-button">
          Voltar para o Início
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
.not-found-card {
  max-width: 500px;
  text-align: center;
  padding: 20px;
  background: white;
}
.error-image {
  width: 100%;
  max-height: 250px;
  margin-bottom: 20px;
}
.error-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: red;
}
.error-text {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
}

/* 🔹 Centraliza o botão */
.button-container {
  display: flex;
  justify-content: center;
}

/* 🔹 Botão estilizado */
.home-button {
  font-size: 1.1rem;
  padding: 10px 20px;
}
</style>
