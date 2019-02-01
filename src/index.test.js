import { expect } from "chai";
import deepFreeze from "deep-freeze";
import {
  dedupe,
  setRgbPrimaryValues,
  clean,
  setNormalisedRgbPrimaryValues,
  setRgbPrimaryRangeValues,
  setColourType,
  setHue,
  sortColorsByGroup
} from "./index";
import colourTypeInput from "./fixtures/input/colourType";
import hueInput from "./fixtures/input/hue";
import coloursByGroupInput from "./fixtures/input/coloursByGroup";
import primaryRgbValues from "./fixtures/output/primaryRgbValues";
import colourTypeOutput from "./fixtures/output/colourType";
import hueOutput from "./fixtures/output/hue";
import coloursByGroupOutput from "./fixtures/output/coloursByGroup";

describe("swatch-book", () => {
  describe("dedupe()", () => {
    it("should always return an array", () => {
      const actual = dedupe(null);
      expect(actual).to.deep.equal([]);
    });

    it("should dedupe input values", () => {
      const input = deepFreeze([1, 2, 3, 4, 5, 5, 5, 5, 1, 4, 3, 2, 2]);
      const actual = dedupe(input);
      expect(actual).to.deep.equal([1, 2, 3, 4, 5]);
    });
  });

  describe("setRgbPrimaryValues()", () => {
    it("should return an object with all valid colour inputs converted to RGBA", () => {
      const input = deepFreeze([
        "red",
        "#ff0000",
        "#f00",
        "rgb(255, 0, 0)",
        "rgba(255, 0, 0, 1)",
        "hsl(0,100%,50%)",
        "hsla(0,100%,50% / 100%)",
        "foo"
      ]);
      const actual = setRgbPrimaryValues(input);
      expect(actual).to.deep.equal(primaryRgbValues);
    });
  });

  describe("clean()", () => {
    it("should remove invalid RGBA colours", () => {
      const input = deepFreeze([
        {
          colour: "rgba(255, 0, 0, 1)",
          rgb: {
            r: 255,
            g: 0,
            b: 0,
            alpha: 1
          }
        },
        {
          colour: "foo",
          rgb: {
            r: NaN,
            g: NaN,
            b: NaN,
            alpha: NaN
          }
        }
      ]);
      const actual = clean(input);
      expect(actual).to.deep.equal([
        {
          colour: "rgba(255, 0, 0, 1)",
          rgb: {
            r: 255,
            g: 0,
            b: 0,
            alpha: 1
          }
        }
      ]);
    });
  });

  describe("setNormalisedRgbPrimaryValues()", () => {
    it("should return an object with normalised RGBA values", () => {
      const input = deepFreeze([
        {
          colour: "rgba(255, 0, 0, 1)",
          rgb: {
            r: 255,
            g: 143,
            b: 5,
            alpha: 1
          }
        }
      ]);
      const actual = setNormalisedRgbPrimaryValues(input);
      expect(actual).to.deep.equal([
        {
          colour: "rgba(255, 0, 0, 1)",
          rgb: {
            r: 255,
            g: 143,
            b: 5,
            alpha: 1
          },
          _r: 1.0,
          _g: 0.560784314,
          _b: 0.019607843
        }
      ]);
    });
  });

  describe("setRgbPrimaryRangeValues()", () => {
    it("should return an object with the primary minimum, maximum and delta values", () => {
      const input = deepFreeze([
        {
          colour: "rgba(255, 0, 0, 1)",
          rgb: {
            r: 255,
            g: 143,
            b: 5,
            alpha: 1
          },
          _r: 1.0,
          _g: 0.560784314,
          _b: 0.019607843
        }
      ]);
      const actual = setRgbPrimaryRangeValues(input);
      expect(actual).to.deep.equal([
        {
          colour: "rgba(255, 0, 0, 1)",
          rgb: {
            r: 255,
            g: 143,
            b: 5,
            alpha: 1
          },
          _r: 1.0,
          _g: 0.560784314,
          _b: 0.019607843,
          primaryMin: 0.019607843,
          primaryMax: 1.0,
          primaryDelta: 0.980392157
        }
      ]);
    });
  });

  describe("setColourType()", () => {
    it("should return an object with the colour type", () => {
      const input = deepFreeze(colourTypeInput);
      const actual = setColourType(input);
      expect(actual).to.deep.equal(colourTypeOutput);
    });
  });

  describe("setHue()", () => {
    it("should return an object with the hue", () => {
      const input = deepFreeze(hueInput);
      const actual = setHue(input);
      expect(actual).to.deep.equal(hueOutput);
    });
  });

  describe("sortColorsByGroup()", () => {
    it("should return an object with each colour type sorted by group", () => {
      const input = deepFreeze(coloursByGroupInput);
      const actual = sortColorsByGroup(input);
      expect(actual).to.deep.equal(coloursByGroupOutput);
    });

    it("should return an object with empty colour arrays when empty input is provided", () => {
      const input = deepFreeze([]);
      const actual = sortColorsByGroup(input);
      expect(actual).to.deep.equal({
        alpha: [],
        opaque: [],
        grey: []
      });
    });
  });
});
