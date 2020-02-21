/* global XMLHttpRequest */
function AjaxRequest(url, method, data = {}) {
    this.url = url;
    this.method = method.toUpperCase() || 'GET';
    this.data =
        typeof data === 'string'
            ? data
            : Object.keys(data)
                  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
                  .join('&');

    if (!this.url) {
        throw new Error('NO URL specified. AJAX Request impossible.');
    }
    const request = new XMLHttpRequest();
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
    return new Promise((resolve, reject) => {
        request.open(this.method, this.url, true);

        if (this.method === 'POST') {
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                resolve(request.responseText);
            } else {
                reject(new Error('We reached our target URL, but it returned an error'));
            }
        };

        request.onerror = err => {
            reject(err);
        };

        request.send(this.data);
    });
}

export default AjaxRequest;
