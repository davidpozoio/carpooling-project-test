import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header";

describe("Header component", () => {
  test("should render", () => {
    render(
      <MemoryRouter>
        <Header isHome={true} />
      </MemoryRouter>
    );
    expect(true).toBeTruthy();
  });

  test("should have a logotype", () => {
    render(
      <MemoryRouter>
        <Header isHome={true} />
      </MemoryRouter>
    );
    const logotype = screen.getByText("Blocky");
    expect(logotype).toBeTruthy();
  });

  test("should have two links when it's desktop version", () => {
    render(
      <MemoryRouter>
        <Header isHome={true} />
      </MemoryRouter>
    );
    const links = screen.getAllByText(/(Log in)|(Sign up)/g);
    expect(links.length).toBe(2);
  });

  test("should not render links when it's not in home", () => {
    render(
      <MemoryRouter>
        <Header isHome={false} />
      </MemoryRouter>
    );
    const links = screen.queryAllByText(/(Log in)|(Sign up)/g);
    expect(links.length).toBe(0);
  });
});
