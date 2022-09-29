const BASE_API_ENDPOINT = 'https://geo.ipify.org/api/v2/';
const API_KEY = 'at_G4fVL15JtPmEjWTfwERAj3MYFfcWS';

const METHOD_IP = 'ip';
const METHOD_DOMAIN = 'domain';

function removeProtocol(url) {
    url = url.replace('https://', '');
    url = url.replace('http://', '');
    return url;
}

function fetchIPInfoByIP(ip) {
    const searchParams = '&ipAddress=' + ip;
    const urlToFetch = BASE_API_ENDPOINT + 'country,city' + '?apiKey=' + API_KEY + searchParams;
    return new Promise((resolve, reject) => {
        fetch(urlToFetch).then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status == 400) {
                throw new Error('Could not get information for that IP address. Please check that it is correct.');
            } else {
                throw new Error('Something wen\'t wrong. Could not not get IP address information.');
            }
        }).then(jsonResponse => {
            resolve(jsonResponse);
        }).catch(error => {
            reject(error);
        });
    });
}

function fetchIPInfoByDomain(domain) {
    domain = removeProtocol(domain);
    const searchParams = '&domain=' + domain;
    const urlToFetch = BASE_API_ENDPOINT + 'country,city' + '?apiKey=' + API_KEY + searchParams;
    return new Promise((resolve, reject) => {
        fetch(urlToFetch).then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status == 400) {
                throw new Error('Could not get information for that domain. Please check that it is correct.');
            } else {
                throw new Error('Something wen\'t wrong. Could not not retrive IP address information.');
            }
        }).then(jsonResponse => {
            resolve(jsonResponse);
        }).catch(error => {
            reject(error);
        });
    });
}

function fetchIPInfo(query) {
    if (query.method === METHOD_IP) {
        return fetchIPInfoByIP(query.value);
    } else if (query.method === METHOD_DOMAIN) {
        return fetchIPInfoByDomain(query.value);
    } else {
        return;
    }
}

export { METHOD_IP, METHOD_DOMAIN, fetchIPInfo };