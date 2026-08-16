import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library only auto-registers this under vitest's `globals: true`,
// which this project does not enable; without it rendered trees stack up in
// document.body and queries match across tests.
afterEach(cleanup);
