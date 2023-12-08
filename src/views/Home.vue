<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="8" lg="6" class="pa-4">
        <v-card :style="{ backgroundColor: cardColor}">
          <v-card-title :style="{fontSize: fontTitre + 'px'}" class="d-flex justify-space-between my-4 mx-md-6 mt-md-6 mb-md-0">
            Idécolo
            <v-btn @click="toggleColor" :style="{ backgroundColor: Color, color: textColor, fontSize: fontTitre + 'px'}" flat>Accessibilité</v-btn>
          </v-card-title>
          <v-card-subtitle class="text-center mt-2" style="color: #333 !important; opacity:1;" :style="{ fontSize: fontSubTitle + 'px'}">Accepter de challengez votre point de vue</v-card-subtitle>
          <v-card-text class="px-md-6">
            <v-card :style="{ backgroundColor: cardSectionColor, color: textColor, fontSize: fontText + 'px'}" class="mt-md-2 pa-4 pa-md-6">
              <v-card-title>Changer le monde commence par changer nos perceptions</v-card-title>
              <v-card-text>
                <v-divider class="py-2"></v-divider>
                Il est facile de se laisser influencer par des idées reçues qui semblent décharger notre responsabilité individuelle. 
                L'une d'entre elles affirme que "ce n'est pas à moi de jouer un rôle puisque les autres ne le font pas". 
                Mais ici, nous croyons fermement que chaque action compte, chaque geste a un impact.
              </v-card-text>
            </v-card>
            <v-card :style="{ backgroundColor: cardSectionColor, color: textColor, fontSize: fontText + 'px'}" class="mt-4 mt-md-6 pa-4 pa-md-6">
              <v-card-title>L'effet de nos actions individuelles est bien plus grand qu'on ne le pense</v-card-title>
              <v-card-text>
                <v-divider class="py-2"></v-divider>
                Notre objectif est de démontrer que chaque pas vers des choix écologiques compte, 
                que chaque voix qui se joint à la cause de la durabilité environnementale contribue à un changement collectif crucial.
              </v-card-text>
            </v-card>
            <v-card :style="{ backgroundColor: cardSectionColor, color: textColor, fontSize: fontText + 'px'}" class="mt-4 mt-md-6 pa-4 pa-md-6">
              <v-card-title>Soyons des acteurs du changement, pas des spectateurs</v-card-title>
              <v-card-text>
                <v-divider class="py-2"></v-divider>
                <span>
                  Sur ce site, vous découvrirez des faits, des histoires inspirantes et des informations pour démystifier les idées fausses sur l'écologie. 
                  Nous vous invitons à explorer, à vous informer et à agir, car chaque personne qui s'engage fait avancer notre planète vers un avenir meilleur.<br/>
                  <br/>
                  Rejoignez-nous dans notre quête pour dépasser les idées reçues et pour être une force de changement pour notre planète !
                </span>
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-actions class="pa-4 pa-md-6">
            <v-btn block to="/play" :style="{ backgroundColor: Color, color: textColor, fontSize: fontTitre + 'px'  }">Lancer le challenge</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script lang="ts">
export default {
  data() {
    return {
      Color: 'rgba(164, 64, 55, 0.4)',
      textColor: "#333",
      cardColor: 'rgba(145, 191, 99, 0.4)',
      cardSectionColor: '#8BD93D',
      fontTitre : 22,
      fontSubTitle : 18,
      fontText: 16,
    };
  },
  methods: {
    toggleColor() {
      this.Color = this.Color === 'rgba(164, 64, 55, 0.4)' ? '#A64037' : 'rgba(164, 64, 55, 0.4)';
      this.textColor = this.textColor === '#333' ? "white" : "#333";
      this.cardColor = this.cardColor === 'rgba(145, 191, 99, 0.4)' ? "#8BD93D" : "rgba(145, 191, 99, 0.4)";
      this.cardSectionColor = this.cardSectionColor === '#8BD93D' ? "#A64037" : "#8BD93D";
      this.fontTitre = this.fontTitre === 22 ? 26 : 22;
      this.fontSubTitle = this.fontSubTitle === 18 ? 22 : 18;
      this.fontText = this.fontText === 16 ? 20 : 16;
    },
  },
};
</script>