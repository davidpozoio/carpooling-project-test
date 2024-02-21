import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Form from "../../../../components/forms/Form";
import userEvent from "@testing-library/user-event";
import Input from "../../../../components/forms/Input";

describe("Form component", () => {
  test("should render", () => {
    render(
      <Form onSubmit={() => {}} fields={{}}>
        a
      </Form>
    );
    expect(true).toBeTruthy();
  });

  test("should execute submit function when all is good", async () => {
    const formState = {
      onSubmit: () => {},
    };
    const onSubmitSpy = vi
      .spyOn(formState, "onSubmit")
      .mockImplementation(() => {});

    render(
      <Form onSubmit={formState.onSubmit} fields={{ name: "" }}>
        <Input
          name="name"
          errors={{ required: { value: true, message: "name is required" } }}
          label="name:"
          placeholder=""
        />
        <button type="submit">submit</button>
      </Form>
    );
    const submit = screen.getByText("submit");
    const inputName = screen.getByLabelText("name:");
    await userEvent.click(inputName);
    await userEvent.keyboard("hola");
    await userEvent.click(submit);
    expect(onSubmitSpy).toHaveBeenCalled();
  });

  test("should not execute submit function when there is no valid inputs", async () => {
    const formState = {
      onSubmit: () => {},
    };
    const onSubmitSpy = vi
      .spyOn(formState, "onSubmit")
      .mockImplementation(() => {});

    render(
      <Form onSubmit={formState.onSubmit} fields={{ name: "" }}>
        <Input
          name="name"
          errors={{ required: { value: true, message: "name is required" } }}
          label="name:"
          placeholder=""
        />
        <button type="submit">submit</button>
      </Form>
    );
    const submit = screen.getByText("submit");
    await userEvent.click(submit);
    expect(onSubmitSpy).not.toHaveBeenCalled();
  });
});
