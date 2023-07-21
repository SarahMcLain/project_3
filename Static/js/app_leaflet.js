
//creating icon parameters
let iconOptions = {
    iconSize: [20, 24],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  };
//create red icon w/ local url
let redIcon = L.icon({
    ...iconOptions, 
    iconUrl: "../png/icons8-map-marker-48_red.png"
});
console.log('Red Icon:', redIcon.options.iconUrl, redIcon.options.iconSize);
//create blue icon w/ local url
let blueIcon = L.icon({
    ...iconOptions, 
    iconUrl: "../png/icons8-map-marker-48_blue.png"
});
console.log('Blue Icon:', blueIcon.options.iconUrl, blueIcon.options.iconSize);
//create green icon w/ local url
let greenIcon = L.icon({
    ...iconOptions, 
    iconUrl: "../png/icons8-map-marker-48_green.png"
});
//create yellow icon w/ local url
let yellowIcon = L.icon({
    ...iconOptions, 
    iconUrl: "../png/icons8-map-marker-48_yellow.png"
});
//create map object
function createMap() {
   
    //adding tile layer
    let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    //creating empty layer groups to hold the data
    let accidents2017 = L.layerGroup({icon: redIcon});
    let accidents2018 = L.layerGroup({icon: yellowIcon});
    let accidents2019 = L.layerGroup({icon: greenIcon});
    let accidents2020 = L.layerGroup({icon: blueIcon})

    //naming the base map
    let baseMaps = {
        "Street Map": streetMap
    };

    //creating the map object
    let myMap = L.map("map-container", {
        center: [53.73, -1.87],
        zoom: 11,
        layers: [streetMap, accidents2017, accidents2018, accidents2019, accidents2020]
    });

    //add to map
    L.control.layers(baseMaps).addTo(myMap);
    console.log(yellowIcon);
    return myMap;   
}

//create the markers for accident location and add to layer group
function createMarkers(response, layerGroup, icon) {
    //empty array to hold accident location data
    let markers = [];
    //loop through features in data for coordinates
    for (let i = 0; i < response.features.length; i++) {
        let feature = response.features[i];
        let accident = feature.geometry;
        //create a marker where the accident happened
        let marker = L.marker([accident.coordinates[1],
             accident.coordinates[0]], {icon: icon}).bindPopup("Location: " + accident.coordinates
             + "<br> Accident Date: " + feature.properties["Accident Date"]
             + "<br> Time (24hr): " + feature.properties["Time (24hr)"]
             + "<br> Vehicles Involved: " + feature.properties["Number of Vehicles"] 
             + "<br> Road Surface: " + feature.properties["Road Surface"]
             + "<br> Lighting Conditions: " + feature.properties["Lighting Conditions"]
             + "<br> Weather Conditions: "+ feature.properties["Weather Conditions"]);
        //add to array
        markers.push(marker);
    }
    // add each marker to layer group
    markers.forEach(function(marker) {
        layerGroup.addLayer(marker);
    
    

    });   
}

// local location of geoJSON files
let jsonFiles = [
    "Data/geo_json/accidents_2017.geojson",
    "Data/geo_json/accidents_2018.geojson",
    "Data/geo_json/accidents_2019.geojson",
    "Data/geo_json/accidents_2020.geojson"
];
// github links to raw data
// let jsonFiles = [
//    "https://raw.githubusercontent.com/SarahMcLain/project-3/main/Static/Data/Accident_2017.geojson",
//     "https://raw.githubusercontent.com/SarahMcLain/project-3/main/Static/Data/Accident_2018.geojson",
//      "https://raw.githubusercontent.com/SarahMcLain/project-3/main/Static/Data/Accident_2019.geojson",
//      "https://github.com/SarahMcLain/project-3/blob/main/Static/Data/Accident_2020.geojson"
//]

let map = createMap();
let layerGroups = [];


//load the json files with promise.all 
Promise.all(jsonFiles.map(file => d3.json(file))).then(function(responses) {
    let baseMaps = {
        "Street Map": map
    };

    let overlayMaps = {};
    //process and create a marker for each response
    responses.forEach(function(response, index) {
        let year = 2017 + index;
        let layerGroup = L.layerGroup();
        let icon;
            if(index===0) {
                icon = redIcon;
            } else if (index === 1) {
                icon = yellowIcon
            } else if (index === 2) {
                icon = greenIcon
            } else if (index === 3) {
                icon = blueIcon
            }
        createMarkers(response, layerGroup, icon);
        layerGroups.push(layerGroup);
        overlayMaps["accidents" + year] = layerGroup;
    });
    //change the displayed data by year
    function changeYear(year) {
        layerGroups.forEach(function(layerGroup, index) {
            if (index === year - 2017) {
                map.addLayer(layerGroup);
            } else {
                map.removeLayer(layerGroup);
            }
        });
    }
    changeYear(2017)
    //add the control to allow users to turn layers on and off
    L.control.layers(baseMaps, overlayMaps).addTo(map);
});



