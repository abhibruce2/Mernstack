export function setCookie(name, value, daysToLive) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (daysToLive) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
        cookieString += `; expires=${expirationDate.toUTCString()}`;
    }

    document.cookie = cookieString + '; path=/';
}

export function getCookie(name) {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (decodeURIComponent(cookieName) === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null;
}
