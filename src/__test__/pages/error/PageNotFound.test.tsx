import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PageNotFound from "../../../pages/error/PageNotFound";

describe("PageNotFound component", () => {
  test("should render", () => {
    render(<PageNotFound />);
    expect(true).toBeTruthy();
  });
});
