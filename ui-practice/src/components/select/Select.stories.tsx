import { StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import Select from "./Select";

export default {
  component: Select,
};

type Story = StoryObj<typeof Select>;

const Labels = ["label 1", "label 2", "label 3", "label 4"];

export const Default: Story = {
  args: {
    placeholder: "select item",
    value: null,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();
    const handleSelect = (value: string | number) => updateArgs({ value });
    return (
      <Select
        {...args}
        label={value !== null ? Labels[value] : ""}
        onSelect={handleSelect}
      >
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Select.Item key={i} value={i} isSelected={i === value}>
              Item #{i}
            </Select.Item>
          ))}
      </Select>
    );
  },
};

export const MultiSelect: Story = {
  args: {
    placeholder: "select item",
    value: null,
  },
  render: function Render(args) {
    const [{ value: values }, updateArgs] = useArgs();
    const handleSelect = (value: string | number) => {
      if (!values) {
        updateArgs({ value: [value] });
        return;
      }

      if (values.includes(value)) {
        const newValues = values.filter((v) => v !== value);
        updateArgs({ value: newValues.length ? newValues : null });
        return;
      }
      updateArgs({
        value: [...values, value],
      });
    };

    return (
      <Select
        {...args}
        label={
          values !== null
            ? values.map((value: number) => Labels[value]).join(", ")
            : ""
        }
        onSelect={handleSelect}
      >
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Select.Item
              key={i}
              value={i}
              isSelected={values === null ? false : values.includes(i)}
            >
              Item #{i}
            </Select.Item>
          ))}
      </Select>
    );
  },
};
