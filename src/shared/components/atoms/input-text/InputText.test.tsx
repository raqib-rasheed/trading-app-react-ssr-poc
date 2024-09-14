import InputText from "./InputText";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

describe("Input Component", () => {
  test("renders the input field", () => {
    const handleChange = vi.fn();

    render(<InputText label="Name" value="" onChange={handleChange} />);
    const inputElement = screen.getByLabelText(/Name/i);
    expect(inputElement).not.toBeNull();
    expect(inputElement.tagName.toLowerCase()).toBe("input");
  });

  test("displays the placeholder text", () => {
    const handleChange = vi.fn();

    render(
      <InputText
        label="Name"
        value=""
        placeholder="Enter your name"
        onChange={handleChange}
      />
    );
    const inputElement = screen.getByPlaceholderText(/Enter your name/i);
    expect(inputElement).not.toBeNull();
    expect(inputElement.getAttribute("placeholder")).toBe("Enter your name");
  });

  test("calls onChange handler when input changes", () => {
    const handleChange = vi.fn();
    render(<InputText label="Name" value="" onChange={handleChange} />);
    const inputElement = screen.getByLabelText(/Name/i);
    fireEvent.change(inputElement, { target: { value: "John" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("John");
  });

  test("displays error message and sets aria attributes correctly", () => {
    const handleChange = vi.fn();

    render(
      <InputText
        label="Email"
        value=""
        error="Invalid email address"
        onChange={handleChange}
      />
    );
    const inputElement = screen.getByLabelText(/Email/i);
    const errorElement = screen.getByText(/Invalid email address/i);
    expect(errorElement).not.toBeNull();
    expect(inputElement.getAttribute("aria-invalid")).toBe("true");
    expect(inputElement.getAttribute("aria-describedby")).toBe(errorElement.id);
  });

  test("renders disabled input field", () => {
    const handleChange = vi.fn();

    render(
      <InputText
        label="Name"
        value=""
        disabled={true}
        onChange={handleChange}
      />
    );
    const inputElement = screen.getByLabelText(/Name/i);
    expect(inputElement).not.toBeNull();
    expect(inputElement.hasAttribute("disabled")).toBe(true);
  });
});
