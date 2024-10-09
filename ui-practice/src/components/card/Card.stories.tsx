import Card from "@components/card/Card";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: Card,
};

type Story = StoryObj<typeof Card>;

export default meta;

export const Default: Story = {
  args: {
    children: <>This is default Card</>,
  },
};
export const Example: Story = {
  args: {
    children: <>This is default Card</>,
  },
  render: ({ args }) => {
    return <span>{null}</span>;
  },
};
