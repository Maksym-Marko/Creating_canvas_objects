'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MATH_PI = 2 * Math.PI;

var Canvas = function () {
	function Canvas(canvasEl) {
		_classCallCheck(this, Canvas);

		this.canvasEl = canvasEl;
	}

	_createClass(Canvas, [{
		key: '_getContext',
		value: function _getContext() {
			var canvas = document.getElementById(this.canvasEl);
			var context = canvas.getContext('2d');
			return context;
		}
	}]);

	return Canvas;
}();

var CreateField = function () {
	function CreateField() {
		_classCallCheck(this, CreateField);

		window.POS = [];
		window.arrPoints = [];
	}

	_createClass(CreateField, [{
		key: 'createCanvas',
		value: function createCanvas() {
			var _createCanvas = new Canvas('canvas');
			var c = _createCanvas._getContext();

			var canvasRect = document.getElementById('canvas');

			c.clearRect(0, 0, canvasRect.width, canvasRect.height);

			c.beginPath();
			c.arc(300, 300, 250, 0, MATH_PI, false);
			c.lineWidth = 1;
			c.strokeStyle = '#333';
			c.stroke();
			c.closePath();
		}
	}]);

	return CreateField;
}();

var CreatePoint = function () {
	function CreatePoint(xPoint, yPoint, sizePoint, pos, speed) {
		_classCallCheck(this, CreatePoint);

		this.sizePoint = sizePoint;
		this.xPoint = xPoint;
		this.yPoint = yPoint;
		this.pos = pos;
		this.speed = speed;

		this.IDPoint = getRandomStr();
		var ID = this.IDPoint;

		POS.push({ "ID": [ID], pos: this.pos });
	}

	_createClass(CreatePoint, [{
		key: 'getPositionPoint',
		value: function getPositionPoint(_el) {
			var positionPoint = 1;
			positionPoint = _el.pos + this.speed;
			if (positionPoint > 99) {
				positionPoint = 1;
			}
			_el.pos = positionPoint;

			return positionPoint;
		}
	}, {
		key: 'getPositionPointX',
		value: function getPositionPointX(_positionPoint) {
			var x = this.xPoint + 250 * Math.cos(MATH_PI * _positionPoint / 100);
			return x;
		}
	}, {
		key: 'getPositionPointY',
		value: function getPositionPointY(_positionPoint) {
			var y = this.yPoint + 250 * Math.sin(MATH_PI * _positionPoint / 100);
			return y;
		}
	}, {
		key: 'drawCanvas',
		value: function drawCanvas(_x, _y) {
			var _createCanvas = new Canvas('canvas');
			var c = _createCanvas._getContext();

			c.beginPath();
			c.arc(_x, _y, this.sizePoint, 0, MATH_PI, false);
			c.fillStyle = '#333';
			c.fill();
			c.closePath();
		}
	}, {
		key: 'createPoint',
		value: function createPoint() {
			var _this = this;

			var JSONData = POS.filter(function (el) {

				if (el.ID == _this.IDPoint) {

					// get dinamic position point
					var positionPoint = _this.getPositionPoint(el);

					// set position point x
					var x = _this.getPositionPointX(positionPoint);

					// set position point y
					var y = _this.getPositionPointY(positionPoint);

					// draw canvas
					_this.drawCanvas(x, y);
				}
			});
		}
	}]);

	return CreatePoint;
}();

var CreatePointDirect = function (_CreatePoint) {
	_inherits(CreatePointDirect, _CreatePoint);

	function CreatePointDirect(xPoint, yPoint, sizePoint, pos, speed, direction) {
		_classCallCheck(this, CreatePointDirect);

		var _this2 = _possibleConstructorReturn(this, (CreatePointDirect.__proto__ || Object.getPrototypeOf(CreatePointDirect)).call(this, xPoint, yPoint, sizePoint, pos, speed));

		_this2.direction = direction;
		return _this2;
	}

	_createClass(CreatePointDirect, [{
		key: 'getPositionPoint',
		value: function getPositionPoint(_el) {
			var positionPoint = 1;

			if (this.direction == 'right') {
				positionPoint = _el.pos - this.speed;
				if (positionPoint < 1) {
					positionPoint = 100;
				}
				_el.pos = positionPoint;
			}
			if (this.direction == 'left') {
				positionPoint = parseFloat(_el.pos) + parseFloat(this.speed);
				if (positionPoint > 100) {
					positionPoint = 1;
				}
				_el.pos = positionPoint;
			}

			return positionPoint;
		}
	}]);

	return CreatePointDirect;
}(CreatePoint);

