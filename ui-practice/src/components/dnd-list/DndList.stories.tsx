import { StoryObj } from "@storybook/react";
import DndList from "./DndList";
import { useState } from "react";

export default {
  component: DndList,
};

type Story = StoryObj<typeof DndList>;

export const Default: Story = {
  args: {},
  render: function Render() {
    const [list, setList] = useState([
      { key: "1", label: "item1" },
      { key: "2", label: "item2" },
      { key: "3", label: "item3" },
      { key: "4", label: "item4" },
    ]);

    return (
      <DndList
        list={list}
        setList={setList}
        renderItem={(item) => <div>{item.label}</div>}
      />
    );
  },
};
