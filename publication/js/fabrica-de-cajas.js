var href=window.location.href
var file = href.split("/");
//script de animación de la fábrica
function OpenInNewTab(url) {
  	//window.open('desarrollador.zip', '_blank', 'toolbar=yes, location=yes, status=yes, menubar=yes, scrollbars=yes');
  	//window.location='desarrollador.zip';
  	this.location.href="zip/desarrollador.zip" 
  
}
var path=location.pathname;  // /tmp/test.html
var res = path.split("/");

var file=res[res.length-1];

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
	/*Alto de cada frame de la animación*/
		var alto = 0;	
				
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
				frameIndex = 0,//Punto inicial
				tickCount = 0,//velocidad inicial
				ticksPerFrame = options.ticksPerFrame || 0, //Velocidad a la que debe cambiar
				numberOfFrames = options.numberOfFrames || 1;//Cantidad de frames (imagenes) horizontales que tiene el sprite

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


	                } if ( frameIndex == 9 && alto < 3870) {
	                    frameIndex = 0;
	                    /*Suma el alto del frame en caso de tener una animación vertical y horizontal*/
	                    alto = alto += 430;
	                  
	                }

	                if ( frameIndex == 9 && alto == 3870) {
	                    
	                    /*paramos la animacion*/
	                    frameIndex = 0;
	                    machine = sprite({
	                    	context: canvas.getContext("2d"),
	                    	width: 7600,
	                    	height: 428,
	                    	image: that.image,
	                    	numberOfFrames: 1,
	                    	ticksPerFrame: 7
	                    });

	                    alto = 0;
	                    OpenInNewTab("descarga.php");
	                    $(".accionar-maquina").removeAttr("disabled");
	                    return;
	                  
	                }

	                // else{
	                // 	frameIndex = 0;

	                //     alto = 0;

	                // }
	            }
	        };
			
			that.render = function () {
			
			  // Limpiamos el canvas cada vez que cambia
			  that.context.clearRect(0, 0, that.width, that.height);
			  
			  // Pintamos la animacion
			  that.context.drawImage(
			    that.image,// imagen que cargamos
			    frameIndex * that.width / numberOfFrames, //Ancho
			    alto,//alto
			    that.width / numberOfFrames,//esto calcula el ancho de cada frame individual
			    that.height, 
			    0,
			    0,
			    that.width / numberOfFrames,
			    that.height);
			};
			
			return that;
		}
		
		// obtenemos el elemento del html y damos dimensiones
		canvas = document.getElementById("maquina");
		canvas.width = 760;
		canvas.height = 428;
		
		// Creamos la hoja del sprite
		machineImage = new Image();	
		
		// Creamos el sprite 
		machine = sprite({
			context: canvas.getContext("2d"),
			width: 7600,
			height: 428,
			image: machineImage,
			numberOfFrames: 1,
			ticksPerFrame: 1
		});


		/*accionamos la maquina*/
		$(".accionar-maquina").on("click", function () {

			$(this).attr("disabled", "disabled");
			
			machine = sprite({
				context: canvas.getContext("2d"),
				width: 7600,
				height: 428,
				image: machineImage,
				numberOfFrames: 10,
				ticksPerFrame: 7
			});



		});
		
		// Cargamos la hoja del sprite al elemento html
		machineImage.addEventListener("load", machineLoop);
		$(machineImage).load(machineLoop);
		machineImage.src = "images/machine-sprite.png";

	};
	//console.log(file);
	if(file=="fabrica.php"){
		animacion();
	}
	//
	/// Animación Texto
	function iniAnim(div) {
		$('#textoDescr > div.active').removeClass('active').addClass('fadeOutRight animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('fadeOutRight animated');
			
			$(this).addClass('hide');
			$('#'+div).removeClass('hide').addClass( 'fadeInLeft animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('fadeInLeft animated');
				$(this).addClass('active');
				//$('#textoDescr > div').addClass('hide');

			});
		});

		
	}

	$( ".lista-herramientas" ).hover(
		function () {
			//$(this).css({"background-color":"blue"});
		}, 
		function () {
			iniAnim('ini');	
		}
	);
	$( ".herramienta" ).hover(
		function () {
			$( this ).addClass( "hover" );
			var her=$(this).attr('data-bar');
			iniAnim(her);
		}, 
		function () {
			//$(this).css({"background-color":"blue"});
		}
	);
	$(".logo").click(function(){
		window.location="fabrica.php";
	});
});


//Click para mostrar herramientas propias
$(document).on("click", ".mostrar", function(){

	$(".herramientas-propias").addClass('animated fadeIn');

	var i = 0;

	function mostrarLista () {

		var elementos = $(".listado-herramientas li");

		function next () {
			$( elementos[i] ).addClass('animated flipInX');
			i += 1 ;
			$( elementos[i] ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', next);

			//console.log(elementos[i]);
		};

		$(elementos[i]).addClass('animated flipInX');
		$(elementos[i]).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', next);

		

		// next();
	};

	$(".herramientas-propias").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', mostrarLista);

});
//Click para mostrar herramientas propias
/*document.getElementById('vid-herramienta').addEventListener('pause',stopVideo,false);
document.getElementById('vid-herramienta').addEventListener('ended',stopVideo,false);

function stopVideo(e) {
    // What you want to do after the event
    //console.log("Pause");
    //alert("Pause");
    AnimVideo('ini');
}
function AnimVideo(ac) {
	if(ac=='ini'){
	    $('#vid-herramienta').removeClass().addClass('slideOutUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass().addClass('hide');
			$('.cabezote').removeClass('hide').addClass('slideInUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('slideInUp animated');
				$('.img-circle').removeClass('hide').addClass('slideInUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$(this).removeClass('slideInUp animated');
					$('h1,.descripcion').removeClass('hide').addClass('slideInUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						$(this).removeClass('slideInUp animated');
				
					});
				});
			});
	    });
	}
};*/

//Volver

/*$(document).on('click', '.btn-danger', function() {

	window.location.href="/fabrica.php"
});*/