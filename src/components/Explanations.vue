<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <div v-for="part in data" v-bind:key="part">
        <p v-if="part.type == 'paragraph'">{{ part.value }}</p>
        <a target="_blank" :href="part.link" v-else-if="part.type == 'button'" :to="part.link">{{ part.value }}</a>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="emit('close')">Fermer</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);
const { data, title } = defineProps(['data', 'title']);
</script>