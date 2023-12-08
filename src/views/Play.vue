<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="8" lg="6" class="pa-4"  v-if="!over">
        <v-card :style="{ backgroundColor: cardColor}">        
          <v-card-text class="px-md-6">
            <v-card  v-if="!over" :style="{ backgroundColor: cardSectionColor, color: textColor, fontSize: fontText + 'px'}" class="mt-md-2 pa-4 pa-md-6">
              <v-card-title :style="{fontSize: fontTitre + 'px'}" class="d-flex justify-space-between my-4 mx-md-6 mt-md-6 mb-md-0">
                Temps restant : {{ minutes ? `${minutes}m${(seconds % 60) || ""}` : `${seconds}s` }}
              </v-card-title>
              <v-card-text class="text-center mt-2" style="color: #333 !important; opacity:1;" :style="{ fontSize: fontSubTitle + 'px'}">
                <v-divider class="py-2"></v-divider>
                {{ randomQuestions[active].title }}
              </v-card-text>
              <v-card-actions>
                <v-btn @click="handleAnswer(ans)" :style="{ backgroundColor: Color, color: textColor, fontSize: fontTitre + 'px'}" flat>{{ ans.title }}</v-btn>
              </v-card-actions>
            </v-card>
            <v-card  v-if="!over" :style="{ backgroundColor: cardSectionColor, color: textColor, fontSize: fontText + 'px'}" class="mt-4 mt-md-6 pa-4 pa-md-6">
              <v-card-title :style="{fontSize: fontTitre + 'px'}" class="d-flex justify-space-between my-4 mx-md-6 mt-md-6 mb-md-0">
                Temps restant : {{ minutes ? `${minutes}m${(seconds % 60) || ""}` : `${seconds}s` }}
              </v-card-title>
              <v-card-text class="text-center mt-2" style="color: #333 !important; opacity:1;" :style="{ fontSize: fontSubTitle + 'px'}">
                <v-divider class="py-2"></v-divider>
                {{ randomQuestions[active].title }}
              </v-card-text>
              <v-card-actions v-for="ans in randomQuestions[active].answers" v-bind:key="ans.title">
                <v-btn @click="handleAnswer(ans)">{{ ans.title }}</v-btn>
              </v-card-actions>
            </v-card>
            <v-card v-else-if="!done" :style="{ backgroundColor: cardSectionColor, color: textColor, fontSize: fontText + 'px'}" class="mt-4 mt-md-6 pa-4 pa-md-6">
              <v-card-title :style="{fontSize: fontTitre + 'px'}" class="d-flex justify-space-between my-4 mx-md-6 mt-md-6 mb-md-0">Perdu...</v-card-title>
              <v-card-text class="text-center mt-2" style="color: #333 !important; opacity:1;" :style="{ fontSize: fontSubTitle + 'px'}">
                <v-divider class="py-2"></v-divider>
                Score: {{ active }}/{{ randomQuestions.length }}
              </v-card-text>
            </v-card>
            <v-card :style="{ backgroundColor: cardSectionColor, color: textColor, fontSize: fontText + 'px'}" class="mt-4 mt-md-6 pa-4 pa-md-6">
              <v-card-title :style="{fontSize: fontTitre + 'px'}" class="d-flex justify-space-between my-4 mx-md-6 mt-md-6 mb-md-0">
                Bravo !
              </v-card-title>
              <v-card-text class="text-center mt-2" style="color: #333 !important; opacity:1;" :style="{ fontSize: fontSubTitle + 'px'}">
                Score: {{ active }}/{{ randomQuestions.length }}
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-actions block to="/play" :style="{ backgroundColor: Color, color: textColor, fontSize: fontTitre + 'px'  }" class="pa-4 pa-md-6">
            <v-btn @click="reset()">Réessayer</v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" persistent>
          <explanations :title="randomQuestions[active]?.title" :data="randomQuestions[active]?.data.explanations" @close="handleAnswerModalClose" />
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Explanations from '../components/Explanations.vue';
import questions from '../static/questions.json';

const active = ref(0);
const seconds = ref(0);
const minutes = computed(() => {
  return Math.floor(seconds.value / 60);
});
const done = ref(false);
const over = ref(false);
const timer = ref<NodeJS.Timeout>(null!);
const dialog = ref(false);
const truth = ref(false);

const Color = 'rgba(164, 64, 55, 0.4)';
const textColor = "#333";
const cardColor = 'rgba(145, 191, 99, 0.4)';
const cardSectionColor = '#8BD93D';
const fontTitre  = 22;
const fontSubTitle = 18;
const fontText = 16;

const randomQuestions = ref(questions);

const shuffleQuestions = () => {
  randomQuestions.value = questions
  .sort(() => Math.random() - 0.5)
  .map((q) => ({
    ...q,
    answers: q.answers.sort(() => Math.random() - 0.5),
  }));
};

const handleAnswer = (ans) => {
  dialog.value = true;
  truth.value = ans?.truth ?? false;
  clearInterval(timer.value);
};

const handleAnswerModalClose = () => {
  dialog.value = false;
  if (truth.value) {
    active.value++;
    if (active.value == randomQuestions.value?.length) {
      done.value = true;
      over.value = true;
    } else {
      seconds.value = 30;
      timer.value = setInterval(() => {
      seconds.value--;
      if (seconds.value == 0) {
        over.value = true;
        clearInterval(timer.value);
      }
    }, 1000);
    }
  } else {
    over.value = true;
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

  const toggleColor = () => {
      Color.value = Color.value === 'rgba(164, 64, 55, 0.4)' ? '#A64037' : 'rgba(164, 64, 55, 0.4)';
      textColor.value = textColor.value === '#333' ? "white" : "#333";
      cardColor.value = cardColor.value === 'rgba(145, 191, 99, 0.4)' ? "#8BD93D" : "rgba(145, 191, 99, 0.4)";
      cardSectionColor.value = cardSectionColor.value === '#8BD93D' ? "#A64037" : "#8BD93D";
      fontTitre.value = fontTitre.value === 22 ? 26 : 22;
      fontSubTitle.value = fontSubTitle.value === 18 ? 22 : 18;
      fontText.value = fontText.value === 16 ? 20 : 16;
  }
reset();
</script>