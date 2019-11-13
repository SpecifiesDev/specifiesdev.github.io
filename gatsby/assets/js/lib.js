export function setData() {

    let paths = ["./assets/images/profile.jpg", "./assets/images/profile1.jpg"];

    let item = paths[Math.floor(Math.random() * paths.length)];

    sessionStorage.path = item;

    console.log(sessionStorage.path);

}
