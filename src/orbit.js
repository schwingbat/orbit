(function() {
    "use strict";

    const validate = require("./lib/validate-color");
    const color = require("./lib/convert-color");
    const Component = require("@schwingbat/component");

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
            return el("div", { id: "wheel" }, [
                el("img", { "src": "img/colors.png", "id": "color-wheel", "class": "colors" }),
                el("div", { "id": "hue-guide", "class": "hue-guide" }),
                el("div", {
                    "id": "hue-wheel",
                    "class": "wheel-track",
                    "style": {
                        "transform": "rotate(" + this.state.hue + "deg)"
                    }}, [
                    el("div", { "id": "hue-knob", "class": "knob" })
                ]),
                el("div", { "class": "inner" }, [
                    el("ul", { "class": "properties" }, [
                        el("li", null, [
                            el("span", { "class": "label" }, "SATURATION"),
                            el("div", { "id": "saturation-slider", "class": "slider-track" }, [
                                el("div", {
                                    "id": "saturation-knob",
                                    "class": "knob slider-knob",
                                    "style": {
                                        "margin-left": this.state.saturation + "%"
                                    }
                                })
                            ])
                        ]),
                        el("li", null, [
                            el("span", { "class": "label" }, "LIGHTNESS"),
                            el("div", { "id": "lightness-slider", "class": "slider-track" }, [
                                el("div", {
                                    "id": "lightness-knob",
                                    "class": "knob slider-knob",
                                    "style" : {
                                        "margin-left": this.state.lightness + "%"
                                    },
                                })
                            ])
                        ])
                    ])
                ])
            ])
        },
        postrender() {
            // You can't currently add event listeners outside the component's elements,
            // so it has to be initialized in postrender for the time being.

            // When the mouse is released on the document body, handle the mouseup/touchend
            // event and tie up loose ends.

            const self = this;
            const state = self.state;

            function handleMouseUpOutsideElements(e) {
                self.update({
                    changingHue: false,
                    changingSat: false,
                    changingLight: false,
                });
            }

            document.body.addEventListener("mouseup", handleMouseUpOutsideElements);
            document.body.addEventListener("touchend", handleMouseUpOutsideElements);

            function handleMouseMove(e) {
                if (state.changingHue) {
                    // Handle wheel movement logic.

                    console.log(state);

                    // First get the center of the wheel.
                    var rect = self.nodes.hueGuide.getBoundingClientRect();
                    var wheelCenter = {
                        x: rect.left + (self.nodes.hueGuide.offsetWidth / 2),
                        y: rect.top + (self.nodes.hueGuide.offsetHeight / 2),
                    };

                    // Now get the relative angle of mouse from the wheel center.
                    var x = (e.touches ? e.touches[0].clientX : e.clientX) - wheelCenter.x;
                    var y = (e.touches ? e.touches[0].clientY : e.clientY) - wheelCenter.y;
                    var degs = Math.round(90 + Math.atan2(y, x) * (180 / Math.PI));

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
                    // Handle horizontal slider logic.

                    var rect = self.nodes.saturationSlider.getBoundingClientRect();

                    // This looks crazy, but it's just the percentage the mouse is
                    // between the left and right sides of the slider track in viewport space.
                    var amount = Math.max(0, Math.min(1, ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) / rect.width));

                    self.nodes.saturationKnob.style.background = `hsl(${ state.hue * 360 }, ${ amount * 100 }%, 50%)`;
                    self.nodes.saturationKnob.style.marginLeft = `${ amount * 100 }%`;

                    Orbit.update({
                        color: {
                            h: state.hue,
                            s: amount,
                            l: state.lightness
                        }
                    });
                }

                if (state.changingLight) {
                    // This is the same as above. I guess I should split this out into another component.

                    var rect = self.nodes.lightnessSlider.getBoundingClientRect();
                    var amount = Math.max(0, Math.min(1, ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) / rect.width));

                    self.nodes.lightnessKnob.style.background = `hsl(${ state.hue * 360 }, 0%, ${ amount * 100 }%)`;
                    self.nodes.lightnessKnob.style.marginLeft = `${ amount * 100 }%`;

                    Orbit.update({
                        color: {
                            h: state.hue,
                            s: state.saturation,
                            l: amount
                        }
                    });
                }
            }

            document.body.addEventListener("mousemove", handleMouseMove);
            document.body.addEventListener("touchmove", handleMouseMove);
        },
        events: {
            "[mousedown, touchstart] #hue-knob": function(e, el) {
                this.update({ changingHue: true });
                console.log("Starting touch/mousedown on hue knob.");
            },
            "[mousedown, touchstart] .slider-knob": function(e, el) {
                switch (el.id) {
                case "saturation-knob":
                    this.update({ changingSat: true });
                    break;
                case "lightness-knob":
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
                this.nodes.saturationKnob.style.marginLeft = (val * 100) + "%";
            },
            lightness: function(val) {
                this.nodes.lightnessKnob.style.marginLeft = (val * 100) + "%";
            },
            changingHue: function(val) {
                var knob = this.nodes.hueKnob;
                var { hue } = this.state;

                if (val) {
                    knob.classList.add("active");
                    knob.style.background = `hsl(${ (hue * 360).toFixed(1) }, 100%, 50%)`;
                    this.nodes.colorWheel.classList.add("active");

                } else {
                    knob.classList.remove("active");
                    knob.style.background = null;
                    this.nodes.colorWheel.classList.remove("active");
                }
            },
            changingSat: function(val) {
                var knob = this.nodes.saturationKnob;
                var { hue, saturation } = this.state;

                if (val) {
                    knob.classList.add("active");
                    knob.style.background = `hsl(${ (hue * 360).toFixed(1) }, ${ (saturation * 100).toFixed(1) }%, 50%)`;
                } else {
                    knob.classList.remove("active");
                    knob.style.background = null;
                }
            },
            changingLight: function(val) {
                var knob = this.nodes.lightnessKnob;
                var { hue, lightness } = this.state;

                if (val) {
                    knob.classList.add("active");
                    knob.style.background = `hsl(${ (hue * 360).toFixed(1) }, 0%, ${ (lightness * 100).toFixed(1) }%)`;
                } else {
                    knob.classList.remove("active");
                    knob.style.background = null;
                }
            }
        }
    });

    const Formats = new Component({
        state: {
            hex: "#ffffff",
            rgb: {
                r: 1,
                g: 1,
                b: 1,
            },
            hsl: {
                h: 1,
                s: 0,
                l: 1
            }
        },
        render(el) {
            var s = this.state;
            var hex = s.hex;
            var rgb = (s.rgb.r * 256).toFixed(1) + ", " + (s.rgb.g * 256).toFixed(1) + ", " + (s.rgb.b * 256).toFixed(1);
            var hsl = (s.hsl.h * 360).toFixed(1) + ", " + (s.hsl.s * 100).toFixed(1) + "%, " + (s.hsl.l * 100).toFixed(1) + "%";

            return el("ul", { "class": "formats" }, [
                el("li", { "class": "hsl" }, [
                    el("span", { "class": "label" }, "HSL"),
                    el("input", { "id": "hsl-value", "class": "result", "value": hsl })
                ]),
                el("li", { "class": "hex" }, [
                    el("span", { "class": "label" }, "HEX"),
                    el("input", { "id": "hex-value", "class": "result", "value": hex })
                ]),
                el("li", { "class": "rgb" }, [
                    el("span", { "class": "label" }, "RGB"),
                    el("input", { "id": "rgb-value", "class": "result", "value": rgb })
                ])
            ]);
        },
        events: {
            "keydown .result": function(e, el) {
                if (e.keyCode === 13) { // Enter
                    switch (el.id) {
                    case "hex-value":
                        if (validate.hex(el.value)) {
                            console.log(el.value);

                            var hsl = color.rgbToHSL(color.hexToRGB(el.value));
                            Orbit.update({ color: hsl, isValid: validate.hsl(hsl) });
                        } else {
                            Orbit.update({ isValid: false });
                        }
                        break;
                    case "hsl-value":
                        var hsl = el.value
                            .replace("%", "")
                            .split(",")
                            .map(c => parseInt(c));

                        Orbit.update({ color: hsl });
                        break;
                    case "rgb-value":
                        var rgb = el.value
                            .split(",")
                            .map(c => parseInt(c));

                        var hsl = color.rgbToHSL({ r: rgb[0], g: rgb[1], b: rgb[2] });

                        Orbit.update({ color: hsl });
                        break;
                    }
                }
            }
        },
        updaters: {
            hex: function(val) {
                console.log(val);
                this.nodes.hexValue.value = color.formatHex(val, true).toUpperCase();
            },
            rgb: function(val) {
                this.nodes.rgbValue.value = color.formatRGB(val);
            },
            hsl: function (val) {
                this.nodes.hslValue.value = color.formatHSL(val);
            }
        }
    });

    const Orbit = new Component({
        anchor: document.querySelector("#app"),
        state: {
            isLight: true,
            isValid: true,
            color: {
                h: 360,
                s: 0,
                l: 100,
            },
        },
        prerender() {
            // TODO: Load color from localStorage if saved.
        },
        render(el) {
            return el("div", { "class": "controls-container" }, [ Wheel.el, Formats.el ]);
        },
        postrender() {
            const self = this;

            window.addEventListener("hashchange", function(e) {
                var newHash = "#" + e.newURL.split("#").pop();
                self.update({ color: color.rgbToHSL(color.hexToRGB(newHash)) });
            });

            // Get color on load
            if (window.location.hash.indexOf('#') !== -1) {
                self.update({ color: color.rgbToHSL(color.hexToRGB('#' + window.location.hash.split('#').pop())) });
            }
        },
        updaters: {
            isLight: function(val) {
                this.anchor.classList[ val ? "remove" : "add" ]("dark");
            },
            isValid: function(val) {
                this.anchor.classList[ val ? "remove" : "add" ]("invalid");
            },
            color: function(hsl) {
                if (validate.hsl(hsl)) {
                    var rgb = color.hslToRGB(hsl);
                    var hex = color.rgbToHex(rgb);

                    console.log({ hsl, rgb, hex });

                    // Convert and update color formats.
                    Formats.update({
                        hex: hex,
                        rgb: rgb,
                        hsl: hsl,
                    });

                    // Set HSL values on wheel.
                    Wheel.update({
                        hue: hsl.h,
                        saturation: hsl.s,
                        lightness: hsl.l
                    });

                    this.update({
                        isLight: color.isLightHex(hex),
                        isValid: true,
                    });

                    // Update background color.
                    this.anchor.style.backgroundColor = hex;
                } else {
                    this.update({
                        isValid: false,
                    });
                }
            },
        },
    });
})();