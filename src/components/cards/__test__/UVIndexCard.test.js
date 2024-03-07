import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";

import UVIndexCard from "../UVIndexCard.vue";

describe("UVIndexCard", () => {
  it("should render data properly", () => {
    render(UVIndexCard, {
      props: {
        uvIndex: 5,
      },
    });

    const title = screen.getByRole("heading", { name: /uv index/i });
    const message = screen.getByText(/protection required/i);
    const uvBar = document.getElementsByClassName("uv-bar-data")[0];

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(uvBar).toBeInTheDocument();
  });

  it("should render bar by uv index value", () => {
    render(UVIndexCard, {
      props: {
        uvIndex: 5,
      },
    });

    const uvBar = document.getElementsByClassName("uv-bar-data")[0];

    expect(uvBar.style.width).toBe("40%");
    expect(uvBar.style.backgroundColor).toBe("rgb(255, 204, 51)");
  });
});
