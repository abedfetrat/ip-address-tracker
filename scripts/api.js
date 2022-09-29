const BASE_API_ENDPOINT = 'https://geo.ipify.org/api/v2/';
const API_KEY = 'at_G4fVL15JtPmEjWTfwERAj3MYFfcWS';

const METHOD_IP = 'ip';
const METHOD_DOMAIN = 'domain';

function trimUrl(url) {
    url = url.replace('https://', '');
    url = url.replace('http://', '');
    url = url.split('/')[0];
    return url;
}

async function fetchIPInfo(query) {
    let urlToFetch = BASE_API_ENDPOINT + 'country,city' + '?apiKey=' + API_KEY;
    const method = query?.method;
    if (method === METHOD_IP) {
        const searchParams = '&ipAddress=' + query.value;
        urlToFetch = urlToFetch + searchParams;
    } else if (method === METHOD_DOMAIN) {
        let domain = trimUrl(query.value);
        const searchParams = '&domain=' + domain;
        urlToFetch = urlToFetch + searchParams;
    }

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else if (response.status == 400) {
            throw new Error('Coult not find IP address information. Please check that the IP address or domain is correct.');
        } else {
            throw new Error('Something wen\'t wrong. Could not find IP address information.');
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

export { METHOD_IP, METHOD_DOMAIN, fetchIPInfo };