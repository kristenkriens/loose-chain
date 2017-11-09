$(function() {
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

  var navOffsetOrig = $('.header').position().top;

  $(window).on('scroll', function() {
    var currentOffset = $(this).scrollTop();
    var navOffset = $('.header').position().top;
    var href = $('.header__nav li a').attr('href');
    var navHeight = $('.header').height();

    if(currentOffset >= (navOffset - (navHeight / 2) + 50)) {
      $('.header').addClass('sticky');
      $('.header + section').css('margin-top', navHeight);
    }

    if(currentOffset < (navOffsetOrig - (navHeight / 2) + 50)) {
      $('.header').removeClass('sticky');
      $('.header + section').css('margin-top', 0);
    }

    $('.header__nav li').each(function (event) {
      if (currentOffset >= $(href).position().top - navOffset) {
        $('.header__nav li').not(this).removeClass('active');
        $(this).addClass('active');
      }
    });
  });

  $('.header__hamburger').on('click', function() {
    if($(window).width() < 768) {
      $('.header__nav').slideToggle();
      $(this).toggleClass('header__hamburger--open');
    }
  });

  // Slider
  var ul = $('.workshop-reviews__carousel-inner');
  var slide_count = ul.children().length;
  var slide_width_pc = 100 / slide_count;
  var slide_index = 0;

  var first_slide = ul.find('li:first-child');
  var last_slide = ul.find('li:last-child');

  last_slide.clone().prependTo(ul);
  first_slide.clone().appendTo(ul);

  ul.find('li').each(function(indx) {
    var left_percent = (slide_width_pc * indx) + '%';
    $(this).css({'left':left_percent});
    $(this).css({width:(100 / slide_count) + '%'});
  });

  ul.css('margin-left', '-100%');

  function slide(new_slide_index) {
    var margin_left_pc = (new_slide_index * (-100) - 100) + '%';

    ul.animate({'margin-left': margin_left_pc}, 500, function() {
      if(new_slide_index < 0) {
        ul.css('margin-left', ((slide_count) * (-100)) + '%');
        new_slide_index = slide_count - 1;
      } else if(new_slide_index >= slide_count) {
        ul.css('margin-left', '-100%');
        new_slide_index = 0;
      }
      slide_index = new_slide_index;
    });
  }

  $('.workshop-reviews__nav--left').click(function() {
    slide(slide_index - 1);
  });

  $('.workshop-reviews__nav--right').click(function() {
    slide(slide_index + 1);
  });
});
