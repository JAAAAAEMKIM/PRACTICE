import { StoryObj } from "@storybook/react";
import Dropdown from "./Dropdown";

import useDropdown from "./useDropdown";

export default {
  component: Dropdown,
};

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {},
  render: function Render(args) {
    const [dropdownRef, showDropdown] = useDropdown();
    return (
      <div>
        <button onClick={() => showDropdown(true)}>
          Click here to show dropdown
        </button>
        <Dropdown
          {...args}
          ref={dropdownRef}
          attachTo={<div>Dropdown Attach here</div>}
          content={"Children comes here"}
        />
      </div>
    );
  },
};
