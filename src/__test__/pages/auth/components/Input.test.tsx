import { render, fireEvent, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Input from "../../../../components/forms/Input";
import Form from "../../../../components/forms/Form";
import userEvent from "@testing-library/user-event";

describe("Input component", () => {
  test("should render", () => {
    render(
      <Form fields={{ name: "" }} onSubmit={() => {}}>
        <Input label="Name:" name="name" placeholder="" errors={{}} />
      </Form>
    );
    expect(true).toBeTruthy();
  });

  test("should write", () => {
    render(
      <Form fields={{ name: "" }} onSubmit={() => {}}>
        <Input
          label="Name:"
          placeholder="put your name"
          name="name"
          errors={{}}
        />
      </Form>
    );

    const nameInput = screen.getByLabelText("Name:") as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: "username" } });
    expect(nameInput.value).toBe("username");
  });

  test("should show required error", async () => {
    render(
      <Form fields={{ name: "" }} onSubmit={() => {}}>
        <Input
          label="Name:"
          placeholder="put your name"
          name="name"
          errors={{ required: { value: true, message: "name is required*" } }}
        />
      </Form>
    );

    const nameInput = screen.getByLabelText("Name:") as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();

    await userEvent.click(nameInput);
    await userEvent.keyboard("ju");
    await userEvent.keyboard("{backspace}{backspace}");

    const requiredError = screen.getByText("name is required*");
    expect(requiredError).toBeInTheDocument();
  });

  test("should show required error when I desfocus", async () => {
    render(
      <Form fields={{ name: "" }} onSubmit={() => {}}>
        <div>Desfocus Element</div>
        <Input
          label="Name:"
          placeholder="put your name"
          name="name"
          errors={{ required: { value: true, message: "name is required*" } }}
        />
      </Form>
    );

    const nameInput = screen.getByLabelText("Name:") as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();

    const desfocusElement = screen.getByText("Desfocus Element");

    await userEvent.click(nameInput);
    await userEvent.click(desfocusElement);

    const requiredError = screen.getByText("name is required*");
    expect(requiredError).toBeInTheDocument();
  });

  test("should handle different errors", async () => {
    render(
      <Form fields={{ name: "" }} onSubmit={() => {}}>
        <Input
          label="Name:"
          placeholder="put your name"
          name="name"
          errors={{
            required: { value: true, message: "name is required*" },
            minLength: { value: 8, message: "name must have 8 digits*" },
          }}
        />
      </Form>
    );

    const nameInput = screen.getByLabelText("Name:") as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();

    await userEvent.click(nameInput);
    await userEvent.keyboard("ju");
    await userEvent.keyboard("{backspace}{backspace}");

    const requiredError = screen.getByText("name is required*");
    expect(requiredError).toBeInTheDocument();

    await userEvent.keyboard("ju");
    const minLengthError = screen.getByText("name must have 8 digits*");
    expect(minLengthError).toBeInTheDocument();
    await userEvent.keyboard("{backspace}{backspace}");
    await userEvent.keyboard("12345678");

    expect(
      screen.queryByText("name must have 8 digits*")
    ).not.toBeInTheDocument();
    screen.debug();
  });
});
