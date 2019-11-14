export function setData() {
    
    let preformat = "https://specifiesdev.github.io/gatsby/assets/images/";

    let paths = [];

    // Let's just loop through and add the number to make life a little easier
    for(let i = 0; i < 4; i++) {
        if(i == 0) {
            paths.push(`${preformat}profile.jpg`);
        } else {
            paths.push(`${preformat}profile${x}.jpg`);
        }
        console.log("Push");
    }

    let path = paths[Math.floor(Math.random() * paths.length)];

    console.log(`setData(); : ${path}`);

    sessionStorage.path = path;
}



