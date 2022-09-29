import { isIPAddress, isDomain } from './validators.js';
import { METHOD_IP, METHOD_DOMAIN, fetchIPInfo } from './api.js';
import { setLocation } from './map.js';

const searchForm = document.querySelector('form[name="search"]');
const searchInput = searchForm.firstElementChild;
const searchButton = searchForm.lastElementChild;

searchForm.addEventListener('submit', e => {
    e.preventDefault();

    let searchQuery = searchInput.value;
    searchQuery = searchQuery.trimStart();
    searchQuery = searchQuery.trimEnd();

    if (isIPAddress(searchQuery)) {
        retriveIPInfo({ method: METHOD_IP, value: searchQuery });
        searchInput.setCustomValidity('');
    } else if (isDomain(searchQuery)) {
        retriveIPInfo({ method: METHOD_DOMAIN, value: searchQuery });
        searchInput.setCustomValidity('');
    } else {
        searchInput.setCustomValidity('Incorrect IP address or Domain provided');
        searchInput.reportValidity();
    }
});

searchForm.addEventListener('input', _ => {
    searchInput.setCustomValidity('');
})

function retriveIPInfo(query) {
    setLoading(true);
    fetchIPInfo(query).then(ipInfo => {
        setLoading(false)
        populateUI(ipInfo);
        setLocation({
            lat: ipInfo.location.lat,
            lng: ipInfo.location.lng
        });
    }).catch(error => {
        setLoading(false)
        displayError(error.message);
    });
}

function populateUI(ipInfo) {
    const ip = ipInfo.ip;
    const location = ipInfo.location;
    const timeZone = location.timezone;
    const isp = ipInfo.isp;

    const locationText = `${location.city}, ${location.region} ${location.postalCode}`;

    document.getElementById('ip-address-text').innerText = ip;
    document.getElementById('location-text').innerText = locationText;
    document.getElementById('timezone-text').innerText = `UTC ${timeZone}`;
    document.getElementById('isp-text').innerText = isp;
}

function displayError(message) {
    alert(message);
}

function setLoading(loading) {
    if (loading) {
        searchButton.classList.add('loading');
    } else {
        searchButton.classList.remove('loading');
    }
}

retriveIPInfo();