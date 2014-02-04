tears.CellActionTrace = function (canvas, barCount) {
	this._canvas = canvas;
	this._colours = [];
	this._colourBuffer = new tears.ColourBuffer(this._colours, barCount);
	this._barHeight = canvas.height / barCount;
};

tears.CellActionTrace.prototype.cellLived = function (vigour) {
	this._colourBuffer.push(Math.max(255, 128 + vigour));
};

tears.CellActionTrace.prototype.cellDied = function (vigour) {
	this._colourBuffer.push(Math.min(0, 128 - vigour));
};

tears.CellActionTrace.prototype.draw = function () {
	var context = this._canvas.getContext('2d');
	for (var i = 0; i < this._colours.length; i++) {
		context.save();
		context.fillStyle = this._colours[i];
		context.fillRect(0, i * this._barHeight, this._canvas.width, this._barHeight);
		context.restore();
	}
};