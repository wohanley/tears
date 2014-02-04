tears.ColourBuffer = function (colours, maxColours) {
	this._colours = colours;
	this._capacity = maxColours;
	this._buffer = [];
};

tears.ColourBuffer.prototype._pushColour = function (colour) {
	this._colours.push(colour);
	if (this._colours.length > this._capacity) {
		this._colours.shift();
	}
};

tears.ColourBuffer.prototype.push = function (value) {
	this._buffer.push(value);
	if (this._buffer.length >= 3) {
		this._pushColour('rgb('
			+ this._buffer[0] + ', '
			+ this._buffer[1] + ', '
			+ this._buffer[2] + ')');
		this._buffer.length = 0;
	}
};