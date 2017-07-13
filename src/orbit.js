const loadedTime = Date.now();
const color = require('./lib/convert');
const validate = require('./lib/validate');
const swatchify = require('./lib/swatchify');
const Component = require('@schwingbat/component');

const Wheel = new Component({
	state: {
		hue: 1,
		saturation: 0.5,
		lightness: 0.7,
		changingHue: false,
		changingSat: false,
		changingLight: false,
	},
	render(el) {
		return el('div', { id: 'wheel' }, [
			el('img', { 'src': 'img/colors.png', 'id': 'color-wheel' }),
			el('div', { 'id': 'hue-guide', 'class': 'hue-guide' }),
			el('div', {
				'id': 'hue-wheel',
				'class': 'wheel-track',
				'style': {
					'transform': 'rotate(' + this.state.hue * 360 + 'deg)'
				}}, [
					el('div', { 'id': 'hue-knob', 'class': 'knob' })
				]),
			el('ul', { 'class': 'properties' }, [
				el('li', null, [
					el('span', { 'class': 'label' }, 'SATURATION'),
					el('div', { 'id': 'saturation-slider', 'class': 'slider-track' }, [
						el('div', {
							'id': 'saturation-knob',
							'class': 'knob slider-knob',
							'style': {
								'margin-left': this.state.saturation * 100 + '%'
							}
						})
					])
				]),
				el('li', null, [
					el('span', { 'class': 'label' }, 'LIGHTNESS'),
					el('div', { 'id': 'lightness-slider', 'class': 'slider-track' }, [
						el('div', {
							'id': 'lightness-knob',
							'class': 'knob slider-knob',
							'style' : {
								'margin-left': this.state.lightness * 100 + '%'
							},
						})
					])
				])
			])
		]);
	},
	postrender() {
		// You can't currently add event listeners outside the component's elements,
		// so it has to be initialized in postrender for the time being.

		// When the mouse is released on the document body, handle the mouseup/touchend
		// event and tie up loose ends.

		const self = this;
		const state = self.state;

		function handleMouseUpOutsideElements() {
			if (state.changingHue || state.changingSat || state.changingLight) {
				Orbit.saveColor();
			}

			self.update({
				changingHue: false,
				changingSat: false,
				changingLight: false,
			});
		}

		document.body.addEventListener('mouseup', handleMouseUpOutsideElements);
		document.body.addEventListener('touchend', handleMouseUpOutsideElements);

		function handleMouseMove(e) {
			if (state.changingHue) {
				e.preventDefault();
				// Handle wheel movement logic.

				// First get the center of the wheel.
				const hRect = self.nodes.hueGuide.getBoundingClientRect();
				const wheelCenter = {
					x: hRect.left + (self.nodes.hueGuide.offsetWidth / 2),
					y: hRect.top + (self.nodes.hueGuide.offsetHeight / 2),
				};

				// Now get the relative angle of mouse from the wheel center.
				const x = (e.touches ? e.touches[0].clientX : e.clientX) - wheelCenter.x;
				const y = (e.touches ? e.touches[0].clientY : e.clientY) - wheelCenter.y;
				let degs = Math.round(90 + Math.atan2(y, x) * (180 / Math.PI));

				if (degs < 0) degs += 360;

				self.nodes.hueKnob.style.background = `hsl(${ degs }, 100%, 50%)`;

				Orbit.update({
					color: {
						h: degs / 360,
						s: state.saturation,
						l: state.lightness
					}
				});
			}

			if (state.changingSat) {
				e.preventDefault();
				// Handle horizontal slider logic.

				const sRect = self.nodes.saturationSlider.getBoundingClientRect();

				// This looks crazy, but it's just the percentage the mouse is
				// between the left and right sides of the slider track in viewport space.
				const sAmount = Math.max(0, Math.min(1, ((e.touches ? e.touches[0].clientX : e.clientX) - sRect.left) / sRect.width));

				self.nodes.saturationKnob.style.background = `hsl(${ state.hue * 360 }, ${ sAmount * 100 }%, 50%)`;
				self.nodes.saturationKnob.style.marginLeft = `${ sAmount * 100 }%`;

				Orbit.update({
					color: {
						h: state.hue,
						s: sAmount,
						l: state.lightness
					}
				});
			}

			if (state.changingLight) {
				e.preventDefault();
				// This is the same as above. I guess I should split this out into another component.

				const lRect = self.nodes.lightnessSlider.getBoundingClientRect();
				const lAmount = Math.max(0, Math.min(1, ((e.touches ? e.touches[0].clientX : e.clientX) - lRect.left) / lRect.width));

				self.nodes.lightnessKnob.style.background = `hsl(${ state.hue * 360 }, 0%, ${ lAmount * 100 }%)`;
				self.nodes.lightnessKnob.style.marginLeft = `${ lAmount * 100 }%`;

				Orbit.update({
					color: {
						h: state.hue,
						s: state.saturation,
						l: lAmount
					}
				});
			}
		}

		document.body.addEventListener('mousemove', handleMouseMove);
		document.body.addEventListener('touchmove', handleMouseMove);
	},
	events: {
		'[mousedown, touchstart] #hue-knob': function() {
			this.update({ changingHue: true });
		},
		'[mousedown, touchstart] .slider-knob': function(e, el) {
			switch (el.id) {
			case 'saturation-knob':
				this.update({ changingSat: true });
				break;
			case 'lightness-knob':
				this.update({ changingLight: true });
				break;
			}
		},
	},
	updaters: {
		hue: function(val) {
			this.nodes.hueWheel.style.transform = `rotate(${ val * 360 }deg)`;
		},
		saturation: function(val) {
			this.nodes.saturationKnob.style.marginLeft = (val * 100) + '%';
		},
		lightness: function(val) {
			this.nodes.lightnessKnob.style.marginLeft = (val * 100) + '%';
		},
		changingHue: function(val) {
			const knob = this.nodes.hueKnob;
			const { hue } = this.state;

			if (val) {
				knob.classList.add('active');
				knob.style.background = `hsl(${ (hue * 360).toFixed(1) }, 100%, 50%)`;
				this.nodes.colorWheel.classList.add('active');

			} else {
				knob.classList.remove('active');
				knob.style.background = null;
				this.nodes.colorWheel.classList.remove('active');
			}
		},
		changingSat: function(val) {
			const knob = this.nodes.saturationKnob;
			const { hue, saturation } = this.state;

			if (val) {
				knob.classList.add('active');
				knob.style.background = `hsl(${ (hue * 360).toFixed(1) }, ${ (saturation * 100).toFixed(1) }%, 50%)`;
			} else {
				knob.classList.remove('active');
				knob.style.background = null;
			}
		},
		changingLight: function(val) {
			const knob = this.nodes.lightnessKnob;
			const { hue, lightness } = this.state;

			if (val) {
				knob.classList.add('active');
				knob.style.background = `hsl(${ (hue * 360).toFixed(1) }, 0%, ${ (lightness * 100).toFixed(1) }%)`;
			} else {
				knob.classList.remove('active');
				knob.style.background = null;
			}
		},
	}
});

