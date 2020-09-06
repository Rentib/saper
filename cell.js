function Cell(x, y){
	this.x = x * w;
	this.y = y * h;
	this.value = '';
	this.revealed = false;
	this.flag = false;

	this.show = function(){
		fill(200);
		stroke(50);
		rect(this.x, this.y, w, h);
		if(this.flag == true){
			fill(250);
			stroke(50);
			rect(this.x, this.y, w, h);
			fill(250, 0, 0);
			triangle(this.x, this.y, this.x + w, this.y + h, this.x, this.y + h);
			return;
		}
		if(this.revealed == true){
			fill(250);
			stroke(50);
			rect(this.x, this.y, w, h);
			if(this.value == 'bomb'){
				fill(50);
				circle(this.x + w / 2, this.y + h / 2, w - w / 10);
			}
			else{
				textSize(w - w / 10);
				text("" + this.value + "", this.x, this.y + h - h / 10);	
			}
		}
	}
	this.countValue = function(){
		var x = floor(this.x / w);
		var y = floor(this.y / h);
		var cnt = 0;
		if(x > 0){
			if(y > 0)
				if(grid[x - 1][y - 1].value == 'bomb')
					cnt++;
			if(grid[x - 1][y].value == 'bomb')
				cnt++;
			if(y < 19)
				if(grid[x - 1][y + 1].value == 'bomb')
					cnt++;
		}
		if(x < 19){
			if(y > 0)
				if(grid[x + 1][y - 1].value == 'bomb')
					cnt++;
			if(grid[x + 1][y].value == 'bomb')
				cnt++;
			if(y < 19)
				if(grid[x + 1][y + 1].value == 'bomb')
					cnt++;
		}
		if(y > 0)
			if(grid[x][y - 1].value == 'bomb')
				cnt++;
		if(y < 19)
			if(grid[x][y + 1].value == 'bomb')
				cnt++;

		return cnt;
	}
}