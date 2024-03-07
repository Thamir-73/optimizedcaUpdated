// Preloader js    
$(window).on('load', function () {
  $('.preloader').fadeOut(100);
});

(function ($) {
  'use strict';

  
  // product Slider
  $('.product-image-slider').slick({
    autoplay: false,
    infinite: true,
    arrows: false,
    dots: true,
    customPaging: function (slider, i) {
      var image = $(slider.$slides[i]).data('image');
      return '<img class="img-fluid" src="' + image + '" alt="product-image">';
    }
  });

  // Product slider
  $('.product-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

})(jQuery);



  // langcha

  // JavaScript code to reverse the order of navbar links for Arabic language
function reverseNavbarLinks() {
  const navbarLinks = document.getElementById('navbar-links');
  if (document.documentElement.lang === 'ar-sa') {
    for (let i = navbarLinks.children.length - 1; i >= 0; i--) {
      navbarLinks.appendChild(navbarLinks.children[i]);
    }
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', reverseNavbarLinks);



// JavaScript to add reveal class on scroll
document.addEventListener("scroll", function() {
  var elements = document.querySelectorAll(".section#features .col-md-4");

  elements.forEach(function(element) {
    if (isElementInViewport(element) && !element.classList.contains("reveal")) {
      element.classList.add("reveal");
    }
  });
});

function isElementInViewport(element) {
  var rect = element.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= windowHeight;
}




// JavaScript right to left effect
$(window).on('scroll', function() {
  $('.row.mb-40').each(function(index) {
    var elementPosition = $(this).offset().top;
    var scrollPosition = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (scrollPosition + windowHeight >= elementPosition + 100) {
      if (index % 2 === 0) {
        $(this).addClass('row-from-right');
      } else {
        $(this).addClass('row-from-left');
      }
    }
  });
});





// JavaScript fadein effect
function fadeInOnScroll() {
  var productSlider = document.querySelector('.gallery .product-slider');
  var productSliderPosition = productSlider.getBoundingClientRect().top;
  var screenHeight = window.innerHeight;

  if (productSliderPosition < screenHeight) {
    productSlider.style.opacity = 1;
  }
}

window.addEventListener('scroll', fadeInOnScroll);



function setLanguageTextDirection() {
  const language = document.documentElement.lang;
  const bodyElement = document.querySelector('body');

  if (language === 'ar') {
    bodyElement.classList.add('rtl');
  } else {
    bodyElement.classList.remove('rtl');
  }
}

// Call the function when the page loads and on language change
document.addEventListener('DOMContentLoaded', setLanguageTextDirection);
document.addEventListener('languagechange', setLanguageTextDirection);








