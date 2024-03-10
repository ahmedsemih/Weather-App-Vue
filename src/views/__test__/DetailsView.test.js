import "@testing-library/jest-dom";
import { useQuery } from "vue-query";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";

import DetailsView from "../DetailsView.vue";
import { useSearchStore } from "@/stores/search";

vi.mock("vue-query", () => ({
  useQuery: vi.fn(),
}));

function setup({ isIdle, isLoading, isError, data, locationWaiting }) {
  const mockRefetch = vi.fn();
  const pinia = createTestingPinia();
  const searchStore = useSearchStore(pinia);
  
  searchStore.locationWaiting = locationWaiting || false;

  useQuery.mockReturnValue({
    isIdle,
    isLoading,
    isError,
    data,
    refetch: mockRefetch,
  });

  render(DetailsView, { global: { plugins: [pinia] } });

  const idleMessage = screen.queryByLabelText(/idle message/i);
  const loader = screen.queryByLabelText(/loader/i);
  const errorMessage = screen.queryByLabelText(/error message/i);
  const refreshButton = screen.queryByRole("button", { name: /refresh/i });
  const notFoundMessage = screen.queryByLabelText(/not found message/i);

  return {
    idleMessage,
    loader,
    errorMessage,
    refreshButton,
    notFoundMessage,
    mockRefetch,
  };
}

describe("DetailsView", () => {
  it("should render idle message on start", () => {
    const {
      idleMessage,
      loader,
      errorMessage,
      refreshButton,
      notFoundMessage,
    } = setup({ isIdle: true, isLoading: false, isError: false, data: null });

    expect(idleMessage).toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(refreshButton).not.toBeInTheDocument();
    expect(notFoundMessage).not.toBeInTheDocument();
  });

  it("should render loader when fetching data", () => {
    const {
      idleMessage,
      loader,
      errorMessage,
      refreshButton,
      notFoundMessage,
    } = setup({ isIdle: false, isLoading: true, isError: false, data: null });

    expect(idleMessage).not.toBeInTheDocument();
    expect(loader).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(refreshButton).not.toBeInTheDocument();
    expect(notFoundMessage).not.toBeInTheDocument();
  });

  it("should render loader when location waiting is true", () => {
    const {
      idleMessage,
      loader,
      errorMessage,
      refreshButton,
      notFoundMessage,
    } = setup({ isIdle: false, isLoading: false, isError: false, data: null, locationWaiting: true});

    expect(idleMessage).not.toBeInTheDocument();
    expect(loader).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(refreshButton).not.toBeInTheDocument();
    expect(notFoundMessage).not.toBeInTheDocument();
  });

  it("should render error message when fetching data fails", () => {
    const {
      idleMessage,
      loader,
      errorMessage,
      refreshButton,
      notFoundMessage,
    } = setup({ isIdle: false, isLoading: false, isError: true, data: null });

    expect(idleMessage).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(refreshButton).toBeInTheDocument();
    expect(notFoundMessage).not.toBeInTheDocument();
  });

  it("should refetch data when refresh button is clicked", async () => {
    const { refreshButton, mockRefetch } = setup({
      isIdle: false,
      isLoading: false,
      isError: true,
      data: null,
    });
    const user = userEvent.setup();

    await user.click(refreshButton);
    expect(mockRefetch).toHaveBeenCalled();
  });

  it("should render not found message when no data", () => {
    const {
      idleMessage,
      loader,
      errorMessage,
      refreshButton,
      notFoundMessage,
    } = setup({
      isIdle: false,
      isLoading: false,
      isError: false,
      data: { forecast: null },
    });

    expect(idleMessage).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(refreshButton).not.toBeInTheDocument();
    expect(notFoundMessage).toBeInTheDocument();
  });

  it("should render details when data exists", () => {
    const {
      idleMessage,
      loader,
      errorMessage,
      refreshButton,
      notFoundMessage,
    } = setup({
      isIdle: false,
      isLoading: false,
      isError: false,
      data: {
        forecast: {
          forecastday: [
            {
              astro: {
                sunrise: "07:37 AM",
                sunset: "06:57 PM",
              },
              hour: [
                {
                  time_epoch: 1709326800,
                  time: "2024-03-02 00:00",
                  temp_c: 9.8,
                  temp_f: 49.7,
                  condition: {
                    icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
                  },
                },
              ],
              day: {
                avgvis_km: 10,
                avghumidity: 78,
                daily_chance_of_rain: 84,
                uv: 1,
              },
            },
          ],
        },
        current: { wind_degree: 320, wind_kph: 55, wind_dir: "NE" },
      },
    });

    const hourlyForecast = screen.getByRole("heading", {
      name: /hourly forecast/i,
    });
    const todaysHighlightsTitle = screen.getByRole("heading", {
      name: /today's highlights/i,
    });

    expect(hourlyForecast).toBeInTheDocument();
    expect(todaysHighlightsTitle).toBeInTheDocument();
    expect(idleMessage).not.toBeInTheDocument();
    expect(loader).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
    expect(refreshButton).not.toBeInTheDocument();
    expect(notFoundMessage).not.toBeInTheDocument();
  });
});
