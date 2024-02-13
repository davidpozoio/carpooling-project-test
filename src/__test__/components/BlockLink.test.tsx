import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { GlobalProviders } from "../App.test";
import { useAppStore } from "../../store/store";
import ROUTES from "../../consts/routes";
import { Route, Routes } from "react-router-dom";
import BlockLink from "../../components/BlockLink";
import userEvent from "@testing-library/user-event";

describe("BlockLink component", () => {
  test("should render", () => {
    render(<BlockLink to={""}>link</BlockLink>, { wrapper: GlobalProviders });
    expect(true).toBeTruthy();
  });

  test("should redirect when is not updating note", async () => {
    useAppStore.setState({ blockLinks: false });
    render(
      <>
        <BlockLink to={ROUTES.NOTES.ME}>link</BlockLink>
        <Routes>
          <Route path={ROUTES.NOTES.ME} element={<span>notes page</span>} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );
    const link = screen.getByText("link");
    await userEvent.click(link);
    const notesPage = screen.queryByText("notes page");
    expect(notesPage).toBeInTheDocument();
  });

  test("should not redirect when is updating note", async () => {
    useAppStore.setState({ blockLinks: true });
    render(
      <>
        <BlockLink to={ROUTES.NOTES.ME}>link</BlockLink>
        <Routes>
          <Route path={ROUTES.NOTES.ME} element={<span>notes page</span>} />
        </Routes>
      </>,
      { wrapper: GlobalProviders }
    );
    const link = screen.getByText("link");
    await userEvent.click(link);
    const notesPage = screen.queryByText("notes page");
    expect(notesPage).not.toBeInTheDocument();
  });
  test;
});
