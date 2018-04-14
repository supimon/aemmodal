jQuery(document).ready(function($){
	$('#modal-1').css({display: 'block'}); // to stop the initial display of the modal

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
	// utility function for modal
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
	// handle modal form expansion and submission
  $('#download-btn').click(formHandler);
	// utility function for form
  function formHandler(e) {
    $('#download-btn').unbind('click', formHandler);
    e.preventDefault();
    $('.thank-you').hide();
    if($('.input-holder').hasClass('expanded')){
      $('#download-btn').text('Sending...');
      // replace setTimeout with the AJAX call
      setTimeout(function(){
      	// display useful messages
        $('#download-btn').text('Request Download');
        $('#download-btn').click(formHandler);
        $('.thank-you').fadeIn('fast').delay(3000).fadeOut('fast');
      }, 2000);
      // collapse form
      $('.input-holder').slideUp(500, function(){
        $(this).removeClass('expanded');
        $('.modal-form input').val("");
      });
    }
    else{
    	// expand form
      $('.input-holder').slideDown(500, function(){
        $('#name_field').focus();
        $(this).addClass('expanded');
        $('#download-btn').click(formHandler);
      });
    }
  }
	// initialise the slider
  $(".my-slider").as();

});