import { describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

import { useSearchStore } from "../search";

function setup() {
  setActivePinia(createPinia());
  const store = useSearchStore();
  store.$cookies = {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  };

  return { store };
}

describe("search store", () => {
  it("should set search and add to history", () => {
    const { store } = setup();

    store.setSearch("test");
    store.addToHistory("test");

    expect(store.search).toBe("test");
    expect(store.history).toEqual(["test"]);
    expect(store.$cookies.set).toHaveBeenCalledWith("history", ["test"], "1y");
  });

  it("should set location waiting", () => {
    const { store } = setup();

    store.setLocationWaiting(true);
    expect(store.locationWaiting).toBe(true);

    store.setLocationWaiting(false);
    expect(store.locationWaiting).toBe(false);
  });

  it("should not duplicate items in history", () => {
    const { store } = setup();

    store.addToHistory("test");
    store.addToHistory("test");

    expect(store.history).toEqual(["test"]);
  });

  it("should limit history to 5 items", () => {
    const { store } = setup();

    for (let i = 0; i < 6; i++) {
      store.addToHistory(`test${i}`);
    }

    expect(store.history).toEqual([
      "test5",
      "test4",
      "test3",
      "test2",
      "test1",
    ]);
  });

  it("should clear history", () => {
    const { store } = setup();

    store.addToHistory("test");
    store.clearHistory();

    expect(store.history).toEqual([]);
    expect(store.$cookies.remove).toHaveBeenCalledWith("history");
  });

  it("should clear search", () => {
    const { store } = setup();

    store.setSearch("test");
    store.clearSearch();

    expect(store.search).toBe("");
  });
});
