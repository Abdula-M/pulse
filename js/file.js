$(document).ready(function(){
    $('.carousel__slider').slick({
        infinite: true,
        speed: 1100,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                infinite: true,
                dots: true
              }
            }
        ]
      });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });  

    

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault()
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
        })
      });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back-link');

    // modal 
    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function() {
      $('.overlay, #order #thanks #consultation').fadeOut();
    });

    $('.catalog-item__button').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn();
      })
    });
    
    function validate(form) {
      $(form).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Пожалуйста, введите ваше имя",
          phone: "Пожалуйста, введите ваш номер",
          email: {
            required: "Пожалуйста, введите вашу почту",
            email: "Введите корректную почту"
          }
        }
      });
    }

    validate('#consultation-form');
    validate('#consultation form');
    validate('#order form');

    $('input[name=phone]').mask("+7(999) 999-99-99");

  

    $('form').submit(function(e) {
      e.preventDefault();
      if (!$(this).valid()) {
        return;
      }
      $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn();

          $('form').trigger('reset');
      });
      return false;
  });
    

  });

