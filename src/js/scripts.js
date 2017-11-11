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

  var navOffsetOrig = $('.header').offset().top;

  $(window).on('scroll', function() {
    var currentOffset = $(this).scrollTop();
    var navOffset = $('.header').offset().top;
    var navHeight = $('.header').height();

    if(currentOffset >= (navOffset - (navHeight / 2) + 50)) {
      $('.header').addClass('sticky');
      $('.header + section').css('margin-top', navHeight);
    }

    if(currentOffset < (navOffsetOrig - (navHeight / 2) + 50)) {
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

  function carouselHeight() {
    let carouselPhotoHeight = $('.workshop-reviews__photo').height() + 25;
    let carouselParagraphsHeight = $('.workshop-reviews__text').height();
    let carouselHeight = carouselPhotoHeight + carouselParagraphsHeight;

    $('.workshop-reviews__carousel').css('height', carouselHeight);
  }

  carouselHeight();

  $(window).on('resize', function() {
    carouselHeight();
  });

  $('.workshop-reviews__nav').on('click', function() {
    carouselHeight();
  });

  $('.workshop-reviews__nav--left').on('click', function() {
    slide(slide_index - 1);
  });

  $('.workshop-reviews__nav--right').on('click', function() {
    slide(slide_index + 1);
  });
});
