import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { COLOUR_TYPE } from 'src/constants/config';
import * as colours from 'src/colours';
import {
    startPalette,
    rgbPalette,
    normalisedRgbPalette,
    normalisedRgbRangePalette,
    groupedPalette,
    huePalette,
	huePaletteMulti,
} from './helpers/stub/palette';

describe('colours module', () => {
    describe('hexToRgb()',  () => {
        context('when a valid hex code is not passed in', () => {
            it('should return null', () => {
                const hex = '123';
                const actual = colours.hexToRgb(hex);
                expect(actual).toBe(null);
            });
        });

        context('when a valid hex code is passed in', () => {
            it('should return an object containing the R, G and B hex values as radix 16 integers', () => {
                const hex = '#ffffff';
                const actual = colours.hexToRgb(hex);
                const expected = {
                    r: 255,
                    g: 255,
                    b: 255,
                };
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('rgbaToRgbAlpha()',  () => {
        it('should return an object containing the R, G, B and Alpha RGBA values', () => {
            const rgba = 'rgba(255, 255, 255, 0.5)';
            const actual = colours.rgbaToRgbAlpha(rgba);
            const expected = {
                r: 255,
                g: 255,
                b: 255,
                alpha: 0.5,
            };
            expect(actual).toEqual(expected);
        });
    });

    describe('toIntList()',  () => {
        it('should not mutate its list argument', () => {
            const list = ['1.34', 77, 4.9];
            const expected = [1, 77, 4];
            const actual = colours.toIntList(list);
            expect(actual).toNotBe(expected);
        });

        context('when no radix parameter is specified', () => {
            it('should return a new list of base 10 integers', () => {
                const list = ['1.34', 77, 4.9];
                const expected = [1, 77, 4];
                const actual = colours.toIntList(list);
                expect(actual).toEqual(expected);
            });
        });

        context('when a radix parameter is specified', () => {
            it('should return a new list of integers based on the specified radix', () => {
                const list = ['ff', '46.7777', '22'];
                const expected = [255, 70, 34];
                const actual = colours.toIntList(list, 16);
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('splitRgbaString()',  () => {
        it('should return an array of R, G, B and A values', () => {
            const actual = colours.splitRgbaString('rgba(255,255,255,0.5');
            const expected = ['255', '255', '255', '0.5'];
            expect(actual).toEqual(expected);
        });
    });

    describe('deepCopyColourList()',  () => {
        it('should not mutate its palette argument', () => {
            const actual = colours.deepCopyColourList(startPalette);
            const equalColours = actual.filter((colour, i) => colour === startPalette[i]);
            expect(equalColours.length).toBe(0);
        });
        it('should return a new palette matching the given palette', () => {
            const actual = colours.deepCopyColourList(startPalette);
            expect(actual).toEqual(startPalette);
        });
    });

    describe('isRgba()',  () => {
        context('when a valid RGBA string is passed in', () => {
            it('should return true', () => {
                const validRgba = [
                    'rgba(255, 255, 255, 0.5)',
                    'rgba(0, 11, 122, 1)',
                ];
                validRgba.forEach((rgba) => {
                    expect(colours.isRgba(rgba)).toBe(true);
                });
            });
        });

        context('when an invalid RGBA string is passed in', () => {
            it('should return false', () => {
                const validRgba = [
                    'rgba(2554, 255, 255, 0.5)',
                    'rgb(255, 255, 255, 0.5)',
                    'rgba(ff, 11, 122, 1)',
                    'rgba(0, 11, 355, 1)',
                    'rgba(255, 255, 255, 2)',
                ];
                validRgba.forEach((rgba) => {
                    expect(colours.isRgba(rgba)).toBe(false);
                });
            });
        })
    });

    describe('normalisePrimary()',  () => {
        it('should return a normalised primary value', () => {
            const r = 255;
            const actual = colours.normalisePrimary(r);
            const expected = 1.0000000000000;
            expect(actual).toBe(expected);
        })
    });

    describe('setRgbPrimaryValues()',  () => {
        context('when a list of RGBA colours is passed in', () => {
            it('should return a list of colour objects augmented with an rgb property containing r, g, b and alpha keys', () => {
                const palette = [...startPalette[0]];
                const expected = [...rgbPalette[0]];
                const actual = colours.setRgbPrimaryValues(palette);
                expect(actual).toEqual(expected);
            });
        })

        context('when a list of hex colours is passed in', () => {
            it('should return a list of colour objects augmented with an rgb property containing r, g, and b keys', () => {
                const palette = [...startPalette[1]];
                const expected = [...rgbPalette[1]];
                const actual = colours.setRgbPrimaryValues(palette);
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('setNormalisedRgbPrimaryValues()',  () => {
        it('should return a list of colour objects augmented with _r, _g and _b keys', () => {
            const actual = colours.setNormalisedRgbPrimaryValues(rgbPalette);
            expect(actual).toEqual(normalisedRgbPalette);
        });
    });

    describe('setRgbPrimaryRangeValues()',  () => {
        context('when a list of RGBA colours is passed in', () => {
            it('should return a list of colour objects augmented with primaryMin, primaryMax and primaryDelta properties', () => {
                const actual = colours.setRgbPrimaryRangeValues(normalisedRgbPalette);
                expect(actual).toEqual(normalisedRgbRangePalette);
            });
        })
    });

    describe('setColourType()', () => {
        const actual = colours.setColourType(normalisedRgbRangePalette);
        context('when colour has an alpha value', () => {
            it(`should set colourType to "${COLOUR_TYPE.ALPHA}"`, () => {
                expect(actual[0].colourType).toBe(COLOUR_TYPE.ALPHA);
            });
        });
        context('when colour primary delta is greater than zero and there is no alpha value', () => {
            it(`should set colourType to "${COLOUR_TYPE.OPAQUE}"`, () => {
                expect(actual[1].colourType).toBe(COLOUR_TYPE.OPAQUE);
            });
        });
        context('when colour primary delta is zero', () => {
            it(`should set colourType to "${COLOUR_TYPE.GREYSCALE}"`, () => {
                expect(actual[2].colourType).toBe(COLOUR_TYPE.GREYSCALE);
            });
        });
    });

    describe('setHue()', () => {
        const actual = colours.setHue(groupedPalette);
        context(`when the colour type is ${COLOUR_TYPE.ALPHA}`, () => {
            it('should set a hue', () => {
                expect(actual[0].hue).toBe(huePalette[0].hue);
            });
        });
        context(`when the colour type is ${COLOUR_TYPE.OPAQUE}`, () => {
            it('should set a hue', () => {
                expect(actual[1].hue).toBe(huePalette[1].hue);
            });
        });
        context(`when the colour type is ${COLOUR_TYPE.GREYSCALE}`, () => {
            it('should not set a hue', () => {
                expect(actual[2].hue).toBe(huePalette[2].hue);
            });
        });
    });

	describe('getAlpha()', () => {
		it('should return a list of alpha colours', () => {
			const actual = colours.getAlpha(huePalette);
			expect(actual).toEqual([huePalette[0]]);
		});
	});

	describe('getOpaque()', () => {
		it('should return a list of opaque colours', () => {
			const actual = colours.getOpaque(huePalette);
			expect(actual).toEqual([huePalette[1]]);
		});
	});

	describe('getGreyscale()', () => {
		it('should return a list of greyscale colours', () => {
			const actual = colours.getGreyscale(huePalette);
			expect(actual).toEqual([huePalette[2]]);
		});
	});

    describe('assignToColourGroup()', () => {
        let actual;

        beforeEach(() => {
        	actual = colours.assignToColourGroup(huePalette);
        });

    	it('should contain a palette key with a new copy of the starting palette', () => {
			expect(actual.palette).toEqual(huePalette);
		    expect(actual.palette).toNotBe(huePalette);
        });
        context(`when the colour type is ${COLOUR_TYPE.ALPHA}`, () => {
            it(`should assign it to an ${COLOUR_TYPE.ALPHA} list`, () => {
	            expect(actual[COLOUR_TYPE.ALPHA]).toEqual([huePalette[0]]);
            });
        });
        context(`when the colour type is ${COLOUR_TYPE.OPAQUE}`, () => {
            it(`should assign it to an ${COLOUR_TYPE.OPAQUE} list`, () => {
	            expect(actual[COLOUR_TYPE.OPAQUE]).toEqual([huePalette[1]]);
            });
        });
        context(`when the colour type is ${COLOUR_TYPE.GREYSCALE}`, () => {
            it(`should assign it to a ${COLOUR_TYPE.GREYSCALE} list`, () => {
	            expect(actual[COLOUR_TYPE.GREYSCALE]).toEqual([huePalette[2]]);
            });
        });
    });

	describe('sortColorGroups()',  () => {
		it('should not mutate its palette argument', () => {
			const actual = colours.sortColorsByGroup(huePaletteMulti);
			expect(actual.palette).toEqual(huePaletteMulti);
			expect(actual).toNotBe(huePaletteMulti);
			expect(actual[COLOUR_TYPE.ALPHA]).toEqual([huePaletteMulti[0], huePaletteMulti[1]]);
			expect(actual[COLOUR_TYPE.OPAQUE]).toEqual([huePaletteMulti[2], huePaletteMulti[3]]);
			expect(actual[COLOUR_TYPE.GREYSCALE]).toEqual([huePaletteMulti[4], huePaletteMulti[5]]);
		});
		// [Takes the colourMap and returns a new colourMap] with each colour type sorted

        // 1. Deep copy the colourMap object => colourMap object. This includes deepCopying the lists

        // sortColour()
        // for each colour key on the colourMap
        // sort the array
    });
});
