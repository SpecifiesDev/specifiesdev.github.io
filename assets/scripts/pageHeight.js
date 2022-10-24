$(document).ready(function(){       

    // use vanilla js for this
    // this will make all anchors to page targets scroll smooth
    document.querySelectorAll('a[href^="#"').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    $(document).scroll(function() {
        scroll_pos = $(this).scrollTop();

        let fluency = $(".fluency");
        let projects = $(".projects");

        if(scroll_pos >= 500) {
            fluency.animate({
                scale: '100%'
            },
            1000);
        }

        if(scroll_pos >= 1600) {

            projects.animate({
                scale: '100%'
            }, 1000);

        }



    });
});