export function setData() {
    return new Promise((resolve, reject) => {
            try {
            let preformat = "https://specifiesdev.github.io/assets/images/";

            let paths = [`${preformat}profile.jpg`, `${preformat}profile1.jpg`];
            sessionStorage.path = paths[Math.floor(Math.random() * paths.length)];
            resolve('success');
            } catch(err) {
                reject(err);
            }
    });

}




