import { configure } from "@storybook/react";

// load story dynamically
const req = require.context("../src", true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
