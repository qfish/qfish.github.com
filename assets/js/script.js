/**
 * Main JS file for Gamma
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        if ( typeof(Toc) != "undefined" ) {

          new Toc({
            start: 'h1',
            content: '.post-body',
            depth: 3,
            appendTo: '#toc',
            klass: 'nav toc-fisrt'
          })

          var $window = $(window)
        
          var $body = $(document.body)

          var navHeight = $('.navbar-main').outerHeight(true)

          $body.scrollspy({
            target: '#toc',
            offset: navHeight + 25
          })

          $window.on('load', function () {
            $body.scrollspy('refresh')
          })

          // handle the toc anchor click
          $('#toc a').click(function (e) {
            e.preventDefault()
            var $target = $(e.target.hash)
            if ( $target )
              $body.animate({scrollTop: $target.offset().top - navHeight - 20}, 500)
          })

          // back to top
          setTimeout(function () {    
            var $toc = $('#toc')
              $toc.affix({
                offset: {
                  top: function () {
                    var offsetTop    = $toc.offset().top
                    var tocMargin    = parseInt($toc.children(0).css('margin-top'), 10)
                    return (this.top = offsetTop - navHeight - tocMargin)
                  },
                  bottom: function () {
                    var abottom = $("#footer").outerHeight(true) + 
                                  $('#comment').outerHeight(true) + 
                                  $('.post-share').outerHeight(true)
                    // return (this.bottom = abottom)
                    return abottom
                  }
                }
              })
            }, 100)
        }

        // Tooltip init
        tooltipInit();

        // Init the posts
        postInit();

        var header = $('#nav'),
            content = $('#main');



        content.waypoint(function(direction) {
            header.toggleClass('navbar-transparent');
        },  { offset: 125 });

    });


// Init bootstrap tooltip
function tooltipInit() {
    $('[data-toggle]').tooltip();
}

function postInit() {
    // Set lead paragraphs
    // $('.post-body p:first-child').addClass('lead');

    // Set feature image
    var featured = $('.featured-image').find('img').attr('src');
    if (featured) {
        $('.post-header').css('backgroundImage','url('+featured+')');
        $('#footer').css('backgroundImage','url('+featured+')');
    };
}

}(jQuery));

