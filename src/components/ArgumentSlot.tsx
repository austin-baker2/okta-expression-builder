import type { ExpressionNode } from "../types/expression";

interface ArgumentSlotProps {
  node: ExpressionNode | null;
  paramName: string;
  paramType: string;
  onOpen: () => void;
  onClear: () => void;
  onNodeOpen: (node: ExpressionNode) => void;
}

export default function ArgumentSlot({
  node,
  paramName,
  paramType,
  onOpen,
  onClear,
  onNodeOpen: _onNodeOpen,
}: ArgumentSlotProps) {
  if (!node) {
    return (
      <button
        onClick={onOpen}
        className="inline-flex items-center gap-1 px-2 py-0.5 border border-dashed border-text-muted text-text-muted text-xs font-mono hover:border-accent hover:text-accent transition-colors"
      >
        <span className="text-accent">+</span>
        <span>
          {paramName}: {paramType}
        </span>
      </button>
    );
  }

  const renderInline = () => {
    switch (node.type) {
      case "literal":
        return (
          <span className="text-value-amber font-mono text-xs">
            {node.value === null ? "null" : typeof node.value === "string" ? `"${node.value}"` : String(node.value)}
          </span>
        );
      case "attribute":
        return (
          <span className="text-code-blue font-mono text-xs">{node.path}</span>
        );
      case "function":
        return null;
      default:
        return null;
    }
  };

  const inline = renderInline();
  if (inline) {
    return (
      <span className="inline-flex items-center gap-1 group">
        {inline}
        <button
          onClick={onClear}
          className="text-text-muted hover:text-error text-[10px] opacity-0 group-hover:opacity-100 transition-all"
          title="Remove"
        >
          x
        </button>
      </span>
    );
  }

  return null;
}
