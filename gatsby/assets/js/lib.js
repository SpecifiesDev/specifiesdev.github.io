export function setData() {
    
    let preformat = "https://specifiesdev.github.io/gatsby/assets/images/";

    let paths = [];

    
    loop(".jpg", 4, preformat, paths);

    let path = paths[Math.floor(Math.random() * paths.length)];

    console.log(`setData(); : ${path}`);

    sessionStorage.path = path;
}



// local functions

/**
 * Function to loop in a range and add paths to a predefined array.
 * @param {string} type - The file extension.
 * @param {int} maxRange - The max range of the loop. For example, 5 would add profile.type-profile4.type
 * @param {string} format - A preformatted string of the website path for short handing.
 * @param {Array} array - The array to push the paths too for selection.
 */
function loop(type, maxRange, format, array) {
    for(let i = 0; i < maxRange; i++) {
        if(i == 0) {
            array.push(`${format}profile${type}`);
        } else {
            array.push(`${format}profile${i}${type}`);
        }
    }
}



