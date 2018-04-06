export default class {

    constructor () {

    }

    getObjectFromFile (filename) {
        return System.import(`@/${filename}`);
    }

    getObjectFromUrl (url) {
        return new Promise ((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                if (xhr.status !== 200) reject();
                resolve(xhr.response);
            };
            xhr.send();
        });
    }
};