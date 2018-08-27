(function($) { "use strict";


	$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
	// On-page links
	if (
		location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
		&& 
		location.hostname == this.hostname
	) {
		// Figure out element to scroll to
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		// Does a scroll target exist?
		if (target.length) {
		// Only prevent default if animation is actually gonna happen
		event.preventDefault();
		$('html, body').animate({
			scrollTop: target.offset().top
		}, 1000, function() {
			// Callback after animation
			// Must change focus!
			var $target = $(target);
			$target.focus();
			if ($target.is(":focus")) { // Checking if the target was focused
			return false;
			} else {
			$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
			$target.focus(); // Set focus again
			};
		});
		}
	}
	});

	
	//Preloader
	
	$(window).on('load', function(e) { // makes sure the whole site is loaded
		$(".loader svg").fadeOut(); // will first fade out the loading animation
		$(".loader").delay(300).fadeOut("slow"); // will fade out the white DIV that covers the website.
	})	
		
		
	//Parallax & fade on scroll	
	
	function scrollBanner() {
	  $(document).on('scroll', function(){
		var scrollPos = $(this).scrollTop();
		$('.parallax-fade-top').css({
		  'top' : (scrollPos/2)+'px',
		  'opacity' : 1-(scrollPos/450)
		});
	  });    
	}
	scrollBanner();
	
	




  })(jQuery); 

