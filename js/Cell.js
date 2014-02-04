(function () {
	
	var chanceLiveThreshold = 0.999;
	var chanceStartWith = 100;
	var liveAt = 3;
	var dieAt = 1;
	
	var liveAct = function (vigour) {
		if (vigour <= dieAt) {
			this._die();
		} else {
			this.vigour = Math.max(1, this.vigour - 1);
		}
	};
	
	var deadAct = function (vigour) {
		if (vigour >= liveAt) {
			this._live(vigour);
		} else if (Math.random() > chanceLiveThreshold) {
			this._live(chanceStartWith);
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
		for (var i = 0; i < neighbours.length; i++) {
			this._neighbouringVigour += neighbours[i].vigour;
		}
		this._neighbouringVigour /= 9;
	};
	
	tears.Cell.prototype.change = function () {
		this.act(this._neighbouringVigour);
	};
	
	tears.Cell.prototype.addObserver = function (observer) {
		this._observers.push(observer);
	};
	
})();