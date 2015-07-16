	var frameIndex;
$(document).on("ready", function () {
	(function() {

		//Set de aminación y legacy en browsers

	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());


	function animacion() {
				
		var machine,
			machineImage,
			canvas;					

		function machineLoop () {
		
		  window.requestAnimationFrame(machineLoop);

		  machine.update();
		  machine.render();
		}
		
		function sprite (options) {
		
			var that = {},
				frameIndex = 0,
				tickCount = 0,
				ticksPerFrame = options.ticksPerFrame || 0,
				numberOfFrames = options.numberOfFrames || 1;

			console.log(numberOfFrames);
			
			that.context = options.context;
			that.width = options.width;
			that.height = options.height;
			that.image = options.image;
			
			that.update = function () {

	            tickCount += 1;

	            if (tickCount > ticksPerFrame) {

					tickCount = 0;
					
	                // If the current frame index is in range
	                if (frameIndex < numberOfFrames - 1) {	
	                    // Go to the next frame
	                    frameIndex += 1;
	                    //console.log(that);

	                    if ( frameIndex == 16 )
	                    {
	                    	console.log(frameIndex);
	                    	console.log(that.image);
	                    	machineImage.src="images/machine-sprites-02.png";
	                    	// that.src = "images/machine-sprites-02.png";

	                    }


	                } else {
	                    frameIndex = 0;
	                  
	                }
	            }
	        };
			
			that.render = function () {
			
			  // Clear the canvas
			  that.context.clearRect(0, 0, that.width, that.height);
			  
			  // Draw the animation
			  that.context.drawImage(
			    that.image,
			    frameIndex * that.width / numberOfFrames,
			    0,
			    that.width / numberOfFrames,
			    that.height,
			    0,
			    0,
			    that.width / numberOfFrames,
			    that.height);
			};

			console.log(frameIndex);
			
			return that;
		}
		
		// Get canvas
		canvas = document.getElementById("maquina");
		canvas.width = 760;
		canvas.height = 428;
		
		// Create sprite sheet
		machineImage = new Image();	
		
		// Create sprite
		machine = sprite({
			context: canvas.getContext("2d"),
			width: 12920,
			height: 428,
			image: machineImage,
			numberOfFrames: 1,
			ticksPerFrame: 4
		});

		$(".accionar-maquina").on("click", function () {
			
			machine = sprite({
				context: canvas.getContext("2d"),
				width: 12920,
				height: 428,
				image: machineImage,
				numberOfFrames: 17,
				ticksPerFrame: 4
			});



		});


		
		// Load sprite sheet
		machineImage.addEventListener("load", machineLoop);
		$(machineImage).load(machineLoop);
		machineImage.src = "images/machine-sprites-01.png";

		console.log(machineImage);
		console.log(frameIndex);

	};

	animacion();

});