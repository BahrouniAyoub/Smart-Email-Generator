import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import EmailForm from "./EmailForm";
import type { EmailFormData } from "../types/email";

const defaultFormData: EmailFormData = {
  purpose: "",
  recipient: "",
  context: "",
  tone: "Professional",
  language: "English",
  length: "Short",
};

function renderEmailForm({
  initialData = defaultFormData,
  isLoading = false,
  onGenerate = vi.fn(),
}: {
  initialData?: EmailFormData;
  isLoading?: boolean;
  onGenerate?: (data: EmailFormData) => void;
} = {}) {
  function Wrapper() {
    const [formData, setFormData] = useState(initialData);

    return (
      <EmailForm
        formData={formData}
        onChange={setFormData}
        onGenerate={onGenerate}
        isLoading={isLoading}
      />
    );
  }

  render(<Wrapper />);

  return { onGenerate };
}

describe("EmailForm", () => {
  it("shows validation errors and does not generate when required fields are empty", async () => {
    const user = userEvent.setup();
    const { onGenerate } = renderEmailForm();

    await user.click(screen.getByRole("button", { name: /generate email/i }));

    expect(screen.getByText("Purpose is required.")).toBeInTheDocument();
    expect(onGenerate).not.toHaveBeenCalled();
  });

  it("shows a context validation error and does not generate when context is empty", async () => {
    const user = userEvent.setup();
    const { onGenerate } = renderEmailForm({
      initialData: {
        ...defaultFormData,
        purpose: "Follow up",
      },
    });

    await user.click(screen.getByRole("button", { name: /generate email/i }));

    expect(screen.getByText("Context is required.")).toBeInTheDocument();
    expect(onGenerate).not.toHaveBeenCalled();
  });

  it("calls onGenerate with valid form data", async () => {
    const user = userEvent.setup();
    const { onGenerate } = renderEmailForm({
      initialData: {
        ...defaultFormData,
        purpose: "Follow up",
        recipient: "Sam",
        context: "Ask about next steps.",
      },
    });

    await user.click(screen.getByRole("button", { name: /generate email/i }));

    expect(onGenerate).toHaveBeenCalledWith({
      purpose: "Follow up",
      recipient: "Sam",
      context: "Ask about next steps.",
      tone: "Professional",
      language: "English",
      length: "Short",
    });
  });

  it("disables submission and shows loading text while generation is in progress", async () => {
    const user = userEvent.setup();
    const { onGenerate } = renderEmailForm({
      initialData: {
        ...defaultFormData,
        purpose: "Follow up",
        recipient: "Sam",
        context: "Ask about next steps.",
      },
      isLoading: true,
    });

    const button = screen.getByRole("button", { name: /generating/i });

    expect(button).toBeDisabled();
    await user.click(button);
    expect(onGenerate).not.toHaveBeenCalled();
  });
});
