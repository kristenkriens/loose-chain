$(function() {
  var navOffsetOrig = $('.header').offset().top;

  // Smooth scroll
  $('a[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 1000);
        return false;
      }
    }
  });

  // Adds and removes active class to nav link on scroll
  $(window).on('scroll', function() {
    var currentOffset = $(this).scrollTop();
    var navOffset = $('.header').offset().top;
    var navHeight = $('.header').height();

    if (currentOffset >= (navOffset - (navHeight / 2) + 40)) {
      $('.header').addClass('sticky');
      $('.header + section').css('margin-top', navHeight);
    }

    if (currentOffset < (navOffsetOrig - (navHeight / 2) + 40)) {
      $('.header').removeClass('sticky');
      $('.header + section').css('margin-top', 0);
    }

    $('.header li:not(:last-of-type) a').each(function () {
      var refElement = $($(this).attr('href'));

      if (refElement.offset().top <= currentOffset + navHeight) {
        $('.header li a').removeClass('active');
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });

  // Makes numbers in stats section count up from 0
  function countUp() {
    $('.stats__number').each(function() {
      var $this = $(this);
      var countTo = $this.attr('data-count');
      var units = $this.attr('data-units');

      if(units === 'thousand') {
        countTo = countTo / 100;
      }

      $({ countNum: $this.text()}).animate({ countNum: countTo }, {
        duration: 1500,
        easing: 'linear',
        step: function() {
          if(units === 'thousand') {
            $this.text(Math.floor(this.countNum)).addClass('stats__number--thousand');
          } else {
            $this.text(Math.floor(this.countNum));
          }
        },
        complete: function() {
          if(units === 'thousand') {
            $this.text(this.countNum).addClass('stats__number--thousand');
          } else {
            $this.text(this.countNum);
          }
        }
      });
    });
  }

  // Toggles mobile nav on click or hamburger
  $('.header__hamburger').on('click', function() {
    if($(window).width() < 768) {
      $('.header__nav').slideToggle();
      $(this).toggleClass('header__hamburger--open');
    }
  });

  // Toggles mobile nav on click of link in nav
  $('.header__nav li a').on('click', function() {
    if($(window).width() < 768) {
      $('.header__nav').slideToggle();
      $('.header__hamburger').toggleClass('header__hamburger--open');
    }
  });

  // Initializes the slider/carousel
  $('.workshop-reviews__slider').slick({
    adaptiveHeight: true,
    autoplay: true
  });

  // Initializes the starting of the countUp function
  $('.stats__number').appear();
  $('.stats__number').on('appear', function() {
    countUp();
  });

});
