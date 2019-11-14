export function setData() {
    
    let preformat = "https://specifiesdev.github.io/assets/images/";

    let paths = [`${preformat}profile.jpg`, `${preformat}profile1.jpg`];
    sessionStorage.path = paths[Math.floor(Math.random() * paths.length)];
}



