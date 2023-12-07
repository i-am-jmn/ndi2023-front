<template>
  <v-sheet color="primary" class="py-16">
    <v-container class="">
      <v-row align-content="space-between">
        <v-col cols="12" md="8" lg="6">
          <h1>Idécolo</h1>
          <p>Accepter de challengez votre point de vue.</p>
        </v-col>
        <v-col cols="12" md="4" lg="6">
          <v-sheet color="transparent" class="d-flex h-100 justify-end align-center">
            <v-btn flat to="/play" color="secondary">Lancer le challenge</v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
