import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { userEvent } from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/vue";

import SearchBar from "../SearchBar.vue";
import { useSearchStore } from "@/stores/search";

function setup() {
  render(SearchBar, { global: { plugins: [createTestingPinia()] } });

  const user = userEvent.setup();
  const searchForm = screen.getByRole("form");
  const searchInput = screen.getByRole("textbox");
  const searchBtn = screen.getByTitle("Search");
  const historyList = screen.queryByRole("list");
  const locationBtn = screen.getByTitle(/Search by Location/i);

  return { searchForm, searchInput, searchBtn, historyList, locationBtn, user };
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
    const { searchInput, user } = setup();
    const searchStore = useSearchStore();

    await user.click(searchInput);
    await user.type(searchInput, "istanbul");
    await user.keyboard("{enter}");

    expect(searchStore.setSearch).toBeCalledWith("istanbul");
  });

  it("should set search by geolocation when clicked to location button", async () => {
    const { locationBtn, user } = setup();
    const searchStore = useSearchStore();

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
    const { locationBtn, user } = setup();
    const searchStore = useSearchStore();

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
    const { searchInput, user } = setup();
    const searchStore = useSearchStore();
    searchStore.history = ["istanbul", "london", "paris"];

    await user.click(searchInput);
    await user.click(screen.queryByRole("listitem", /istanbul/i));

    waitFor(() => expect(searchStore.setSearch).toBeCalledWith("istanbul"));
  });

  it("should not submit when input is empty", async () => {
    const { searchInput, user } = setup();
    const searchStore = useSearchStore();

    searchStore.search = "search 1";
    searchInput.nodeValue = "";
    await user.keyboard("{enter}");

    expect(searchStore.search).toBe("search 1");
  });

  it("should filter history when input is changed", async () => {
    const { searchInput, user } = setup();
    const searchStore = useSearchStore();
    searchStore.history = ["istanbul", "london", "paris"];

    await user.click(searchInput);
    await user.type(searchInput, "istanbul");

    waitFor(() => {
      expect(screen.queryByRole("listitem", /istanbul/i)).toBeInTheDocument();
      expect(screen.queryByRole("listitem", /london/i)).not.toBeInTheDocument();
      expect(screen.queryByRole("listitem", /paris/i)).not.toBeInTheDocument();
    });
  });

  describe("when input is focused", () => {
    it("should show history if histories exists", async () => {
      const { searchInput, historyList, user } = setup();
      const searchStore = useSearchStore();
      searchStore.history = ["search 1", "search 2"];

      await user.click(searchInput);
      waitFor(() => expect(historyList).toBeInTheDocument());
    });

    it("should hide history if histories does not exist", async () => {
      const { searchInput, historyList, user } = setup();
      const searchStore = useSearchStore();
      searchStore.history = [];

      await user.click(searchInput);
      expect(historyList).not.toBeInTheDocument();
    });

    it("should hide history after form submit", async () => {
      const { searchInput, historyList, user } = setup();

      await user.click(searchInput);
      await user.type(searchInput, "test");
      await user.keyboard("{enter}");

      waitFor(() => expect(historyList).not.toBeInTheDocument());
    });
  });

  describe("when input is blurred", () => {
    it("should hide history", async () => {
      const { searchInput, historyList, user } = setup();

      await user.click(searchInput);
      await user.tab();
      expect(historyList).not.toBeInTheDocument();
    });
  });
});
