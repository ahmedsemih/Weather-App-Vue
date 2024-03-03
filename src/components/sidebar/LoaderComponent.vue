<template>
  <v-icon class="spinner" name="pr-spinner" aria-label="loader" />
</template>

<style scoped>
.spinner {
  animation: spin 2s linear infinite;
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
