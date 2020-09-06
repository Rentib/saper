var grid = [];
var width, height;
var w, h;
var scl = 20;
var mode = 'check';
function setup() {
	frameRate(10);
	createCanvas(500, 540);
	width = 500;
	height = 500;
	w = width / scl;
	h = height / scl;
	for(var i = 0;i < scl;i++){
		var k = [];
		for(var j = 0;j < scl;j++)
			k.push(new Cell(i, j));
		grid.push(k);
	}
	for(var i = 0;i < 40;i++)
		grid[floor(random(0, scl))][floor(random(0, scl))].value = 'bomb';
}
function draw(){
	background(250);
	for(var i = 0;i < scl;i++)
		for(var j = 0;j < scl;j++)
			grid[i][j].show();
	textSize(30);
	text("Mode: " + mode + "", 10, 530);
	win();
}
function loss(){
	noLoop();
	for(var i = 0;i < scl;i++)
		for(var j = 0;j < scl;j++)
			if(grid[i][j].value == 'bomb'){
				grid[i][j].revealed = true;
			}
}
function keyPressed(){
	if(key == ' '){
		if(mode == 'check')
			mode = 'flag';
		else
			mode = 'check';
	}
}
function mousePressed(){
	var x = floor(mouseX / w);
	var y = floor(mouseY / h);
	if(grid[x][y].revealed == true)
		return;
	if(mode == 'flag'){
		if(grid[x][y].flag == false)
			grid[x][y].flag = true;
		else
			grid[x][y].flag = false;
		return;
	}
	grid[x][y].flag = false;
	if(grid[x][y].value == 'bomb')
		loss();
	else
		DFS(x, y);

}
function DFS(x, y){
	grid[x][y].revealed = true;
	grid[x][y].flag = false;
	if(grid[x][y].countValue() != 0){
		grid[x][y].value = grid[x][y].countValue();
		return;
	}
	if(x + 1 < scl && grid[x + 1][y].revealed == false)
		DFS(x + 1, y);
	if(x - 1 >= 0 && grid[x - 1][y].revealed == false)
		DFS(x - 1, y);
	if(y + 1 < scl && grid[x][y + 1].revealed == false)
		DFS(x, y + 1);
	if(y - 1 >= 0 && grid[x][y - 1].revealed == false)
		DFS(x, y - 1);
}
function win(){
	for(var i = 0;i < scl;i++)
		for(var j = 0;j < scl;j++){
			if(grid[i][j].value != 'bomb'){
				if(grid[i][j].revealed == false)
					return;
			}
			if(grid[i][j].value == 'bomb' && grid[i][j].flag == false)
				return;
		}
	noLoop();
	let div = createDiv('');
	div.html('CONGRATS YOU HAVE WON');
	console.log('CONGRATS YOU HAVE WON');
}