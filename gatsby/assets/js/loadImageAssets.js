let paths = ["./assets/images/profile.jpg", "./assets/images/profile1.jpg"];

export function setData() {
    let item = paths[Math.floor(Math.random() * paths.length)];

    sessionStorage.path = item;

    console.log(sessionStorage.path);

}
setData();