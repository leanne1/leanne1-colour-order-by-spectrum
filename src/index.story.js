import React from "react"; // eslint-disable-line no-unused-vars
import { storiesOf } from "@storybook/react";
import { SwatchList } from "../storybook/SwatchList"; // eslint-disable-line no-unused-vars
import { Swatch } from "../storybook/Swatch"; // eslint-disable-line no-unused-vars
import { palette } from "../storybook/palette";
import swatchBook from "./index";

const stories = storiesOf("Swatch Book", module);

const { opaque, alpha, grey } = swatchBook(palette);

stories.add("Default", () => (
  <div>
    <SwatchList>
      {opaque.map((c, i) => (
        <Swatch key={i} colour={c.colour}>
          {c.colour}
        </Swatch>
      ))}
    </SwatchList>
    <SwatchList>
      {alpha.map((c, i) => (
        <Swatch key={i} colour={c.colour}>
          {c.colour}
        </Swatch>
      ))}
    </SwatchList>
    <SwatchList>
      {grey.map((c, i) => (
        <Swatch key={i} colour={c.colour}>
          {c.colour}
        </Swatch>
      ))}
    </SwatchList>
  </div>
));
