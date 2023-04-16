import React from "react";
import { Meta, Story } from "@storybook/react";

import { ButtonProps } from "./type";

import { Button } from "./";

const meta: Meta = {
  title: "atoms/Button",
  component: Button,
};

export default meta;

export const Default: Story<ButtonProps> = args => <Button {...args} />;

Default.args = {
  children: "Button",
};
