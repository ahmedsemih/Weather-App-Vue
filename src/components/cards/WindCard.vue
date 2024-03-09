<script setup>
defineProps({
  speed: {
    type: Number,
    required: true,
  },
  degree: {
    type: Number,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <h4 class="card-title">Wind Status</h4>
    <p class="speed">{{ speed }} km/h</p>
    <div class="direction">
      <v-icon
        class="icon"
        scale="2"
        name="ri-compass-discover-line"
        :style="{ transform: `rotate(${degree - 45}deg)` }"
      />
      <p>{{ degree }}° {{ direction }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color-secondary);
  width: 100%;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  text-transform: capitalize;
}

.speed {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.direction {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
}
</style>
