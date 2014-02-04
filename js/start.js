(function () {
	
	var findNeighbours = function (grid, row, column) {
		var startRow = Math.max(row - 1, 0);
		var endRow = Math.min(row + 1, grid.length - 1);
		var startColumn = Math.max(column - 1, 0);
		var endColumn = Math.min(column + 1, grid[0].length - 1);
		
		var neighbours = [];
		
		for (var currentRow = startRow; currentRow <= endRow; currentRow++) {
			for (var currentColumn = startColumn; currentColumn <= endColumn; currentColumn++) {
				if (!(currentRow === row && currentColumn === column)) {
					neighbours.push(grid[currentRow][currentColumn]);
				}
			}
		}
		
		return neighbours;
	};

	window.onload = function () {
		
		var background = document.getElementById('background');
		background.height = 200;
		background.width = 200;
		var bgContext = background.getContext("2d");
		bgContext.fillStyle = "#000";
		bgContext.fillRect(0, 0, background.width, background.height);
		
		var foreground = document.getElementById('foreground');
		foreground.height = 200;
		foreground.width = 200;
		
		var fgContext = foreground.getContext("2d");
		
		var cells = [];
		for (var row = 0; row < foreground.height; row++) {
			cells.push([]);
			for (var column = 0; column < foreground.width; column++) {
				var cell = new tears.Cell();
				cell.addObserver(new tears.CanvasCell(fgContext, { x: column, y: row }, { height: 1, width: 1 }, false));
				cells[row].push(cell);
			}
		}
		
		setInterval(function () {
			var row, column;
			for (row = 0; row < foreground.height; row++) {
				for (column = 0; column < foreground.width; column++) {
					cells[row][column].prepare(findNeighbours(cells, row, column));
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