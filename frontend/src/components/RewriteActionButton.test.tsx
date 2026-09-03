import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RewriteActionsButton } from "./RewriteActionButton";

describe("RewriteActionsButton", () => {
  it.each([
    ["Shorten", "shorten"],
    ["Expand", "expand"],
    ["More Formal", "formal"],
    ["Friendlier", "friendly"],
    ["Improve Grammar", "grammar"],
  ] as const)("calls onRewrite with %s action", async (label, action) => {
    const user = userEvent.setup();
    const onRewrite = vi.fn();

    render(<RewriteActionsButton onRewrite={onRewrite} isLoading={false} />);

    await user.click(screen.getByRole("button", { name: label }));

    expect(onRewrite).toHaveBeenCalledWith(action);
  });

  it("disables rewrite buttons and shows loading feedback while rewriting", async () => {
    const user = userEvent.setup();
    const onRewrite = vi.fn();

    render(<RewriteActionsButton onRewrite={onRewrite} isLoading={true} />);

    const buttons = screen.getAllByRole("button");

    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
    expect(screen.getByText("Rewriting email...")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Shorten" }));
    expect(onRewrite).not.toHaveBeenCalled();
  });
});
