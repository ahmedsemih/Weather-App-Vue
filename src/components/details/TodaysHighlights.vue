<script setup>
import SunCard from "@/components/cards/SunCard.vue";
import WindCard from "@/components/cards/WindCard.vue";
import UVIndexCard from "@/components/cards/UVIndexCard.vue";
import PercentageCard from "@/components/cards/PercentageCard.vue";
import VisibilityCard from "@/components/cards/VisibilityCard.vue";

defineProps({
  humidity: {
    type: Number,
    required: true,
  },
  visibility: {
    type: Number,
    required: true,
  },
  wind: {
    type: Object,
    required: true,
  },
  astro: {
    type: Object,
    required: true,
  },
  chanceOfRain: {
    type: Number,
    required: true,
  },
  uvIndex: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <section>
    <h3 class="title">Today's Highlights</h3>
    <div class="highlights">
      <SunCard :sunrise="astro.sunrise" :sunset="astro.sunset" />
      <UVIndexCard :uvIndex="uvIndex" />
      <WindCard
        :degree="wind.degree"
        :speed="wind.speed"
        :direction="wind.direction"
      />
      <PercentageCard
        :data="humidity"
        title="Humidity"
        :messages="{ low: 'dry', medium: 'comfortable', high: 'humid' }"
      />
      <PercentageCard
        :data="chanceOfRain"
        title="Chance of Rain"
        :messages="{ low: 'unlikely', medium: 'possible', high: 'likely' }"
      />
      <VisibilityCard :visibility="visibility" />
    </div>
  </section>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  margin-block: 1rem;
}

.highlights {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.highlight-card {
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--bg-color-secondary);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media screen and (max-width: 1300px) {
  .highlights {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 900px) {
  .highlights {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .highlights {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 550px) {
  .highlights {
    grid-template-columns: 1fr;
  }
  
}
</style>
