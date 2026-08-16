import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

function Boom(): never {
  throw new Error("engine-specific failure");
}

describe("ErrorBoundary", () => {
  // React logs caught errors to console.error; silence it so a passing run is quiet.
  beforeEach(() => vi.spyOn(console, "error").mockImplementation(() => {}));
  afterEach(() => vi.restoreAllMocks());

  it("renders children when nothing throws", () => {
    render(
      <ErrorBoundary>
        <p>page content</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText("page content")).toBeInTheDocument();
  });

  it("swallows a throwing decorative subtree instead of propagating", () => {
    render(
      <div>
        <ErrorBoundary label="decoration">
          <Boom />
        </ErrorBoundary>
        <p>page content</p>
      </div>,
    );

    // The regression this guards: before the boundary existed, a throw here
    // unmounted the whole tree and left an empty #root — the blank iOS Safari
    // page in issue #7. Sibling content must survive.
    expect(screen.getByText("page content")).toBeInTheDocument();
  });

  it("shows the fallback when one is provided", () => {
    render(
      <ErrorBoundary label="root" fallback={<p>This page failed to load</p>}>
        <Boom />
      </ErrorBoundary>,
    );

    expect(screen.getByText("This page failed to load")).toBeInTheDocument();
  });
});
