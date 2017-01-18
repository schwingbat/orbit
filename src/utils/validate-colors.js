// Make sure values passed are valid colors.

exports.hex = function(value) {
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

	return valid;
}

exports.rgb = function(value) {
	var split = value.split(',')

	if (split.length !== 3) return false

	var inRange = true

	split.forEach(item => {
		var parsed = parseInt(item)
		if (parsed > 255 || parsed < 0) inRange = false
	})

	if (inRange) return true
}

exports.hsl = function(value) {
	var split = value.replace('%', '').split(',')

	if (split.length !== 3) return false

	if (split[0] > 360 || split[0] < 0) return false
	if (split[1] > 100 || split[1] < 0) return false
	if (split[2] > 100 || split[2] < 0) return false

	return true
}