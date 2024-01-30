import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Note from "../../../pages/notes/Note";
import { GlobalProviders } from "../../App.test";

describe("Note component", () => {
  test("should render", () => {
    render(<Note />, { wrapper: GlobalProviders });
    expect(true).toBeTruthy();
  });
});
