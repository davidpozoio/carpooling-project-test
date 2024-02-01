import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { GlobalProviders } from "../../../App.test";
import { Route, Routes } from "react-router-dom";
import ROUTES from "../../../../consts/routes";
import userEvent from "@testing-library/user-event";
import Navigator from "../../../../pages/notes/components/Navigator";
import AuthRoute from "../../../../guards/AuthRoute";

describe("Navigator component", () => {
  const mocks = vi.hoisted(() => ({
    logout: vi.fn(() =>
      Promise.resolve({
        message: "logout succesfully",
      })
    ),
  }));

  vi.mock("/src/services/authService", () => ({
    logout: mocks.logout,
  }));

  test("should render", () => {
    render(<Navigator />, { wrapper: GlobalProviders });
    expect(true).toBeTruthy();
  });

  test("should have a links My notes, Trash, and Log out", () => {
    render(<Navigator />, { wrapper: GlobalProviders });
    screen.getByText("My notes");
    screen.getByText("Trash");
    screen.getByText("Log out");
  });

  test("should navigate to each page", async () => {
    render(
      <>
        <Navigator />
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route path={ROUTES.NOTES.ME} element={<span>notes page</span>} />
          <Route path={ROUTES.NOTES.TRASH} element={<span>trash page</span>} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );
    const trashLink = screen.getByText("Trash");
    const notesLink = screen.getByText("My notes");
    await userEvent.click(trashLink);
    screen.getByText("trash page");

    await userEvent.click(notesLink);
    screen.getAllByText("notes page");
  });

  test("should logout", async () => {
    render(
      <>
        <AuthRoute showContent>
          <Navigator />
        </AuthRoute>

        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route path={ROUTES.AUTH.LOGIN} element={<span>login page</span>} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );

    const logoutButton = screen.getByText("Log out");
    await userEvent.click(logoutButton);
    await waitFor(() => {
      expect(mocks.logout).toBeCalled();
    });
    await screen.findByText("login page");
  });
});
