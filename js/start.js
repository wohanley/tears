(function () {
	
	var findNeighbours = function (grid, x, y) {
		var startRow = Math.max(y - 1, 0);
		var endRow = Math.min(y + 1, grid.length);
		var startColumn = Math.max(x - 1, 0);
		var endColumn = Math.min(x + 1, grid[0].length);
		
		var neighbours = [];
		
		for (var row = startRow; row < endRow; row++) {
			for (var column = startColumn; column < endColumn; column++) {
				if (row !== y && column !== x) {
					neighbours.push(grid[row][column]);
				}
			}
		}
		
		return neighbours;
	};

	window.onload = function () {
		
		var background = document.getElementById('background');
		background.height = 250;
		background.width = 250;
		var bgContext = background.getContext("2d");
		bgContext.fillStyle = "#000";
		bgContext.fillRect(0, 0, background.width, background.height);
		
		var foreground = document.getElementById('foreground');
		foreground.height = 250;
		foreground.width = 250;
		
		var context = foreground.getContext("2d");
		
		var cells = [];
		for (var row = 0; row < foreground.height; row++) {
			cells.push([]);
			for (var column = 0; column < foreground.width; column++) {
				var cell = new tears.Cell();
				cell.addObserver(new tears.CanvasCell(context, { x: column, y: row }, { height: 1, width: 1 }, false));
				cells[row].push(cell);
			}
		}
		
		setInterval(function () {
			var row, column;
			for (row = 0; row < foreground.height; row++) {
				for (column = 0; column < foreground.width; column++) {
					cells[row][column].prepare(findNeighbours(cells, column, row));
				}
			}
			
			for (row = 0; row < foreground.height; row++) {
				for (column = 0; column < foreground.width; column++) {
					cells[row][column].change();
				}
			}
		}, 100);
	};
	
})();