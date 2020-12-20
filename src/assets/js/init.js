// import 'gsap';

const uiInits = {

	init: function() {
		this.svgPolifill();
		this.browserCheck();
		this.lazy();
		this.validation();
		// this.noizPicLoad();
		if (window.matchMedia("(min-width: 1250px)").matches) {
			// this.animations();
		}
		if (window.matchMedia("(max-width: 1249px)").matches) {
			//
		}
		// this.scrollTo();
		// this.showModalTimer();
		this.flyLabels();
		this.slider();
	},

	svgPolifill: function() {
		svg4everybody();
	},

	browserCheck: function() {
		const _this = this;
		// проверка браузера
		const userAgent = navigator.userAgent;
		if (userAgent.indexOf("Firefox") > -1) {
			// "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
			document.querySelector('body').classList.add('browser-mozzila');
		} else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
			//"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
			document.querySelector('body').classList.add('browser-opera');
		} else if (userAgent.indexOf("Trident") > -1) {
			// "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
			document.querySelector('body').classList.add('browser-ie');
		} else if (userAgent.indexOf("Edge") > -1) {
			// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
			document.querySelector('body').classList.add('browser-edge');
		} else if (userAgent.indexOf("Chrome") > -1) {
			// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
			document.querySelector('body').classList.add('browser-chrome');
		} else if (userAgent.indexOf("Safari") > -1) {
			// "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
			document.querySelector('body').classList.add('browser-safari');
		}
		// проверка на МАС платформу
		if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
			document.querySelector('body').classList.add('platform-mac');
		}
	},

	lazy: function() {
		// Lazy load pics
		const lazyPic = $('.lazy-img');
		if (lazyPic.length > 0) {
			new LazyLoad({
				elements_selector: ".lazy-img",
				threshold: 200,
			});
		}
	},

	validation: function () {
		$('.bv-form').bootstrapValidator({
			feedbackIcons: {
				valid: 'bv-icon-ok',
				invalid: 'bv-icon-not',
				validating: 'bv-icon-refresh'
			},
		})
		.on('success.form.bv', function (e) {
			const form = $(e.target);
			const msg = form.serialize();
			$.ajax({
				type: 'POST',
				url: 'module/moduleForm.php',
				data: msg,
				success: function (data) {
					console.log('success', data);
					$('#modalRequest').modal('hide');
					if (data == "success") {
						form.find('input').val("");
						$('#modalCallback').modal('show');
					} else {
						$('#modalError').modal('show');
					}
					setTimeout(function () {
						$('#modalCallback').modal('hide');
						$('#modalError').modal('hide');
					}, 3000);
				},
				error: function (xhr, str) {
					console.log('error', msg);
					$('#modalRequest').modal('hide');
					$('#modalError').modal('show');
					setTimeout(function () {
						$('#modalError').modal('hide');
					}, 3000);
				}
			});
		});

		$('input[type="tel"]').inputmask({
			showMaskOnHover: false,
			oncomplete: function () {
				const $this = $(this);
				const $form = $this.closest('.bv-form');
				$form.data('bootstrapValidator').updateStatus($this.attr('name'), 'VALID', null);
			},
			onincomplete: function () {
				const $this = $(this);
				const $form = $this.closest('.bv-form');
				setTimeout(function () {
					$form.data('bootstrapValidator').updateStatus($this.attr('name'), 'INVALID', null);
				}, 0)
			},
		});

		$('.js_inputYNP').inputmask({
			showMaskOnHover: false,
		});
	},

	noizPicLoad: function() {
		// Предзагрузка картинок в низком качестве
		var lazyloadImages;
		if ("IntersectionObserver" in window) {
			lazyloadImages = document.querySelectorAll(".js_low-pic");
			var imageObserver = new IntersectionObserver(function (entries, observer) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var image = entry.target;
						image.src = image.dataset.src;
						image.classList.remove("js_low-pic");
						imageObserver.unobserve(image);
					}
				});
			});
			lazyloadImages.forEach(function (image) {
				imageObserver.observe(image);
			});
		}
		else {
			var lazyloadThrottleTimeout;
			lazyloadImages = $(".js_low-pic");

			function lazyload() {
				if (lazyloadThrottleTimeout) {
					clearTimeout(lazyloadThrottleTimeout);
				}
				lazyloadThrottleTimeout = setTimeout(function () {
					var scrollTop = $(window).scrollTop();
					lazyloadImages.each(function () {
						var el = $(this);
						if (el.offset().top - scrollTop < window.innerHeight) {
							var url = el.attr("data-src");
							el.attr("src", url);
							el.removeClass("js_low-pic");
							lazyloadImages = $(".js_low-pic");
						}
					});
					if (lazyloadImages.length == 0) {
						$(document).off("scroll");
						$(window).off("resize");
					}
				}, 20);
			};
			lazyload();
			$(document).on("scroll", lazyload);
			$(window).on("resize", lazyload);
		}
	},

	animations() {
		gsap.config({nullTargetWarn: false});
		const hero = gsap.timeline();
		hero.addLabel("start");
		hero.to(".hero__side--left", {
			x: 0,
			opacity: 1,
		}, 'start+=0.5');
		hero.to(".hero__side--right", {
			x: 0,
			opacity: 1,
		}, 'start+=0.5');

		const section1 = gsap.timeline({paused: true});
		section1.to('.section--s1 .section__line', {
			opacity: 1,
			duration: 1.1,
		})
		const section1Block = document.querySelector('.section--s1');
		if(section1Block === null) return false;
		new Waypoint({
			element: section1Block,
			handler: function (direction) {
				section1.play();
			},
			offset: '40%'
		});
	},

	scrollTo() {
		$(".js_scroll").click(function() {
			$('html, body').animate({
				scrollTop: $(".advantages").offset().top
			}, 800);
		});
	},

	showModalTimer() {
		const t = null;
		window.addEventListener('load', resetTimer);
		document.addEventListener('onmousemove', resetTimer);
		document.addEventListener('onmousemove', resetTimer);

		function resetTimer() {
			clearTimeout(t);
			t = setTimeout(function() {
				$('#modalRequest').modal('show');
			}, 30000)
		}
	},

	flyLabels() {
		var inputWrappers = $('.form-group');
		inputWrappers.each(function () {
			var wrap = $(this);
			var input = wrap.find('.form-control');

			if (input.val() !== '') {
				wrap.addClass('focus-in');
			}

			input.off('focus.initInputs').on('focus.initInputs', function () {
				wrap.addClass('focus-in');
			});

			input.off('blur.initInputs').on('blur.initInputs', function () {
				if (input.val() === '') {
					wrap.removeClass('focus-in');
				}
			});
		});
	},

	slider() {
		const _this = this;
		$('.js_slider').each(function (i, el) {
			const $slideWrap = $(el);
			const slider = $slideWrap.find('.js-swiper-slider');
			const sliderPrev = $slideWrap.find('.js-swiper-button-prev');
			const sliderNext = $slideWrap.find('.js-swiper-button-next');
			const sliderPagination = $slideWrap.find('.js-swiper-pagination');

			const swiper = new Swiper(slider, {
				autoHeight: false,
				lazy: true,
				lazyInit: 500,
				loop: false,
				slidesPerView: 1,
				spaceBetween: 0,
				watchOverflow: true,
				// autoplay: {
				// 	delay: 5000,
				// },
				navigation: {
					nextEl: sliderNext,
					prevEl: sliderPrev,
				},
				breakpoints: {
					// 768: {

					// },
				},
				on: {
					init() {
						console.log(123);
					},
				},
			});
		});
	},
}

export default uiInits
