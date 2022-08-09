window.onload = () => {
	setTimeout($('.spinner-border').hide(), 10000);
	testimonialPopulate();
	tutorialPopulate();
}

/* Testimonial */

function testimonialPopulate() {

	var $testimonial = $('#testimonialControls');
	var $testimonialInner = $testimonial.find('.carousel-inner');

	if ($testimonialInner) {
		$.get('https://smileschool-api.hbtn.info/quotes', (result) => {
			result.forEach((result, x) => {
				if (x === 0) {
					$testimonialInner.append(`<div class="carousel-item test${x} justify-content-center active"></div>`);
				} else {
					$testimonialInner.append(`<div class="carousel-item test${x} justify-content-center"></div>`);
				}
				var $testimonialItem = $testimonial.find(`.test${x}`);
				$testimonialItem.append(`<div class="testimonial d-flex flex-column flex-md-row justify-content-around justify-content-md-center align-items-center">
															 <img class="rounded-circle mr-5 mb-4 mb-md-0" src="${result.pic_url}" alt="">
																 <div class="testimonial-text flex-column">
																	 <p class="mb-4">${result.text}</p>
																	 <h5 class="font-weight-bold">${result.name}</h5>
																	 <p class="font-italic">${result.title}</p>
																 </div>
															 </div>`);
			});
			$testimonial.carousel();
		});
	}
}

/* Videos */

function tutorialPopulate() {
	var $tutorialCarousel = $('#tutorialControls');
	var $tutorialCarouselInner = $tutorialCarousel.find('.carousel-inner');

	if ($tutorialCarouselInner) {
		$.get('https://smileschool-api.hbtn.info/popular-tutorials', (result) => {
			result.forEach((result, x) => {
				if (x === 0) {
					$tutorialCarouselInner.append(`<div class="carousel-item tutorial${x} active"></div>`);
				} else {
					$tutorialCarouselInner.append(`<div class="carousel-item tutorial${x}"></div>`);
				}
				var $tutorialCarouselItem = $tutorialCarouselInner.find(`.tutorial${x}`);
				$tutorialCarouselItem.append(`<div class="page-wrapper d-flex flex-row justify-content-center">
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
				var $starRating = $tutorialCarousel.find(`.star-rating-${x}`);
				for (let y = 1; y <= 5; y++) {
					if (y <= result.star) {
						$starRating.append(`<img class="star-rating mr-1" src="./images/star_on.png">`);
					} else {
						$starRating.append(`<img class="star-rating mr-1" src="./images/star_off.png">`);
					}
				}
				$starRating.append(`<p class="duration text-purple">${result.duration}</p>`);
			});
			$('.tutorials .carousel .carousel-item').each(function() {
					var minPerSlide = 4;
					var next = $(this).next();
					if (!next.length) {
					next = $(this).siblings(':first');
					}
					next.children(':first-child').clone().appendTo($(this));
					
					for (var i=0;i<minPerSlide;i++) {
						next=next.next();
						if (!next.length) {
								next = $(this).siblings(':first');
							}
						
						next.children(':first-child').clone().appendTo($(this));
					}
			});
			$tutorialCarousel.carousel();
		});
	}
	$(".loader").hide();
}
