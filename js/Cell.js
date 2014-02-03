(function () {
	
	var liveAt = 5;
	var dieAt = 3;
	
	var liveAct = function (vigour) {
		//if (vigour <= dieAt) {
			this._die();
		//}
	};
	
	var deadAct = function (vigour) {
		//if (vigour >= liveAt) {
			this._live();
		//}
	};
	
	tears.Cell = function (vigour) {
		this.vigour = vigour;
		this._observers = [];
		this._live();
	};
	
	var notify = function (observers, methodName, arg) {
		for (var i = 0; i < observers.length; i++) {
			observers[i][methodName](arg);
		}
	};
	
	tears.Cell.prototype._live = function () {
		this.act = liveAct;
		notify(this._observers, "cellLived", this.vigour);
	};
	
	tears.Cell.prototype._die = function () {
		this.act = deadAct;
		notify(this._observers, "cellDied", this.vigour);
	};
	
	tears.Cell.prototype.prepare = function (neighbours) {
		this._neighbouringVigour = 0;
		for (var i = 0; i < neighbours.length; neighbours++) {
			this._neighbouringVigour += neighbours[i].vigour;
		}
	};
	
	tears.Cell.prototype.change = function () {
		this.act(this._neighbouringVigour);
	};
	
	tears.Cell.prototype.addObserver = function (observer) {
		this._observers.push(observer);
	};
	
})();