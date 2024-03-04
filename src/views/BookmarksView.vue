<script setup>
import { useBookmarkStore } from "@/stores/bookmark";
import BookmarkItem from "@/components/bookmarks/BookmarkItem.vue";

const bookmarkStore = useBookmarkStore();
</script>

<template>
  <div v-if="bookmarkStore.bookmarks?.length === 0" class="message">
    <p>
        You have no saved bookmarks yet. 
    </p>
    <p>
        You can add that location as a bookmark by
        pressing the bookmark icon next to the location name.
    </p>
  </div>
  <div class="bookmarks" v-else>
    <div v-for="bookmark in bookmarkStore.bookmarks" :key="bookmark">
      <BookmarkItem :location-name="bookmark" />
    </div>
  </div>
</template>

<style scoped>
.message {
  margin-top: 2rem;
  font-size: 1.2rem;
}

.bookmarks {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(900px - 4rem - 45px);
  padding-right: 0.5rem;
}

@media (max-width: 768px) {
  .bookmarks {
    height: auto;
  }
}
</style>
