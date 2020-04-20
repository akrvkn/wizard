jQuery(document).ready(function() {

	"use strict";

	/*===================================*
	03. MENU JS
	*===================================*/

	//Show Hide dropdown-menu Main navigation
	$( document ).ready( function () {
		$( '.dropdown-menu a.dropdown-toggler' ).on( 'click', function ( e ) {
			var $el = $( this );
			var $parent = $( this ).offsetParent( ".dropdown-menu" );
			if ( !$( this ).next().hasClass( 'show' ) ) {
				$( this ).parents( '.dropdown-menu' ).first().find( '.show' ).removeClass( "show" );
			}
			var $subMenu = $( this ).next( ".dropdown-menu" );
			$subMenu.toggleClass( 'show' );

			$( this ).parent( "li" ).toggleClass( 'show' );

			$( this ).parents( 'li.nav-item.dropdown.show' ).on( 'hidden.bs.dropdown', function ( e ) {
				$( '.dropdown-menu .show' ).removeClass( "show" );
			} );

			return false;
		});
	});

	//Hide Navbar Dropdown After Click On Links
	var navBar = $(".header_wrap");
	var navbarLinks = navBar.find(".navbar-collapse ul li a.page-scroll");

	$.each( navbarLinks, function( i, val ) {

		var navbarLink = $(this);

		navbarLink.on('click', function () {
			navBar.find(".navbar-collapse").collapse('hide');
			$("header").removeClass("active");
		});

	});

	//Main navigation Active Class Add Remove
	$('.navbar-toggler').on('click', function() {
		$("header").toggleClass("active");
		if($('.search-overlay').hasClass('open'))
		{
			$(".search-overlay").removeClass('open');
			$(".search_trigger").removeClass('open');
		}
	});



	// ===== Pre Loader ===== //
	$(window).on("load", function(){
		$('.loader-wrapper').fadeOut(300);
		$('#main-menu').fadeIn(300);
	});


	// ===== Custom Data Attribute ===== //
	/*var bgImage = "#fullpage .section, #fullpage .section .slide, .slider-panel-wrapper .slides li, .full-carousel-wrapper .carousel-item, .page-header, .page-footer, .page-team, .myVideo"

	$("*").css('height', function () {
		var heightAttr = $(this).attr('data-height')+'px';
		return heightAttr;
	});

	$("*").css('color', function () {
		var colorAttr = $(this).data('color');
		return colorAttr;
	});

	$("*").css('opacity', function () {
		var opacityAttr = $(this).data('opacity');
		return opacityAttr;
	});

	$("*").css('background-color', function () {
		var bgcolorAttr = $(this).data('bg-color');
		return bgcolorAttr;
	});

	$(bgImage).css('background-image', function () {
		var bg = ('url(' + $(this).data("image-src") + ')');
		return bg;
	});

	$(".top-triangle").css("border-bottom-color", function () {
		var topTriangle = $(this).data('shape-color');
		return topTriangle;
	});*/


	// ===== Add class to Text Number ===== //
	$('.number').html(function(i, v){
		return v.replace(/(\d)/g, '<span class="font-number">$1</span>');
	});





	// ===== Fit Image to DIV ===== //
	/*$('.fit-img').each(function() {
		var $div = $(this),
			$img = $('img', $div),
			src = $img.attr('src');
			$div.css('backgroundImage', 'url(' + src + ')');
			$img.remove();
	});*/


	// ===== More Item Link Position Settings ===== //
	$(window).on("load resize", function() {
		var wHeight = $(window).height();
		var cHeight = $('.group-wrapper').height();

		if ( cHeight > wHeight - 60 ) {
			$('.more-item-link').css({ 'position' : 'relative' });
		} else {
			$('.more-item-link').css({ 'position' : 'absolute' });
		}
	});


	// ===== jQuery SlimScroll Settings ===== //
	var buildScroll = $('.nav-inner-wrap, .container-wrapper');
	var destroyScroll = $('');

	destroyScroll.slimScroll({  // ===== CHANGE 'destroyScroll' TO 'buildScroll' WHEN YOU USING AUTO SCROLLING FUNCTION ===== //
		position: 'right'
	});







	// ===== Ripple Effect Settings ===== //
	$(".ripple").on("click", function(e){
		var x = e.pageX;
		var y = e.pageY;
		var clickY = y - $(this).offset().top;
		var clickX = x - $(this).offset().left;
		var box = this;

		var setX = parseInt(clickX,10);
		var setY = parseInt(clickY,10);
		$(this).find("svg").remove();
		$(this).append('<svg><circle cx="'+setX+'" cy="'+setY+'" r="'+0+'"></circle></svg>');

		var c = $(box).find("circle");
		c.animate(
			{
				"r" : $(box).outerWidth()
			},
			{
				easing: "easeOutQuad",
				duration: 400,
				step : function(val){
					c.attr("r", val);
				}
			}
		);

		$('svg').fadeOut(1000);

	});


	// ===== Hide Elements On Small Devices ===== //
	if (navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/) ||
		navigator.userAgent.match(/Windows Phone/i) ||
		navigator.userAgent.match(/ZuneWP7/i)
	) {
		$('.myVideo video').hide();
		$('#fullpage .section, #fullpage .section .slide').css('min-height', '0px');
	}


	// ===== Navigation Menu Settings ===== //
	// Append Click Navigation Menu
	$("#main-menu .nav-menu li:has(ul)").each(function(){
		$(this).append( "<span></span>" );
		$(this).addClass("dropdown-menu");
	});

	// Navigation Menu Toggle
	$('.dropdown-menu ul').hide();
	$("#main-menu .nav-menu li span").on("click", function(){
		$(this).prev("ul").slideToggle(300);
	});


	// ===== jQuery Sidebar Navigation Settings ===== //
	var sides = ["left", "right"];

	// Defines Menu Position
	if ( $("#main-menu").hasClass("right") ) {
		$(".nav-btn").attr("data-side", "right");
		$('.sidebar-nav').addClass("right");
	} else {
		$(".nav-btn").attr("data-side", "left");
		$('.sidebar-nav').addClass("left");
	}

	// Initialize sidebars
	for (var i = 0; i < sides.length; ++i) {
		var cSide = sides[i];
		$(".sidebar-nav." + cSide).sidebar({
			side: cSide
		});
	}

	// Click handlers
	$(".nav-btn[data-action]").on("click", function () {
		var $this = $(this);
		var action = $this.attr("data-action");
		var side = $this.attr("data-side");
		$(".sidebar-nav." + side).trigger("sidebar:" + action);
		return false;
	});

	$(".nav-menu li a").on("click", function () {
		$(".sidebar-nav").trigger("sidebar:close");
		$('.dropdown-menu ul').hide(300);
	});

	// Fixed Menu Overflow on iOS
	if (navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i)
	) {
		$('#main-menu .nav-menu').css( { "margin-bottom" : "100px" } );
	}


	// ===== jQuery FitVids Settings ===== //
	//$(".video-wrapper").fitVids();


	// ===== OWL Carousel Setting ===== //
	// Services Panel Style 3
	/* var owlFullService = $(".services-panel3 .full-carousel-wrapper");
	owlFullService.owlCarousel({
		dots: false,
		responsiveClass: true,
		responsive:{
			0:{
				items:1
			},
			720:{
				items:2
			},
			768:{
				items:2
			},
			960:{
				items:3
			},
			1024:{
				items:3
			}
		}
	});

	// Content Block Style 2
	var owlFullContent = $(".content-block2 .full-carousel-wrapper");
	owlFullContent.owlCarousel({
		dots: false,
		responsiveClass: true,
		responsive:{
			0:{
				items:1
			},
			720:{
				items:2
			},
			768:{
				items:2
			},
			960:{
				items:3
			},
			1200:{
				items:4
			}
		}
	});

	// Portfolio Panel Style 2
	var owlPortfolio = $(".portfolio-panel2 .full-carousel-wrapper");
	owlPortfolio.owlCarousel({
		dots: false,
		responsiveClass: true,
		responsive:{
			0:{
				items:1
			},
			720:{
				items:2
			},
			768:{
				items:2
			},
			960:{
				items:3
			},
			1200:{
				items:4
			}
		}
	});

	// Portfolio Single Page
	var owlPortfolioSingle = $(".related-work .owl-carousel");
	owlPortfolioSingle.owlCarousel({
		dots: false,
		responsiveClass: true,
		responsive:{
			0:{
				items:1
			},
			480:{
				items:2
			},
			768:{
				items:3
			},
			960:{
				items:4
			},
			1200:{
				items:5
			}
		}
	});

	// Custom Navigation
	$(".btn.next").on("click", function(){
		owlFullService.trigger('next.owl.carousel', [500]);
		owlFullContent.trigger('next.owl.carousel', [500]);
		owlPortfolio.trigger('next.owl.carousel', [500]);
		owlPortfolioSingle.trigger('next.owl.carousel', [500]);
	})
	$(".btn.prev").on("click", function(){
		owlFullService.trigger('prev.owl.carousel', [500]);
		owlFullContent.trigger('prev.owl.carousel', [500]);
		owlPortfolio.trigger('prev.owl.carousel', [500]);
		owlPortfolioSingle.trigger('prev.owl.carousel', [500]);
	})

	// Carousel Inner Vertical Middle
	$(window).on("load resize", function() {
		var carouselTitle = $('.carousel-inner.title')
		var titleHeight = $('.carousel-block-title').height();
		var carouselItem = $('.carousel-inner.item');
		var itemHeight = carouselItem.height();
		carouselTitle.each(function(){
			$(this).css('margin-top', - titleHeight / 2);
		});
		carouselItem.each(function(){
			$(this).css('margin-top', - itemHeight / 2);
		});
	});

	// Content Block Style 1
	var owlBlock = $(".content-block1 .box-carousel-wrapper");
	owlBlock.owlCarousel({
		dots: true,
		responsiveClass: true,
		responsive:{
			0:{
				items:1
			},
			720:{
				items:2
			},
			768:{
				items:2
			},
			960:{
				items:3
			},
			1024:{
				items:4
			}
		}
	});

	// Home Blog Panel
	var owlBlog = $(".home-blog-panel .box-carousel-wrapper");
	owlBlog.owlCarousel({
		dots: true,
		responsiveClass: true,
		responsive:{
			0:{
				items:1
			},
			720:{
				items:2
			},
			768:{
				items:2
			},
			960:{
				items:3
			},
			1024:{
				items:3
			}
		}
	});

	// Home Team Panel and Page Team Section
	var owlTeam = $(".home-team-panel .box-carousel-wrapper, .page-team .box-carousel-wrapper");
	owlTeam.owlCarousel({
		dots: true,
		responsiveClass: true,
		responsive:{
			0:{
				items:1
			},
			720:{
				items:2
			},
			768:{
				items:2
			},
			960:{
				items:3
			},
			1024:{
				items:3
			}
		}
	});


	// ===== jQuery FlexSlider Settings ===== //
	$(window).on("load", function() {
		$('.flexslider.slider-panel-wrapper').flexslider({
			controlNav: false,
			directionNav: false,
			slideshow: true,
			animationSpeed: 800,
			multipleKeyboard: true,
			pauseOnHover: true
		});

		$('.featured-area .flexslider').flexslider({
			controlNav: false,
			directionNav: false,
			slideshow: true,
			animationSpeed: 800,
			multipleKeyboard: true,
			pauseOnHover: true
		});

		// Homepage slider custom navigation
		$('.section .slide-prev.prev, .section .slide-next.next').on('click', function(){
			$(".section").removeClass("addcustomNav");
			$(this).parents(".section").addClass("addcustomNav");

			var href = $(this).attr('href');
			$('.addcustomNav .flexslider').flexslider(href)
			return false;
		});

		// Single page slider custom navigation
		$('.page-header-featured .slide-prev.prev, .page-header-featured .slide-next.next').on('click', function(){
			var href = $(this).attr('href');
			$('.page-header-featured .flexslider').flexslider(href)
			return false;
		});
	});*/

	// Fit Height Elements
	$(window).on("load resize", function() {
		var fitHeight = $(window).height();
		var slideHeight = $('.slider-panel-wrapper .slides li');
		slideHeight.height(fitHeight);
	});


	// ===== jQuery Megafolio Settings ===== //
	/*var api=jQuery('.portfolio-panel1 .megafolio-container').megafoliopro({
		filterChangeAnimation: "pagemiddle",
		filterChangeSpeed: 800,
		paddingHorizontal: 0,
		paddingVertical: 0,
		layoutarray: [11]
	});

	var portfolioPage=jQuery('.portfolio-page .megafolio-container').megafoliopro({
		filterChangeAnimation: "pagemiddle",
		filterChangeSpeed: 800,
		paddingHorizontal: 0,
		paddingVertical: 0,
		layoutarray: [11]
	});*/

	// CALL FILTER FUNCTION IF ANY FILTER HAS BEEN CLICKED
	/*jQuery('.filter').on("click", function() {
		jQuery('.filter').each(function() {
			jQuery(this).removeClass("selected")
		});
		api.megafilter(jQuery(this).data('category'));
		portfolioPage.megafilter(jQuery(this).data('category'));
		jQuery(this).addClass("selected");
	});*/


	// ===== FancyBox Settings ===== //
	/*$(".fancybox").fancybox({
		//padding: 0
	});*/

	// ===== Change burger menu background-color on the fly with Midnight jQuery ===== //
	//$('.nav-menu').midnight();



	// Move down mouse icon
	$('#moveSectionDown').on("click", function(e){
		e.preventDefault();
		$.fn.fullpage.moveSectionDown();
	});

	// Fixed to Fit to Section
	$(window).on("load resize", function() {
		var fullPageContainer = $('#fullpage');

		if (fullPageContainer.hasClass("normalScroll")) {
			fullPageContainer.addClass("addNormalScroll");
			fullPageContainer.removeClass("addAutoScroll");
		} else {
			fullPageContainer.addClass("addAutoScroll");
			fullPageContainer.removeClass("addNormalScroll");
		}
	});

	$(window).on("load", function() {
		setTimeout(function(){
			var fullPageContainer = $('#fullpage');
			var value =  window.location.hash.replace('#', '').split('/');
			var destiny = value[0];
			var section = $('.panel-1');
			if($('[data-anchor="'+destiny+'"]').length) {
				section = $('[data-anchor="' + destiny + '"]');
			}

			if (fullPageContainer.hasClass("addAutoScroll")) {
				$.fn.fullpage.reBuild();
			}
			if (fullPageContainer.hasClass("addNormalScroll")) {
				$('html, body').scrollTop(section.position().top);
			}
		}, 1000);
	});


	// ===== Services Tooltip Settings ===== //
	/*$('.service-tooltip').tooltipster({
		position: 'top',
		animation: 'grow',
		delay: 200,
		speed: 350,
		theme: 'tooltipster-shadow',
		touchDevices: true,
		trigger: 'hover',
		maxWidth: 228,
		offsetX: 0,
		offsetY: 10
	});*/


	// ===== Portfolio Tabs Settings ===== //
	/*$('#instagramTabs').tabulous({
		effect: 'slideUp' //** This Template use effect slideUp only for the proper design.
	});*/

	// Fix Auto Height tabs_container
	$(window).on("load resize", function() {
		var pHeight = $('.portfolio-detail-wrapper');
		var ptHeight = $('.portfolio-tabs').height();

		pHeight.height(ptHeight);
	});


	// ===== Form Submit Settings ===== //
	$("#submit_message").on("click", function() {
		$('#reply_message').removeClass();
		$('#reply_message').html('')
		var regEx = "";

		// validate Name
		var name = $("input#name").val();
		regEx=/^[A-Za-z .'-]+$/;
		if (name == "" || name == "Name"  || !regEx.test(name)) {
			$("input#name").val('');
			$("input#name").focus();
			return false;
		}

		// validate Email
		var email = $("input#email").val();
		regEx=/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
		if (email == "" || email == "Email" || !regEx.test(email)) {
			$("input#email").val('');
			$("input#email").focus();
			return false;
		}

		// validate Subject
		var mysubject = $("input#mysubject").val();
		regEx=/^[A-Za-z0-9 .'-]+$/;
		if (mysubject == "" || mysubject == "Mysubject"  || !regEx.test(mysubject)) {
			$("input#mysubject").val('');
			$("input#mysubject").focus();
			return false;
		}

		// validate Message
		var mymessage = $("textarea#mymessage").val();
		if (mymessage == "" || mymessage == "Mymessage" || mymessage.length < 2) {
			$("textarea#mymessage").val('');
			$("textarea#mymessage").focus();
			return false;
		}

		var dataString = 'name='+ $("input#name").val() + '&email=' + $("input#email").val() + '&mysubject='+ $("input#mysubject").val() + '&mymessage=' + $("textarea#mymessage").val();

		$('.loading').fadeIn(500);

		// Send form data to mailer.php
		$.ajax({
			type: "POST",
			url: "mailer.php",
			data: dataString,
			success: function() {
				$('.loading').hide();
				$('#reply_message').addClass('list3');
				$('#reply_message').html("<span>Mail sent successfully</span>")
					.hide()
					.fadeIn(1500);
				$('#form_contact')[0].reset();
			}
		});
		return false;
	});

});