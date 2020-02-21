$(() => {
    $(document).ready(() => {
        
        $(".header-canvas").show();


        setTimeout(() => {
            $(".secondary-canvas").show();
            setTimeout(() => {

                $(".animate1").show();

                setTimeout(() => {
                    
                    $(".heart-left").show();
                    $(".heart-right").show();

                    setTimeout(() => {
                        $(".buttons").show();
                    }, 2000);

                }, 1000);


            }, 2000);
        }, 2500);

    });
});

