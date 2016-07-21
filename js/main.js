// Binding jQuery to $
(function($){})(window.jQuery);


// Namespace Declaration
var blog = blog || {};

// Function Declarations
blog.search_results = blog.search_results || {};
blog.contact_form = blog.contact_form || {};
blog.fixed_sidebar = blog.fixed_sidebar || {};
blog.label_color = blog.label_color || {};
blog.modal = blog.modal || {};


// Function Bodies

/* Emulated AJAX Search */
blog.search_results =
{
	init: function() {
		$('#search-area button[type=submit]').click(blog.search_results.get_results);
	},


	get_results: function(event) {
		event.preventDefault();
		var $loading = $('#results-loading');

		if ($('#search-area input').val().length === 0) {
			$('#search-results').fadeOut();
			return;
		} else {
			$loading.addClass('loading');
			$.ajax({
				url: 'partial/search-results.html',
				method: 'GET',
				success: function(html) {

					// delay for emulated experience
					setTimeout(function(){
						$loading.removeClass('loading');

						$('#search-results')
							.html(html)
							.fadeIn();
						
					},1500);
				}
			});
		}
	}
};


blog.contact_form = 
{
	init: function() {
		$('#contact').on('click', blog.contact_form.load_form);
	},

	load_form: function(event) {
		event.preventDefault();
		var $clicked = $(event.target);

		$clicked.popover({
			html: true,
			placement: 'bottom',
			title: 'Contact Form',
			content: '<form><fieldset><legend>Drop a Line</legend><label for="name">Name</label><input type="text" name="name" required/><label for="email">Email</label><input type="email" name="email" required /><label for="message">Message</label><textarea name="message" required></textarea><hr /><div class="text-center"><button type="submit" class="btn btn-default right">Send a Message</submit></div></fieldset></form>'
		});

		$clicked.popover('toggle');
	}
}

/* On page scroll, keep the side bar in user view */
blog.fixed_sidebar =
{
	init: function() {
		var $window = $(window);
		var $sidenav = $('#side-navigation');
		var $articles = $('#posts');
		var initial_offset = $sidenav.offset().top;
		var sidenav_top_position = '1em';
		
		// Positions and resizes the sidenav based on window scroll position
		$window.on('scroll', function() {
			var sidenav_size = $('.container').first().outerWidth() * .25;
			var sidenav_right_position = ( $window.outerWidth() - $('.container').first().outerWidth() ) / 2;

			// If the viewport is not in tablet / mobile
			if ($window.outerWidth() > 767) {
				// The window has been scrolled past the sidebar's initial static position
				if ($window.scrollTop() > initial_offset) {
					$sidenav.css({
						'position' : 'fixed',
						'top' : sidenav_top_position,
						'right' : sidenav_right_position,
						'left' : 'auto',
						'width' : sidenav_size
					});

					if ($articles.hasClass('col-sm-pull-3')) { $articles.removeClass('col-sm-pull-3'); }
				} else {
					$sidenav.css({
						'position' : 'relative',
						'width' : '',
						'top' : '',
						'right' : '',
						'left' : ''						
					});		

					if (!$articles.hasClass('col-sm-pull-3')) { $articles.addClass('col-sm-pull-3'); }
				}
			}
		});

		// Resizes sidebar based on viewport size
		// $window.on('resize', function() {
		// 	var sidenav_size = $('.container').first().outerWidth() * .25;

		// 	// If the viewport is not in tablet / mobile
		// 	if ($window.outerWidth() > 767) {
		// 		// The window has been scrolled past the sidebar's initial static position
		// 		if ($window.scrollTop() > initial_offset) {
		// 			$sidenav.css({ 'width' : sidenav_size });
		// 		} else {
		// 			$sidenav.css({ 'width' : '' });		
		// 		}
		// 	}
		// });
	}
};


/* Toggles label color for sidebar */
blog.label_color =
{
	init: function() {
		$('#side-navigation h3 a').on('click', function() {
			$(this).siblings('.label')
				.toggleClass('label-default')
				.toggleClass('label-primary');
		});
	}
};


/* Brings permalink into view */
blog.modal = 
{
	init: function() {
		$('body').on('click', '#permalink', function(){
			$(this).siblings('input').toggleClass('expand');
		});
	}
};

// Function Intializations
blog.fixed_sidebar.init();
blog.contact_form.init();
blog.label_color.init();
blog.modal.init();
blog.search_results.init();

// Responsive
