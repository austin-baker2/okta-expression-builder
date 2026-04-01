import { useState } from "react";
import { useExpression } from "../hooks/useExpression";
import type { ExpressionNode, ELFunction } from "../types/expression";
import TreeNode from "./TreeNode";
import FunctionCatalog from "./FunctionCatalog";

export default function TreeBuilder() {
  const { tree, setTree } = useExpression();
  const [catalogOpen, setCatalogOpen] = useState(false);

  const handleSelectFunction = (fn: ELFunction) => {
    const newNode: ExpressionNode = {
      type: "function",
      name: fn.name,
      arguments: [],
    };
    setTree(newNode);
    setCatalogOpen(false);
  };

  const handleSelectAttribute = (path: string) => {
    setTree({ type: "attribute", path });
    setCatalogOpen(false);
  };

  const handleSelectLiteral = (value: string | number | boolean | null) => {
    setTree({ type: "literal", value });
    setCatalogOpen(false);
  };

  if (!tree) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] gap-6">
        <div className="text-center">
          <p className="text-text-muted text-sm font-mono mb-1">No expression yet</p>
          <p className="text-text-muted/50 text-xs font-mono">Select a function to begin</p>
        </div>
        <button
          onClick={() => setCatalogOpen(true)}
          className="group px-6 py-3 border border-border text-sm font-mono uppercase tracking-widest text-text-secondary hover:text-accent hover:border-accent hover:bg-accent-dim transition-all duration-200"
        >
          <span className="text-accent mr-2">+</span>
          Add Function
        </button>
        {catalogOpen && (
          <FunctionCatalog
            onSelect={handleSelectFunction}
            onSelectAttribute={handleSelectAttribute}
            onSelectLiteral={handleSelectLiteral}
            onClose={() => setCatalogOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
          Expression Tree
        </h2>
        <button
          onClick={() => setTree(null)}
          className="text-[10px] font-mono uppercase tracking-widest text-text-muted hover:text-error transition-colors"
        >
          Clear
        </button>
      </div>
      <TreeNode
        node={tree}
        depth={0}
        onChange={(newNode) => setTree(newNode)}
        onDelete={() => setTree(null)}
      />
    </div>
  );
}
