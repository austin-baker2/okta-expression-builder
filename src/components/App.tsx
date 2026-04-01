import { ExpressionContext, useExpressionState } from "../hooks/useExpression";
import Header from "./Header";
import OutputBar from "./OutputBar";
import ProfilePanel from "./ProfilePanel";
import TreeBuilder from "./TreeBuilder";
import CodeEditor from "./CodeEditor";

export default function App() {
  const state = useExpressionState();

  return (
    <ExpressionContext.Provider value={state}>
      <div className="min-h-screen bg-bg-deep text-text flex flex-col">
        <Header />
        <div className="relative flex-1 overflow-hidden">
          <main className="h-full pb-16 overflow-y-auto">
            {state.mode === "easy" ? <TreeBuilder /> : <CodeEditor />}
          </main>
          <ProfilePanel />
        </div>
        <OutputBar />
      </div>
    </ExpressionContext.Provider>
  );
}
