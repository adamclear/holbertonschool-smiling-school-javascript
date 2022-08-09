window.onload = () => {
	carouselPopulate();
	videoPopulate();
}

/* Carousel */

function carouselPopulate() {

	var $carousel = $('#testimonialControls');
	var $carouselInner = $carousel.find('.carousel-inner');

	if ($carouselInner) {
		$.get('https://smileschool-api.hbtn.info/quotes', (result) => {
			result.forEach((result, x) => {
				if (x === 0) {
					$carouselInner.append(`<div class="carousel-item test${x} justify-content-center active"></div>`);
				} else {
					$carouselInner.append(`<div class="carousel-item test${x} justify-content-center"></div>`);
				}
				var $carouselItem = $carousel.find(`.test${x}`);
				$carouselItem.append(`<div class="testimonial d-flex flex-column flex-md-row justify-content-around justify-content-md-center align-items-center">
															 <img class="rounded-circle mr-5 mb-4 mb-md-0" src="${result.pic_url}" alt="">
																 <div class="testimonial-text flex-column">
																	 <p class="mb-4">${result.text}</p>
																	 <h5 class="font-weight-bold">${result.name}</h5>
																	 <p class="font-italic">${result.title}</p>
																 </div>
															 </div>`);
			});
			$carousel.carousel();
		});
	}
}

/* Videos */

function videoPopulate() {
	var $videoCarousel = $('#tutorialControls');
	var $videoCarouselInner = $videoCarousel.find('.carousel-inner');

	if ($videoCarouselInner) {
		$.get('https://smileschool-api.hbtn.info/popular-tutorials', (result) => {
			result.forEach((result, x) => {
				if (x === 0) {
					$videoCarouselInner.append(`<div class="carousel-item video${x} active"></div>`);
				} else {
					$videoCarouselInner.append(`<div class="carousel-item video${x}"></div>`);
				}
				var $videoCarouselItem = $videoCarouselInner.find(`.video${x}`);
				$videoCarouselItem.append(`<div class="page-wrapper d-flex flex-row justify-content-center">
																		<div class="tutorial-card d-none flex-column d-flex">
																			<div>
																				<img class="video_tn img-fluid" src="${result.thumb_url}">
																				<img class="video_pb img-fluid" src="./images/play.png">
																			</div>
																			<div>
																				<h5 class="font-weight-bold">${result.title}</h5>
																				<p>${result['sub-title']}</p>
																			</div>
																			<div class="d-flex flex-row mb-2">
																				<img class="tutorial-profile rounded-circle" src="${result.author_pic_url}">
																				<h5 class="text-purple ml-3">${result.author}</h5>
																			</div>
																			<div class="d-flex flex-row star-rating-${x}">
																			</div>
																		</div>
																	</div>`);
				var $starRating = $videoCarousel.find(`.star-rating-${x}`);
				for (let y = 1; y <= 5; y++) {
					if (y <= result.star) {
						$starRating.append(`<img class="star-rating mr-1" src="./images/star_on.png">`);
					} else {
						$starRating.append(`<img class="star-rating mr-1" src="./images/star_off.png">`);
					}
				}
				$starRating.append(`<p class="duration text-purple">${result.duration}</p>`);
			});
			$videoCarousel.carousel();
		});
	}
}
