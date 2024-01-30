import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ProtectedRoute from "../../guards/ProtectedRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("ProtectedRouter component", () => {
  test("should render", () => {
    render(
      <ProtectedRoute canActive={true} path="">
        a
      </ProtectedRoute>
    );

    expect(true).toBeTruthy();
  });

  test("should render children when is canActive true", () => {
    render(
      <ProtectedRoute canActive={true} path="">
        <h1>Hello world</h1>
      </ProtectedRoute>
    );

    const title = screen.getByText("Hello world");
    expect(title).toBeInTheDocument();
  });

  test("should not render children when is canActive false", () => {
    render(
      <MemoryRouter>
        <ProtectedRoute canActive={false} path="">
          <h1>Hello world</h1>
        </ProtectedRoute>
      </MemoryRouter>
    );

    const title = screen.queryByText("Hello world");
    expect(title).not.toBeInTheDocument();
  });

  test("should navigate when canActive is false and there is a path", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute canActive={false} path="/home">
                <h1>Hello world</h1>
              </ProtectedRoute>
            }
          />
          <Route path="/home" element={<h1>Home</h1>} />
        </Routes>
      </MemoryRouter>
    );
    screen.debug();
    const home = screen.getByText("Home");
    expect(home).toBeInTheDocument();
  });
});
