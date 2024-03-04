import "@testing-library/jest-dom";
import { useQuery } from "vue-query";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";

import BookmarkItem from "@/components/bookmarks/BookmarkItem.vue";

vi.mock("vue-query", () => ({
  useQuery: vi.fn(),
}));

function setup({ isLoading, data }) {
  useQuery.mockReturnValue({
    isLoading,
    data,
    refetch: vi.fn(),
  });

  render(BookmarkItem, { global: { plugins: [createTestingPinia()] } });

  const loader = screen.queryByLabelText("loader");
  const locationName = screen.queryByRole("heading", { name: /istanbul/i });
  const localTime = screen.queryByText(/12:00/i);
  const dailyForecasts = screen.queryAllByRole("img", {
    name: /weather-image/i,
  });

  return {
    loader,
    locationName,
    localTime,
    dailyForecasts,
  };
}

describe("BookmarkItem", () => {
  it("should render loader if data is loading", () => {
    const { loader, locationName, localTime, dailyForecasts } = setup({
      isLoading: true,
      data: null,
    });

    expect(loader).toBeInTheDocument();
    expect(locationName).not.toBeInTheDocument();
    expect(localTime).not.toBeInTheDocument();
    expect(dailyForecasts).toHaveLength(0);
  });

  it("should render nothing if no data", () => {
    const { loader, locationName, localTime, dailyForecasts } = setup({
      isLoading: false,
      data: null,
    });

    expect(loader).not.toBeInTheDocument();
    expect(locationName).not.toBeInTheDocument();
    expect(localTime).not.toBeInTheDocument();
    expect(dailyForecasts).toHaveLength(0);
  });

  it("should show data properly", () => {
    const { loader, localTime, locationName, dailyForecasts } = setup({
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
        location: { name: "Istanbul", localtime: "2024-03-03 12:00" },
      }
    });

    expect(locationName).toBeInTheDocument();
    expect(localTime).toBeInTheDocument();
    expect(dailyForecasts).toHaveLength(1);
    expect(loader).not.toBeInTheDocument();
  });
});
