import expect from 'expect';
import { COLOUR_TYPE } from 'src/colour-swatch/constants/config';
import * as colours from 'src/colour-swatch';
import {
    startPalette,
    rgbPalette,
    normalisedRgbPalette,
    normalisedRgbRangePalette,
    groupedPalette,
    huePalette,
	huePaletteMulti,
	colourMap,
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
            const actual = colours.toIntList(list);
            expect(actual).toNotBe(list);
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

	describe('trimPrefix()',  () => {
		it('should return the string with prefix removed', () => {
			const actual = colours.trimPrefix('rgba','rgba(255,255,255,0.5)');
			const expected = '(255,255,255,0.5)';
			expect(actual).toEqual(expected);
		});
		it('should return the original string when specified prefix is not present', () => {
			const actual = colours.trimPrefix('rgba','(255,255,255,0.5)');
			const expected = '(255,255,255,0.5)';
			expect(actual).toEqual(expected);
		});
	});

	describe('deepCopyColourList()',  () => {
        it('should not mutate its palette argument', () => {
            const actual = colours.deepCopyColourList(startPalette);
            const equalColours = actual.filter((colour, i) => colour === startPalette[i]);
	        expect(startPalette).toEqual(actual);
            expect(startPalette).toNotBe(actual);
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
                Object.freeze(palette);
                const expected = [...rgbPalette[0]];
                const actual = colours.setRgbPrimaryValues(palette);
                expect(actual).toEqual(expected);
            });
        });

        context('when a list of hex colours is passed in', () => {
            it('should return a list of colour objects augmented with an rgb property containing r, g, and b keys', () => {
                const palette = [...startPalette[1]];
	            Object.freeze(palette);
                const expected = [...rgbPalette[1]];
                const actual = colours.setRgbPrimaryValues(palette);
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('setNormalisedRgbPrimaryValues()',  () => {
        it('should return a list of colour objects augmented with _r, _g and _b keys', () => {
            const palette = [...rgbPalette];
	        Object.freeze(palette);
        	const actual = colours.setNormalisedRgbPrimaryValues(palette);
            expect(actual).toEqual(normalisedRgbPalette);
        });
    });

    describe('setRgbPrimaryRangeValues()',  () => {
        context('when a list of RGBA colours is passed in', () => {
            it('should return a list of colour objects augmented with primaryMin, primaryMax and primaryDelta properties', () => {
	            const palette = [...normalisedRgbPalette];
	            Object.freeze(palette);
	            const actual = colours.setRgbPrimaryRangeValues(palette);
                expect(actual).toEqual(normalisedRgbRangePalette);
            });
        })
    });

    describe('setColourType()', () => {
	    let actual, palette;

	    before(() => {
		    palette = [...normalisedRgbRangePalette];
		    Object.freeze(palette);
		    actual = colours.setColourType(palette);
	    });

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
	    let actual, palette;

	    before(() => {
		    palette = [...groupedPalette];
		    Object.freeze(palette);
		    actual = colours.setHue(palette);
	    });

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

    describe('filterByColourType()', () => {
	    let palette;

    	before(() => {
		    palette = [...huePalette];
		    Object.freeze(palette);
	    });

	    describe('getAlpha()', () => {
		    it('should return a list of alpha colours', () => {
			    const actual = colours.getAlpha(palette);
			    expect(actual).toEqual([palette[0]]);
		    });
	    });

	    describe('getOpaque()', () => {
		    it('should return a list of opaque colours', () => {
			    const actual = colours.getOpaque(palette);
			    expect(actual).toEqual([palette[1]]);
		    });
	    });

	    describe('getGreyscale()', () => {
		    it('should return a list of greyscale colours', () => {
			    const actual = colours.getGreyscale(palette);
			    expect(actual).toEqual([palette[2]]);
		    });
	    });
    });

    describe('assignToColourGroup()', () => {
        let actual;
	    const palette = [...huePalette];
	    Object.freeze(palette);

        beforeEach(() => {
        	actual = colours.assignToColourType(palette);
        });

    	it('should contain a palette key with a new copy of the starting palette', () => {
			expect(actual.palette).toEqual(palette);
		    expect(actual.palette).toNotBe(palette);
        });
        context(`when the colour type is ${COLOUR_TYPE.ALPHA}`, () => {
            it(`should assign it to an ${COLOUR_TYPE.ALPHA} list`, () => {
	            expect(actual[COLOUR_TYPE.ALPHA]).toEqual([palette[0]]);
            });
        });
        context(`when the colour type is ${COLOUR_TYPE.OPAQUE}`, () => {
            it(`should assign it to an ${COLOUR_TYPE.OPAQUE} list`, () => {
	            expect(actual[COLOUR_TYPE.OPAQUE]).toEqual([palette[1]]);
            });
        });
        context(`when the colour type is ${COLOUR_TYPE.GREYSCALE}`, () => {
            it(`should assign it to a ${COLOUR_TYPE.GREYSCALE} list`, () => {
	            expect(actual[COLOUR_TYPE.GREYSCALE]).toEqual([palette[2]]);
            });
        });
    });

	describe('sortColorGroups()',  () => {
		let actual;
		const palette = [...huePaletteMulti];
		Object.freeze(palette);

		beforeEach(() => {
			actual = colours.sortColorsByGroup(palette);
		});

		it('should sort the opaque colour list by position in visible spectrum', () => {
			expect(actual[COLOUR_TYPE.OPAQUE][0].name).toBe('razzmatazz');
			expect(actual[COLOUR_TYPE.OPAQUE][1].name).toBe('limeGreen');
		});

		it('should sort the alpha colour list by position in visible spectrum and then opacity with most opaque first', () => {
			expect(actual[COLOUR_TYPE.ALPHA][0].name).toBe('venetianRed50pc');
			expect(actual[COLOUR_TYPE.ALPHA][1].name).toBe('oceanBlue20pc');
			expect(actual[COLOUR_TYPE.ALPHA][2].name).toBe('oceanBlue50pc');
			expect(actual[COLOUR_TYPE.ALPHA][3].name).toBe('oceanBlue70pc');

		});

		it('should sort the greyscale colour list by position in visible spectrum starting with the darkest', () => {
			expect(actual[COLOUR_TYPE.GREYSCALE][0].name).toBe('nero');
			expect(actual[COLOUR_TYPE.GREYSCALE][1].name).toBe('middleEarth');
		});
	});

	describe('clean()',  () => {
		let actual;
		const palette = Object.assign({}, colourMap);
		Object.freeze(palette);

		beforeEach(() => {
			actual = colours.clean(palette);
		});

		it('should return an object containing only three color lists', () => {
			expect(actual.palette).toBe(undefined);
			expect(Object.keys(actual).length).toBe(3);
			expect(Array.isArray(actual[COLOUR_TYPE.OPAQUE])).toBe(true);
			expect(Array.isArray(actual[COLOUR_TYPE.ALPHA])).toBe(true);
			expect(Array.isArray(actual[COLOUR_TYPE.GREYSCALE])).toBe(true);
		});

		it('should contain only value and name keys for colour objects', () => {
			const alphaKeys = Object.keys(actual[COLOUR_TYPE.ALPHA][0]);
			const opaqueKeys = Object.keys(actual[COLOUR_TYPE.OPAQUE][0]);
			const greyscaleKeys = Object.keys(actual[COLOUR_TYPE.GREYSCALE][0]);

			expect(alphaKeys.length).toBe(2);
			expect(alphaKeys[0]).toBe('value');
			expect(alphaKeys[1]).toBe('name');

			expect(opaqueKeys.length).toBe(2);
			expect(opaqueKeys[0]).toBe('value');
			expect(opaqueKeys[1]).toBe('name');

			expect(greyscaleKeys.length).toBe(2);
			expect(greyscaleKeys[0]).toBe('value');
			expect(greyscaleKeys[1]).toBe('name');
		});
	});
});
