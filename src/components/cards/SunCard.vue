<script setup>
defineProps({
  sunrise: {
    type: String,
    required: true,
  },
  sunset: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <h4 class="card-title">Sunrise & Sunset</h4>
    <div class="content">
      <v-icon class="icon" scale="3" name="bi-sunrise-fill" />
      <p>{{ sunrise }}</p>
    </div>
    <div class="content">
      <v-icon class="icon" scale="3" name="bi-sunset-fill" />
      <p>{{ sunset }}</p>
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

.content {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  font-size: 1.2rem;
}

.icon {
  color: #ffcc33;
}
</style>
