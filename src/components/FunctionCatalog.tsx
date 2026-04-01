import { useState, useMemo } from "react";
import { functionRegistry } from "../data/functionRegistry";
import type { ELFunction } from "../types/expression";

interface FunctionCatalogProps {
  onSelect: (fn: ELFunction) => void;
  onSelectAttribute: (path: string) => void;
  onSelectLiteral: (value: string | number | boolean | null) => void;
  onClose: () => void;
}

const categories = [
  "All",
  "String",
  "Array",
  "Conversion",
  "Directory",
  "Manager",
  "Time",
];

export default function FunctionCatalog({
  onSelect,
  onSelectAttribute,
  onSelectLiteral,
  onClose,
}: FunctionCatalogProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [tab, setTab] = useState<"functions" | "attributes" | "literal">("functions");
  const [literalValue, setLiteralValue] = useState("");
  const [literalType, setLiteralType] = useState<"string" | "number" | "boolean" | "null">(
    "string"
  );

  const filtered = useMemo(() => {
    let fns = functionRegistry;
    if (activeCategory !== "All") {
      fns = fns.filter((f) => f.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      fns = fns.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q)
      );
    }
    return fns;
  }, [search, activeCategory]);

  const commonAttributes = [
    "user.login",
    "user.email",
    "user.firstName",
    "user.lastName",
    "user.displayName",
    "user.department",
    "user.title",
    "user.organization",
    "user.division",
    "user.userType",
    "user.employeeNumber",
    "user.costCenter",
    "user.managerId",
    "user.manager",
    "user.mobilePhone",
    "user.primaryPhone",
    "user.streetAddress",
    "user.city",
    "user.state",
    "user.zipCode",
    "user.countryCode",
  ];

  const [customAttr, setCustomAttr] = useState("");

  const handleLiteralSubmit = () => {
    switch (literalType) {
      case "string":
        onSelectLiteral(literalValue);
        break;
      case "number":
        onSelectLiteral(Number(literalValue));
        break;
      case "boolean":
        onSelectLiteral(literalValue === "true");
        break;
      case "null":
        onSelectLiteral(null);
        break;
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-bg-surface border border-border shadow-2xl w-full max-w-lg max-h-[70vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex gap-1 mb-3">
            {(["functions", "attributes", "literal"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors ${
                  tab === t
                    ? "bg-accent text-bg-deep"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {t === "functions" ? "Functions" : t === "attributes" ? "Attributes" : "Literal"}
              </button>
            ))}
          </div>

          {tab === "functions" && (
            <>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search functions..."
                autoFocus
                className="w-full bg-bg-elevated border border-border px-3 py-2 text-sm font-mono text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              />
              <div className="flex gap-1 mt-3 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                      activeCategory === cat
                        ? "text-accent bg-accent-dim"
                        : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-2">
          {tab === "functions" &&
            filtered.map((fn) => (
              <button
                key={fn.name}
                onClick={() => onSelect(fn)}
                className="w-full text-left px-3 py-2.5 hover:bg-bg-hover transition-colors group border-b border-border-subtle last:border-0"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-mono text-accent group-hover:text-accent-hover">
                    {fn.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                    {fn.category}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-0.5">{fn.description}</p>
                <p className="text-[10px] text-text-muted font-mono mt-1">
                  ({fn.parameters.map((p) => p.name).join(", ")}) &rarr; {fn.returnType}
                </p>
              </button>
            ))}

          {tab === "attributes" && (
            <div>
              {commonAttributes.map((attr) => (
                <button
                  key={attr}
                  onClick={() => onSelectAttribute(attr)}
                  className="w-full text-left px-3 py-2 hover:bg-bg-hover transition-colors text-sm font-mono text-code-blue border-b border-border-subtle last:border-0"
                >
                  {attr}
                </button>
              ))}
              <div className="p-3 border-t border-border mt-1">
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={customAttr}
                    onChange={(e) => setCustomAttr(e.target.value)}
                    placeholder="user.customAttribute"
                    className="flex-1 bg-bg-elevated border border-border px-2 py-1.5 text-xs font-mono text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  <button
                    onClick={() => {
                      if (customAttr.trim()) onSelectAttribute(customAttr.trim());
                    }}
                    className="px-3 py-1.5 text-xs font-mono bg-accent text-bg-deep hover:bg-accent-hover transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === "literal" && (
            <div className="p-3 space-y-4">
              <div className="flex gap-1">
                {(["string", "number", "boolean", "null"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setLiteralType(t)}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                      literalType === t
                        ? "bg-accent text-bg-deep"
                        : "text-text-muted hover:text-text"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {literalType === "null" ? (
                <button
                  onClick={() => onSelectLiteral(null)}
                  className="w-full px-3 py-2.5 text-sm font-mono bg-accent text-bg-deep hover:bg-accent-hover transition-colors"
                >
                  Insert null
                </button>
              ) : literalType === "boolean" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectLiteral(true)}
                    className="flex-1 px-3 py-2.5 text-sm font-mono bg-accent text-bg-deep hover:bg-accent-hover transition-colors"
                  >
                    true
                  </button>
                  <button
                    onClick={() => onSelectLiteral(false)}
                    className="flex-1 px-3 py-2.5 text-sm font-mono bg-accent text-bg-deep hover:bg-accent-hover transition-colors"
                  >
                    false
                  </button>
                </div>
              ) : (
                <div className="flex gap-1">
                  <input
                    type={literalType === "number" ? "number" : "text"}
                    value={literalValue}
                    onChange={(e) => setLiteralValue(e.target.value)}
                    placeholder={literalType === "number" ? "0" : "value"}
                    autoFocus
                    className="flex-1 bg-bg-elevated border border-border px-3 py-2.5 text-sm font-mono text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  <button
                    onClick={handleLiteralSubmit}
                    className="px-4 py-2.5 text-sm font-mono bg-accent text-bg-deep hover:bg-accent-hover transition-colors"
                  >
                    Insert
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
