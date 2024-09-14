import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { vi } from "vitest";

describe("Button Component", () => {
  test("renders the primary button", () => {
    render(<Button variant="primary">Primary Button</Button>);
    const buttonElement = screen.getByText(/Primary Button/i);
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.tagName.toLowerCase()).toBe("button");
  });

  test("renders the secondary button", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const buttonElement = screen.getByText(/Secondary Button/i);
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.tagName.toLowerCase()).toBe("button");
  });

  test("renders the danger button", () => {
    render(<Button variant="danger">Danger Button</Button>);
    const buttonElement = screen.getByText(/Danger Button/i);
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.tagName.toLowerCase()).toBe("button");
  });

  test("renders an icon button", () => {
    render(<Button isIcon icon={<span>🔍</span>} />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).not.toBeNull();
    expect(buttonElement.tagName.toLowerCase()).toBe("button");
  });

  test("calls onClick when button is clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
