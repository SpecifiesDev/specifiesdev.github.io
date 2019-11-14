export function setData() {
    
    let preformat = "https://specifiesdev.github.io/gatsby/assets/images/";

    let paths = [`${preformat}profile.jpg`, `${preformat}profile1.jpg`];

    let path = paths[Math.floor(Math.random() * paths.length)];

    console.log(`setData(); : ${path}`);

    sessionStorage.path = path;
}



