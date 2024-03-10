import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";
import { userEvent } from "@testing-library/user-event";

import SearchBar from "../SearchBar.vue";
import { useSearchStore } from "@/stores/search";

function setup(history = []) {
  const pinia = createTestingPinia();
  const searchStore = useSearchStore();
  searchStore.history = history;

  render(SearchBar, { global: { plugins: [pinia] } });

  const user = userEvent.setup();
  const searchForm = screen.getByRole("form");
  const searchInput = screen.getByRole("textbox");
  const searchBtn = screen.getByTitle("Search");
  const locationBtn = screen.getByTitle(/Search by Location/i);

  return {
    searchForm,
    searchInput,
    searchBtn,
    locationBtn,
    user,
    searchStore,
  };
}

describe("SearchBar", () => {
  it("should render properly", () => {
    const { searchForm, searchInput, searchBtn, locationBtn } = setup();

    expect(searchForm).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(locationBtn).toBeInTheDocument();
  });

  it("should set search when submitted", async () => {
    const { searchInput, user, searchStore } = setup();

    await user.click(searchInput);
    await user.type(searchInput, "istanbul");
    await user.keyboard("{enter}");

    expect(searchStore.setSearch).toBeCalledWith("istanbul");
  });

  it("should set search by geolocation when clicked to location button", async () => {
    const { locationBtn, user, searchStore } = setup();

    searchStore.search = "search 1";
    navigator.geolocation = {
      getCurrentPosition: vi.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 50,
              longitude: 50,
            },
          })
        )
      ),
    };

    await user.click(locationBtn);
    expect(searchStore.setSearch).toBeCalledWith("50,50");
  });

  it('should show alert when clicked to location button and "geolocation" is not available', async () => {
    window.alert = vi.fn();
    const { locationBtn, user, searchStore } = setup();

    searchStore.search = "search 1";
    navigator.geolocation = {
      getCurrentPosition: vi.fn().mockImplementationOnce((success, error) => {
        const positionError = {
          code: 1,
          message: "User denied Geolocation",
        };
        error(positionError);
      }),
    };

    await user.click(locationBtn);

    expect(searchStore.setSearch).not.toBeCalled();
    expect(window.alert).toHaveBeenCalledWith(
      "Please allow access to location for use this feature."
    );
  });

  it("should set search when clicked to history item", async () => {
    const { searchInput, user, searchStore } = setup([
      "istanbul",
      "london",
      "paris",
    ]);

    await user.click(searchInput);
    await user.click(screen.queryByText(/istanbul/i));

    expect(searchStore.setSearch).toBeCalledWith("istanbul");
  });

  it('should move between history items when "ArrowUp" and "ArrowDown" keys are pressed', async () => {
    const { searchInput, user } = setup(["istanbul", "london", "paris"]);

    await user.click(searchInput);
    await user.keyboard("{arrowdown}");

    const istanbul = screen.getByText(/istanbul/i);
    const london = screen.getByText(/london/i);
    const paris = screen.getByText(/paris/i);

    expect(istanbul.classList.contains("focused")).toBe(true);
    expect(london.classList.contains("focused")).toBe(false);
    expect(paris.classList.contains("focused")).toBe(false);

    await user.keyboard("{arrowdown}");

    expect(istanbul.classList.contains("focused")).toBe(false);
    expect(london.classList.contains("focused")).toBe(true);
    expect(paris.classList.contains("focused")).toBe(false);

    await user.keyboard("{arrowup}");

    expect(istanbul.classList.contains("focused")).toBe(true);
    expect(london.classList.contains("focused")).toBe(false);
    expect(paris.classList.contains("focused")).toBe(false);
  });

  it('should submit with focused history item when "Enter" key is pressed', async () => {
    const { searchInput, user, searchStore } = setup([
      "istanbul",
      "london",
      "paris",
    ]);

    await user.click(searchInput);
    await user.keyboard("{arrowdown}");

    await user.keyboard("{enter}");

    expect(searchStore.setSearch).toBeCalledWith("istanbul");
  });

  it("should not submit when input is empty", async () => {
    const { searchInput, user, searchStore } = setup();

    searchStore.search = "search 1";
    searchInput.nodeValue = "";
    await user.keyboard("{enter}");

    expect(searchStore.search).toBe("search 1");
  });

  it("should filter history when input is changed", async () => {
    const { searchInput, user } = setup(["istanbul", "london", "paris"]);

    await user.click(searchInput);
    await user.type(searchInput, "istanbul");

    const istanbul = screen.queryByText(/istanbul/i);
    const london = screen.queryByText(/london/i);
    const paris = screen.queryByText(/paris/i);

    expect(istanbul).toBeInTheDocument();
    expect(london).not.toBeInTheDocument();
    expect(paris).not.toBeInTheDocument();
  });

  describe("when input is focused", () => {
    it("should show history if histories exists", async () => {
      const { searchInput, user } = setup(["search 1", "search 2"]);

      await user.click(searchInput);
      const historyList = screen.queryByRole("list");

      expect(historyList).toBeInTheDocument();
    });

    it("should hide history if histories does not exist", async () => {
      const { searchInput, user } = setup();

      await user.click(searchInput);

      const historyList = screen.queryByRole("list");

      expect(historyList).not.toBeInTheDocument();
    });

    it("should hide history after form submit", async () => {
      const { searchInput, user } = setup();

      await user.click(searchInput);
      await user.type(searchInput, "test");
      await user.keyboard("{enter}");

      const historyList = screen.queryByRole("list");

      expect(historyList).not.toBeInTheDocument();
    });
  });

  describe("when input is blurred", () => {
    it("should hide history", async () => {
      const { searchInput, user } = setup();

      await user.click(searchInput);
      await user.tab();

      const historyList = screen.queryByRole("list");

      expect(historyList).not.toBeInTheDocument();
    });
  });
});
