import Swiper, {Navigation} from 'swiper';

import "../../scss/base/swiper.scss";

function bildSliders() {
    let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
    if (sliders) {
        sliders.forEach(slider => {
            slider.parentElement.classList.add('swiper');
            slider.classList.add('swiper-wrapper');
            for (const slide of slider.children) {
                slide.classList.add('swiper-slide');
            }
        });
    }
}

function initSliders() {
    bildSliders();

    if (document.querySelector('.projects__slider')) {
        new Swiper('.projects__slider', {
            modules: [Navigation],
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            spaceBetween: 30,
            autoHeight: true,
            speed: 800,
						watchOverflow: true,

            navigation: {
                prevEl: '.projects__button_prev',
                nextEl: '.projects__button_next',
								disabledClass: 'swiper-button-disabled',
            },

						breakpoints: {
							320: {
								slidesPerView: 2.1,
								spaceBetween: 10,
							},
							767: {
								slidesPerView: 2.1,
								spaceBetween: 10,
							},
							768: {
								slidesPerView: 3.2,
								spaceBetween: 20,
							},
							1366: {
								slidesPerView: 3,
								spaceBetween: 30,
							},
							9999: {
								slidesPerView: 3,
								spaceBetween: 30,
							},
						},

            on: {}
        });
    }

    if (document.querySelector('.agency__slider')) {
			new Swiper('.agency__slider', {
					modules: [Navigation],
					observer: true,
					observeParents: true,
					slidesPerView: 3,
					spaceBetween: 30,
					autoHeight: true,
					speed: 800,
					watchOverflow: true,

					navigation: {
							prevEl: '.agency__button_prev',
							nextEl: '.agency__button_next',
							disabledClass: 'swiper-button-disabled',
					},

					breakpoints: {
						320: {
							slidesPerView: 2.1,
							spaceBetween: 10,
						},
						767: {
							slidesPerView: 2.1,
							spaceBetween: 10,
						},
						768: {
							slidesPerView: 3.2,
							spaceBetween: 20,
						},
						1366: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
						9999: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
					},

					on: {}
			});
		}

		if (document.querySelector('.services__slider')) {
			new Swiper('.services__slider', {
					modules: [Navigation],
					observer: true,
					observeParents: true,
					slidesPerView: 4,
					spaceBetween: 30,
					autoHeight: true,
					speed: 800,
					watchOverflow: true,

					navigation: {
							prevEl: '.services__button_prev',
							nextEl: '.services__button_next',
							disabledClass: 'swiper-button-disabled',
					},

					breakpoints: {
						320: {
							slidesPerView: 2.1,
							spaceBetween: 10,
						},
						767: {
							slidesPerView: 2.1,
							spaceBetween: 10,
						},
						768: {
							slidesPerView: 3.2,
							spaceBetween: 20,
						},
						1366: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
						9999: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
					},

					on: {}
			});
		}
}

window.addEventListener("load", function (e) {
  initSliders();
});
