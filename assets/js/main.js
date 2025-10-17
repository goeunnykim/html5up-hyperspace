/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);

// 추가: 이미지/엘리먼트 드래그 방지 (브라우저 호환성 보강)
document.addEventListener('DOMContentLoaded', function() {
	// Prevent drag on images and anchor elements
	document.querySelectorAll('img, a').forEach(function(el) {
		el.setAttribute('draggable', 'false');
		el.addEventListener('dragstart', function(e) { e.preventDefault(); });
	});

	// 우클릭(컨텍스트 메뉴) 차단: 폼 입력 요소는 예외로 둠
	document.addEventListener('contextmenu', function(e) {
		var t = e.target;
		// 폼 허용(원래), 링크와 .allow-context(직접 지정한 영역)도 허용
		if (t.closest && (t.closest('input, textarea, select, a') || t.closest('.allow-context'))) return;
		e.preventDefault();
	});

	// YouTube background injection after 15s
	(function() {
		var DELAY_MS = 3000; // 15 seconds
		var VIDEO_ID = 'D9S7IF-LFQ8'; // <- Replace with your YouTube video id
		var intro = document.getElementById('intro');
		if (!intro || !VIDEO_ID) return;

		setTimeout(function() {
			// don't inject twice
			if (intro.querySelector('.yt-bg-wrapper')) return;

			var wrapper = document.createElement('div');
			wrapper.className = 'yt-bg-wrapper';

			// YouTube embed URL for autoplay, muted, loop
			// To loop a single video, playlist param with same video is used
			var src = 'https://www.youtube.com/embed/' + VIDEO_ID + '?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1&mute=1&loop=1&playlist=' + VIDEO_ID + '&playsinline=1';

			var iframe = document.createElement('iframe');
			iframe.setAttribute('src', src);
			iframe.setAttribute('allow', 'autoplay; encrypted-media');
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('allowfullscreen', '');

			wrapper.appendChild(iframe);
			intro.insertBefore(wrapper, intro.firstChild);

			// Force reflow then fade in
			setTimeout(function() { wrapper.classList.add('visible'); }, 50);
		}, DELAY_MS);
	})();
});