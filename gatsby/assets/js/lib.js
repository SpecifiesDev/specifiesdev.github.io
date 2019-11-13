export function setData() {
    let paths = ["./assets/images/profile.jpg", "./assets/images/profile1.jpg"];
    sessionStorage.path = paths[Math.floor(Math.random() * paths.length)];
}



