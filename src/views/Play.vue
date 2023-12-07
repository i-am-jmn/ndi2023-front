<template>
  <v-sheet v-if="!over">
    <h1>Temps restant : {{ minutes ? `${minutes}m${(seconds % 60) || ""}` : `${seconds}s` }}</h1>
    <p>{{ randomQuestions[active].title }}</p>
    <v-row>
      <v-col v-for="ans in randomQuestions[active].answers" v-bind:key="ans.title">
        <v-btn @click="handleAnswer(ans)">{{ ans.title }}</v-btn>
      </v-col>
    </v-row>
  </v-sheet>
  <v-sheet v-else-if="!done">
    <h1>Perdu...</h1>
    <p>Score: {{ active }}/{{ randomQuestions.length }}</p>
    <v-btn @click="reset()">Réessayer</v-btn>
  </v-sheet>
  <v-sheet v-else>
    <h1>Bravo !</h1>
    <p>Score: {{ active }}/{{ randomQuestions.length }}</p>
    <v-btn @click="reset()">Réessayer</v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import questions from '../static/questions.json';

const active = ref(0);
const seconds = ref(0);
const minutes = computed(() => {
  return Math.floor(seconds.value / 60);
});
const done = ref(false);
const over = ref(false);
const timer = ref<NodeJS.Timeout>(null!);

const randomQuestions = ref(questions);

const shuffleQuestions = () => {
  randomQuestions.value = questions
  .sort(() => Math.random() - 0.5)
  .map((q) => ({
    ...q,
    answers: q.answers.sort(() => Math.random() - 0.5),
  }));
};

const handleAnswer = ({ truth }) => {
  if (truth) {
    active.value++;
    if (active.value == randomQuestions.value.length) {
      done.value = true;
      over.value = true;
      clearInterval(timer.value);
    } else {
      seconds.value = 30;
    }
  } else {
    over.value = true;
    clearInterval(timer.value);
  }
};

const reset = () => {
  active.value = 0;
  seconds.value = 30;
  done.value = false;
  over.value = false;
  shuffleQuestions();

  timer.value = setInterval(() => {
    seconds.value--;
    if (seconds.value == 0) {
      over.value = true;
      clearInterval(timer.value);
    }
  }, 1000);
}

reset();
</script>