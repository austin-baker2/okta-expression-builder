import { describe, it, expect } from "vitest";
import type { AppProfileEntry, AppProfileData } from "../../types/expression";
import { hrisPresets } from "../hrisPresets";

describe("AppProfileData types", () => {
  it("supports preset-sourced entries", () => {
    const entry: AppProfileEntry = { value: "Engineering", source: "preset" };
    expect(entry.value).toBe("Engineering");
    expect(entry.source).toBe("preset");
  });

  it("supports custom-sourced entries", () => {
    const entry: AppProfileEntry = { value: "custom-val", source: "custom" };
    expect(entry.source).toBe("custom");
  });

  it("supports AppProfileData as a record", () => {
    const profile: AppProfileData = {
      department: { value: "Engineering", source: "preset" },
      customField: { value: "test", source: "custom" },
    };
    expect(profile.department.value).toBe("Engineering");
    expect(profile.customField.source).toBe("custom");
  });
});

describe("hrisPresets", () => {
  it("exports 4 presets", () => {
    expect(hrisPresets).toHaveLength(4);
  });

  it("each preset has id, name, and non-empty attributes", () => {
    for (const preset of hrisPresets) {
      expect(preset.id).toBeTruthy();
      expect(preset.name).toBeTruthy();
      expect(Object.keys(preset.attributes).length).toBeGreaterThan(0);
    }
  });

  it("includes Workday preset with confirmed base profile attributes", () => {
    const workday = hrisPresets.find((p) => p.id === "workday");
    expect(workday).toBeDefined();
    expect(workday!.attributes.employeeID).toBeDefined();
    expect(workday!.attributes.businessTitle).toBeDefined();
    expect(workday!.attributes.supervisoryOrg).toBeDefined();
    expect(workday!.attributes.managerUserName).toBeDefined();
  });

  it("includes SAP SuccessFactors preset with snake_case attributes", () => {
    const sap = hrisPresets.find((p) => p.id === "successfactors");
    expect(sap).toBeDefined();
    expect(sap!.attributes.person_id_external).toBeDefined();
    expect(sap!.attributes.employee_class).toBeDefined();
    expect(sap!.attributes.business_unit).toBeDefined();
  });

  it("includes UKG Pro preset with report template attributes", () => {
    const ukg = hrisPresets.find((p) => p.id === "ukgpro");
    expect(ukg).toBeDefined();
    expect(ukg!.attributes.employeeNumber).toBeDefined();
    expect(ukg!.attributes.eepPersonID).toBeDefined();
    expect(ukg!.attributes.lastHireDate).toBeDefined();
  });

  it("includes Aquera (ADP) preset with confirmed attributes", () => {
    const aquera = hrisPresets.find((p) => p.id === "aquera");
    expect(aquera).toBeDefined();
    expect(aquera!.attributes.associateOID).toBeDefined();
    expect(aquera!.attributes.workerID).toBeDefined();
    expect(aquera!.attributes.workerTypeCode).toBeDefined();
  });

  it("all attribute values are strings", () => {
    for (const preset of hrisPresets) {
      for (const [, value] of Object.entries(preset.attributes)) {
        expect(typeof value).toBe("string");
      }
    }
  });
});
