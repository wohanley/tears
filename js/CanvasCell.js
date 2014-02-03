tears.CanvasCell = function (context, point, size, alive) {
	this._context = context;
	this._point = point;
	this._size = size;
	alive ? this.cellLived() : this.cellDied();
};

tears.CanvasCell.prototype.cellDied = function (vigour) {
	this._context.save();
	this._context.fillStyle = "#EDD";
	this._context.fillRect(this._point.x, this._point.y, 1, 1);
	this._context.restore();
};

tears.CanvasCell.prototype.cellLived = function (vigour) {
	this._context.clearRect(this._point.x, this._point.y, 1, 1);
};
