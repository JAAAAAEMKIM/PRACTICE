import { Suspense, useMemo, useState } from "react";
import "./App.css";
import SuspenseLoad from "./components/SuspenseLoad";
import { ErrorBoundary } from "react-error-boundary";
import React from "react";

const ChildComponent = () => {
  const [state, setState] = useState(0);
  console.log("child render called!");
  return <button onClick={() => setState(state + 1)}>클릭 {state}</button>;
};

const MemoChild = React.memo(() => {
  console.log("child memo rendered");
  return <div>This is Memo Child</div>;
});

const Parent = ({ children }: { children: React.ReactNode }) => {
  console.log("parent render called!");
  // const child = useMemo(() => <ChildComponent />, []);
  return (
    <div>
      This is parent.
      <div>
        {/* {child} */}
        {children}
        <MemoChild />
      </div>
    </div>
  );
};

function App() {
  const [render, setRender] = useState(1);

  return (
    <div className="card">
      <button onClick={() => setRender((p) => p + 1)}>{render}</button>
      <Parent>
        <ChildComponent />
      </Parent>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <SuspenseLoad />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <SuspenseError /> */}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