const Formats = new Component({
	state: {
		hex: '#ffffff',
		rgb: { r: 1, g: 1, b: 0.5 },
		hsl: { h: 1, s: 0, l: 0.5 },
		validHex: true,
		validRGB: true,
		validHSL: true,
	},
	render(el) {
		const s = this.state;
		const hex = s.hex;
		const rgb = color.formatRGB(s.rgb);
		const hsl = color.formatHSL(s.hsl);

		return el('ul', { 'class': 'formats' }, [
			el('li', { 'class': 'hsl' }, [
				el('span', { 'class': 'label' }, 'HSL'),
				el('input', { 'id': 'hsl-value', 'class': 'result', 'value': hsl })
			]),
			el('li', { 'class': 'hex' }, [
				el('span', { 'class': 'label' }, 'HEX'),
				el('input', { 'id': 'hex-value', 'class': 'result', 'value': hex })
			]),
			el('li', { 'class': 'rgb' }, [
				el('span', { 'class': 'label' }, 'RGB'),
				el('input', { 'id': 'rgb-value', 'class': 'result', 'value': rgb })
			])
		]);
	},
	events: {
		'keydown .result': function(e, el) {
			if (e.keyCode === 13) { // Enter
				let hsl;
				let rgb;

				switch (el.id) {
				case 'hex-value':
					if (validate.hex(el.value)) {
						hsl = color.rgbToHSL(color.hexToRGB(el.value));
						Orbit.update({ color: hsl });
						Orbit.setHash(el.value);
					} else {
						this.update({ validHex: false });
					}
					break;
				case 'hsl-value':
					hsl = el.value
						.replace('%', '')
						.split(',')
						.map(c => parseInt(c));

					hsl = { h: hsl[0] / 360, s: hsl[1] / 100, l: hsl[2] / 100 };

					if (validate.hsl(hsl)) {
						Orbit.update({ color: hsl });
						Orbit.setHash(hsl);
					} else {
						this.update({ validHSL: false });
					}
					break;
				case 'rgb-value':
					rgb = el.value
						.split(',')
						.map(c => parseInt(c));

					rgb = { r: rgb[0] / 256, g: rgb[1] / 256, b: rgb[2] / 256 };
					hsl = color.rgbToHSL(rgb);

					if (validate.rgb(rgb)) {
						Orbit.update({ color: hsl });
						Orbit.setHash(rgb);
					} else {
						this.update({ validRGB: false });
					}
					break;
				}
			}
		}
	},
	updaters: {
		hex: function(val) {
			this.nodes.hexValue.value = color.formatHex(val, true);
			this.update({ validHex: true });
		},
		rgb: function(val) {
			this.nodes.rgbValue.value = color.formatRGB(val);
			this.update({ validRGB: true });
		},
		hsl: function(val) {
			this.nodes.hslValue.value = color.formatHSL(val);
			this.update({ validHSL: true });
		},
		validHex: function(val) {
			this.nodes.hexValue.parentNode.classList[val ? 'remove' : 'add']('invalid');
		},
		validRGB: function(val) {
			this.nodes.rgbValue.parentNode.classList[val ? 'remove' : 'add']('invalid');
		},
		validHSL: function(val) {
			this.nodes.hslValue.parentNode.classList[val ? 'remove' : 'add']('invalid');
		}
	}
});

