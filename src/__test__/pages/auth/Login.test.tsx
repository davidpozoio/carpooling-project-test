import { render, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Login from "../../../pages/auth/Login";
import { GlobalProviders } from "../../App.test";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import ROUTES from "../../../consts/routes";

describe("Login component", () => {
  test("should render", () => {
    render(<Login />, { wrapper: GlobalProviders });
    expect(true).toBeTruthy();
  });

  test("should login", async () => {
    const loginSpy = vi.spyOn(axios, "post").mockImplementation(() => {
      return Promise.resolve({
        message: "success",
      });
    });

    render(<Login />, { wrapper: GlobalProviders });
    const username = screen.getByLabelText("Username:");
    const password = screen.getByLabelText("Password:");
    const submit = screen.getByText("Log in!");

    await userEvent.click(username);
    await userEvent.keyboard("juan");
    await userEvent.click(password);
    await userEvent.keyboard("123");
    await userEvent.click(submit);

    expect(loginSpy).toHaveBeenCalled();
  });

  test("should redirect when login", async () => {
    const loginSpy = vi.spyOn(axios, "post").mockImplementation(() => {
      return Promise.resolve({
        message: "success",
      });
    });

    render(
      <>
        <Login />
        <Routes>
          <Route path="" element={<span>main page</span>} />
          <Route path={ROUTES.NOTES.ME} element={<span>NOTES PAGE</span>} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );
    const username = screen.getByLabelText("Username:");
    const password = screen.getByLabelText("Password:");
    const submit = screen.getByText("Log in!");

    await userEvent.click(username);
    await userEvent.keyboard("juan");
    await userEvent.click(password);
    await userEvent.keyboard("123");
    await userEvent.click(submit);

    expect(loginSpy).toHaveBeenCalled();
    screen.debug();
    screen.getByText("NOTES PAGE");
  });
});
