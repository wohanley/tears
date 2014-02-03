(function () {
	
	var liveAt = 5;
	var dieAt = 3;
	
	var liveAct = function (vigour) {
		if (vigour <= dieAt) {
			this._die();
		}
	};
	
	var deadAct = function (vigour) {
		if (vigour >= liveAt) {
			this._live();
		}
	};
	
	tears.Cell = function (vigour) {
		this.vigour = vigour;
		this._live();
	};
	
	tears.Cell.prototype._live = function () {
		this._act = liveAct;
	};
	
	tears.Cell.prototype._die = function () {
		this._act = deadAct;
	};
	
	tears.Cell.prototype.step = function (neighbours) {
		var vigourIn = 0;
		for (var i = 0; i < neighbours.length; neighbours++) {
			vigourIn += neighbours[i].vigour;
		}
		this._act(vigourIn);
	};
	
})();