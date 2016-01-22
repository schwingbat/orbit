var pickr = new Ractive({
    el: "#container",
    template: "#template",
    data: {
        hue: '0',
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
        }
    }
});

var setColor = function() {
    var c = tinycolor({ h: pickr.get('hue'), s: pickr.get('saturation'), l: pickr.get('lightness') }),
        rgb = c.toRgb();
    pickr.set('color', c);
    pickr.set('output.hex', c.toHexString().toUpperCase());
    pickr.set('output.rgb', ''+rgb.r+', '+rgb.g+', '+rgb.b+'');
    pickr.set('output.isLight', c.isLight());
}

/**********************************
         Hue Wheel Movement
**********************************/

var followMouse = function(guide, wheel, offset, e) {
    var x = e.pageX - offset.left - wheel.offsetWidth/2,
        y = -1*(e.pageY - offset.top - wheel.offsetHeight/2),
        theta = Math.atan2(y,x)*(180/Math.PI),
        degs = Math.round(90 - theta);

    if (degs < 0) degs += 360;

    wheel.style.transform = 'rotate('+ degs +'deg)';
    pickr.set('hue', degs);
    setColor();
}

var sel = document.querySelector('.selector'),
    guide = document.querySelector('.hue-guide'),
    wheel = document.querySelector('.hue-wheel'),
    offset = {
        top: guide.getBoundingClientRect().top + document.body.scrollTop,
        left: guide.getBoundingClientRect().left + document.body.scrollLeft
    };

sel.onmousedown = function() {
    pickr.set('input.hue', true);
    document.body.onmousemove = function(e) {
        e = e || window.event;
        e.preventDefault();
        followMouse(guide, wheel, offset, e);
    }
    document.body.onmouseup = function() {
        document.body.onmousemove = document.body.onmouseup = null;
        pickr.set('input.hue', false);
    }
}

/**********************************
      Saturation & Lightness
**********************************/

var sat = document.querySelector('.saturation'),
    light = document.querySelector('.lightness');

sat.onmousedown = function() {
    pickr.set('input.sat', true);
    document.body.onmouseup = function() {
        document.body.onmousemove = document.body.onmouseup = null;
        pickr.set('input.sat', false);
    }
}

light.onmousedown = function() {
    pickr.set('input.light', true);
    document.body.onmouseup = function() {
        document.body.onmousemove = document.body.onmouseup = null;
        pickr.set('input.light', false);
    }
}

var inputs = document.querySelectorAll('.input');
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', setColor);
}

setColor();
//setInterval(hueWheel, 16);
