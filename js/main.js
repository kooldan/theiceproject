;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	//Date Picker

   $('#date-start, #date-end').datepicker();

   [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {  
      new SelectFx(el);
   } );

	// Parallax
	var parallax = function() {
		if ( !isiPad() || !isiPhone() ) {
			$(window).stellar();
		}
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle').on('click', function(){

			if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			} else {
				$('body').addClass('fh5co-offcanvas');
			}
			// event.preventDefault();

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

		});	

	}

	

	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			}
	    }
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
	
	var stickyBanner = function() {
		var $stickyElement = $('.sticky-banner');
		var sticky;
		if ($stickyElement.length) {
		  sticky = new Waypoint.Sticky({
		      element: $stickyElement[0],
		      offset: 0
		  })
		}
	}; 

	// Document on load.
	$(function(){
		mainMenu();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		stickyBanner();
	});


}());

users = [
  {
    "id":"989261ac79654f43f2f9a1943c5d7481",
    "username":"kooldan",
    "password":"password",
    "points":1223,
    "email":"kooldan@kooldan.io",
    "t_number":"+79132473271",
    "name":"Даниил",
    "surname":"Кулаковский",
    "birthdate":"01/01/1970"
  },
  {
    "id":"f4cdda55304da439dfce0c799bc3f350",
    "username":"vasyapupkin",
    "password":"password1",
    "points":4,
    "email":"vasyap@vasyap.ru",
    "t_number":"+73124993442",
    "name":"Василий",
    "surname":"Пупкин",
    "birthdate":"01/02/1970"
  },
  {
    "id":"6ca3b7570c3242115d87974ab258a28c",
    "username":"loremi",
    "password":"password2",
    "points":113253,
    "email":"lorem@ipsum.do",
    "t_number":"+74444444444",
    "name":"Lorem",
    "surname":"Ipsum",
    "birthdate":"02/02/1970"
  }
]
function searchUser(){
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  for(let i = 0; i < 3; i++){
    if (users[i].username == username && users[i].password == password) {
      document.location.href = "https://kooldan.github.io/theiceproject/user.html?user="+users[i].id;
      return users[i].id;
    }
  }
  return 0;
}
let url = new URL(document.location.href);
let searchParams = new URLSearchParams(url.search.substring(1));
let id = searchParams.get("user");
let user;

if(id != null){
  let foundUser = false;
  for(let i = 0; i < 3; i++){
    if (users[i].id == id) {
      user = users[i];
      foundUser = true;
      break;
    }
  }
  if(foundUser){
    document.getElementById("lka").innerHTML = user.name + " " + user.surname;

    document.getElementById("u_main").innerHTML = "<h2 class='u_name'>" + user.name + " " + user.surname + "</h2> <p class='u_info'>Количество бонусов - "+user.points+"<br>Почтовый ящик - "+user.email+"<br>Номер телефона - "+user.t_number+"<br></p>";
  }
}