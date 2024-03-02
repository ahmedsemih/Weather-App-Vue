import { describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

import { useBookmarkStore } from "../bookmark";

function setup() {
  setActivePinia(createPinia());
  const bookmarkStore = useBookmarkStore();
  bookmarkStore.$cookies = { get: vi.fn(), set: vi.fn(), remove: vi.fn() };

  return { bookmarkStore };
}

describe("Bookmark Store", () => {
  it("should have no bookmarks as default", () => {
    const { bookmarkStore } = setup();

    expect(bookmarkStore.bookmarks).toEqual([]);
  });

  it("should add a bookmark", () => {
    const { bookmarkStore } = setup();

    bookmarkStore.addBookmark("bookmark1");
    expect(bookmarkStore.bookmarks).toEqual(["bookmark1"]);
  });

  it("should remove a bookmark", () => {
    const { bookmarkStore } = setup();
    bookmarkStore.bookmarks = ["bookmark1", "bookmark2"];

    bookmarkStore.removeBookmark("bookmark1");
    expect(bookmarkStore.bookmarks).toEqual(["bookmark2"]);
  });

  it("should clear all bookmarks", () => {
    const { bookmarkStore } = setup();
    bookmarkStore.bookmarks = ["bookmark1", "bookmark2"];

    bookmarkStore.clearBookmarks();
    expect(bookmarkStore.bookmarks).toEqual([]);
  });

  it("should check if a bookmark exists", () => {
    const { bookmarkStore } = setup();
    bookmarkStore.bookmarks = ["bookmark1", "bookmark2"];

    expect(bookmarkStore.isBookmarked("bookmark1")).toBe(true);
    expect(bookmarkStore.isBookmarked("bookmark2")).toBe(true);
    expect(bookmarkStore.isBookmarked("bookmark3")).toBe(false);
  });
});