const Orbit = new Component({
	anchor: document.querySelector('#app'),
	state: {
		isLight: true,
		color: { h: 1, s: 0, l: 0.5 },
	},
	render(el) {
		return el('div', { 'class': 'orbit-container' }, [
			el('a', { 'href': '#', 'class': 'download-swatch' }, [
				el('span', { 'class': 'download-swatch-label' }, 'Download Swatch'),
				el('div', { 'class': 'download-swatch-icon' }, [
					el('div', { 'class': 'dl-icon-piece dl-icon-1' }),
					el('div', { 'class': 'dl-icon-piece dl-icon-2' }),
					el('div', { 'class': 'dl-icon-piece dl-icon-3' }),
				]),
			]),
			el('div', { 'class': 'controls-container' }, [
				Wheel.el,
				Formats.el
			]),
		]);
	},
	postrender() {
		window.addEventListener('hashchange', () => {
			if (this.state.ignoreHashChange) {
				this.update({ ignoreHashChange: false });
			} else {
				const newHash = '#' + window.location.hash.split('#').pop();
				this.update({ color: color.rgbToHSL(color.hexToRGB(newHash)) });
			}
		});

		// Get color from URL on load.
		if (window.location.hash.indexOf('#') !== -1) {
			this.update({ color: color.rgbToHSL(color.hexToRGB('#' + window.location.hash.split('#').pop())) });
		} else {
			// Load saved color.
			const saved = localStorage.getItem('OrbitSavedColor');

			if (saved) {
				this.update({ color: JSON.parse(saved) });
			} else {
				this.update({ color: color.rgbToHSL({ h: 0.775, s: 0.6, l: 0.84 }) });
			}
		}

		console.log(`Orbit initialized and rendered in ${ Date.now() - loadedTime }ms.`);
	},
	events: {
		'click .download-swatch': function(e) {
			e.preventDefault();
			console.log('clicked');

			const c = {
				hex: Formats.state.hex,
				rgb: color.formatRGB(Formats.state.rgb),
				hsl: color.formatHSL(Formats.state.hsl),
			};

			const swatch = swatchify(c);

			const a = document.createElement('a');
			a.setAttribute('download', 'swatch-' + c.hex.slice(1));
			a.setAttribute('href', swatch);

			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	},
	updaters: {
		isLight: function(val) {
			this.anchor.classList[val ? 'remove' : 'add']('dark');
		},
		color: function(hsl) {
			if (validate.hsl(hsl)) {
				const rgb = color.hslToRGB(hsl);
				const hex = color.rgbToHex(rgb);

				// Convert and update color formats.
				Formats.update({ hex, rgb, hsl });

				// Set HSL values on wheel.
				Wheel.update({
					hue: hsl.h,
					saturation: hsl.s,
					lightness: hsl.l
				});

				this.update({ isLight: hsl.l > 0.5 });

				// Update background color.
				this.anchor.style.backgroundColor = hex;
			}
		},
	},
	saveColor() {
		localStorage.setItem('OrbitSavedColor', JSON.stringify(this.state.color));
		this.setHash(this.state.color);
	},
	setHash(val) {
		// Convert any color to hex and update the hash without triggering the event handler.
		this.update({ ignoreHashChange: true });

		if (validate.hex(val)) {
			window.location.hash = color.formatHex(val);
		} else if (validate.rgb(val)) {
			window.location.hash = color.rgbToHex(val);
		} else if (validate.hsl(val)) {
			window.location.hash = color.rgbToHex(color.hslToRGB(val));
		} else {
			this.update({ ignoreHashChange: false });
		}
	}
});