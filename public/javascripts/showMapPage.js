

    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/light-v10', 
    center: campground.geometry.coordinates,
    zoom: 10
    });

    map.addControl(new mapboxgl.NavigationControl());
    
    new mapboxgl.Marker()
        .setLngLat(campground.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    `<h6 class="showMap">${campground.title}</h6><p class="showMap">${campground.location}</p>`
                )
            )
        .addTo(map)
