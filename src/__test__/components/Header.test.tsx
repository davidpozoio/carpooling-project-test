import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import ROUTES from "../../consts/routes";
import userEvent from "@testing-library/user-event";

describe("Header component", () => {
  test("should render", () => {
    render(
      <MemoryRouter>
        <Header path="" />
      </MemoryRouter>
    );
    expect(true).toBeTruthy();
  });

  test("should have a logotype", () => {
    render(
      <MemoryRouter>
        <Header path="" />
      </MemoryRouter>
    );
    const logotype = screen.getByText("Blocky");
    expect(logotype).toBeTruthy();
  });

  test("should have two links when it's desktop version", () => {
    render(
      <MemoryRouter>
        <Header path="/home" />
      </MemoryRouter>
    );
    const links = screen.getAllByText(/(Log in)|(Sign up)/g);
    expect(links.length).toBe(2);
  });

  test("should not render links when it's not in home", () => {
    render(
      <MemoryRouter>
        <Header path="" />
      </MemoryRouter>
    );
    const links = screen.queryAllByText(/(Log in)|(Sign up)/g);
    expect(links.length).toBe(0);
  });

  test("should Blocky logotype redirect to main notes when I am in notes page", async () => {
    render(
      <MemoryRouter>
        <Header path="/notes" />
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route path={ROUTES.NOTES.ME} element={<span>notes page</span>} />
        </Routes>
      </MemoryRouter>
    );

    const logotype = screen.getByText("Blocky");
    await userEvent.click(logotype);
    screen.getByText("notes page");
  });
});
