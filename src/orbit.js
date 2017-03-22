(function() {
    "use strict";

    const validate = require("./lib/validate-color");
    const color = require("./lib/convert-color");
    const Component = require("@schwingbat/component");

    const Wheel = new Component({
        state: {
            hue: 360,
            saturation: 50,
            lightness: 70,
            changingHue: false,
            changingSat: false,
            changingLight: false,
        },
        render(el) {
            return el("div", { id: "wheel" }, [
                el("img", { "src": "img/colors.png", "class": "colors" }),
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
                            h: degs,
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
                    var amount = Math.max(0, Math.min( 100, ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) / rect.width * 100 ));

                    self.nodes.saturationKnob.style.background = `hsl(${ state.hue }, ${ amount }%, 50%)`;
                    self.nodes.saturationKnob.style.marginLeft = `${ amount }%`;

                    Orbit.update({
                        color: {
                            h: state.hue,
                            s: Math.round(amount),
                            l: state.lightness
                        }
                    });
                }

                if (state.changingLight) {
                    // This is the same as above. I guess I should split this out into another component.

                    var rect = self.nodes.lightnessSlider.getBoundingClientRect();
                    var amount = Math.max(0, Math.min( 100, ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) / rect.width * 100 ));

                    self.nodes.lightnessKnob.style.background = `hsl(${ state.hue }, 0%, ${ amount }%)`;
                    self.nodes.lightnessKnob.style.marginLeft = `${ amount }%`;

                    Orbit.update({
                        color: {
                            h: state.hue,
                            s: state.saturation,
                            l: Math.round(amount)
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
                this.nodes.hueWheel.style.transform = `rotate(${ val }deg)`;
            },
            saturation: function(val) {
                this.nodes.saturationKnob.style.left = val + "%";
            },
            lightness: function(val) {
                this.nodes.lightnessKnob.style.left = val + "%";
            },
            changingHue: function(val) {
                var knob = this.nodes.hueKnob;
                var { hue } = this.state;

                if (val) {
                    knob.classList.add("active");
                    knob.style.background = `hsl(${ hue }, 100%, 50%)`;
                } else {
                    knob.classList.remove("active");
                    knob.style.background = null;
                }
            },
            changingSat: function(val) {
                var knob = this.nodes.saturationKnob;
                var { hue, saturation } = this.state;

                if (val) {
                    knob.classList.add("active");
                    knob.style.background = `hsl(${ hue }, ${ saturation }%, 50%)`;
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
                    knob.style.background = `hsl(${ hue }, 0%, ${ lightness }%)`;
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
                r: 255,
                g: 255,
                b: 255,
            },
            hsl: {
                h: 360,
                s: 0,
                l: 100
            }
        },
        render(el) {
            var s = this.state;
            var hex = s.hex;
            var rgb = s.rgb.r + ", " + s.rgb.g + ", " + s.rgb.b;
            var hsl = s.hsl.h + ", " + s.hsl.s + "%, " + s.hsl.l + "%";

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
                            var hsl = color.rgbToHSL(color.hexToRGB(el.value));
                            Orbit.update({ color: hsl, isValid: true });
                        } else {
                            Orbit.update({ isValid: false });
                        }
                        break;
                    case "hsl-value":
                        var hsl = el.value
                            .replace("%", "")
                            .split(",")
                            .map(c => parseInt(c));

                        hsl = { h: hsl[0], s: hsl[1], l: hsl[2] };

                        console.log(hsl);
                        break;
                    case "rgb-value":
                        var rgb = el.value
                            .split(",")
                            .map(c => parseInt(c));

                        rgb = { r: rgb[0], g: rgb[1], b: rgb[2] };

                        console.log(rgb);
                        break;
                    }
                }
            }
        },
        updaters: {
            hex: function(val) {
                this.nodes.hexValue.value = val;
            },
            rgb: function(val) {
                this.nodes.rgbValue.value = `${ val.r }, ${ val.g }, ${ val.b }`;
            },
            hsl: function (val) {
                this.nodes.hslValue.value = `${ val.h }, ${ val.s }%, ${ val.l }%`;
            }
        }
    });

    const Orbit = new Component({
        anchor: "#app",
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