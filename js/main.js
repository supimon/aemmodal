jQuery(document).ready(function($){

	//cache some jQuery objects
	var modalTrigger = $('.cd-modal-trigger'),
		transitionLayer = $('.cd-transition-layer'),
		transitionBackground = transitionLayer.children(),
		modalWindow = $('.cd-modal');

	var frameProportion = 1.78, //png frame aspect ratio
		frames = transitionLayer.data('frame'), //number of png frames
		resize = false;

	//set transitionBackground dimensions
	setLayerDimensions();
	$(window).on('resize', function(){
		if( !resize ) {
			resize = true;
			(!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
		}
	});

	//open modal window
	modalTrigger.on('click', function(event){	
		event.preventDefault();
		var modalId = $(event.target).attr('href');
		transitionLayer.addClass('visible opening');
		var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 800;
		setTimeout(function(){
			modalWindow.filter(modalId).addClass('visible');
			transitionLayer.removeClass('opening');
		}, delay);
	});

	//close modal window
	modalWindow.on('click', '.modal-close', function(event){
		event.preventDefault();
		transitionLayer.addClass('closing');
		modalWindow.removeClass('visible');
		transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			transitionLayer.removeClass('closing opening visible');
			transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
		});
	});

	function setLayerDimensions() {
		var windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			layerHeight, layerWidth;

		if( windowWidth/windowHeight > frameProportion ) {
			layerWidth = windowWidth;
			layerHeight = layerWidth/frameProportion;
		} else {
			layerHeight = windowHeight*1.2;
			layerWidth = layerHeight*frameProportion;
		}

		transitionBackground.css({
			'width': layerWidth*frames+'px',
			'height': layerHeight+'px',
		});

		resize = false;
	}


	$('#thumbnail li').click(function(){
		var thisIndex = $(this).index()

		if(thisIndex < $('#thumbnail li.active').index()){
			prevImage(thisIndex, $(this).parents("#thumbnail").prev("#image-slider"));
		}else if(thisIndex > $('#thumbnail li.active').index()){
			nextImage(thisIndex, $(this).parents("#thumbnail").prev("#image-slider"));
		}

		$('#thumbnail li.active').removeClass('active');
		$(this).addClass('active');

	});

  var width = $('#image-slider').width();

  function nextImage(newIndex, parent){
    parent.find('li').eq(newIndex).addClass('next-img').css('left', width).animate({left: 0},600);
    parent.find('li.active-img').removeClass('active-img').css('left', '0').animate({left: -width},600);
    parent.find('li.next-img').attr('class', 'active-img');
  }
  function prevImage(newIndex, parent){
    parent.find('li').eq(newIndex).addClass('next-img').css('left', -width).animate({left: 0},600);
    parent.find('li.active-img').removeClass('active-img').css('left', '0').animate({left: width},600);
    parent.find('li.next-img').attr('class', 'active-img');
  }

	/* Thumbails */
  var ThumbailsWidth = ($('#image-slider').width() - 18.5)/7;
  $('#thumbnail li').find('img').css('width', ThumbailsWidth);

});