import { useState } from "react";
import { useExpression } from "../hooks/useExpression";
import { profileSchema } from "../data/defaultProfile";

export default function ProfilePanel() {
  const { profile, updateProfileField, addCustomField, profileOpen } = useExpression();
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  if (!profileOpen) return null;

  const customKeys = Object.keys(profile).filter(
    (k) => !profileSchema.some((s) => s.key === k)
  );

  const handleAddCustom = () => {
    const key = newKey.trim();
    if (!key) return;
    addCustomField(key, newValue);
    setNewKey("");
    setNewValue("");
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 w-72 border-l border-border bg-bg-deep overflow-y-auto pb-16 z-30 shadow-2xl">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
          Test Profile
        </h2>
      </div>
      <div className="p-4 space-y-3">
        {profileSchema.map((attr) => (
          <div key={attr.key}>
            <label className="block text-[10px] font-mono text-text-muted mb-1 tracking-wide">
              {attr.key}
            </label>
            <input
              type="text"
              value={profile[attr.key] === null ? "" : String(profile[attr.key] ?? "")}
              onChange={(e) => updateProfileField(attr.key, e.target.value)}
              placeholder="null"
              className="w-full bg-bg-surface border border-border-subtle px-2.5 py-1.5 text-xs font-mono text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        ))}

        {customKeys.map((key) => (
          <div key={key}>
            <label className="block text-[10px] font-mono text-text-muted mb-1">
              {key} <span className="text-accent">(custom)</span>
            </label>
            <input
              type="text"
              value={profile[key] === null ? "" : String(profile[key] ?? "")}
              onChange={(e) => updateProfileField(key, e.target.value)}
              placeholder="null"
              className="w-full bg-bg-surface border border-border-subtle px-2.5 py-1.5 text-xs font-mono text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        ))}

        <div className="pt-4 border-t border-border">
          <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-2">
            Add custom attribute
          </p>
          <div className="flex gap-1">
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="key"
              className="flex-1 bg-bg-surface border border-border-subtle px-2 py-1.5 text-xs font-mono text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="value"
              className="flex-1 bg-bg-surface border border-border-subtle px-2 py-1.5 text-xs font-mono text-text placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <button
              onClick={handleAddCustom}
              className="px-2.5 py-1.5 text-xs font-mono bg-accent text-bg-deep hover:bg-accent-hover transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
