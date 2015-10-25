var orbit = new Ractive({
    el: "body",
    template: "#template",
    data: {
        hue: '198',
        saturation: '42',
        lightness: '33',
        output: {
            hex: '#FFFFFF',
            rgb: '255, 255, 255',
            isLight: true
        },
        input: {
            hue: false,
            sat: false,
            light: false
        },
        saturationSlider: 42/1.22,
        lightnessSlider: 33/1.22
    }
});

var setColor = function(e, color) {
    /*  Calculates RGB and hex values with TinyColor.
        Updates to a new color if one is specified,
        otherwise it just uses the current HSL values. */

    var c,
        hsl,
        rgb;

    if (color) {
        c = tinycolor(color);
        hsl = c.toHsl();

        orbit.set('hue', Math.round(hsl.h));
        orbit.set('saturation', Math.round(hsl.s*100));
        orbit.set('lightness', Math.round(hsl.l*100));
        orbit.set('saturationSlider', Math.round(hsl.s*100/1.22));
        orbit.set('lightnessSlider', Math.round(hsl.l*100/1.22));
    } else {
        c = tinycolor({ h: orbit.get('hue'), s: orbit.get('saturation'), l: orbit.get('lightness') });
    }

    rgb = c.toRgb();
    hsl = c.toHsl();

    orbit.set('color', c);
    orbit.set('output.hex', c.toHexString().toUpperCase());
    orbit.set('output.rgb', ''+rgb.r+', '+rgb.g+', '+rgb.b+'');
    orbit.set('output.isLight', c.isLight());

    localStorage.setItem('OrbitCurrentColor', JSON.stringify(hsl));
}

/**********************************
         Hue Wheel Movement
**********************************/

// Set hue based on the mouse's position from the center of the circle.
var moveWheel = function(e, wheel, offset) {
    var x = e.pageX - offset.center.x,
        y = -1*(e.pageY - offset.center.y),
        theta = Math.atan2(y,x)*(180/Math.PI),
        degs = Math.round(90 - theta);

    if (degs < 0) degs += 360;

    orbit.set('hue', degs);
}

var sel = document.querySelector('.handle'),
    guide = document.querySelector('.hue-guide');
    wheel = document.querySelector('.hue-wheel'),
    main = document.querySelector('#orbit'),
    offset = {
        calculate: function() {
            var rect = guide.getBoundingClientRect();
            this.left = rect.left + document.body.scrollLeft;
            this.top = rect.top + document.body.scrollTop;
            this.center = {
                x: this.left + (guide.offsetWidth / 2),
                y: this.top + (guide.offsetHeight / 2)
            }
        }
    };

sel.onmousedown = function() {
    orbit.set('input.hue', true);
    main.classList.add('disabled', 'no-transition');

    document.body.onmousemove = function(e) {
        e = e || window.event;
        e.preventDefault();
        moveWheel(e, wheel, offset);
        setColor();
    }

    document.body.onmouseup = function() {
        document.body.onmousemove = document.body.onmouseup = null;
        orbit.set('input.hue', false);
        main.classList.remove('disabled', 'no-transition');
    }
}

window.onresize = function() { offset.calculate(); }

/**********************************
            Saturation &
         Lightness Sliders
**********************************/

// Set sat/lightness based on mouse position, and Ractive handles slider position.
var moveSlider = function(e, slider, param) {
    var rect = slider.parentNode.getBoundingClientRect(),
        mousePos = e.pageX - rect.left - (slider.offsetWidth/2),
        fillAmount = Math.min(Math.max((mousePos / slider.parentNode.clientWidth) * 100, 0), 100/1.22);

    orbit.set(param, Math.round(fillAmount*1.22));
    orbit.set(param+'Slider', fillAmount);
}

var sat = document.querySelector('.saturation .knob'),
    light = document.querySelector('.lightness .knob');

/* Saturation */

sat.onmousedown = function() {
    orbit.set('input.sat', true);
    main.classList.add('disabled');

    document.body.onmousemove = function(e) {
        e = e || window.event;
        e.preventDefault();
        moveSlider(e, sat, 'saturation');
        setColor();
    }

    document.body.onmouseup = function() {
        document.body.onmousemove = document.body.onmouseup = null;
        orbit.set('input.sat', false);
        main.classList.remove('disabled');
    }
}

/* Lightness */

light.onmousedown = function() {
    orbit.set('input.light', true);
    main.classList.add('disabled');

    document.body.onmousemove = function(e) {
        e = e || window.event;
        e.preventDefault();
        moveSlider(e, light, 'lightness');
        setColor();
    }

    document.body.onmouseup = function() {
        document.body.onmousemove = document.body.onmouseup = null;
        orbit.set('input.light', false);
        main.classList.remove('disabled');
    }
}

/**********************************
            Initialize
**********************************/

offset.calculate();

// Color persists when page is reloaded!
if (localStorage.getItem('OrbitCurrentColor')) {
    setColor(null, JSON.parse(localStorage.getItem('OrbitCurrentColor')));
} else {
    setColor();
}
