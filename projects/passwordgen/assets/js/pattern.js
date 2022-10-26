document.addEventListener("DOMContentLoaded", () => {

    // grab our nav element
    const nav = document.getElementsByClassName("nav")[0];

    console.log(nav);

    // iterate over all nav items
    Array.from(document.getElementsByClassName("nav-item"))
    .forEach((item, index) => {

        // attach an event handler to update active index so
        // we can edit position values in style.css
        item.onmouseover = () => {
            
            nav.dataset.activeIndex = index;
        }

        // clear our index when there is no hover on these items
        item.onmouseout = () => {

            nav.dataset.activeIndex = 99;

        }

    });

});

