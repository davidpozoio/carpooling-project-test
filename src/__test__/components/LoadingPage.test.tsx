import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import LoadingPage from "../../components/LoadingPage";

describe("LoadingPage component", () => {
  test("should render", () => {
    render(<LoadingPage />);
    expect(true).toBeTruthy();
  });
});
