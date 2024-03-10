<script setup>
import { RouterView } from "vue-router";

import TopBar from "@/components/topbar/TopBar.vue";
import SideBar from "@/components/sidebar/SideBar.vue";
</script>

<template>
  <main>
    <SideBar />
    <div class="right">
      <TopBar />
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  width: 1440px;
  height: 900px;
  display: grid;
  grid-template-columns: 2fr 5fr;
  margin: auto;
  gap: 0.5rem;
  background-color: var(--bg-color);
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.right {
  padding: 2rem;
  border-radius: 2rem;
}

@media (max-width: 1440px) {
  main {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    border-radius: 0;
    grid-template-columns: 1fr 2fr;
  }
  .right {
    padding: 2rem;
    border-radius: 0;
    min-height: 500px;
  }
}

@media (max-width: 1024px) {
  main {
    gap: 1rem;
    grid-template-columns: 332px 2fr;
  }
  .right {
    padding: 2rem 1rem;
  }
}

@media (max-width: 760px) {
  main {
    grid-template-columns: 1fr;
  }
}
</style>
