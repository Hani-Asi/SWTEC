import Toggle from "../../hooks/useToggle";

export default {
  title: "Component/Toggle",
  component: Toggle,
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export const Default = (args) => {
  return <Toggle {...args} />;
};
