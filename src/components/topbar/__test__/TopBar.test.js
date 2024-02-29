import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import {userEvent} from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/vue";
import { createMemoryHistory, createRouter } from "vue-router";

import TopBar from "../TopBar.vue";
import { useUnitStore } from "@/stores/unit";

function setup() {
  setActivePinia(createPinia());
  const unitStore = useUnitStore();
  unitStore.$cookies = { get: vi.fn(), set: vi.fn() };

  const user = userEvent.setup();
  const history = createMemoryHistory();
  const router = createRouter({
    history,
    routes: [
      { path: "/", component: { template: "<div />" } },
      { path: "/bookmarks", component: { template: "<div />" } },
    ],
  });

  render(TopBar, {
    global: {
      plugins: [router],
    },
  });

  const unitSelector = screen.getByTestId("unitSelector");
  const detailsLink = screen.getByRole("link", { name: /details/i });
  const bookmarksLink = screen.getByRole("link", { name: /bookmarks/i });

  return { detailsLink, bookmarksLink, unitSelector, router, user };
}

describe("TopBar", () => {
  it("should render elements properly", () => {
    const { detailsLink, bookmarksLink, unitSelector } = setup();

    expect(detailsLink).toBeInTheDocument();
    expect(bookmarksLink).toBeInTheDocument();
    expect(unitSelector).toBeInTheDocument();
  });

  it('should navigate to "/bookmarks" when bookmarks link is clicked', async () => {
    const { bookmarksLink, router, user } = setup();

    user.click(bookmarksLink);
    waitFor(() => expect(router.getCurrentLocation()).toBe("/bookmarks"));
  });

  it('should navigate to "/" when details link is clicked', async () => {
    const { detailsLink, router, user } = setup();

    user.click(detailsLink);
    waitFor(() => expect(router.getCurrentLocation()).toBe("/"));
  });
});
