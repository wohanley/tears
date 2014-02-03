(function () {
	
	var drawLive = function (scope, point, size, vigour) {
		var rectangle = new Rectangle(point, size);
		rectangle.fillColor = '#FFF';
	};
	
	var drawDead = function (scope, point, size, vigour) {
		var rectangle = new Rectangle(point, size);
		rectangle.opacity = 0;
	};

	tears.PaperCell = function () {
		this.draw = drawLive;
	};

	tears.PaperCell.prototype.cellDied = function (){
		this.draw = drawDead;
	};

	tears.PaperCell.prototype.cellLived = function (){
		this.draw = drawLive;
	};
	
})();