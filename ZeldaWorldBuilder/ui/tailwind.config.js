import tailwindConfig from "@incutonez/core/ui/tailwind.config.js";

const { extend } = tailwindConfig.theme;
extend.colors = {
  "zTan": "#FFEFA6",
  "zGreen": "#00a800",
};
extend.gridTemplateColumns = {
  "16": "repeat(16, minmax(0, 1fr))",
};
extend.gridTemplateRows = {
  "10": "repeat(10, minmax(0, 1fr))",
  "11": "repeat(11, minmax(0, 1fr))",
};
extend.gridRowStart = {
  "11": "11",
  "10": "10",
  "9": "9",
  "8": "8",
};

export default {
  ...tailwindConfig,
};
