import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { useAppStore } from "../store/store";

const initialState = useAppStore.getState();

beforeEach(() => {
  useAppStore.setState(initialState);
});

afterEach(() => {
  cleanup();
});
