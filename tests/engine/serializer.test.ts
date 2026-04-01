import { describe, it, expect } from "vitest";
import { serialize } from "../../src/engine/serializer";
import type { ExpressionNode } from "../../src/types/expression";

describe("serialize", () => {
  it("serializes a literal string", () => {
    const node: ExpressionNode = { type: "literal", value: "hello" };
    expect(serialize(node)).toBe('"hello"');
  });

  it("serializes a literal number", () => {
    const node: ExpressionNode = { type: "literal", value: 42 };
    expect(serialize(node)).toBe("42");
  });

  it("serializes a literal boolean", () => {
    const node: ExpressionNode = { type: "literal", value: true };
    expect(serialize(node)).toBe("true");
  });

  it("serializes null literal", () => {
    const node: ExpressionNode = { type: "literal", value: null };
    expect(serialize(node)).toBe("null");
  });

  it("serializes an attribute reference", () => {
    const node: ExpressionNode = { type: "attribute", path: "user.email" };
    expect(serialize(node)).toBe("user.email");
  });

  it("serializes a simple function call", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "String.toUpperCase",
      arguments: [{ type: "attribute", path: "user.email" }],
    };
    expect(serialize(node)).toBe("String.toUpperCase(user.email)");
  });

  it("serializes nested function calls", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "String.toUpperCase",
      arguments: [
        {
          type: "function",
          name: "String.substringBefore",
          arguments: [
            { type: "attribute", path: "user.email" },
            { type: "literal", value: "@" },
          ],
        },
      ],
    };
    expect(serialize(node)).toBe(
      'String.toUpperCase(String.substringBefore(user.email, "@"))'
    );
  });

  it("serializes a ternary operator", () => {
    const node: ExpressionNode = {
      type: "operator",
      operator: "?:",
      operands: [
        {
          type: "operator",
          operator: "!=",
          operands: [
            { type: "attribute", path: "user.email" },
            { type: "literal", value: null },
          ],
        },
        { type: "attribute", path: "user.email" },
        { type: "literal", value: "no-email" },
      ],
    };
    expect(serialize(node)).toBe(
      'user.email != null ? user.email : "no-email"'
    );
  });

  it("serializes string concatenation", () => {
    const node: ExpressionNode = {
      type: "operator",
      operator: "+",
      operands: [
        { type: "attribute", path: "user.firstName" },
        { type: "literal", value: " " },
        { type: "attribute", path: "user.lastName" },
      ],
    };
    expect(serialize(node)).toBe('user.firstName + " " + user.lastName');
  });

  it("serializes a group node", () => {
    const node: ExpressionNode = {
      type: "group",
      expression: {
        type: "operator",
        operator: "+",
        operands: [
          { type: "literal", value: 1 },
          { type: "literal", value: 2 },
        ],
      },
    };
    expect(serialize(node)).toBe("(1 + 2)");
  });

  it("serializes comparison operators", () => {
    const node: ExpressionNode = {
      type: "operator",
      operator: "==",
      operands: [
        { type: "attribute", path: "user.department" },
        { type: "literal", value: "Engineering" },
      ],
    };
    expect(serialize(node)).toBe('user.department == "Engineering"');
  });

  it("serializes logical AND", () => {
    const node: ExpressionNode = {
      type: "operator",
      operator: "AND",
      operands: [
        {
          type: "operator",
          operator: "!=",
          operands: [
            { type: "attribute", path: "user.email" },
            { type: "literal", value: null },
          ],
        },
        {
          type: "function",
          name: "String.stringContains",
          arguments: [
            { type: "attribute", path: "user.email" },
            { type: "literal", value: "@company.com" },
          ],
        },
      ],
    };
    expect(serialize(node)).toBe(
      'user.email != null AND String.stringContains(user.email, "@company.com")'
    );
  });
});
