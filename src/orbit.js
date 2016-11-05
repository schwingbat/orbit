'use strict'

var tinycolor = require('./lib/tinycolor-min.js')
var Ractive = require('ractive')
var hammer = require('hammerjs')
var touch = require('ractive-touch')

Ractive.DEBUG = false

var orbit = new Ractive({
    el: "body",
    template: "#template",
    data: {
        color: {
            isLight: true,
            hex: {
                isValid: true,
                value: '#222222',
                temp: '#222222'
            },
            rgb: {
                isValid: true,
                value: {
                    r: null,
                    g: null,
                    b: null
                },
                temp: ''
            },
            hsl: {
                isValid: true,
                value: {
                    h: '198',
                    s: '42',
                    l: '33'
                },
                temp: ''
            }
        },
        changing: {
            hue: false,
            sat: false,
            light: false
        },
        slider: {
            saturation: 42 / 1.22,
            lightness: 33 / 1.22
        }
    },
    oninit: function() {
        var self = this

        function validateHex(value) {
            var newVal = value.split('')

            if (newVal[0] === '#') newVal.shift()
            if (newVal.length !== 6 && newVal.length !== 3) return false

            var charList = '0123456789ABCDEF'
            var valid = true

            newVal.forEach(function(val) {
                var match = false
                charList.split('').forEach(function(char) {
                    if (char === val.toUpperCase()) match = true
                })
                if (!match) valid = false
            })

            if (!valid) return false
            else return true
        }

        function validateRGB(value) {
            var split = value.split(',')

            if (split.length !== 3) return false

            var inRange = true

            split.forEach(item => {
                var parsed = parseInt(item)
                if (parsed > 255 || parsed < 0) inRange = false
            })

            if (inRange) return true
        }

        function validateHSL(value) {
            var split = value.replace('%', '').split(',')

            if (split.length !== 3) return false

            if (split[0] > 360 || split[0] < 0) return false
            if (split[1] > 100 || split[1] < 0) return false
            if (split[2] > 100 || split[2] < 0) return false

            return true
        }

        function RGBTempToObject(value) {
            var newVal = value.split(',').map(function(item) {
                return item.trim()
            })

            return {
                'r': parseInt(newVal[0]),
                'g': parseInt(newVal[1]),
                'b': parseInt(newVal[2])
            }
        }

        function HSLTempToObject(value) {
            var newVal = value.split(',').map(function(item) {
                return item.trim().replace('%', '')
            })

            return {
                'h': parseInt(newVal[0]),
                's': newVal[1] / 100,
                'l': newVal[2] / 100
            }
        }

        self.on({
            'changeHex': function(e) {
                var value = self.get('color.hex.temp')

                if (validateHex(value)) {
                    setColor(value, ['hsl','rgb'])

                    self.set('color.hex.isValid', true)
                } else {
                    self.set('color.hex.isValid', false)
                }
            },
            'changeRGB': function(e) {
                var value = self.get('color.rgb.temp')

                if (validateRGB(value)) {
                    setColor(RGBTempToObject(value), ['hsl','hex'])

                    self.set('color.rgb.isValid', true)
                } else {
                    self.set('color.rgb.isValid', false)
                }
            },
            'changeHSL': function(e) {
                var value = self.get('color.hsl.temp')

                if (validateHSL(value)) {
                    setColor(HSLTempToObject(value), ['rgb','hex'])

                    self.set('color.hsl.isValid', true)
                } else {
                    self.set('color.hsl.isValid', false)
                }
            }
        })
    }
})

var setColor = function(color, setTempsArray) {
    var c,
        hsl,
        rgb

    if (color) {
        c = tinycolor(color)
        hsl = c.toHsl()

        orbit.set({
            'color.hsl.value': {
                'h': Math.round(hsl.h),
                's': Math.round(hsl.s * 100),
                'l': Math.round(hsl.l * 100)
            },
            'slider': {
                'saturation': Math.round(hsl.s * 100 / 1.22),
                'lightness': Math.round(hsl.l * 100 / 1.22)
            }
        })

    } else {
        c = tinycolor(orbit.get('color.hsl.value'))
    }

    rgb = c.toRgb()
    hsl = c.toHsl()

    orbit.set({
        'color.hex.value': c.toHexString().toUpperCase(),
        'color.rgb.value': {
            'r': rgb.r,
            'g': rgb.g,
            'b': rgb.b
        },
        'color.isLight': c.isLight()
    })

    if (setTempsArray) {
        setTempsArray.forEach(item => {
            var value = null

            switch (item) {
                case 'rgb':
                    value = rgb.r+', '+rgb.g+', '+rgb.b
                    break
                case 'hsl':
                    value = parseInt(hsl.h)+', '+parseInt(hsl.s * 100)+'%, '+parseInt(hsl.l * 100)+'%'
                    break
                case 'hex':
                    value = c.toHexString().toUpperCase()
                    break
                default:
                    break
            }
            orbit.set('color.'+item+'.isValid', true)
            orbit.set('color.'+item+'.temp', value)
        })
    }

    localStorage.setItem('OrbitCurrentColor', JSON.stringify(hsl))
}

