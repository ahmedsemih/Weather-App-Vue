import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";
import { userEvent } from "@testing-library/user-event";

import LocationInfo from "../LocationInfo.vue";
import { useBookmarkStore } from "@/stores/bookmark";

function setupWithEmptyBookmarks() {
  const mockRefetch = vi.fn();

  render(LocationInfo, {
    props: {
      location: {
        name: "London",
        localtime: "2024-03-03 12:00",
      },
      refetch: mockRefetch,
    },
    global: {
      plugins: [createTestingPinia()],
    },
  });
  const bookmarkStore = useBookmarkStore();
  bookmarkStore.$cookies = { get: vi.fn(), set: vi.fn() };

  const locationName = screen.getByRole("heading", { name: /london/i });
  const localTime = screen.getByText(/local time/i);
  const refreshButton = screen.getByRole("button", { name: /refresh/i });
  const addBookmarkButton = screen.getByRole("button", { name: /add/i });
  const removeBookmarkButton = screen.queryByRole("button", { name: /remove/i });

  return {
    locationName,
    localTime,
    refreshButton,
    addBookmarkButton,
    removeBookmarkButton,
    bookmarkStore,
    mockRefetch,
  };
}

function setupWithBookmarks() {
  const pinia = createTestingPinia();
  const bookmarkStore = useBookmarkStore(pinia);
  bookmarkStore.bookmarks = ["London"];

  render(LocationInfo, {
    props: {
      location: {
        name: "London",
        localtime: "2024-03-03 12:00",
      },
      refetch: vi.fn(),
    },
    global: {
      plugins: [pinia],
    },
  });

  const removeBookmarkButton = screen.queryByTitle("Remove Bookmark");
  const addBookmarkButton = screen.queryByTitle("Add to Bookmarks");

  return { removeBookmarkButton, addBookmarkButton, bookmarkStore };
}

describe("LocationInfo", () => {
  it("should render elements properly", () => {
    const {
      locationName,
      localTime,
      refreshButton,
      addBookmarkButton,
      removeBookmarkButton,
    } = setupWithEmptyBookmarks();

    expect(locationName).toBeInTheDocument();
    expect(localTime).toBeInTheDocument();
    expect(refreshButton).toBeInTheDocument();
    expect(addBookmarkButton).toBeInTheDocument();
    expect(removeBookmarkButton).not.toBeInTheDocument();
  });
  it("should refresh when refresh button is clicked", async () => {
    const { refreshButton, mockRefetch } = setupWithEmptyBookmarks();
    const user = userEvent.setup();

    await user.click(refreshButton);
    expect(mockRefetch).toHaveBeenCalled();
  });

  describe("when location is not bookmarked", () => {
    it("should render add to bookmark button", () => {
      const { addBookmarkButton, removeBookmarkButton } =
        setupWithEmptyBookmarks();

      expect(addBookmarkButton).toBeInTheDocument();
      expect(removeBookmarkButton).not.toBeInTheDocument();
    });
    it("should add location to bookmark when button is clicked", async () => {
      const { addBookmarkButton, bookmarkStore } = setupWithEmptyBookmarks();
      const user = userEvent.setup();

      await user.click(addBookmarkButton);
      expect(bookmarkStore.addBookmark).toBeCalledWith("London");
    });
  });

  describe("when location is bookmarked", () => {
    it("should render remove bookmark button", async () => {
      const { addBookmarkButton, removeBookmarkButton } = setupWithBookmarks();

      expect(addBookmarkButton).not.toBeInTheDocument();
      expect(removeBookmarkButton).toBeInTheDocument();
    });
    it("should remove location from bookmark when button is clicked", async () => {
      const { removeBookmarkButton, bookmarkStore } = setupWithBookmarks();
      const user = userEvent.setup();

      await user.click(removeBookmarkButton);
      expect(bookmarkStore.removeBookmark).toBeCalledWith("London");
    });
  });
});
