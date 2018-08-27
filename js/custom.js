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
	
	
	//Page Scroll to id
	
	$(window).on("load",function(){
				
		/* Page Scroll to id fn call */
		$(".navbar-nav li a,a[href='#top'],a[data-gal='m_PageScroll2id']").mPageScroll2id({
			highlightSelector:".navbar-nav li a",
			offset: 68,
			scrollSpeed:800
		});
				
		/* demo functions */
		$("a[rel='next']").click(function(e){
			e.preventDefault();
			var to=$(this).parent().parent("section").next().attr("id");
			$.mPageScroll2id("scrollTo",to);
		});

	});
	



	/* Parallax effect */
			
	$(window).enllax();
	
	
	/* Scroll Animation */
	
	window.scrollReveal = new scrollReveal();





	$(document).ready(function() {

	
		//Scroll back to top
	
		var offset = 300;
		var duration = 400;
		jQuery(window).on('scroll', function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.scroll-to-top').fadeIn(duration);
			} else {
				jQuery('.scroll-to-top').fadeOut(duration);
			}
		});
				
		jQuery('.scroll-to-top').on('click', function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, duration);
			return false;
		})



	});





	/* Contact form */

	$('#contact-form').validator();


	// when the form is submitted
	$('#contact-form').on('submit', function (e) {

		// if the validator does not prevent form submit
		if (!e.isDefaultPrevented()) {
			var url = "contact.php";

			// POST values in the background the the script URL
			$.ajax({
				type: "POST",
				url: url,
				data: $(this).serialize(),
				success: function (data)
				{
					// data = JSON object that contact.php returns

					// we recieve the type of the message: success x danger and apply it to the 
					var messageAlert = 'alert-' + data.type;
					var messageText = data.message;

					// let's compose Bootstrap alert box HTML
					var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
					
					// If we have messageAlert and messageText
					if (messageAlert && messageText) {
						// inject the alert to .messages div in our form
						$('#contact-form').find('.messages').html(alertBox);
						// empty the form
						$('#contact-form')[0].reset();
					}
				}
			});
			return false;
		}
	})



	


  })(jQuery); 

