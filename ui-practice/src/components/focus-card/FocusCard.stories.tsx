import FocusCard from "@components/focus-card/FocusCard";
import useFocus from "@components/focus-card/useFocus";
import { Meta, StoryObj } from "@storybook/react";
import { FormEventHandler, useRef, useState } from "react";

const meta: Meta = {
  component: FocusCard,
};

type Story = StoryObj<typeof FocusCard>;

export default meta;

export const Default = {
  render() {
    const { FocusProvider } = useFocus();
    const data = ["1", "2", "3", "4"];
    return (
      <FocusProvider>
        {data.map((d) => (
          <FocusCard
            key={d}
            id={d}
            onFocus={() => console.log(`${d} is focused`)}
          >
            {d}
          </FocusCard>
        ))}
      </FocusProvider>
    );
  },
};

export const Form = {
  render() {
    const input1Ref = useRef(null);
    const [input1Value, setInput1Value] = useState("");

    const input2Ref = useRef(null);
    const [input2Value, setInput2Value] = useState("");

    const selectRef = useRef(null);
    const [selectValue, setSelectValue] = useState("");

    const handleSubmit: FormEventHandler = (e) => {
      e.preventDefault();
      console.log("submit", { input1Value, input2Value, selectValue });
    };

    return (
      <form
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        onSubmit={handleSubmit}
      >
        <FocusProvider>
          <FocusCard id="item-1" onFocus={() => input1Ref.current?.focus()}>
            <label>input 1</label>
            <input
              name="input1"
              ref={input1Ref}
              value={input1Value}
              onChange={(e) => setInput1Value(e.target.value)}
              disabled={focusKey === "item-1"}
            />
          </FocusCard>
          <FocusCard id="item-2" onFocus={() => input2Ref.current?.focus()}>
            <label>input 2</label>
            <input
              name="input2"
              ref={input2Ref}
              value={input2Value}
              onChange={(e) => setInput2Value(e.target.value)}
              disabled={focusKey === "item-2"}
            />
          </FocusCard>

          <FocusCard id="item-3" onFocus={() => selectRef.current?.focus()}>
            <label>Select</label>
            <select
              name="select"
              ref={selectRef}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              disabled={focusKey === "item-3"}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </FocusCard>
        </FocusProvider>
        <button type="submit">Submit</button>
      </form>
    );
  },
};
