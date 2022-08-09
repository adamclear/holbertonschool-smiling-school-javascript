window.onload = () => {
	setTimeout($('.spinner-border').hide(), 5000);
	testimonialPopulate();
	tutorialPopulate();
	latestPopulate();
	coursesPopulate();
}

/* Testimonial */

function testimonialPopulate() {

	var $testimonial = $('#testimonialControls');
	var $testimonialInner = $testimonial.find('.carousel-inner');

	if ($testimonialInner) {
		$.get('https://smileschool-api.hbtn.info/xml/quotes', (result) => {
			result.childNodes[0].childNodes.forEach((result, x) => {
				$testimonialInner.append(`<div class="carousel-item test${x} justify-content-center w-75 mx-auto">
																		<div class="testimonial d-flex flex-column flex-md-row justify-content-around justify-content-md-center align-items-center">
																			<img class="rounded-circle mr-5 mb-4 mb-md-0" src="${result.childNodes[0].textContent}" alt="">
																				<div class="testimonial-text flex-column">
																					<p class="mb-4">${result.childNodes[3].textContent}</p>
																					<h5 class="font-weight-bold">${result.childNodes[1].textContent}</h5>
																					<p class="font-italic">${result.childNodes[2].textContent}</p>
																				</div>
																		</div>
																	</div>`);
			});
			$('.test0').addClass('active');
			$testimonial.carousel();
		});
	}
}

/* Tutorials */

function tutorialPopulate() {
	var $tutorialCarousel = $('#tutorialControls');
	var $tutorialCarouselInner = $tutorialCarousel.find('.carousel-inner');

	if ($tutorialCarouselInner) {
		$.get('https://smileschool-api.hbtn.info/xml/popular-tutorials', (result) => {
			result.childNodes[0].childNodes.forEach((result, x) => {
				$tutorialCarouselInner.append(`<div class="carousel-item tutorial${x} mx-auto">
																				<div class="page-wrapper d-flex flex-row justify-content-center">
																					<div class="tutorial-card d-none flex-column d-flex">
																						<div>
																							<img class="video_tn img-fluid" src="${result.childNodes[2].textContent}">
																							<img class="video_pb img-fluid" src="./images/play.png">
																						</div>
																						<div>
																							<h5 class="font-weight-bold">${result.childNodes[0].textContent}</h5>
																							<p>${result.childNodes[1].textContent}</p>
																						</div>
																						<div class="d-flex flex-row mb-2">
																							<img class="tutorial-profile rounded-circle" src="${result.childNodes[4].textContent}">
																							<h5 class="text-purple ml-3">${result.childNodes[3].textContent}</h5>
																						</div>
																						<div class="d-flex flex-row star-rating-${x}">
																						</div>
																					</div>
																				</div>
																			</div>`);
				var $starRating = $tutorialCarousel.find(`.star-rating-${x}`);
				for (let y = 1; y <= 5; y++) {
					if (y <= result.attributes[1].value) {
						$starRating.append(`<img class="star-rating mr-1" src="./images/star_on.png">`);
					} else {
						$starRating.append(`<img class="star-rating mr-1" src="./images/star_off.png">`);
					}
				}
				$starRating.append(`<p class="duration text-purple">${result.childNodes[5].textContent}</p>`);
			});
			$('.tutorials .carousel .carousel-item:first').addClass('active');
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
}

/* Latest Videos */

function latestPopulate() {
	var $latestCarousel = $('#latestControls');
	var $latestCarouselInner = $latestCarousel.find('.carousel-inner');

	if ($latestCarouselInner) {
		$.get('https://smileschool-api.hbtn.info/xml/latest-videos', (result) => {
			result.childNodes[0].childNodes.forEach((result, x) => {
				$latestCarouselInner.append(`<div class="carousel-item latest${x} mx-auto">
																				<div class="page-wrapper d-flex flex-row justify-content-center">
																					<div class="tutorial-card d-none flex-column d-flex">
																						<div>
																							<img class="video_tn img-fluid" src="${result.childNodes[2].textContent}">
																							<img class="video_pb img-fluid" src="./images/play.png">
																						</div>
																						<div>
																							<h5 class="font-weight-bold">${result.childNodes[0].textContent}</h5>
																							<p>${result.childNodes[1].textContent}</p>
																						</div>
																						<div class="d-flex flex-row mb-2">
																							<img class="tutorial-profile rounded-circle" src="${result.childNodes[4].textContent}">
																							<h5 class="text-purple ml-3">${result.childNodes[3].textContent}</h5>
																						</div>
																						<div class="d-flex flex-row star-rating-${x}">
																						</div>
																					</div>
																				</div>
																			</div>`);
				var $starRating = $latestCarousel.find(`.star-rating-${x}`);
				for (let y = 1; y <= 5; y++) {
					if (y <= result.attributes[1].value) {
						$starRating.append(`<img class="star-rating mr-1" src="./images/star_on.png">`);
					} else {
						$starRating.append(`<img class="star-rating mr-1" src="./images/star_off.png">`);
					}
				}
				$starRating.append(`<p class="duration text-purple">${result.childNodes[5].textContent}</p>`);
			});
			$('.videos .carousel .carousel-item:first').addClass('active');
			$('.videos .carousel .carousel-item').each(function() {
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
			$latestCarousel.carousel();
		});
	}
}

/* Courses */

function coursesPopulate () {
	var $courseResult = $('#courses');
	var $topicMenu = $('#topicMenu');
	var $sortMenu = $('#sortMenu');

	$.get('https://smileschool-api.hbtn.info/xml/courses', (result) => {
		console.log(result.childNodes);
		result.childNodes[0].childNodes[0].childNodes.forEach((result) => {
			var topicTitle = capitalizeFirstLetter(result.textContent);
			$topicMenu.append(`<option class="bg-white text-body">${topicTitle}</option>`);
		});
		result.childNodes[0].childNodes[2].childNodes.forEach((result) => {
			var sortTitle = capitalizeFirstLetter(result.textContent);
			sortTitle = sortTitle.replace('_', ' ');
			$sortMenu.append(`<option class="bg-white text-body">${sortTitle}</option>`);
		});
});
}

/* Helpers */

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
