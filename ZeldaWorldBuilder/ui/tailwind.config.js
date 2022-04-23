import tailwindConfig from "@incutonez/core-ui/dist/tailwind.config.js";

const { extend } = tailwindConfig.theme;
extend.colors = {
  "zTan": "#FFEFA6",
  "zGreen": "#00a800",
};
extend.gridTemplateColumns = {
  "16": "repeat(16, 48px)",
};
extend.gridTemplateRows = {
  "11": "repeat(11, 48px)",
};
extend.gridRowStart = {
  "11": "11",
  "10": "10",
  "9": "9",
  "8": "8",
};
tailwindConfig.safelist.push({
  pattern: /^row-start-.*/,
});

export default {
  ...tailwindConfig,
};
