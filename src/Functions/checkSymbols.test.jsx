import { checkSymbols } from "./checkSymbols ";
import { describe, expect, it } from "vitest";

const operators = [
  { name: "division", symbol: "/" },
  { name: "addition", symbol: "+" },
  { name: "subtraction", symbol: "-" },
  { name: "multiplication", symbol: "x" },
  { name: "decimal", symbol: "." },
  { name: "percentage", symbol: "%" },
];

describe("#checkSymbols", () => {
  it("returns false when no symbol at the end", () => {
    expect(checkSymbols("", operators, 1)).toBe(false);
  });

  it("returns false when no symbol at the end", () => {
    expect(checkSymbols("7", operators, 1)).toBe(false);
  });
  it('returns true with symbol "/" at the end', () => {
    expect(checkSymbols("10/", operators, 1)).toBe(true);
  });
  it('returns true with symbol "+" at the end', () => {
    expect(checkSymbols("10+", operators, 1)).toBe(true);
  });
  it('returns true with symbol "-" at the end', () => {
    expect(checkSymbols("10-", operators, 1)).toBe(true);
  });
  it('returns true with symbol "x" at the end', () => {
    expect(checkSymbols("10x", operators, 1)).toBe(true);
  });
  it('returns true with symbol "." at the end', () => {
    expect(checkSymbols("10.", operators, 2)).toBe(true);
  });

  it('returns true with symbol "%" at the end', () => {
    expect(checkSymbols("5-10%", operators, 1)).toBe(true);
  });

  it('returns true with symbol "+" before the last item', () => {
    expect(checkSymbols("10.88+0", operators, 2)).toBe(true);
  });
});
