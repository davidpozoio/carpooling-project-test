import { render, screen, waitFor } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { GlobalProviders } from "../App.test";
import axios from "axios";
import AuthRoute from "../../guards/AuthRoute";
import ROUTES from "../../consts/routes";

describe("AuthRoute component", () => {
  test("should render", () => {
    render(<AuthRoute>a</AuthRoute>, { wrapper: GlobalProviders });
    expect(true).toBeTruthy();
  });

  test("should render children when user is authenticated", async () => {
    const authSpy = vi.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({ message: "user authenticated" });
    });

    render(
      <AuthRoute>
        <span>protected component</span>
      </AuthRoute>,
      { wrapper: GlobalProviders }
    );

    await waitFor(() => {
      expect(authSpy).toHaveBeenCalled();
    });

    screen.getByText("protected component");
    screen.debug();
  });

  test("should not render children when user is unauthenticated", () => {
    vi.spyOn(axios, "get").mockImplementation(() => {
      throw new Error();
      return Promise.resolve({ message: "user authenticated" });
    });

    render(
      <AuthRoute>
        <span>protected component</span>
      </AuthRoute>,
      { wrapper: GlobalProviders }
    );
    const protectedComponent = screen.queryByText("protected component");
    expect(protectedComponent).not.toBeInTheDocument();
  });

  test("should redirect to specify success path", async () => {
    const authSpy = vi.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({ message: "user authenticated" });
    });

    render(
      <>
        <AuthRoute redirectWhenSuccess={ROUTES.NOTES.ME} showContent>
          <span>protected component</span>
        </AuthRoute>
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route path={ROUTES.NOTES.ME} element={<span>notes page</span>} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );

    await waitFor(() => {
      expect(authSpy).toHaveBeenCalled();
    });

    screen.getByText("notes page");
    screen.debug();
  });

  test("should show content when prop 'showContent' is present", () => {
    render(
      <AuthRoute showContent>
        <span>protected component</span>
      </AuthRoute>,
      { wrapper: GlobalProviders }
    );

    screen.getByText("protected component");
  });
});
