<script setup>
import { RouterLink } from "vue-router";
import UnitSelector from "./UnitSelector.vue";
</script>

<template>
  <nav>
    <div class="links">
      <RouterLink class="router-link" to="/">Details</RouterLink>
      <RouterLink class="router-link" to="/bookmarks">Bookmarks</RouterLink>
    </div>
    <UnitSelector />
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: .9rem;
}
.links {
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
}

.router-link {
  border-bottom: 2px solid transparent;
  color: var(--text-color-soft);
}

.router-link:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
  opacity: .5;
}

.router-link-active {
  color: var(--primary-color);
  border-color: var(--primary-color);
  opacity: 1 !important;
}

@media (max-width: 400px) {
  .links {
    gap: 0.5rem;
    font-size: 1.2rem;
  }
}
</style>