// form


var FormControl = function () {
	function FormControl(_sizePoint, _pos, _speed, _direction) {
		_classCallCheck(this, FormControl);

		this.size = _sizePoint;
		this.position = _pos;
		this.speed = _speed;
		this.direction = _direction;
	}

	_createClass(FormControl, [{
		key: 'objectEls',
		value: function objectEls() {
			var objEl = {};
			objEl.sizeEl = document.getElementById(this.size);
			objEl.positionEl = document.getElementById(this.position);
			objEl.speedEl = document.getElementById(this.speed);
			objEl.directionEl = document.getElementById(this.direction);

			return objEl;
		}
	}, {
		key: 'createElems',
		value: function createElems() {

			// create option for size
			for (var sz = 1; sz <= 50; sz++) {
				var _options = document.createElement('option');
				_options.innerHTML = sz;
				this.objectEls().sizeEl.append(_options);
			}

			// create option for position
			for (var ps = 1; ps <= 100; ps++) {
				var _options2 = document.createElement('option');
				_options2.innerHTML = ps;
				this.objectEls().positionEl.append(_options2);
			}

			// create option for speed
			for (var sp = 0.1; sp <= 3; sp += 0.1) {
				var _options3 = document.createElement('option');
				_options3.innerHTML = sp.toString().substr(0, 3);
				this.objectEls().speedEl.append(_options3);
			}
		}
	}, {
		key: 'getData',
		value: function getData() {

			var sizeSelect = this.objectEls().sizeEl,
			    positionSelect = this.objectEls().positionEl,
			    speedSelect = this.objectEls().speedEl,
			    directionSelect = this.objectEls().directionEl;

			var _button = document.getElementById('createPoint'),
			    _form = document.getElementById('form');
			_form.onsubmit = function (e) {
				e.preventDefault();

				// size point
				var sizePoint = sizeSelect.options[sizeSelect.selectedIndex].text;

				// position point
				var positionPoint = positionSelect.options[positionSelect.selectedIndex].text;

				// speed point
				var speedPoint = speedSelect.options[speedSelect.selectedIndex].text;

				// direction point
				var directionPoint = directionSelect.options[directionSelect.selectedIndex].value;

				var newPoint = new CreatePointDirect(300, 300, sizePoint, positionPoint, speedPoint, directionPoint);

				arrPoints.push(newPoint);
			};
		}
	}]);

	return FormControl;
}();

// -------------------------
// helpers


function getRandomStr() {
	var min = Math.ceil(2);
	var max = Math.floor(23456);
	var uniqueStr1 = Math.floor(Math.random() * (max - min + 1)) + min;
	var uniqueStr2 = Math.floor(Math.random() * (max - min + 1)) + min;
	return uniqueStr1 + '-' + uniqueStr2;
}

// interval
var reqAnimationFrame = function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
		setTimeout(callback, 1000 / 60);
	};
}();
// -------------------------


// -------------------------
(function () {

	var formControl = new FormControl('sizePoint', 'pos', 'speed', 'direction');
	formControl.createElems();
	formControl.getData();

	// create canvas
	var cCanvas = new CreateField();

	// create points
	var cPoint = new CreatePoint(300, 300, 10, 10, 0.5);

	// create points with direction
	var chilsPoint = new CreatePointDirect(300, 300, 10, 20, 0.1, 'right');

	arrPoints.push(cPoint);
	arrPoints.push(chilsPoint);

	// draw function
	function draw() {

		// draw field
		cCanvas.createCanvas();

		// draw point
		var o = arrPoints.filter(function (el) {
			el.createPoint();
		});

		// cicle
		reqAnimationFrame(draw);
	}
	draw();
})();