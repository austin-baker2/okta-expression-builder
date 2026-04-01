import { describe, it, expect } from "vitest";
import { functionRegistry } from "../../src/data/functionRegistry";

describe("functionRegistry", () => {
  it("contains functions from all categories", () => {
    const categories = new Set(functionRegistry.map((f) => f.category));
    expect(categories).toContain("String");
    expect(categories).toContain("Array");
    expect(categories).toContain("Conversion");
    expect(categories).toContain("Directory");
    expect(categories).toContain("Manager");
    expect(categories).toContain("Time");
  });

  it("every function has required fields", () => {
    for (const fn of functionRegistry) {
      expect(fn.name).toBeTruthy();
      expect(fn.category).toBeTruthy();
      expect(fn.description).toBeTruthy();
      expect(fn.returnType).toBeTruthy();
      expect(fn.example).toBeTruthy();
      expect(Array.isArray(fn.parameters)).toBe(true);
    }
  });

  it("every parameter has required fields", () => {
    for (const fn of functionRegistry) {
      for (const param of fn.parameters) {
        expect(param.name).toBeTruthy();
        expect(param.type).toBeTruthy();
        expect(typeof param.required).toBe("boolean");
        expect(param.description).toBeTruthy();
      }
    }
  });

  it("has no duplicate function names", () => {
    const names = functionRegistry.map((f) => f.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("includes all String functions from spec", () => {
    const names = functionRegistry.map((f) => f.name);
    const expected = [
      "String.stringContains",
      "String.substringBefore",
      "String.substringAfter",
      "String.toUpperCase",
      "String.toLowerCase",
      "String.append",
      "String.replace",
      "String.replaceFirst",
      "String.len",
      "String.removeSpaces",
      "String.substring",
      "String.stringSwitch",
      "String.regexMatch",
    ];
    for (const name of expected) {
      expect(names).toContain(name);
    }
  });
});
