import { describe, it, expect } from "vitest";
import { evaluate } from "../../src/engine/evaluator";
import type { ExpressionNode, ProfileData } from "../../src/types/expression";

const profile: ProfileData = {
  email: "jane.doe@acme.com",
  firstName: "Jane",
  lastName: "Doe",
  department: "Engineering",
  title: "Software Engineer",
};

describe("evaluate", () => {
  it("evaluates a literal string", () => {
    const node: ExpressionNode = { type: "literal", value: "hello" };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "hello" });
  });

  it("evaluates a literal number", () => {
    const node: ExpressionNode = { type: "literal", value: 42 };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: 42 });
  });

  it("evaluates an attribute reference", () => {
    const node: ExpressionNode = { type: "attribute", path: "user.email" };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "jane.doe@acme.com" });
  });

  it("returns null for missing attribute", () => {
    const node: ExpressionNode = { type: "attribute", path: "user.middleName" };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: null });
  });

  it("evaluates String.toUpperCase", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "String.toUpperCase",
      arguments: [{ type: "attribute", path: "user.firstName" }],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "JANE" });
  });

  it("evaluates String.toLowerCase", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "String.toLowerCase",
      arguments: [{ type: "attribute", path: "user.firstName" }],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "jane" });
  });

  it("evaluates String.substringBefore", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "String.substringBefore",
      arguments: [
        { type: "attribute", path: "user.email" },
        { type: "literal", value: "@" },
      ],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "jane.doe" });
  });

  it("evaluates String.substringAfter", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "String.substringAfter",
      arguments: [
        { type: "attribute", path: "user.email" },
        { type: "literal", value: "@" },
      ],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "acme.com" });
  });

  it("evaluates nested functions", () => {
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
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "JANE.DOE" });
  });

  it("evaluates String.stringContains", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "String.stringContains",
      arguments: [
        { type: "attribute", path: "user.email" },
        { type: "literal", value: "@acme" },
      ],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: true });
  });

  it("evaluates String.len", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "String.len",
      arguments: [{ type: "attribute", path: "user.firstName" }],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: 4 });
  });

  it("evaluates String.append", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "String.append",
      arguments: [
        { type: "attribute", path: "user.firstName" },
        { type: "literal", value: " Doe" },
      ],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "Jane Doe" });
  });

  it("evaluates String.replace", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "String.replace",
      arguments: [
        { type: "attribute", path: "user.email" },
        { type: "literal", value: "@acme.com" },
        { type: "literal", value: "@new.com" },
      ],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "jane.doe@new.com" });
  });

  it("evaluates String.removeSpaces", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "String.removeSpaces",
      arguments: [{ type: "literal", value: "hello world" }],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "helloworld" });
  });

  it("evaluates ternary operator", () => {
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
        { type: "literal", value: "default" },
      ],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "jane.doe@acme.com" });
  });

  it("evaluates string concatenation", () => {
    const node: ExpressionNode = {
      type: "operator",
      operator: "+",
      operands: [
        { type: "attribute", path: "user.firstName" },
        { type: "literal", value: " " },
        { type: "attribute", path: "user.lastName" },
      ],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: "Jane Doe" });
  });

  it("evaluates == comparison", () => {
    const node: ExpressionNode = {
      type: "operator",
      operator: "==",
      operands: [
        { type: "attribute", path: "user.department" },
        { type: "literal", value: "Engineering" },
      ],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: true });
  });

  it("returns unsupported for directory functions", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "hasDirectoryUser",
      arguments: [],
    };
    const result = evaluate(node, profile);
    expect(result.ok).toBe(false);
  });

  it("evaluates group nodes", () => {
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
    expect(evaluate(node, profile)).toEqual({ ok: true, value: 3 });
  });

  it("evaluates Convert.toInt", () => {
    const node: ExpressionNode = {
      type: "function",
      name: "Convert.toInt",
      arguments: [{ type: "literal", value: "42" }],
    };
    expect(evaluate(node, profile)).toEqual({ ok: true, value: 42 });
  });
});
