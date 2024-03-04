import "@testing-library/jest-dom";
import { useQuery } from "vue-query";
import { describe, it, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";

import BookmarksView from "../BookmarksView.vue";
import { useBookmarkStore } from "@/stores/bookmark";

vi.mock("vue-query", () => ({
  useQuery: vi.fn(),
}));

function setup(bookmarks = []) {
  const pinia = createTestingPinia();
  const bookmarkStore = useBookmarkStore(pinia);
  bookmarkStore.bookmarks = bookmarks;

  useQuery.mockReturnValue({
    isLoading: false,
    data: {
      forecast: {
        forecastday: [
          {
            date: "2024-03-02",
            day: {
              maxtemp_c: 20,
              maxtemp_f: 68,
              mintemp_c: 10,
              mintemp_f: 50,
              avghumidity: 80,
              condition: {
                icon: "test-icon.png",
              },
            },
          },
        ],
      },
      location: { name: "Location Name", localtime: "2024-03-03 12:00" },
    },
    refetch: vi.fn(),
  });

  render(BookmarksView, {
    global: {
      plugins: [pinia],
    },
  });

  const emptyMessage = screen.queryByText(/no saved bookmarks/i);
  const bookmarkItems = screen.queryAllByText(/12:00/);

  return {
    emptyMessage,
    bookmarkItems,
  };
}

describe("BookmarksView", () => {
  it("should render empty message if no bookmarks", () => {
    const { emptyMessage, bookmarkItems } = setup();

    expect(emptyMessage).toBeInTheDocument();
    expect(bookmarkItems).toHaveLength(0);
  });
  
  it("should render bookmarks", () => {
    const { emptyMessage, bookmarkItems } = setup(["Istanbul", "Ankara"]);

    expect(emptyMessage).not.toBeInTheDocument();
    expect(bookmarkItems).toHaveLength(2);
  });
});
