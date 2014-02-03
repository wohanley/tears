(function () {
	
	var liveAt = 5;
	var chanceLiveThreshold = 0.99;
	var dieAt = 3;
	
	var liveAct = function (vigour) {
		if (vigour <= dieAt) {
			this._die();
		}
	};
	
	var deadAct = function (vigour) {
		if (vigour >= liveAt || Math.random() > chanceLiveThreshold) {
			this._live(vigour);
		}
	};
	
	tears.Cell = function (vigour) {
		this.vigour = vigour;
		this._observers = [];
		this._die();
	};
	
	var notify = function (observers, methodName, arg) {
		for (var i = 0; i < observers.length; i++) {
			observers[i][methodName](arg);
		}
	};
	
	tears.Cell.prototype._live = function (vigour) {
		this.act = liveAct;
		this.vigour = vigour;
		notify(this._observers, "cellLived", this.vigour);
	};
	
	tears.Cell.prototype._die = function () {
		this.act = deadAct;
		this.vigour = 0;
		notify(this._observers, "cellDied", this.vigour);
	};
	
	tears.Cell.prototype.prepare = function (neighbours) {
		this._neighbouringVigour = 0;
		for (var i = 0; i < neighbours.length; neighbours++) {
			this._neighbouringVigour += Math.max(neighbours[i].vigour, 1);
		}
	};
	
	tears.Cell.prototype.change = function () {
		this.act(this._neighbouringVigour);
	};
	
	tears.Cell.prototype.addObserver = function (observer) {
		this._observers.push(observer);
	};
	
})();