// Get the relative angle in degrees given two sets of XY coordinates.

"use strict";

function radians(objectCoords, targetCoords) {
	const distanceX = targetCoords.x - objectCoords.x;
	const distanceY = targetCoords.y - objectCoords.y;

	return Math.atan2(distanceY, distanceX);
}

function degrees(objectCoords, targetCoords) {
	return radians(objectCoords, targetCoords)  * (180 / Math.PI);
}

exports.radians = exports.rad = radians;
exports.degrees = exports.deg = degrees;