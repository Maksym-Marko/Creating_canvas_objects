const MATH_PI = 2*Math.PI;

class Canvas{
	constructor( canvasEl ){
		this.canvasEl = canvasEl;
	}

	_getContext(){
		let canvas = document.getElementById( this.canvasEl );
		let context = canvas.getContext( '2d' );
		return context;
	}
}

class CreateField{

	constructor(){
		window.POS = [];
		window.arrPoints = [];
	}

	createCanvas(){
		let _createCanvas = new Canvas( 'canvas' );
		let c = _createCanvas._getContext();

		let canvasRect = document.getElementById( 'canvas' );

		c.clearRect( 0, 0, canvasRect.width, canvasRect.height );

		c.beginPath();
		c.arc( 300, 300, 250, 0, MATH_PI, false );
		c.lineWidth = 1;
		c.strokeStyle = '#333';
		c.stroke();
		c.closePath();
	}

}

class CreatePoint{

	constructor( xPoint, yPoint, sizePoint, pos, speed ){
		this.sizePoint = sizePoint;
		this.xPoint = xPoint;
		this.yPoint = yPoint;
		this.pos = pos;
		this.speed = speed;

		this.IDPoint = getRandomStr();
		let ID = this.IDPoint;

		POS.push( { "ID": [ID], pos: this.pos } );
	}

	getPositionPoint( _el ){
		let positionPoint = 1;
		positionPoint = _el.pos + this.speed;
		if( positionPoint > 99 ){
			positionPoint = 1;
		}
		_el.pos = positionPoint;

		return positionPoint;
	}

	getPositionPointX( _positionPoint ){
		let x = this.xPoint + 250 * Math.cos( MATH_PI * _positionPoint / 100 );
		return x;
	}

	getPositionPointY( _positionPoint ){
		let y = this.yPoint + 250 * Math.sin( MATH_PI * _positionPoint / 100 );
		return y;
	}

	drawCanvas( _x, _y ){
		let _createCanvas = new Canvas( 'canvas' );
		let c = _createCanvas._getContext();

		c.beginPath();
		c.arc( _x, _y, this.sizePoint, 0, MATH_PI, false );
		c.fillStyle = '#333';
		c.fill();
		c.closePath();
	}

	createPoint(){

		let JSONData = POS.filter( ( el ) => {

			if( el.ID == this.IDPoint ){
				
				// get dinamic position point
				let positionPoint = this.getPositionPoint( el );

				// set position point x
				let x = this.getPositionPointX( positionPoint );

				// set position point y
				let y = this.getPositionPointY( positionPoint );

				// draw canvas
				this.drawCanvas( x, y );

			}

		} );

	}

}

class CreatePointDirect extends CreatePoint{
	constructor( xPoint, yPoint, sizePoint, pos, speed, direction ){
		super( xPoint, yPoint, sizePoint, pos, speed );
		this.direction = direction;
	}

	getPositionPoint( _el ){
		let positionPoint = 1;

		if( this.direction == 'right' ){
			positionPoint = _el.pos - this.speed;
			if( positionPoint < 1 ){
				positionPoint = 100;
			}
			_el.pos = positionPoint;

		} 
		if( this.direction == 'left' ){
			positionPoint = parseFloat( _el.pos ) + parseFloat( this.speed );
			if( positionPoint > 100 ){
				positionPoint = 1;
			}
			_el.pos = positionPoint;
		}

		return positionPoint;
	}

}

// form
class FormControl{
	constructor( _sizePoint, _pos, _speed, _direction ){
		this.size = _sizePoint;
		this.position = _pos;
		this.speed = _speed;
		this.direction = _direction;
	}

	objectEls(){
		let objEl = {};
		objEl.sizeEl = document.getElementById( this.size );
		objEl.positionEl = document.getElementById( this.position );
		objEl.speedEl = document.getElementById( this.speed );
		objEl.directionEl = document.getElementById( this.direction );

		return objEl;
		
	}

	createElems(){

		// create option for size
		for( let sz = 1; sz <= 50; sz++ ){
			let _options = document.createElement( 'option' );
			_options.innerHTML = sz;
			this.objectEls().sizeEl.append( _options );
		}

		// create option for position
		for( let ps = 1; ps <= 100; ps++ ){
			let _options = document.createElement( 'option' );
			_options.innerHTML = ps;
			this.objectEls().positionEl.append( _options );
		}

		// create option for speed
		for( let sp = 0.1; sp <= 3; sp+=0.1 ){
			let _options = document.createElement( 'option' );
			_options.innerHTML = sp.toString().substr( 0,3 );
			this.objectEls().speedEl.append( _options );
		}
	}

	getData(){

		let sizeSelect = this.objectEls().sizeEl,
			positionSelect = this.objectEls().positionEl,
			speedSelect = this.objectEls().speedEl,
			directionSelect = this.objectEls().directionEl;

		let _button = document.getElementById( 'createPoint' ),
			_form =  document.getElementById( 'form' );
		_form.onsubmit = function( e ){
			e.preventDefault();

			// size point
			let sizePoint = sizeSelect.options[sizeSelect.selectedIndex].text;

			// position point
			let positionPoint = positionSelect.options[positionSelect.selectedIndex].text;

			// speed point
			let speedPoint = speedSelect.options[speedSelect.selectedIndex].text;

			// direction point
			let directionPoint = directionSelect.options[directionSelect.selectedIndex].value;

			let newPoint = new CreatePointDirect( 300, 300, sizePoint, positionPoint, speedPoint, directionPoint );

			arrPoints.push( newPoint );
			
		}

	}

}

// -------------------------
// helpers
function getRandomStr() {
	let min = Math.ceil(2);
	let max = Math.floor(23456);
	let uniqueStr1 = Math.floor(Math.random() * (max - min + 1)) + min;
	let uniqueStr2 = Math.floor(Math.random() * (max - min + 1)) + min;
	return uniqueStr1 + '-' + uniqueStr2;
}

// interval
let reqAnimationFrame = ( () =>{
	return window.requestAnimationFrame
        || 	window.webkitRequestAnimationFrame
        || 	window.mozRequestAnimationFrame
        || 	window.oRequestAnimationFrame
        || 	window.msRequestAnimationFrame
        || 	function( callback ){
        	setTimeout( callback, 1000 / 60 );
        };
} )();
// -------------------------


// -------------------------
( function(){

	let	formControl = new FormControl( 'sizePoint', 'pos', 'speed', 'direction' );
	formControl.createElems();
	formControl.getData();

	// create canvas
	let cCanvas = new CreateField();

	// create points
	let cPoint = new CreatePoint( 300, 300, 10, 10, 0.5 );

	// create points with direction
	let chilsPoint = new CreatePointDirect( 300, 300, 10, 20, 0.1, 'right' );
	
	arrPoints.push( cPoint );
	arrPoints.push( chilsPoint );

	// draw function
	function draw(){

		// draw field
		cCanvas.createCanvas();
		
		// draw point
		let o = arrPoints.filter( function( el ){
			el.createPoint();
		} );

		// cicle
		reqAnimationFrame( draw );

	}
	draw();

} )();