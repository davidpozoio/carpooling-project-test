import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import Options from "../../components/Options";

describe("Options component", () => {
  const mocks = vi.hoisted(() => ({
    handleClick: vi.fn(),
    handleClose: vi.fn(),
  }));

  test("should render", () => {
    render(
      <Options
        onClose={() => {}}
        show
        values={[{ name: "delete", onClick: () => {} }]}
      />
    );
  });

  test("should show options", () => {
    render(
      <Options
        onClose={() => {}}
        show
        values={[
          { name: "delete", onClick: () => {} },
          { name: "delete 2", onClick: () => {} },
        ]}
      />
    );

    screen.getByText("delete");
    screen.getByText("delete 2");
  });

  test("should not show options", () => {
    render(
      <Options
        onClose={() => {}}
        show={false}
        values={[
          { name: "delete", onClick: () => {} },
          { name: "delete 2", onClick: () => {} },
        ]}
      />
    );

    const option1 = screen.queryByText("delete");
    const option2 = screen.queryByText("delete 2");

    expect(option1).not.toBeInTheDocument();
    expect(option2).not.toBeInTheDocument();
  });

  test("should execute option function", async () => {
    render(
      <Options
        onClose={() => {}}
        show
        values={[
          { name: "delete", onClick: mocks.handleClick },
          { name: "delete 2", onClick: () => {} },
        ]}
      />
    );
    const deleteOption = screen.getByText("delete");
    await userEvent.click(deleteOption);
    expect(mocks.handleClick).toHaveBeenCalled();
  });

  test("should execute onClose function", async () => {
    render(
      <>
        <span>out of options</span>
        <Options
          onClose={mocks.handleClose}
          show={true}
          values={[
            { name: "delete", onClick: mocks.handleClick },
            { name: "delete 2", onClick: () => {} },
          ]}
        />
      </>
    );

    const outContext = screen.getByText("out of options");
    await userEvent.click(outContext);
    expect(mocks.handleClose).toHaveBeenCalled();
    const option = screen.getByText("delete");
    await userEvent.click(option);
    expect(mocks.handleClose).toHaveBeenCalled();
  });
});
