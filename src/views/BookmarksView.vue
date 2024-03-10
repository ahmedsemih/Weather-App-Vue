<script setup>
import { useBookmarkStore } from "@/stores/bookmark";
import BookmarkItem from "@/components/bookmarks/BookmarkItem.vue";

const bookmarkStore = useBookmarkStore();
</script>

<template>
  <div v-if="bookmarkStore.bookmarks?.length === 0" class="info">
    <v-icon scale="10" name="bi-journal-bookmark-fill" />
    <div class="message">
      <p class="message-title">You have no saved bookmarks yet.</p>
      <p>
        You can add that location as a bookmark by pressing the bookmark icon
        next to the location name.
      </p>
    </div>
  </div>
  <div class="bookmarks" v-else>
    <div v-for="bookmark in bookmarkStore.bookmarks" :key="bookmark">
      <BookmarkItem :location-name="bookmark" />
    </div>
  </div>
</template>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.message {
  margin-top: 2rem;
  font-size: 1.2rem;
  text-align: center;
  max-width: 600px;
}

.message-title {
  font-size: 1.5rem !important;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.bookmarks {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(900px - 5rem - 45px);
  padding-right: 0.5rem;
}

@media screen and (max-width: 1440px) {
  .info {
    padding-top: 2rem;
  }
}

@media (max-width: 768px) {
  .bookmarks {
    height: auto;
  }
}
</style>
