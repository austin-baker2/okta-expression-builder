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
    <div className="w-72 shrink-0 border-l border-slate-800 bg-slate-950 overflow-y-auto">
      <div className="p-3 border-b border-slate-800">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Test Profile
        </h2>
      </div>
      <div className="p-3 space-y-2">
        {profileSchema.map((attr) => (
          <div key={attr.key}>
            <label className="block text-[10px] text-slate-500 mb-0.5">
              {attr.key}
            </label>
            <input
              type="text"
              value={profile[attr.key] === null ? "" : String(profile[attr.key] ?? "")}
              onChange={(e) => updateProfileField(attr.key, e.target.value)}
              placeholder="null"
              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-violet-300 placeholder-slate-700 focus:outline-none focus:border-violet-600"
            />
          </div>
        ))}

        {customKeys.map((key) => (
          <div key={key}>
            <label className="block text-[10px] text-slate-500 mb-0.5">
              {key} <span className="text-violet-600">(custom)</span>
            </label>
            <input
              type="text"
              value={profile[key] === null ? "" : String(profile[key] ?? "")}
              onChange={(e) => updateProfileField(key, e.target.value)}
              placeholder="null"
              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-violet-300 placeholder-slate-700 focus:outline-none focus:border-violet-600"
            />
          </div>
        ))}

        <div className="pt-3 border-t border-slate-800">
          <p className="text-[10px] text-slate-500 mb-2">Add custom attribute</p>
          <div className="flex gap-1">
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="key"
              className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-slate-300 placeholder-slate-700 focus:outline-none focus:border-violet-600"
            />
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="value"
              className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-slate-300 placeholder-slate-700 focus:outline-none focus:border-violet-600"
            />
            <button
              onClick={handleAddCustom}
              className="px-2 py-1 text-xs bg-violet-600 text-white rounded hover:bg-violet-500 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
