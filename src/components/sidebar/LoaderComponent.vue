<template>
  <div class="spinner-wrapper">
    <v-icon class="spinner" name="pr-spinner" aria-label="loader" />
  </div>
</template>

<style scoped>
.spinner-wrapper {
  animation: spin 2s linear infinite;
}

.spinner {
  scale: 2;
  color: var(--primary-color);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