/**********************************
         Hue Wheel Movement
**********************************/

// Set hue based on the mouse's position from the center of the circle.
var moveWheel = function(e, wheel, offset) {
    var x = e.pageX - offset.center.x,
        y = -1 * (e.pageY - offset.center.y),
        theta = Math.atan2(y, x) * (180 / Math.PI),
        degs = Math.round(90 - theta)

    if (degs < 0) degs += 360

    orbit.set('color.hsl.value.h', degs)
}

var sel = document.querySelector('.handle'),
    guide = document.querySelector('.hue-guide'),
    wheel = document.querySelector('.hue-wheel'),
    main = document.querySelector('#orbit'),
    offset = {
        calculate: function() {
            var rect = guide.getBoundingClientRect()
            this.left = rect.left + document.body.scrollLeft
            this.top = rect.top + document.body.scrollTop
            this.center = {
                x: this.left + (guide.offsetWidth / 2),
                y: this.top + (guide.offsetHeight / 2)
            }
        }
    }

sel.onmousedown = function() {
    orbit.set('changing.hue', true)
    main.classList.add('disabled', 'no-transition')

    document.onmousemove = function(e) {
        e = e || window.event
        e.preventDefault()
        moveWheel(e, wheel, offset)
        setColor(null, ['rgb','hsl','hex'])
    }

    document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null
        orbit.set('changing.hue', false)
        main.classList.remove('disabled', 'no-transition')
    }
}

window.onresize = function() {
    offset.calculate()
}

/**********************************
            Saturation &
         Lightness Sliders
**********************************/

// Set sat/lightness based on mouse position, and Ractive handles slider position.
var moveSlider = function(e, slider, colorVal, sliderVal) {
    var rect = slider.parentNode.getBoundingClientRect(),
        mousePos = e.pageX - rect.left - (slider.offsetWidth / 2),
        fillAmount = Math.min(Math.max((mousePos / slider.parentNode.clientWidth) * 100, 0), 100 / 1.22)

    orbit.set(colorVal, Math.round(fillAmount * 1.22))
    orbit.set(sliderVal, fillAmount)
}

var sat = document.querySelector('.saturation .knob'),
    light = document.querySelector('.lightness .knob')

/* Saturation */

sat.onmousedown = function() {
    orbit.set('changing.sat', true)
    main.classList.add('disabled')

    document.body.onmousemove = function(e) {
        e = e || window.event
        e.preventDefault()
        moveSlider(e, sat, 'color.hsl.value.s', 'slider.saturation')
        setColor(null, ['rgb','hex','hsl'])
    }

    document.body.onmouseup = function() {
        document.body.onmousemove = document.body.onmouseup = null
        orbit.set('changing.sat', false)
        main.classList.remove('disabled')
    }
}

/* Lightness */

light.onmousedown = function() {
    //e.preventDefault();
    orbit.set('changing.light', true)
    main.classList.add('disabled')

    document.body.onmousemove = function(e) {
        e = e || window.event
        e.preventDefault()
        moveSlider(e, light, 'color.hsl.value.l', 'slider.lightness')
        setColor(null, ['rgb','hex','hsl'])
    }

    document.body.onmouseup = function() {
        document.body.onmousemove = document.body.onmouseup = null
        orbit.set('changing.light', false)
        main.classList.remove('disabled')
    }
}

/**********************************
            Initialize
**********************************/

offset.calculate()

// Color persists when page is reloaded!
if (localStorage.getItem('OrbitCurrentColor')) {
    setColor(JSON.parse(localStorage.getItem('OrbitCurrentColor')), ['hsl','hex','rgb'])
} else {
    setColor()
}
