import { describe, it, expect } from "vitest";
import { parse } from "../parser";

describe("parser", () => {
  describe("existing syntax (regression)", () => {
    it("parses string literals", () => {
      const result = parse('"hello"');
      expect(result).toEqual({ type: "literal", value: "hello" });
    });

    it("parses function calls", () => {
      const result = parse('String.toUpperCase("hello")');
      expect(result).toEqual({
        type: "function",
        name: "String.toUpperCase",
        arguments: [{ type: "literal", value: "hello" }],
      });
    });

    it("parses ternary operator", () => {
      const result = parse("true ? 1 : 0");
      expect(result).toEqual({
        type: "operator",
        operator: "?:",
        operands: [
          { type: "literal", value: true },
          { type: "literal", value: 1 },
          { type: "literal", value: 0 },
        ],
      });
    });

    it("parses addition", () => {
      const result = parse("1 + 2");
      expect(result).toEqual({
        type: "operator",
        operator: "+",
        operands: [
          { type: "literal", value: 1 },
          { type: "literal", value: 2 },
        ],
      });
    });

    it("parses comparison operators", () => {
      const result = parse("1 == 2");
      expect(result).toEqual({
        type: "operator",
        operator: "==",
        operands: [
          { type: "literal", value: 1 },
          { type: "literal", value: 2 },
        ],
      });
    });

    it("parses logical AND/OR", () => {
      const result = parse("true AND false");
      expect(result).toEqual({
        type: "operator",
        operator: "AND",
        operands: [
          { type: "literal", value: true },
          { type: "literal", value: false },
        ],
      });
    });

    it("parses attribute references", () => {
      const result = parse("user.email");
      expect(result).toEqual({ type: "attribute", path: "user.email" });
    });

    it("parses grouped expressions", () => {
      const result = parse("(1 + 2)");
      expect(result).toEqual({
        type: "group",
        expression: {
          type: "operator",
          operator: "+",
          operands: [
            { type: "literal", value: 1 },
            { type: "literal", value: 2 },
          ],
        },
      });
    });

    it("parses NOT / ! operators", () => {
      const result = parse("!true");
      expect(result).toEqual({
        type: "operator",
        operator: "!",
        operands: [{ type: "literal", value: true }],
      });
    });

    it("parses null literal", () => {
      const result = parse("null");
      expect(result).toEqual({ type: "literal", value: null });
    });
  });
});
