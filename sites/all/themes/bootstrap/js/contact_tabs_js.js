/**
 * Created by RiteshSamala on 6/22/16.
 */
//note: please use closures
//make sure jQuery is passed as an argument as $ alone does not work in drupal
//make sure to test document is ready
(function ($) {
    $(document).ready(function(){


        $('#tab-1-0 a').click(function (e) {
            console.log("first tab clicked");
            e.preventDefault();
            $('a[href="' + $(this).attr('href') + '"]').tab('show');
        });

        //active specific tabs and scroll down if source is faqlink
        activetabs();

        function activetabs() {
            if (window.location.href.indexOf("faqlink2team") > -1){
                $('body').animate({
                    scrollTop: $("#block-views-contact-tabs-view-block").offset().top
                }, 1000);
                $('.nav-tabs a[href="#tab-1-1"]').tab('show');
            }
            if(window.location.href.indexOf("faqlink2grant") > -1){
                $('body').animate({
                    scrollTop: $("#block-views-contact-tabs-view-block").offset().top
                }, 1000);
            }

        }

    });
})(jQuery);