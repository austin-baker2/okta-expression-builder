import { useState } from "react";
import type { ExpressionNode, ELFunction } from "../types/expression";
import { functionRegistry } from "../data/functionRegistry";
import ArgumentSlot from "./ArgumentSlot";
import FunctionCatalog from "./FunctionCatalog";

interface TreeNodeProps {
  node: ExpressionNode;
  depth: number;
  onChange: (node: ExpressionNode) => void;
  onDelete: () => void;
}

export default function TreeNode({ node, depth, onChange, onDelete }: TreeNodeProps) {
  const [catalogOpen, setCatalogOpen] = useState<number | null>(null);

  if (node.type === "literal") {
    return (
      <div className="inline-flex items-center gap-2 group" style={{ marginLeft: depth * 24 }}>
        <span className="text-value-amber font-mono text-sm">
          {node.value === null
            ? "null"
            : typeof node.value === "string"
              ? `"${node.value}"`
              : String(node.value)}
        </span>
        <button
          onClick={onDelete}
          className="text-text-muted hover:text-error text-xs opacity-0 group-hover:opacity-100 transition-all"
        >
          x
        </button>
      </div>
    );
  }

  if (node.type === "attribute") {
    return (
      <div className="inline-flex items-center gap-2 group" style={{ marginLeft: depth * 24 }}>
        <span className="text-code-blue font-mono text-sm">{node.path}</span>
        <button
          onClick={onDelete}
          className="text-text-muted hover:text-error text-xs opacity-0 group-hover:opacity-100 transition-all"
        >
          x
        </button>
      </div>
    );
  }

  if (node.type === "function") {
    const fnDef = functionRegistry.find((f) => f.name === node.name);
    const params = fnDef?.parameters ?? [];

    const handleArgChange = (index: number, newArg: ExpressionNode) => {
      const newArgs = [...node.arguments];
      newArgs[index] = newArg;
      onChange({ ...node, arguments: newArgs });
    };

    const handleArgClear = (index: number) => {
      const newArgs = [...node.arguments];
      newArgs.splice(index, 1);
      onChange({ ...node, arguments: newArgs });
    };

    const handleCatalogSelect = (index: number, fn: ELFunction) => {
      const newNode: ExpressionNode = {
        type: "function",
        name: fn.name,
        arguments: [],
      };
      const newArgs = [...node.arguments];
      while (newArgs.length <= index) newArgs.push(null as unknown as ExpressionNode);
      newArgs[index] = newNode;
      onChange({ ...node, arguments: newArgs });
      setCatalogOpen(null);
    };

    const handleAttrSelect = (index: number, path: string) => {
      const newNode: ExpressionNode = { type: "attribute", path };
      const newArgs = [...node.arguments];
      while (newArgs.length <= index) newArgs.push(null as unknown as ExpressionNode);
      newArgs[index] = newNode;
      onChange({ ...node, arguments: newArgs });
      setCatalogOpen(null);
    };

    const handleLiteralSelect = (index: number, value: string | number | boolean | null) => {
      const newNode: ExpressionNode = { type: "literal", value };
      const newArgs = [...node.arguments];
      while (newArgs.length <= index) newArgs.push(null as unknown as ExpressionNode);
      newArgs[index] = newNode;
      onChange({ ...node, arguments: newArgs });
      setCatalogOpen(null);
    };

    return (
      <div style={{ marginLeft: depth * 24 }}>
        <div className="flex items-center gap-2 group">
          <div className="bg-bg-elevated border border-border px-3 py-2 font-mono text-sm text-accent">
            <span className="text-text-secondary">{node.name}</span>
            <span className="text-text-muted">(</span>
            {params.map((param, i) => (
              <span key={i}>
                {i > 0 && <span className="text-text-muted">, </span>}
                {node.arguments[i] && node.arguments[i].type !== "function" ? (
                  <ArgumentSlot
                    node={node.arguments[i]}
                    paramName={param.name}
                    paramType={param.type}
                    onOpen={() => setCatalogOpen(i)}
                    onClear={() => handleArgClear(i)}
                    onNodeOpen={() => {}}
                  />
                ) : !node.arguments[i] ? (
                  <ArgumentSlot
                    node={null}
                    paramName={param.name}
                    paramType={param.type}
                    onOpen={() => setCatalogOpen(i)}
                    onClear={() => {}}
                    onNodeOpen={() => {}}
                  />
                ) : (
                  <span className="text-accent">&#9660;</span>
                )}
              </span>
            ))}
            <span className="text-text-muted">)</span>
          </div>
          <button
            onClick={onDelete}
            className="text-text-muted hover:text-error text-xs opacity-0 group-hover:opacity-100 transition-all"
          >
            x
          </button>
        </div>

        {params.map((_param, i) =>
          node.arguments[i] && node.arguments[i].type === "function" ? (
            <div key={i} className="mt-1">
              <div
                className="border-l border-border ml-4"
                style={{ marginLeft: 16 }}
              >
                <TreeNode
                  node={node.arguments[i]}
                  depth={0}
                  onChange={(newNode) => handleArgChange(i, newNode)}
                  onDelete={() => handleArgClear(i)}
                />
              </div>
            </div>
          ) : null
        )}

        {catalogOpen !== null && (
          <FunctionCatalog
            onSelect={(fn) => handleCatalogSelect(catalogOpen, fn)}
            onSelectAttribute={(path) => handleAttrSelect(catalogOpen, path)}
            onSelectLiteral={(val) => handleLiteralSelect(catalogOpen, val)}
            onClose={() => setCatalogOpen(null)}
          />
        )}
      </div>
    );
  }

  if (node.type === "operator") {
    return (
      <div style={{ marginLeft: depth * 24 }}>
        <div className="text-text-muted font-mono text-sm">
          <span className="text-[10px] uppercase tracking-widest">op</span>{" "}
          <span className="text-value-amber">{node.operator}</span>
        </div>
        {node.operands.map((operand, i) => (
          <TreeNode
            key={i}
            node={operand}
            depth={depth + 1}
            onChange={(newNode) => {
              const newOps = [...node.operands];
              newOps[i] = newNode;
              onChange({ ...node, operands: newOps });
            }}
            onDelete={() => {
              const newOps = node.operands.filter((_, j) => j !== i);
              onChange({ ...node, operands: newOps });
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
