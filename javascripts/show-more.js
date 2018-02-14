var showMoreText = $('.show-more-text').text();
var charCount = $('.show-more-text').attr('data-count');
var maxWidth = $('.show-more-text').attr('data-max-width');

if (showMoreText.length < charCount){
  $('a.show-more').hide();
}


$('.show-more').on('click', function() {
  var x = $(this);
  var $showMoreBtn = x.find('span');
  var $showMoreContent = x.prev();
  $showMoreContent.toggleClass('open');

  return $showMoreBtn.toggle();
});

function screen_resize() {
  var width = parseInt(window.innerWidth);

  if ( maxWidth ) {

    if ( width <= maxWidth ) {
      $('a.show-more').show();
      console.log("shown");
      $('div.show-more-text').removeClass("auto-open");

    } else {
      $('a.show-more').hide();
      $('div.show-more-text').addClass("auto-open");
    }
  }
}

$(window).resize(function(e) {
  screen_resize();
});

$(document).ready(function(e) {
  screen_resize();
});
