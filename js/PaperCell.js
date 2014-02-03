tears.PaperCell = function (scope, point, size) {
	this._scope = scope;
	this._point = point;
	this._size = size;
};

tears.PaperCell.prototype.cellDied = function (vigour) {
	var rectangle = new paper.Rectangle(this._point, this._size);
    var path = new paper.Path(rectangle);
	path.opacity = 0;
};

tears.PaperCell.prototype.cellLived = function (vigour) {
	var rectangle = new paper.Path.Rectangle(this._point, this._size);
	rectangle.fillColor = new paper.Color(0, 0, 0);
};
