//slider
const sliderLine = document.querySelector(".slider-line");
const numOfSlide = sliderLine.childElementCount;
const widthOfSlide = document.querySelector(".slider").clientWidth;
const rightOffset = -widthOfSlide * numOfSlide + widthOfSlide;
let offset = 0;
let curentSlide = 1;

document.querySelector(".slider-next").addEventListener("click", () => {
  ++curentSlide;
  offset -= widthOfSlide;
  if (curentSlide > numOfSlide) {
    offset = 0;
    curentSlide = 1;
  }
  sliderLine.style.left = offset + "px";
});

document.querySelector(".slider-prev").addEventListener("click", () => {
  --curentSlide;
  offset += widthOfSlide;
  if (curentSlide < 1) {
    offset = -1500;
    curentSlide = numOfSlide;
  }
  sliderLine.style.left = offset + "px";
});

//tabs

$(document).ready(function () {
  //modal
  $("[data-modal=consultation]").on("click", () => {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order > .modal__descr").text(
        $(".catalog-item__subtitel").eq(i).text()
      );
      $(".overlay, #order").fadeIn("slow");
    });
  });
  $(".modal__close").on("click", () => {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  //validate

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format(
            "Имя должно быть не мение {0} символов!"
          ),
        },
        phone: "Пожалуйста введите свой номер телефона",
        email: {
          required: "Пожалуйста введите свой почтовый адрес",
          email: "Неправильно введен почтовый адрес",
        },
      },
    });
  }

  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");

  //masks forms

  $("input[name=phone]").mask("+ 7(999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault(); //отключить обновление страницы
    $.ajax({
      //метод отправки из библиотеки query
      type: "POST", //тип отправки данных
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn();
      $("form").trigger("reset");
    });
    return false;
  });
});
