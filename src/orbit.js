(function() {
    "use strict"

    const tinycolor = require("./lib/tinycolor-min");
    const validate = require("./lib/validate-color");
    const Component = require("@schwingbat/component");

    const Wheel = new Component({
        state: {
            hue: 360,
            saturation: 100,
            lightness: 100
        },
        render(el) {
            return el("div", { id: "wheel" }, [
                el("img", { "src": "img/colors.png", "class": "colors" }),
                el("div", { "class": "hue-guide" }),
                el("div", {
                    "id": "hue-wheel",
                    "class": "wheel-track",
                    "style": {
                        "transform": "rotate(" + this.state.hue + "deg)"
                    }}, [
                    el("div", { "id": "hue-knob", "class": "wheel-knob" })
                ]),
                el("div", { "class": "inner" }, [
                    el("ul", { "class": "properties" }, [
                        el("li", null, [
                            el("span", { "class": "label" }, "SATURATION"),
                            el("div", { "class": "slider-track" }, [
                                el("div", {
                                    "id": "saturation-knob",
                                    "class": "slider-knob",
                                    "style": {
                                        "margin-left": this.state.saturation + "%"
                                    }
                                })
                            ])
                        ]),
                        el("li", null, [
                            el("span", { "class": "label" }, "LIGHTNESS"),
                            el("div", { "class": "slider-track" }, [
                                el("div", {
                                    "id": "lightness-knob",
                                    "class": "slider-knob",
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
        events: {

        },
        updaters: {
            hue: function(val) {

            },
            saturation: function(val) {

            },
            lightness: function(val) {

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
                s: 100,
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
                    el("input", { "id": "rgb-value", "class": "result", "value": hsl })
                ])
            ]);
        },
        events: {

        },
        updaters: {
            hex: function(val) {

            },
            rgb: function(val) {

            },
            hsl: function (val) {

            }
        }
    });

    const Orbit = new Component({
        anchor: "#app",
        state: {
            isLight: true,
            isValid: true,
            color: "#ffffff",
        },
        prerender() {
            // TODO: Load color from localStorage if saved.
        },
        render(el) {
            return el("div", { "class": "controls-container" }, [ Wheel.el, Formats.el ]);
        },
        events: {

        },
        updaters: {
            isLight: function(val) {
                this.anchor.classList[ val ? "remove" : "add" ]("dark");
            },
            isValid: function(val) {
                this.anchor.classList[ val ? "remove" : "add" ]("invalid");
            },
            color: function(val) {
                // TODO: Calculate and apply all colors.
            },
        },
    });
})();