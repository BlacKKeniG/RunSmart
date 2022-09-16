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
});
