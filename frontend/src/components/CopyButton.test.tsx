import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CopyButton } from "./CopyButton";

describe("CopyButton", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("copies text to the clipboard and shows copied feedback", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText,
      },
    });

    render(<CopyButton text={"Subject\n\nBody"} />);

    await user.click(screen.getByRole("button", { name: "Copy" }));

    expect(writeText).toHaveBeenCalledWith("Subject\n\nBody");
    expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument();
  });
});
