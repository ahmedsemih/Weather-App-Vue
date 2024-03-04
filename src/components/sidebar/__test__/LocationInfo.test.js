import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";
import { userEvent } from "@testing-library/user-event";

import LocationInfo from "../LocationInfo.vue";
import { useBookmarkStore } from "@/stores/bookmark";

function setup(bookmarks = []) {
  const mockRefetch = vi.fn();
  const user = userEvent.setup();
  const pinia = createTestingPinia();
  const bookmarkStore = useBookmarkStore(pinia);

  bookmarkStore.bookmarks = bookmarks;
  bookmarkStore.$cookies = { get: vi.fn(), set: vi.fn() };

  render(LocationInfo, {
    props: {
      location: {
        name: "London",
        localtime: "2024-03-03 12:00",
      },
      refetch: mockRefetch,
    },
    global: {
      plugins: [pinia],
    },
  });

  const locationName = screen.getByRole("heading", { name: /london/i });
  const localTime = screen.getByText(/local time/i);
  const refreshButton = screen.getByRole("button", { name: /refresh/i });
  const addBookmarkButton = screen.queryByRole("button", { name: /add/i });
  const removeBookmarkButton = screen.queryByRole("button", { name: /remove/i });

  return {
    locationName,
    localTime,
    refreshButton,
    addBookmarkButton,
    removeBookmarkButton,
    bookmarkStore,
    mockRefetch,
    user,
  };
}

describe("LocationInfo", () => {
  it("should render elements properly", () => {
    const {
      locationName,
      localTime,
      refreshButton,
      addBookmarkButton,
      removeBookmarkButton,
    } = setup();

    expect(locationName).toBeInTheDocument();
    expect(localTime).toBeInTheDocument();
    expect(refreshButton).toBeInTheDocument();
    expect(addBookmarkButton).toBeInTheDocument();
    expect(removeBookmarkButton).not.toBeInTheDocument();
  });

  it("should refresh when refresh button is clicked", async () => {
    const { refreshButton, mockRefetch, user } = setup();

    await user.click(refreshButton);
    expect(mockRefetch).toHaveBeenCalled();
  });

  describe("when location is not bookmarked", () => {
    it("should render add to bookmark button", () => {
      const { addBookmarkButton, removeBookmarkButton } = setup();

      expect(addBookmarkButton).toBeInTheDocument();
      expect(removeBookmarkButton).not.toBeInTheDocument();
    });

    it("should add location to bookmark when button is clicked", async () => {
      const { addBookmarkButton, bookmarkStore, user } = setup();

      await user.click(addBookmarkButton);
      expect(bookmarkStore.addBookmark).toBeCalledWith("London");
    });
  });

  describe("when location is bookmarked", () => {
    it("should render remove bookmark button", async () => {
      const { addBookmarkButton, removeBookmarkButton } = setup(["London"]);

      expect(addBookmarkButton).not.toBeInTheDocument();
      expect(removeBookmarkButton).toBeInTheDocument();
    });

    it("should remove location from bookmark when button is clicked", async () => {
      const { removeBookmarkButton, bookmarkStore, user } = setup(["London"]);

      await user.click(removeBookmarkButton);
      expect(bookmarkStore.removeBookmark).toBeCalledWith("London");
    });
  });
});
