import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Signup from "../../../pages/auth/Signup";
import { MemoryRouter } from "react-router-dom";

describe("Signup component", () => {
  test("should render", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    expect(true).toBeTruthy();
  });
});
