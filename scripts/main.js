import { isIPAddress, isDomain } from './validators.js';

const searchForm = document.querySelector('form[name="search"]');
const searchInput = searchForm.firstElementChild;
searchForm.addEventListener('submit', e => {
    e.preventDefault();

    let searchQuery = searchInput.value;
    searchQuery = searchQuery.trimStart();
    searchQuery = searchQuery.trimEnd();

    if (isIPAddress(searchQuery)) {
        retriveIPInfo({ type: 'ip', value: searchQuery });
        searchInput.setCustomValidity('');
    } else if (isDomain(searchQuery)) {
        retriveIPInfo({ type: 'domain', value: searchQuery });
        searchInput.setCustomValidity('');
    } else {
        searchInput.setCustomValidity('Incorrect IP address or Domain');
        searchInput.reportValidity();
    }
});

function retriveIPInfo(query) {
    console.log(query);
}