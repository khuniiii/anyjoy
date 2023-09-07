import React from "react";
import { Story } from "@storybook/react";

import { ChipProps } from "./type";

import { Chip } from "./index";

const storyMeta = {
  title: "atoms/Chip",
  component: Chip,
};

export default storyMeta;

export const Default: Story<ChipProps> = args => <Chip {...args} />;

Default.args = {
  children: "종료상태",
};
