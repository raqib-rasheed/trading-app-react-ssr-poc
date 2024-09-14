import { render, screen } from "@testing-library/react";
import Table from "./Table";
import { vi } from "vitest";

describe("Table Component", () => {
  const data = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    value: `Value ${index + 1}`,
  }));

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "value", label: "Value" },
  ];

  test("renders the correct number of rows", () => {
    render(<Table data={data} columns={columns} />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(11);
  });

  test("renders the correct content", () => {
    render(<Table data={data} columns={columns} />);
    const firstRow = screen.getByText("Item 1");
    expect(firstRow).toBeTruthy();
  });

  test("scrolling changes the visible rows", () => {
    const { container } = render(<Table data={data} columns={columns} />);
    const tbody = container.querySelector(".table__body") as HTMLElement;

    vi.useFakeTimers();
    tbody.scrollTop = 250;
    tbody.dispatchEvent(new Event("scroll"));

    vi.runAllTimers();

    const sixthRow = screen.getByText("Item 6");
    expect(sixthRow).toBeTruthy();
  });
});
