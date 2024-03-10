import "@testing-library/jest-dom";
import { useQuery } from "vue-query";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";

import SideBar from "../SideBar.vue";
import { useSearchStore } from "@/stores/search";

vi.mock("vue-query", () => ({
  useQuery: vi.fn(),
}));

function setup({ isIdle, isLoading, isError, data, locationWaiting }) {
  const pinia = createTestingPinia();
  const searchStore = useSearchStore(pinia);
  searchStore.history = ["Istanbul", "London"];
  searchStore.locationWaiting = locationWaiting || false;

  useQuery.mockReturnValue({
    isIdle,
    isLoading,
    isError,
    data,
    refetch: vi.fn(),
  });
  render(SideBar, { global: { plugins: [pinia] } });

  const idleMessage = screen.queryByLabelText(/idle message/i);
  const loader = screen.queryByLabelText(/loader/i);
  const errorMessage = screen.queryByLabelText(/error message/i);
  const notFoundMessage = screen.queryByLabelText(/not found message/i);
  const locationName = screen.queryByRole("heading", { name: /istanbul/i });

  return {
    idleMessage,
    loader,
    errorMessage,
    notFoundMessage,
    locationName,
  };
}

describe("SideBar", () => {
  it("should render idle message on start", () => {
    const { idleMessage, loader, errorMessage, notFoundMessage, locationName } =
      setup({ isIdle: true, isLoading: false, isError: false, data: null });

    expect(idleMessage).toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(notFoundMessage).not.toBeInTheDocument();
    expect(locationName).not.toBeInTheDocument();
  });

  it("should render loader when fetching data", () => {
    const { idleMessage, loader, errorMessage, notFoundMessage, locationName } =
      setup({ isIdle: false, isLoading: true, isError: false, data: null });

    expect(idleMessage).not.toBeInTheDocument();
    expect(loader).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(notFoundMessage).not.toBeInTheDocument();
    expect(locationName).not.toBeInTheDocument();
  });

  it("should render loader when location waiting is true", () => {
    const { idleMessage, loader, errorMessage, notFoundMessage, locationName } =
      setup({
        isIdle: false,
        isLoading: false,
        isError: false,
        data: null,
        locationWaiting: true,
      });

    expect(idleMessage).not.toBeInTheDocument();
    expect(loader).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(notFoundMessage).not.toBeInTheDocument();
    expect(locationName).not.toBeInTheDocument();
  });

  it("should render error message when fetching data fails", () => {
    const { idleMessage, loader, errorMessage, notFoundMessage, locationName } =
      setup({ isIdle: false, isLoading: false, isError: true, data: null });

    expect(idleMessage).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(notFoundMessage).not.toBeInTheDocument();
    expect(locationName).not.toBeInTheDocument();
  });

  it("should render not found message when no data", () => {
    const { idleMessage, loader, errorMessage, notFoundMessage, locationName } =
      setup({
        isIdle: false,
        isLoading: false,
        isError: false,
        data: { forecast: null },
      });

    expect(idleMessage).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(notFoundMessage).toBeInTheDocument();
    expect(locationName).not.toBeInTheDocument();
  });

  it("should render suggestions if no data", () => {
    setup({
      isIdle: false,
      isLoading: false,
      isError: false,
      data: { forecast: null },
    });

    const suggestionOne = screen.queryByRole("button", { name: /london/i });
    const suggestionTwo = screen.queryByRole("button", { name: /istanbul/i });

    expect(suggestionOne).toBeInTheDocument();
    expect(suggestionTwo).toBeInTheDocument();
  });

  it("should render weather forecast when data exists", () => {
    const { idleMessage, loader, errorMessage, notFoundMessage, locationName } =
      setup({
        isIdle: false,
        isLoading: false,
        isError: false,
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
          current: {
            feelslike_c: 20,
            feelslike_f: 68,
            temp_c: 20,
            temp_f: 68,
            wind_kph: 10,
            pressure_mb: 1015,
            humidity: 60,
            condition: {
              text: "Partly Cloudy",
            },
          },
        },
      });

    expect(idleMessage).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(notFoundMessage).not.toBeInTheDocument();
    expect(locationName).toBeInTheDocument();
  });
});
