import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Rendered in place of `children` once a descendant throws. Defaults to
   *  nothing, which is what decorative subtrees want. */
  fallback?: ReactNode;
  /** Distinguishes boundaries in the console when one trips. */
  label?: string;
};

type State = { failed: boolean };

/**
 * Stops one broken subtree from taking down the document.
 *
 * React unmounts the entire tree on an uncaught render/effect error, so
 * without a boundary anywhere above it a single throw empties #root and the
 * page becomes a bare background color with no text - the symptom reported in
 * issue #7. Wrapping the decorative layers means an engine-specific failure
 * costs an animation, not the site.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.label ?? "ErrorBoundary"}]`, error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return this.props.fallback ?? null;
  }
}
