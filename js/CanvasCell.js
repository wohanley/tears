tears.CanvasCell = function (context, point, size) {
	this._context = context;
	this._point = point;
	this._size = size;
};

tears.CanvasCell.prototype.cellDied = function (vigour) {
	this._context.clearRect(this._point.x, this._point.y, 1, 1);
};

tears.CanvasCell.prototype.cellLived = function (vigour) {
	this._context.save();
	this._context.fillStyle = "#AAA";
	this._context.fillRect(this._point.x, this._point.y, 1, 1);
	this._context.restore();
};
