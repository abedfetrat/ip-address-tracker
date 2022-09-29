let map;
let marker;

function init() {
    map = L.map('map', { zoomControl: false }).setView([0, 0], 13);
    map.panBy([0, -100], { animate: false });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    const icon = L.icon({
        iconUrl: 'images/icon-location.svg',
        iconSize: [46, 56],
        iconAnchor: [23, 56]
    });

    marker = L.marker([0, 0], { icon: icon }).addTo(map);
}

function setLocation(location) {
    const newLatLng = new L.LatLng(location.lat, location.lng);
    map.setView(newLatLng, 16);
    map.panBy([0, -100], { animate: false });
    marker.setLatLng(newLatLng);
}

init();

export { setLocation };