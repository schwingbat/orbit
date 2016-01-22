var pickr = new Ractive({
    el: "body",
    template: "#template",
    data: {
        hue: '180',
        saturation: '75',
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
        scheme: 'mono',
        schemes: {
            mono: [],
            complement: []
        },
        swatches: [
            '#456890',
            '#981092',
            '#019842'
        ],
        colorList: [
            {
                name: 'Kiwi',
                hsl: 'hsl(89, 81%, 52%)',
                hex: '#88E821',
                rgb: 'rgb(136, 232, 33)'
            },
            {
                name: 'Dark Aqua',
                hsl: 'hsl(180, 75%, 33%)',
                hex: '#159393',
                rgb: 'rgb(21, 147, 147)'
            }
        ]
    }
});

var setColor = function(e, color) {
    var c,
        hsl;

    if (color) {
        c = tinycolor(color);
        hsl = c.toHsl();

        pickr.set('hue', Math.round(hsl.h));
        pickr.set('saturation', Math.round(hsl.s*100));
        pickr.set('lightness', Math.round(hsl.l*100));
    } else {
        c = tinycolor({ h: pickr.get('hue'), s: pickr.get('saturation'), l: pickr.get('lightness') });
    }

    var rgb = c.toRgb(),
        mono = c.monochromatic(6).map(function(t) {
            return t.toHsl();
        }).splice(1,6).sort(function(a,b){
            if (a.l > b.l)
                return -1
            else
                return 1
            return 0;
        }),
        complement = function() {
            var colors = [],
                compMain = c.complement().toHsl(),
                comp = c.complement().monochromatic(5).map(function(t) { return t.toHsl(); }).splice(1,2);
            return [
                mono[0],
                mono[1],
                mono[2],
                comp[0],
                comp[1]
            ];
        };

    hsl = c.toHsl();

    pickr.set('color', c);
    pickr.set('output.hex', c.toHexString().toUpperCase());
    pickr.set('output.rgb', ''+rgb.r+', '+rgb.g+', '+rgb.b+'');
    pickr.set('output.isLight', c.isLight());
    pickr.set('schemes.mono', mono);
    pickr.set('schemes.complement', complement());

    localStorage.setItem('OrbitCurrentColor', JSON.stringify(hsl));
}

/**********************************
         Hue Wheel Movement
**********************************/

var moveWheel = function(e, wheel, offset) {
    var x = e.pageX - offset.center.x,
        y = -1*(e.pageY - offset.center.y),
        theta = Math.atan2(y,x)*(180/Math.PI),
        degs = Math.round(90 - theta);

    if (degs < 0) degs += 360;

    pickr.set('hue', degs);
}

var sel = document.querySelector('.selector'),
    wheel = document.querySelector('.hue-wheel'),
    main = document.querySelector('#pickr'),
    offset = {
        calculate: function() {
            var rect = wheel.getBoundingClientRect();
            this.left = rect.left + document.body.scrollLeft;
            this.top = rect.top + document.body.scrollTop;
            this.center = {
                x: this.left + (wheel.clientWidth / 2),
                y: this.top + (wheel.clientHeight / 2)
            }
        }
    };

sel.onmousedown = function() {
    pickr.set('input.hue', true);
    main.classList.add('disabled', 'no-transition');

    document.body.onmousemove = function(e) {
        e = e || window.event;
        e.preventDefault();
        moveWheel(e, wheel, offset);
        setColor();
    }

    document.body.onmouseup = function() {
        document.body.onmousemove = document.body.onmouseup = null;
        pickr.set('input.hue', false);
        main.classList.remove('disabled', 'no-transition');
    }
}

window.onresize = function() { offset.calculate(); }

/**********************************
            Saturation &
         Lightness Sliders
**********************************/

var moveSlider = function(e, slider, param) {
    var rect = slider.parentNode.getBoundingClientRect(),
        mousePos = e.pageX - rect.left - (slider.clientWidth/2);

    fillAmount = Math.round(Math.min(Math.max((mousePos / slider.parentNode.clientWidth) * 100, 0), 100));
    pickr.set(param, fillAmount);
}


var sat = document.querySelector('.saturation .knob'),
    light = document.querySelector('.lightness .knob');

/* Saturation */

sat.onmousedown = function() {
    pickr.set('input.sat', true);
    main.classList.add('disabled');

    document.body.onmousemove = function(e) {
        e = e || window.event;
        e.preventDefault();
        moveSlider(e, sat, 'saturation');
        setColor();
    }

    document.body.onmouseup = function() {
        document.body.onmousemove = document.body.onmouseup = null;
        pickr.set('input.sat', false);
        main.classList.remove('disabled');
    }
}

/* Lightness */

light.onmousedown = function() {
    pickr.set('input.light', true);
    main.classList.add('disabled');

    document.body.onmousemove = function(e) {
        e = e || window.event;
        e.preventDefault();
        moveSlider(e, light, 'lightness');
        setColor();
    }

    document.body.onmouseup = function() {
        document.body.onmousemove = document.body.onmouseup = null;
        pickr.set('input.light', false);
        main.classList.remove('disabled');
    }
}

// var inputs = document.querySelectorAll('.input');
// for (var i = 0; i < inputs.length; i++) {
//     inputs[i].addEventListener('input', setColor);
// }



var setScheme = function(scheme) {
    var mono = document.querySelector('.monochrome'),
        comp = document.querySelector('.complement');

    switch (scheme) {
        case 'mono':
        case 'monochrome':
        case 'monochromatic':
            pickr.set('scheme', 'mono');
            break;
        case 'comp':
        case 'complement':
        case 'complementary':
            pickr.set('scheme', 'complement');
            break;
        default:
            console.error('setScheme: Unrecognized scheme parameter ('+scheme+').');
            break;
    }
}

/**********************************
            Initialize
**********************************/

offset.calculate();

if (localStorage.getItem('OrbitCurrentColor')) {
    setColor(null, JSON.parse(localStorage.getItem('OrbitCurrentColor')));
} else {
    setColor();
}
