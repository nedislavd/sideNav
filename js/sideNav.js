(function() {

    // Check if an element is in the viewport
    function isElementVisible(el) {
        var rect     = el.getBoundingClientRect(),
            vWidth   = window.innerWidth || doc.documentElement.clientWidth,
            vHeight  = window.innerHeight || doc.documentElement.clientHeight,
            efp      = function (x, y) { return document.elementFromPoint(x, y) };

        // Return false if it's not in the viewport
        if (rect.right < 0 || rect.bottom < 0
                || rect.left > vWidth || rect.top > vHeight)
            return false;

        // Return true if any of its four corners are visible
        return (
              el.contains(efp(rect.left,  rect.top))
          ||  el.contains(efp(rect.right, rect.top))
          ||  el.contains(efp(rect.right, rect.bottom))
          ||  el.contains(efp(rect.left,  rect.bottom))
        );
    }

    var $contentBlocks = $('.content-section');

    $(window).on('DOMContentLoaded load resize scroll', function() {
        $contentBlocks.each(function(index, el) {
            if (isElementVisible(el)) {
                // console.log($(el) + ' is in view');
                $('.nav-el').removeClass('active');
                $('*[data-nav="' + $(el).data('cont') + "\"]").addClass('active');
            }
        })
    })

    /*
        Side menu animations
    */
    var $menuWrapper = $('#side-wrapper'),
        $navNumber   = $('.el-n'),
        initialMenuWidth = $menuWrapper.width();

    // set width to only numbers
    $menuWrapper.width($navNumber.width());

    $menuWrapper.on('mouseenter', function() {
        $menuWrapper.animate({
            width: initialMenuWidth
        });
    })

    $menuWrapper.on('mouseleave', function() {
        $menuWrapper.animate({
            width: $navNumber.width()
        });
    })

    /*
        Smooth Scrolling
    */
    var $root = $('html, body'),
        scrollSpeed = 500;

    $menuWrapper.find('a').click(function() {
        var href = $(this).attr('href');
        $root.animate({
            scrollTop: $(href).offset().top
        }, scrollSpeed, function () {
            window.location.hash = href;
        });
        return false;
    });

})();