import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Login from "../../../pages/auth/Login";
import { MemoryRouter } from "react-router-dom";

describe("Login component", () => {
  test("should render", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(true).toBeTruthy();
  });
});
