// function buildData(sample) {

    //Access the data
    

    

    // url = "../Data/Accidents " + sample + ".geojson"

    // d3.json(url).then((data) => {
        
    //     let accidentCount = 0

        

    //     let road = data.features.properties["Road Surface"];
    //     let light = data.features.properties["Lighting Conditions"];
    //     let weather = data.features.properties["Weather Conditions"];
    //     let result = data.features

    //     for(i = 0; i < result; i++)

    //     let panel = d3.select("#sample")


    //     panel.html("")

        
// };
    // });

    //Create visuals
function visuals(sample) {
// cluster markers - accident location - hover text with accident details
// maybe bar chart for accidents per road type?
// bubble chart by either weather type/road type/time of day/lighting/vehicle type
// number of vehicles in accident vs time of day
//edit geojson to get the day of the week

    url = "../Data/accident_" + sample + ".geojson"
    
    d3.json(url).then((data) => {

        let sampleData = data.features;
        
        let weather = [];
        let light = [];
        let road = [];
        let vehicles = [];
        let victim2017 = [];
        let victim1 = [];
        let victim2 = [];
        let victim3 = [];
        let victim4 = [];
        let victim5 = [];
        for(i =0; i < sampleData.length;i++){
            currentData = sampleData[i]
            if (weather.includes(currentData.properties["Weather Conditions"])){

            }
            else {
                weather.push(currentData.properties["Weather Conditions"])
            };
            if (light.includes(currentData.properties["Lighting Conditions"])){

            }
            else {
                light.push(currentData.properties["Lighting Conditions"])
            };
            if (road.includes(currentData.properties['Road Surface'])) {

            }
            else {
                road.push(currentData.properties['Road Surface'])
            };
            if (vehicles.includes(currentData.properties["Number of Vehicles"])){

            }
            else {
                vehicles.push(currentData.properties["Number of Vehicles"])
            };
            if (sample == 2017){
                victim2017.push(currentData.properties["Casualty Severity"])
            }
            else {
                victim1.push(currentData.properties["Casualty Severity 1"])
                victim2.push(currentData.properties["Casualty Severity 2"])
                victim3.push(currentData.properties["Casualty Severity 3"])
                victim4.push(currentData.properties["Casualty Severity 4"])
                victim5.push(currentData.properties["Casualty Severity 5"])
            };
        };
        
        
        // filtering based on weather data
        weatherCount = [];
        for(i = 0; i < weather.length; i++){
            let weatherFilter = sampleData.filter(datapoints => datapoints.properties["Weather Conditions"] == weather[i])
            weatherCount.push(weatherFilter.length)
        };
        //filtering based on light data
        lightCount = [];
        for(i = 0; i < light.length; i++){
            let lightFilter = sampleData.filter(datapoints => datapoints.properties["Lighting Conditions"] == light[i])
            lightCount.push(lightFilter.length)
        };
        
        //filtering based on road data
        roadCount = [];
        for(i = 0; i < road.length; i++){
            let roadFilter = sampleData.filter(datapoints => datapoints.properties["Road Surface"] == road[i])
            roadCount.push(roadFilter.length)
        };
       
        //filtering based on number of vehicles
        vehicleCount = [];
        for(i = 0; i < vehicles.length; i++){
            let vehicleFilter = sampleData.filter(datapoints => datapoints.properties["Number of Vehicles"] == vehicles[i])
            vehicleCount.push(vehicleFilter.length)
        };
        

        let severity = ["Slight","Serious","Fatal"];
        let fatals = 0;
        let seriouses = 0;
        let slights = 0;

        if (sample == 2017){
            for(i = 0; i < sampleData.length; i++){
                if (victim2017[i] == "Fatal"){
                    fatals++;
                }
                else if(victim2017[i] == "Serious"){
                    seriouses++;
                }
                else if(victim2017[i] == "Slight"){
                    slights++;
                };
            };
        }
        else{
            for(i =0; i < sampleData.length; i++){
                let temp = [victim1[i],victim2[i],victim3[i],victim4[i],victim5[i]]
                if(temp.includes("Fatal")){
                    fatals++;
                }
                else if(temp.includes("Serious")){
                    seriouses++;
                }
                else if(temp.includes("Slight")){
                    slights++;
                };
            };
        };
        let severityCount = [slights, seriouses, fatals];
        

        let fatalWeather = [];
        let fatalWeatherTypes = [];
        let fatalWeatherCounts = [];
        let severeWeather = [];
        let severeWeatherTypes = [];
        let severeWeatherCounts = [];
        let slightWeather = [];
        let slightWeatherTypes = [];
        let slightWeatherCounts = [];
        let fatalLighting = [];
        let fatalLightingTypes = [];
        let fatalLightingCounts = [];
        let severeLighting = [];
        let severeLightingTypes = [];
        let severeLightingCounts = [];
        let slightLighting = [];
        let slightLightingTypes = [];
        let slightLightingCounts = [];
        let fatalRoad = [];
        let fatalRoadTypes = [];
        let fatalRoadCounts = [];
        let severeRoad = [];
        let severeRoadTypes = [];
        let severeRoadCounts = [];
        let slightRoad = [];
        let slightRoadTypes = [];
        let slightRoadCounts = [];
        let fatalCars = [];
        let fatalCarsTypes = [];
        let fatalCarsCounts = [];
        let severeCars = [];
        let severeCarsTypes = [];
        let severeCarsCounts = [];
        let slightCars = [];
        let slightCarsTypes = [];
        let slightCarsCounts = [];
        //finding data based off all fatal crashes
        //filter for only fatal crashes
        function checker1(data){
            for(i =1; i < sampleData.length;i++){

                let temp = [];
                temp.push(data.properties["Casualty Severity 1"]);
                temp.push(data.properties["Casualty Severity 2"]);
                temp.push(data.properties["Casualty Severity 3"]);
                temp.push(data.properties["Casualty Severity 4"]);
                temp.push(data.properties["Casualty Severity 5"]);
                if(temp.includes("Fatal")) {
                    return "Fatal"
                }
                else if(temp.includes("Serious")){
                    return "Serious"
                }
                else if(temp.includes("Slight")){
                    return "Slight"
                }
                else{
                    return "False"
                };
            };
                

        };
        if(sample == 2017){
            fatalFilter = sampleData.filter(datapoints => datapoints.properties["Casualty Severity"] == "Fatal")
            severeFilter = sampleData.filter(datapoints => datapoints.properties["Casualty Severity"] == "Serious")
            slightFilter = sampleData.filter(datapoints => datapoints.properties["Casualty Severity"] == "Slight")
            
            for(i = 0; i < fatalFilter.length; i++){
                if(fatalWeatherTypes.includes(fatalFilter[i].properties["Weather Conditions"])){
                    fatalWeather.push(fatalFilter[i].properties["Weather Conditions"]);
                }
                else{
                    fatalWeatherTypes.push(fatalFilter[i].properties["Weather Conditions"]);
                    fatalWeather.push(fatalFilter[i].properties["Weather Conditions"]);
                };
                if(fatalLightingTypes.includes(fatalFilter[i].properties["Lighting Conditions"])){
                    fatalLighting.push(fatalFilter[i].properties["Lighting Conditions"]);
                }
                else{
                    fatalLightingTypes.push(fatalFilter[i].properties["Lighting Conditions"]);
                    fatalLighting.push(fatalFilter[i].properties["Lighting Conditions"]);
                };
                if(fatalRoadTypes.includes(fatalFilter[i].properties["Road Surface"])){
                    fatalRoad.push(fatalFilter[i].properties["Road Surface"]);
                }
                else{
                    fatalRoadTypes.push(fatalFilter[i].properties["Road Surface"]);
                    fatalRoad.push(fatalFilter[i].properties["Road Surface"]);
                };
                if(fatalCarsTypes.includes()){
                fatalCars.push(fatalFilter[i].properties["Number of Vehicles"])
                }
                else{
                    fatalCarsTypes.push(fatalFilter[i].properties["Number of Vehicles"])
                    fatalCars.push(fatalFilter[i].properties["Number of Vehicles"])
                };
            };
            for(i = 0; i < fatalWeatherTypes.length;i++){
                let fatalFilterFilter = fatalFilter.filter(datapoints => datapoints.properties["Weather Conditions"] == fatalWeatherTypes[i]);
                fatalWeatherCounts.push(fatalFilterFilter.length);
            };
            for(i = 0; i < fatalLightingTypes.length;i++){
                let fatalFilterFilter = fatalFilter.filter(datapoints => datapoints.properties["Lighting Conditions"] == fatalLightingTypes[i]);
                fatalLightingCounts.push(fatalFilterFilter.length);
            };
            for(i = 0; i < fatalRoadTypes.length;i++){
                let fatalFilterFilter = fatalFilter.filter(datapoints => datapoints.properties["Road Surface"] == fatalRoadTypes[i]);
                fatalRoadCounts.push(fatalFilterFilter.length);
            };
            for(i = 0; i < fatalCarsTypes.length;i++){
                let fatalFilterFilter = fatalFilter.filter(datapoints => datapoints.properties["Number of Vehicles"] == fatalCarsTypes[i]);
                fatalCarsCounts.push(fatalFilterFilter.length);
            };
            
            for(i = 0; i < severeFilter.length; i++){
                if(severeWeatherTypes.includes(severeFilter[i].properties["Weather Conditions"])){
                    severeWeather.push(severeFilter[i].properties["Weather Conditions"]);
                }
                else{
                    severeWeatherTypes.push(severeFilter[i].properties["Weather Conditions"]);
                    severeWeather.push(severeFilter[i].properties["Weather Conditions"]);
                };
                if(severeLightingTypes.includes(severeFilter[i].properties["Lighting Conditions"])){
                    severeLighting.push(severeFilter[i].properties["Lighting Conditions"]);
                }
                else{
                    severeLightingTypes.push(severeFilter[i].properties["Lighting Conditions"]);
                    severeLighting.push(severeFilter[i].properties["Lighting Conditions"]);
                };
                if(severeRoadTypes.includes(severeFilter[i].properties["Road Surface"])){
                    severeRoad.push(severeFilter[i].properties["Road Surface"]);
                }
                else{
                    severeRoadTypes.push(severeFilter[i].properties["Road Surface"]);
                    severeRoad.push(severeFilter[i].properties["Road Surface"]);
                };
                if(severeCarsTypes.includes()){
                    severeCars.push(severeFilter[i].properties["Number of Vehicles"])
                }
                else{
                    severeCarsTypes.push(severeFilter[i].properties["Number of Vehicles"])
                    severeCars.push(severeFilter[i].properties["Number of Vehicles"])
                };
            };
            for(i = 0; i < severeWeatherTypes.length;i++){
                let severeFilterFilter = severeFilter.filter(datapoints => datapoints.properties["Weather Conditions"] == severeWeatherTypes[i]);
                severeWeatherCounts.push(severeFilterFilter.length);
            };
            for(i = 0; i < severeLightingTypes.length;i++){
                let severeFilterFilter = severeFilter.filter(datapoints => datapoints.properties["Lighting Conditions"] == severeLightingTypes[i]);
                severeLightingCounts.push(severeFilterFilter.length);
            };
            for(i = 0; i < severeRoadTypes.length;i++){
                let severeFilterFilter = severeFilter.filter(datapoints => datapoints.properties["Road Surface"] == severeRoadTypes[i]);
                severeRoadCounts.push(severeFilterFilter.length);
            };
            for(i = 0; i < severeCarsTypes.length;i++){
                let severeFilterFilter = severeFilter.filter(datapoints => datapoints.properties["Number of Vehicles"] == severeCarsTypes[i]);
                severeCarsCounts.push(severeFilterFilter.length);
            };
            for(i = 0; i < slightFilter.length; i++){
                if(slightWeatherTypes.includes(slightFilter[i].properties["Weather Conditions"])){
                    slightWeather.push(slightFilter[i].properties["Weather Conditions"]);
                }
                else{
                    slightWeatherTypes.push(slightFilter[i].properties["Weather Conditions"]);
                    slightWeather.push(slightFilter[i].properties["Weather Conditions"]);
                };
                if(slightLightingTypes.includes(slightFilter[i].properties["Lighting Conditions"])){
                    slightLighting.push(slightFilter[i].properties["Lighting Conditions"]);
                }
                else{
                    slightLightingTypes.push(slightFilter[i].properties["Lighting Conditions"]);
                    slightLighting.push(slightFilter[i].properties["Lighting Conditions"]);
                };
                if(slightRoadTypes.includes(slightFilter[i].properties["Road Surface"])){
                    slightRoad.push(slightFilter[i].properties["Road Surface"]);
                }
                else{
                    slightRoadTypes.push(slightFilter[i].properties["Road Surface"]);
                    slightRoad.push(slightFilter[i].properties["Road Surface"]);
                };
                if(slightCarsTypes.includes()){
                    slightCars.push(slightFilter[i].properties["Number of Vehicles"])
                }
                else{
                    slightCarsTypes.push(slightFilter[i].properties["Number of Vehicles"])
                    slightCars.push(slightFilter[i].properties["Number of Vehicles"])
                };
            };
            for(i = 0; i < slightWeatherTypes.length;i++){
                let slightFilterFilter = slightFilter.filter(datapoints => datapoints.properties["Weather Conditions"] == slightWeatherTypes[i]);
                slightWeatherCounts.push(slightFilterFilter.length);
            };
            for(i = 0; i < slightLightingTypes.length;i++){
                let slightFilterFilter = slightFilter.filter(datapoints => datapoints.properties["Lighting Conditions"] == slightLightingTypes[i]);
                slightLightingCounts.push(slightFilterFilter.length);
            };
            for(i = 0; i < slightRoadTypes.length;i++){
                let slightFilterFilter = slightFilter.filter(datapoints => datapoints.properties["Road Surface"] == slightRoadTypes[i]);
                slightRoadCounts.push(slightFilterFilter.length);
            };
            for(i = 0; i < fatalCarsTypes.length;i++){
                let slightFilterFilter = slightFilter.filter(datapoints => datapoints.properties["Number of Vehicles"] == slightCarsTypes[i]);
                slightCarsCounts.push(slightFilterFilter.length);
            };
        }
        else{
            fatalFilter = sampleData.filter(datapoints => checker1(datapoints) == "Fatal");
            severeFilter = sampleData.filter(datapoints => checker1(datapoints) == "Serious");
            slightFilter = sampleData.filter(datapoints => checker1(datapoints) == "Slight");
            
            for(i = 0; i < fatalFilter.length; i++){
                if(fatalWeatherTypes.includes(fatalFilter[i].properties["Weather Conditions"])){
                    fatalWeather.push(fatalFilter[i].properties["Weather Conditions"]);
                }
                else{
                    fatalWeatherTypes.push(fatalFilter[i].properties["Weather Conditions"]);
                    fatalWeather.push(fatalFilter[i].properties["Weather Conditions"]);
                };
                if(fatalLightingTypes.includes(fatalFilter[i].properties["Lighting Conditions"])){
                    fatalLighting.push(fatalFilter[i].properties["Lighting Conditions"]);
                }
                else{
                    fatalLightingTypes.push(fatalFilter[i].properties["Lighting Conditions"]);
                    fatalLighting.push(fatalFilter[i].properties["Lighting Conditions"]);
                };
                if(fatalRoadTypes.includes(fatalFilter[i].properties["Road Surface"])){
                    fatalRoad.push(fatalFilter[i].properties["Road Surface"]);
                }
                else{
                    fatalRoadTypes.push(fatalFilter[i].properties["Road Surface"]);
                    fatalRoad.push(fatalFilter[i].properties["Road Surface"]);
                };
                if(fatalCarsTypes.includes()){
                fatalCars.push(fatalFilter[i].properties["Number of Vehicles"])
                }
                else{
                    fatalCarsTypes.push(fatalFilter[i].properties["Number of Vehicles"])
                    fatalCars.push(fatalFilter[i].properties["Number of Vehicles"])
                };
            };
            for(i = 0; i < fatalWeatherTypes.length;i++){
                let fatalFilterFilter = fatalFilter.filter(datapoints => datapoints.properties["Weather Conditions"] == fatalWeatherTypes[i]);
                fatalWeatherCounts.push(fatalFilterFilter.length);
            };
            for(i = 0; i < fatalLightingTypes.length;i++){
                let fatalFilterFilter = fatalFilter.filter(datapoints => datapoints.properties["Lighting Conditions"] == fatalLightingTypes[i]);
                fatalLightingCounts.push(fatalFilterFilter.length);
            };
            for(i = 0; i < fatalRoadTypes.length;i++){
                let fatalFilterFilter = fatalFilter.filter(datapoints => datapoints.properties["Road Surface"] == fatalRoadTypes[i]);
                fatalRoadCounts.push(fatalFilterFilter.length);
            };
            for(i = 0; i < fatalCarsTypes.length;i++){
                let fatalFilterFilter = fatalFilter.filter(datapoints => datapoints.properties["Number of Vehicles"] == fatalCarsTypes[i]);
                fatalCarsCounts.push(fatalFilterFilter.length);
            };
            console.log(severeFilter.length)
            for(i = 0; i < severeFilter.length; i++){
                if(severeWeatherTypes.includes(severeFilter[i].properties["Weather Conditions"])){
                    severeWeather.push(severeFilter[i].properties["Weather Conditions"]);
                }
                else{
                    severeWeatherTypes.push(severeFilter[i].properties["Weather Conditions"]);
                    severeWeather.push(severeFilter[i].properties["Weather Conditions"]);
                };
                if(severeLightingTypes.includes(severeFilter[i].properties["Lighting Conditions"])){
                    severeLighting.push(severeFilter[i].properties["Lighting Conditions"]);
                }
                else{
                    severeLightingTypes.push(severeFilter[i].properties["Lighting Conditions"]);
                    severeLighting.push(severeFilter[i].properties["Lighting Conditions"]);
                };
                if(severeRoadTypes.includes(severeFilter[i].properties["Road Surface"])){
                    severeRoad.push(severeFilter[i].properties["Road Surface"]);
                }
                else{
                    severeRoadTypes.push(severeFilter[i].properties["Road Surface"]);
                    severeRoad.push(severeFilter[i].properties["Road Surface"]);
                };
                if(severeCarsTypes.includes()){
                    severeCars.push(severeFilter[i].properties["Number of Vehicles"])
                }
                else{
                    severeCarsTypes.push(severeFilter[i].properties["Number of Vehicles"])
                    severeCars.push(severeFilter[i].properties["Number of Vehicles"])
                };
            };
            for(i = 0; i < severeWeatherTypes.length;i++){
                let severeFilterFilter = severeFilter.filter(datapoints => datapoints.properties["Weather Conditions"] == severeWeatherTypes[i]);
                severeWeatherCounts.push(severeFilterFilter.length);
            };
            for(i = 0; i < severeLightingTypes.length;i++){
                let severeFilterFilter = severeFilter.filter(datapoints => datapoints.properties["Lighting Conditions"] == severeLightingTypes[i]);
                severeLightingCounts.push(severeFilterFilter.length);
            };
            for(i = 0; i < severeRoadTypes.length;i++){
                let severeFilterFilter = severeFilter.filter(datapoints => datapoints.properties["Road Surface"] == severeRoadTypes[i]);
                severeRoadCounts.push(severeFilterFilter.length);
            };
            for(i = 0; i < severeCarsTypes.length;i++){
                let severeFilterFilter = severeFilter.filter(datapoints => datapoints.properties["Number of Vehicles"] == severeCarsTypes[i]);
                severeCarsCounts.push(severeFilterFilter.length);
            };
            for(i = 0; i < slightFilter.length; i++){
                if(slightWeatherTypes.includes(slightFilter[i].properties["Weather Conditions"])){
                    slightWeather.push(slightFilter[i].properties["Weather Conditions"]);
                }
                else{
                    slightWeatherTypes.push(slightFilter[i].properties["Weather Conditions"]);
                    slightWeather.push(slightFilter[i].properties["Weather Conditions"]);
                };
                if(slightLightingTypes.includes(slightFilter[i].properties["Lighting Conditions"])){
                    slightLighting.push(slightFilter[i].properties["Lighting Conditions"]);
                }
                else{
                    slightLightingTypes.push(slightFilter[i].properties["Lighting Conditions"]);
                    slightLighting.push(slightFilter[i].properties["Lighting Conditions"]);
                };
                if(slightRoadTypes.includes(slightFilter[i].properties["Road Surface"])){
                    slightRoad.push(slightFilter[i].properties["Road Surface"]);
                }
                else{
                    slightRoadTypes.push(slightFilter[i].properties["Road Surface"]);
                    slightRoad.push(slightFilter[i].properties["Road Surface"]);
                };
                if(slightCarsTypes.includes()){
                    slightCars.push(slightFilter[i].properties["Number of Vehicles"])
                }
                else{
                    slightCarsTypes.push(slightFilter[i].properties["Number of Vehicles"])
                    slightCars.push(slightFilter[i].properties["Number of Vehicles"])
                };
            };
            for(i = 0; i < slightWeatherTypes.length;i++){
                let slightFilterFilter = slightFilter.filter(datapoints => datapoints.properties["Weather Conditions"] == slightWeatherTypes[i]);
                slightWeatherCounts.push(slightFilterFilter.length);
            };
            for(i = 0; i < slightLightingTypes.length;i++){
                let slightFilterFilter = slightFilter.filter(datapoints => datapoints.properties["Lighting Conditions"] == slightLightingTypes[i]);
                slightLightingCounts.push(slightFilterFilter.length);
            };
            for(i = 0; i < slightRoadTypes.length;i++){
                let slightFilterFilter = slightFilter.filter(datapoints => datapoints.properties["Road Surface"] == slightRoadTypes[i]);
                slightRoadCounts.push(slightFilterFilter.length);
            };
            for(i = 0; i < fatalCarsTypes.length;i++){
                let slightFilterFilter = slightFilter.filter(datapoints => datapoints.properties["Number of Vehicles"] == slightCarsTypes[i]);
                slightCarsCounts.push(slightFilterFilter.length);
            };
        };
        
        //creating bar graph for weather
        let weatherBar = [{
            y: weatherCount,
            x: weather,
            type: 'bar',
            orientatoin: 'h',
            text: weather
        }];
        layout = {
            height: 500,
            width: 800,
            title: {
                text: "Weather Conditions for Accidents",
                x: 0.05
            },
            xaxis: {
                title: {
                    text: "Weather Conditions"
                }
            },
            yaxis: {
                title: {
                    text: "Number of Accidents"
                }
            }
        };
        Plotly.newPlot('bar1',weatherBar,layout)
        //creating bar graph for lighting
        let lightBar = [{
            y: lightCount,
            x: light,
            type: 'bar',
            orientatoin: 'h',
            text: light
        }];
        layout = {
            height: 500,
            width: 800,
            title: {
                text: "Lighting Conditions for Accidents",
                x: 0.05
            },
            xaxis: {
                title: {
                    text: "Lighting Conditions"
                }
            },
            yaxis: {
                title: {
                    text: "Number of Accidents"
                }
            }
        };
        Plotly.newPlot('bar2',lightBar,layout)
        //creating bar graph for road surface
        let roadBar = [{
            y: roadCount,
            x: road,
            type: 'bar',
            orientatoin: 'h',
            text: road
        }];
        layout = {
            height: 500,
            width: 800,
            title: {
                text: "Road Surface Conditions for Accidents",
                x: 0.05
            },
            xaxis: {
                title:{
                    text: "Road Surface Conditions"
                }
            },
            yaxis: {
                title: {
                    text: "Number of Accidents"
                }
            }
        };
        Plotly.newPlot('bar3',roadBar,layout)
        //creating bar graph for number of vehicles
        let vehicleBar = [{
            y: vehicleCount,
            x: ['One', 'Two', 'Three', 'Four', 'Five'],
            type: 'bar',
            orientatoin: 'h',
            text: vehicles
        }];
        layout = {
            height: 500,
            width: 800,
            title: {
                text: "Number of Vehicles in Each Accident",
                x: 0.05
            },
            xaxis: {
                title:{
                    text: "Number of Vehicles"
                }
            },
            yaxis: {
                title: {
                    text: "Number of Accidents"
                }
            }
        };
        Plotly.newPlot('bar4',vehicleBar,layout)
        //creating pie chart for severity
        let severityPie = [{
            values: severityCount,
            labels: severity,
            type: 'pie',
            text: severity
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text: "Severity Proportions"
            }
        };
        Plotly.newPlot('severity',severityPie,layout)
        //creating all the pie charts for the various severity and data types
        //fatal weather
        let fatalWeatherPie = [{
            values: fatalWeatherCounts,
            labels: fatalWeatherTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Weather During Fatal Accidents"
            }
        };
        Plotly.newPlot('fatalWeatherPie',fatalWeatherPie, layout);
        //serious weather
        let severeWeatherPie = [{
            values: severeWeatherCounts,
            labels: severeWeatherTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Weather During Serious Accidents"
            }
        };
        Plotly.newPlot('severeWeatherPie',severeWeatherPie, layout)
        //slight weather
        let slightWeatherPie = [{
            values: slightWeatherCounts,
            labels: slightWeatherTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Weather During Slight Accidents"
            }
        };
        Plotly.newPlot('slightWeatherPie',slightWeatherPie, layout)
        //fatal lighting
        let fatalLightingPie = [{
            values: fatalLightingCounts,
            labels: fatalLightingTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Lighting During Fatal Accidents"
            }
        };
        Plotly.newPlot('fatalLightingPie',fatalLightingPie, layout);
        //serious lighting
        let severeLightingPie = [{
            values: severeLightingCounts,
            labels: severeLightingTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Lighting During Serious Accidents"
            }
        };
        Plotly.newPlot('severeLightingPie',severeLightingPie, layout);
        //slight lighting
        let slightLightingPie = [{
            values: slightLightingCounts,
            labels: slightLightingTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Lighting During Slight Accidents"
            }
        };
        Plotly.newPlot('slightLightingPie',slightLightingPie, layout);
        //fatal road
        let fatalRoadPie = [{
            values: fatalRoadCounts,
            labels: fatalRoadTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Road Conditions During Fatal Accidents"
            }
        };
        Plotly.newPlot('fatalRoadPie',fatalRoadPie, layout);
        //serious road
        let severeRoadPie = [{
            values: severeRoadCounts,
            labels: severeRoadTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Road Conditions During Serious Accidents"
            }
        };
        Plotly.newPlot('severeRoadPie',severeRoadPie, layout);
        //slight road
        let slightRoadPie = [{
            values: slightRoadCounts,
            labels: slightRoadTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Road Conditions During Slight Accidents"
            }
        };
        Plotly.newPlot('slightRoadPie',slightRoadPie, layout);
        //fatal cars
        let fatalCarsPie = [{
            values: fatalCarsCounts,
            labels: fatalCarsTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Number of Vehicles During Fatal Accidents"
            }
        };
        Plotly.newPlot('fatalCarsPie',fatalCarsPie, layout);
        //serious cars
        let severeCarsPie = [{
            values: severeCarsCounts,
            labels: severeCarsTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Number of Vehicles During Serious Accidents"
            }
        };
        Plotly.newPlot('severeCarsPie',severeCarsPie, layout);
        //slight cars
        let slightCarsPie = [{
            values: slightCarsCounts,
            labels: slightCarsTypes,
            type: 'pie'
        }];
        layout = {
            height: 500,
            width: 500,
            title: {
                text:"Number of Vehicles During Slight Accidents"
            }
        };
        Plotly.newPlot('slightCarsPie',slightCarsPie, layout);
    });
};

function init() {
    let selector = d3.select("#selDataset");

    

    visuals(2018);
    // buildData(2018);
    
    //drop down menu for data from different years
    // layers for the map for various years and possibly severity of injury
};

function changeData(newSample) {
    visuals(newSample);
    // buildData(newSample);

    };

init();