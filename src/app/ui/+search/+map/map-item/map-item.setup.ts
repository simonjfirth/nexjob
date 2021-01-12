import { tileLayer, latLng, IconOptions } from 'leaflet';


export let mapOptions = {
    layers: [
        tileLayer('https://{s}-tiles.locationiq.com/v2/obk/r/{z}/{x}/{y}.png?key=pk.93569e718f31d7b3f42f8ad40931524e',
            {
                maxZoom: 15,
                minZoom: 3,
                attribution: '...'
            })
    ],
    zoom: 6,
    zoomControl: false,
    center: latLng(53.96144, -2.01676)
};

export let iconOptions: IconOptions = {
    className: 'map-icon--custom',
    iconSize: [30, 30],
    html: '<div></div>'
};

export let iconOptionsUser: IconOptions = {
    className: 'map-icon--user',
    iconSize: [30, 30],
    html: '<div></div>'
};
