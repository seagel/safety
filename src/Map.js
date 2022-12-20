import React, {useEffect, useRef, useState} from 'react';
import {loadModules} from 'esri-loader';

export default function Map() {
    const mapRef = useRef(null);
    const [locationType,setLocationType] = useState("Segment");
    const [county, setCounty] = useState("");
    const [route, setRoute] = useState("");
    const [routeID, setRouteID] = useState("");
    const [milePointStart, setMilePointStart] = useState();
    const [milePointEnd, setmilePointEnd] = useState();
    const [countMeasure, setCountMeasure] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const counterMeasureMap = [
        {value:1,label:"High friction surface treatment (HFST) for horizontal curves"}
        ,{value:2,label:"High friction surface treatment (HFST)"}
        ,{value:3,label:"Raised Pavement Markers (RPM)"}
        ,{value:4,label:"Pavement edge and centerline markings"}
        ,{value:5,label:"Speed management for pedestrian safety improvement"}
        ,{value:6,label:"Post-mounted delineation"}
        ,{value:7,label:"Enhanced signs and markings for curves"}
        ,{value:8,label:"in-lane curve warning pavement markings"}
        ,{value:9,label:"Larger signs"}
        ,{value:10,label:"Signs with enhanced retroreflectivity"}
        ,{value:11,label:"Dynamic advance curve warning signs and sequential curve signs"}
        ,{value:12,label:"chevron signs on horizontal curves"}
        ,{value:13,label:"Install shoulder rumble strips (horizontal curves)"}
        ,{value:14,label:"Install icy curve warning system"}
        ,{value:15,label:"Advance static curve warning signs"}
        ,{value:16,label:"Oversized chevron signs"}
        ,{value:17,label:"Install paved shoulder 2ft"}
        ,{value:18,label:"Install paved shoulder 4ft"}
        ,{value:19,label:"Install paved shoulder 8ft"}
        ,{value:20,label:"Install paved shoulder >8ft"}
        ,{value:21,label:"Widen shoulder"}
        ,{value:22,label:"Road side guardrail"}
        ,{value:23,label:"Road side barrier"}
        ,{value:24,label:"Shoulder rumble strips"}
        ,{value:25,label:"Edgeline rumble strips"}
        ,{value:26,label:"Concrete barrier"}
        ,{value:27,label:"Edgeline marking"}
        ,{value:28,label:"Expand clear zone"}
        ,{value:29,label:"Remove or relocate fixed objects outside of clear zone"}
        ,{value:30,label:"Increase lateral clearance"}
        ,{value:31,label:"Install safety edge treatment"}
        ,{value:32,label:"Curb and gutter (closed section roadway)"}
        ,{value:33,label:"Improve pavement friction (Chip Seal)"}
        ,{value:34,label:"Improve pavement friction (Diamond grinding)"}
        ,{value:35,label:"Improve pavement friction (grooving)"}
        ,{value:36,label:"Improve pavement friction (OGFC-Open Graded Friction Course)"}
        ,{value:37,label:"Improve pavement friction (Slurry seal)"}
        ,{value:38,label:"Improve pavement friction (UTBWC-Ultra thin bonded wearing course)"}
        ,{value:39,label:"Change lane width from X to Y (in feet)"}
        ,{value:40,label:"speed management plan"}
        ,{value:41,label:"Change posted speed limit from X MPH to Y MPH"}
        ,{value:42,label:"Install dynamic speed feedback sign"}
        ,{value:43,label:"Speed hump"}
        ,{value:44,label:"Road diet"}
        ,{value:45,label:"ASE"}
        ,{value:46,label:"Install Advance Downgrade Warning Sign"}
        ,{value:47,label:"Bike lanes"}
        ,{value:48,label:"install roadway lighting"}
        ,{value:49,label:"Median barrier"}
        ,{value:50,label:"Median cable barrier"}
        ,{value:51,label:"Median guardrial"}
        ,{value:52,label:"Centerline rumble strips"}
        ,{value:53,label:"Centerline rumble strips on horizontal curves"}
        ,{value:54,label:"Centerline rumble strips on tangent sections"}
        ,{value:55,label:"Introduce TWLTL (two-way left turn lanes)"}
        ,{value:56,label:"Raised crosswalk"}
        ,{value:57,label:"sidewalk"}];
    const countyMap = [
        {id: '1', name: 'Allegany'},
        {id: '2', name: 'Anne Arundel'},
        {id: '3', name: 'Baltimore City'},
        {id: '4', name: 'Calvert'},
        {id: '5', name: 'Caroline'},
        {id: '6', name: 'Carroll'},
        {id: '7', name: 'Cecil'},
        {id: '8', name: 'Charles'},
        {id: '9', name: 'Dorchester'},
        {id: '10', name: 'Frederick'},
        {id: '11', name: 'Garrett'},
        {id: '12', name: 'Harford'},
        {id: '13', name: 'Howard'},
        {id: '14', name: 'Kent'},
        {id: '15', name: 'Montgomery'},
        {id: '16', name: 'Prince George\'s'},
        {id: '17', name: 'Queen Anne\'s'},
        {id: '18', name: 'Saint Mary\'s'},
        {id: '19', name: 'Somerset'},
        {id: '20', name: 'Talbot'},
        {id: '21', name: 'Washington'},
        {id: '22', name: 'Wicomico'},
        {id: '23', name: 'Worcester'},
        {id: '24', name: 'Baltimore'},
    ];

    const countyMapReverse = {
        "Allegany": 1,
        "Anne Arundel": 2,
        "Baltimore": 3,
        "Calvert": 4,
        "Caroline": 5,
        "Carroll": 6,
        "Cecil": 7,
        "Charles": 8,
        "Dorchester": 9,
        "Frederick": 10,
        "Garrett": 11,
        "Harford": 12,
        "Howard": 13,
        "Kent": 14,
        "Montgomery": 15,
        "Prince George's": 16,
        "Queen Anne's": 17,
        "St. Mary's": 18,
        "Somerset": 19,
        "Talbot": 20,
        "Washington": 21,
        "Wicomico": 22,
        "Worcester": 23,
        "Baltimore City": 24,
        "Unknown": 99
    }

    useEffect(() => {
        let view;
        loadModules(["esri/config",
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/FeatureLayer",
            "esri/Graphic"], {
            css: true
        }).then(([esriConfig, Map, MapView, FeatureLayer, Graphic]) => {
            esriConfig.apiKey = "AAPK01f0669adf534958a616329811ad2bfelCCLGf0vvbNLyN1yo6yZfICfzSuBrXVe_PGcvekcs0iUBOdSMPHV8mLTZo7BS2WT";

            const map = new Map({
                basemap: "topo" //Basemap layer service
            });

            view = new MapView({
                container: mapRef.current,
                map: map,
                center: [-76.6413, 39.0458], //Longitude, latitude
                zoom: 4
            });

            // let startDatePicker = new DatePicker({
            //     container: mapRef.current, // DOM element for widget
            //     // value that will initially display
            // });


            // SQL query array
            // const parcelLayerSQL = ["Choose a SQL where clause...", "UseType = 'Residential'",  "UseType = 'Government'", "UseType = 'Irrigated Farm'", "TaxRateArea = 10853", "TaxRateArea = 10860", "TaxRateArea = 08637", "Roll_LandValue > 1000000", "Roll_LandValue < 1000000"];
            // let whereClause = parcelLayerSQL[0];

            // const countiesSelect = document.createElement("select","")
            // countiesSelect.setAttribute("class", "esri-widget esri-select");
            // countiesSelect.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em");
            // countiesSelect.addEventListener('change',(event) => {
            //   whereClause = event.target.value;
            //   queryCounty(view.extent);
            // })

            // function queryCounty(extent) {
            //   const countyQuery = {
            //     where: whereClause,  // Set by select element
            //     spatialRelationship: "intersects", // Relationship operation to apply
            //     geometry: extent, // Restricted to visible extent of the map
            //     outFields: ["County"], // Attributes to return
            //     returnGeometry: false,
            //     returnDistinctValues: true
            //   };
            // }

            // Add SQL UI
            // const countyLabel = document.createElement("p",);
            // // countyLabel.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em; float: left;");
            // const countyText = document.createTextNode("County:");
            // countyLabel.appendChild(countyText);

            // const countySelect = document.createElement("select", "");
            // locationTypeSelect
            // const locationTypeSelect = document.getElementById('locationTypeSelect');
            // document.getElementById('locationTypeSelect').setAttribute("class", "esri-widget esri-select");
            // locationTypeSelect.setAttribute("style", "paddingLeft: '10px';width: 200px; font-family: 'Avenir Next'; font-size: 1em; ");

            const countySelect = document.getElementById('countySelect');
            document.getElementById('countySelect').setAttribute("class", "esri-widget esri-select");
            countySelect.setAttribute("style", "paddingLeft: '10px';width: 200px; font-family: 'Avenir Next'; font-size: 1em; ");
            // countyText.appendChild(countyText);
            const routeSelect = document.getElementById('routeSelect');
            routeSelect.setAttribute("class", "esri-widget esri-select");
            routeSelect.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em; float: right;");
            // parcelLayerSQL.forEach(function(query){
            //   let option = document.createElement("option");
            //   option.innerHTML = query;
            //   option.value = query;
            //   select.appendChild(option);
            // });
            const routeIDSelect = document.getElementById('routeIdSelect');
            routeIDSelect.setAttribute("class", "esri-widget esri-select");
            routeIDSelect.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em; float: right; ");

            const milePointStartInput = document.getElementById('milePointStartInput');
            milePointStartInput.setAttribute("class", "esri-widget esri-input");
            milePointStartInput.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em; float: right; ");

            const milePointEndInput = document.getElementById('milePointEndInput');
            milePointEndInput.setAttribute("class", "esri-widget esri-input");
            milePointEndInput.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em; float: right;");


            const countMeasureInput = document.getElementById('countMeasureInput');
            countMeasureInput.setAttribute("class", "esri-widget esri-input");
            countMeasureInput.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em; float: right; ");

            const startDate = document.getElementById('startDateInput');
            startDate.setAttribute("type", "date");
            startDate.setAttribute("class", "esri-widget esri-input");
            startDate.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em; float: right;");

            const endDate = document.getElementById('endDateInput');
            endDate.setAttribute("type", "date");
            endDate.setAttribute("class", "esri-widget esri-input");
            endDate.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em; float: right;");

            const locationTypeSelect = document.getElementById('locationTypeSelect');
            locationTypeSelect.setAttribute("class", "esri-widget esri-select");
            locationTypeSelect.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em; float: right; ");
            // let option = document.createElement("option");
            // option.innerHTML = "Segment";
            // option.value = 'locationType=Segment';
            // locationTypeSelect.appendChild(option);


            // let startDatePicker = new DatePicker({
            //     container: "viewDiv", // DOM element for widget
            // });
            // let endDatePicker = new DatePicker({
            //     container: "viewDiv", // DOM element for widget
            // });

            // Listen for changes
            countySelect.addEventListener('change', (event) => {
                const whereClause = event.target.value;
                routeSelect.selectedIndex = -1;
                routeIDSelect.selectedIndex = -1;
                milePointStartInput.value = "";
                milePointEndInput.value = "";
                queryIDPREFIX(view.extent);
            });
            routeSelect.addEventListener('change', (event) => {
                const whereClause = event.target.value;
                routeIDSelect.selectedIndex = -1;
                milePointStartInput.value = "";
                milePointEndInput.value = "";
                queryROUTEID(view.extent);
            })
            routeIDSelect.addEventListener('change', (event) => {
                const whereClause = event.target.value;
                milePointStartInput.value = "";
                milePointEndInput.value = "";
                querySegment();
            })

            milePointStartInput.addEventListener('change', (event) => {
                const whereClause = event.target.value;
                if (milePointEndInput.value.length > 0 && milePointStartInput.value.length > 0) {
                    querySegment(view.extent);
                }
            })

            milePointEndInput.addEventListener('change', (event) => {
                const whereClause = event.target.value;
                if (milePointStartInput.value.length > 0 && milePointEndInput.value.length > 0) {
                    querySegment(view.extent);
                }
            })

            // Get query layer and set up query
            const parcelLayer = new FeatureLayer({
                url: "https://maps.roads.maryland.gov/arcgis/rest/services/Milepoints/Milepoints_Maryland_MDOTSHA/MapServer/1",
                outFields: ["*"]
            });
            map.add(parcelLayer)
            // countyMap.forEach((p) => {
            //     let option = document.createElement("option");
            //     option.innerHTML = p.name;
            //     option.value = 'COUNTY=' + p.id;
            //     countySelect.appendChild(option);
            // })
            // parcelLayer.queryFeatures({
            //     where: "1=1",  // Set by select element
            //     spatialRelationship: "intersects", // Relationship operation to apply
            //     // geometry: view.extent, // Restricted to visible extent of the map
            //     outFields: ["COUNTY"], // Attributes to return
            //     returnGeometry: false,
            //     returnDistinctValues: true,
            // }).then((results) => {
            //     results.features.forEach(function (feature) {
            //         let option = document.createElement("option");
            //         option.innerHTML = countyMap[feature.attributes.COUNTY];
            //         option.value = 'COUNTY=' + feature.attributes.COUNTY;
            //         countySelect.appendChild(option);
            //     });
            // });

            // parcelLayer.queryFeatures({
            //   where: "1=1",  // Set by select element
            //   spatialRelationship: "intersects", // Relationship operation to apply
            //   geometry: view.extent, // Restricted to visible extent of the map
            //   outFields: ["ID_PREFIX"], // Attributes to return
            //   returnGeometry: false,
            //   returnDistinctValues: true,
            // }).then((results) => {
            //   results.features.forEach(function (feature) {
            //     let option = document.createElement("option");
            //     option.innerHTML = feature.attributes.ID_PREFIX;
            //     option.value = 'COUNTY=' + feature.attributes.ID_PREFIX;
            //     routeSelect.appendChild(option);
            //   });

            // for(const feature in results.features){
            //   console.log(results.features[feature].attributes.COUNTY)
            // }
            // console.log(results.features[0].attributes.COUNTY);
            // const label = document.getElementById("mainLabel");
            // label.setAttribute("style", "width: 100px; font-family: 'Avenir Next'; font-size: 1em;")
            // label.setAttribute("class", "esri-text");
            // label.htmlFor = "Location ";
            // label.innerHTML = "Location Type:";
            // const countyLabel = document.getElementById("countyLabel");
            // countyLabel.setAttribute("style", "width: 50px; font-family: 'Avenir Next'; font-size: 1em;top:64px;right:220px")
            // countyLabel.htmlFor = "County";
            // countyLabel.innerHTML = "County:";
            // const prefixLabel = document.getElementById("prefixLabel");
            // prefixLabel.setAttribute("style", "width: 50px; font-family: 'Avenir Next'; font-size: 1em;top:106px;right:209px")
            // prefixLabel.htmlFor = "Prefix";
            // prefixLabel.innerHTML = "Prefix:";
            // const routeNoLabel = document.getElementById("routeNoLabel");
            // routeNoLabel.setAttribute("style", "width: 80px; font-family: 'Avenir Next'; font-size: 1em;top:148px;right:204px")
            // routeNoLabel.htmlFor = "Route No";
            // routeNoLabel.innerHTML = "Route No:";
            // const mpFromLabel = document.getElementById("mpFromLabel");
            // mpFromLabel.setAttribute("style", "width: 80px; font-family: 'Avenir Next'; font-size: 1em;top:186px;right:200px")
            // mpFromLabel.htmlFor = "MP From";
            // mpFromLabel.innerHTML = "MP From:";
            // const mpToLabel = document.getElementById("mpToLabel");
            // mpToLabel.setAttribute("style", "width: 80px; font-family: 'Avenir Next'; font-size: 1em;top:219px;right:183px")
            // mpToLabel.htmlFor = "MP To";
            // mpToLabel.innerHTML = "MP To:";
            // const startDateLabel = document.getElementById("startDateLabel");
            // startDateLabel.setAttribute("style", "width: 80px; font-family: 'Avenir Next'; font-size: 1em;top:249px;right:207px")
            // startDateLabel.htmlFor = "Start Date";
            // startDateLabel.innerHTML = "Start Date:";
            // const endDateLabel = document.getElementById("endDateLabel");
            // endDateLabel.setAttribute("style", "width: 80px; font-family: 'Avenir Next'; font-size: 1em;top:283px;right:201px")
            // endDateLabel.htmlFor = "End Date";
            // endDateLabel.innerHTML = "End Date:";


            // view.ui.add(parent,"top-right");
            // view.ui.add(label, "manual");
            // view.ui.add(locationTypeSelect, "top-right")
            // view.ui.add(countyLabel, "manual");
            // view.ui.add(countySelect, "top-right");
            // view.ui.add(prefixLabel, "manual");
            // view.ui.add(routeSelect, "top-right");
            // view.ui.add(routeNoLabel, "manual");
            // view.ui.add(routeIDSelect, "top-right");
            // view.ui.add(mpFromLabel, "manual");
            // view.ui.add(milePointStartInput, "top-right");
            // view.ui.add(mpToLabel, "manual");
            // view.ui.add(milePointEndInput, "top-right");
            // view.ui.add(startDateLabel, "manual");
            // view.ui.add(startDate, "top-right");
            // view.ui.add(endDateLabel, "manual");
            // view.ui.add(endDate, "top-right");
            document.getElementById("segmentDiv").style.display = "block";


            const saveProjectButton = document.getElementById("saveButton");
            saveProjectButton.innerHTML = "Save Project";
            saveProjectButton.setAttribute("style", "width: 100px; font-family: 'Avenir Next'; font-size: 1em;");
            saveProjectButton.setAttribute("class", "esri-widget esri-button");

            const crashCollectionButton = document.getElementById("crashButton");
            crashCollectionButton.innerHTML = "Continue to Crash Collection";
            crashCollectionButton.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em;");
            crashCollectionButton.setAttribute("class", "esri-widget esri-button");
            // view.ui.add(crashCollectionButton, "bottom-right");
            // view.ui.add(saveProjectButton, "bottom-right");
            // view.ui.add(endDatePicker,"top-right");
            // queryMultipleSegments();

            function delay(milliseconds) {
                return new Promise(resolve => {
                    setTimeout(resolve, milliseconds);
                });
            }

            async function queryIDPREFIX(extent) {
                console.log(county);
                const parcelQuery = {
                    where: county,  // Set by select element
                    spatialRelationship: "intersects", // Relationship operation to apply
                    // geometry: extent, // Restricted to visible extent of the map
                    outFields: ["ID_PREFIX"], // Attributes to return
                    returnGeometry: false,
                    returnDistinctValues: true
                };
                const results = await parcelLayer.queryFeatures(parcelQuery)
                // setRouteIds(results.features);
                // const routeResult = [];
                // console.log(results.features);
                results.features.forEach(function (feature) {
                    let option = document.createElement("option");
                    option.innerHTML = feature.attributes.ID_PREFIX;
                    option.value = 'ID_PREFIX= \'' + feature.attributes.ID_PREFIX + '\'';
                    routeSelect.appendChild(option);
                });
                console.log(results);
            }

            async function queryROUTEID(extent) {

                const parcelQuery = {
                    where: countySelect.value + ' and ' + routeSelect.value,  // Set by select element
                    spatialRelationship: "intersects", // Relationship operation to apply
                    // geometry: extent, // Restricted to visible extent of the map
                    outFields: ["ID_RTE_NO"], // Attributes to return
                    returnGeometry: false,
                    returnDistinctValues: true
                };
                const results = await parcelLayer.queryFeatures(parcelQuery)
                results.features.forEach(function (feature) {
                    let option = document.createElement("option");
                    option.innerHTML = feature.attributes.ID_RTE_NO;
                    option.value = 'ID_RTE_NO=' + feature.attributes.ID_RTE_NO;
                    routeIDSelect.appendChild(option);
                });
                // console.log(results);
            }

            async function queryMultipleSegments() {
                const data = [
                    {
                        "route_type": "MD",
                        "route_number": "2",
                        "from_milepoint": "2.480",
                        "to_milepoint": "13.232",
                        "length": "10.752",
                        "county": "Anne Arundel"
                    }, {
                        "route_type": "MD",
                        "route_number": "5",
                        "from_milepoint": "19.630",
                        "to_milepoint": "38.587",
                        "length": "18.957",
                        "county": "St. Mary's"
                    }, {
                        "route_type": "MD",
                        "route_number": "6",
                        "from_milepoint": "22.950",
                        "to_milepoint": "37.030",
                        "length": "14.080",
                        "county": "Charles"
                    }, {
                        "route_type": "MD",
                        "route_number": "6",
                        "from_milepoint": "0.050",
                        "to_milepoint": "1.240",
                        "length": "1.190",
                        "county": "St. Mary's"
                    }, {
                        "route_type": "MD",
                        "route_number": "8",
                        "from_milepoint": "2.470",
                        "to_milepoint": "4.725",
                        "length": "2.255",
                        "county": "Queen Anne's"
                    },
                    {
                        "route_type": "MD",
                        "route_number": "12",
                        "from_milepoint": "15.300",
                        "to_milepoint": "15.440",
                        "length": "0.140",
                        "county": "Worcester"
                    }, {
                        "route_type": "US",
                        "route_number": "13",
                        "from_milepoint": "0.120",
                        "to_milepoint": "0.500",
                        "length": "0.380",
                        "county": "Somerset"
                    }, {
                        "route_type": "US",
                        "route_number": "15",
                        "from_milepoint": "4.120",
                        "to_milepoint": "6.172",
                        "length": "2.052",
                        "county": "Frederick"
                    }, {
                        "route_type": "MD",
                        "route_number": "16",
                        "from_milepoint": "20.180",
                        "to_milepoint": "23.790",
                        "length": "3.610",
                        "county": "Dorchester"
                    }, {
                        "route_type": "MD",
                        "route_number": "17",
                        "from_milepoint": "19.020",
                        "to_milepoint": "19.106",
                        "length": "0.086",
                        "county": "Frederick"
                    }, {
                        "route_type": "MD",
                        "route_number": "22",
                        "from_milepoint": "5.776",
                        "to_milepoint": "9.201",
                        "length": "3.425",
                        "county": "Harford"
                    }
                ];

                for (const entry of data) {
                    const parcelQuery = {
                        where: 'COUNTY=' + countyMapReverse[entry.county] + ' and ID_PREFIX= \'' + entry.route_type + '\' and ID_RTE_NO = ' + parseInt(entry.route_number) + ' and ID_MP >='
                            + parseInt(entry.from_milepoint) + ' and ID_MP <=' + parseInt(entry.to_milepoint) + ' and MAIN_LINE = 1 and (MP_DIRECTION = \'E\' or MP_DIRECTION = \'N\' or MP_DIRECTION = null)',
                        spatialRelationship: "intersects", // Relationship operation to apply
                        // geometry: extent, // Restricted to visible extent of the map
                        outFields: ["*"], // Attributes to return
                        geometryType: "polyline",
                        returnGeometry: false,
                    };
                    const results = await parcelLayer.queryFeatures(parcelQuery);
                    // displayResults(results,false)
                    const paths = [];
                    results.features.forEach((feature) => {
                        paths.push([feature.attributes.LONGITUDE, feature.attributes.LATITUDE]);
                    });
                    const polyline = {
                        type: "polyline",
                        paths: paths
                    };
                    const simpleLineSymbol = {
                        type: "simple-line",
                        color: [226, 119, 40], // Orange
                        width: 1
                    };
                    const popupTemplate = {
                        title: "Segment",
                        content: `County: ${entry.county} <br> ID_PREFIX: ${entry.route_type} <br> ROUTE_NO: ${entry.route_number} <br> Mile Point Start :${entry.from_milepoint} <br> Mile Point End :${entry.to_milepoint} `
                    };
                    const polylineGraphic = new Graphic({
                        geometry: polyline,
                        symbol: simpleLineSymbol,
                        popupTemplate: popupTemplate

                    });
                    view.graphics.add(polylineGraphic);
                    view.goTo(view.graphics, {zoom: 12});
                    await delay(100);
                }

            }

            async function querySegment() {
                const parcelQuery = {
                    where: countySelect.value + ' and ' + routeSelect.value + ' and ' + routeIDSelect.value + ' and ID_MP >='
                        + milePointStartInput.value + ' and ID_MP <=' + milePointEndInput.value + ' and MAIN_LINE = 1 and MP_SUFFIX=\'  \' and (MP_DIRECTION = \'E\' or MP_DIRECTION = \'N\' or MP_DIRECTION = null)',
                    spatialRelationship: "intersects", // Relationship operation to apply
                    // geometry: extent, // Restricted to visible extent of the map
                    outFields: ["*"], // Attributes to return
                    returnGeometry: false,
                };
                const results = await parcelLayer.queryFeatures(parcelQuery)
                displayResults(results, true);
                // results.features.forEach(function (feature) {
                //   let option = document.createElement("option");
                //   option.innerHTML = feature.attributes.ROAD_NAME;
                //   option.value = 'ROAD_NAME=' + feature.attributes.ROAD_NAME;
                //   routeIDSelect.appendChild(option);
                // });
                // console.log(results);
            }


            function displayResults(results, isGraphicToBeCleared) {
                //Create a blue polygon
                isGraphicToBeCleared && view.graphics.removeAll();
                const paths = [];
                const coordinateMap = {}
                results.features.forEach((feature) => {
                    // console.log(`${feature.attributes.LONGITUDE}#${feature.attributes.LATITUDE}`,coordinateMap[`${feature.attributes.LONGITUDE}#${feature.attributes.LATITUDE}`])
                    if (coordinateMap[`${feature.attributes.LONGITUDE}#${feature.attributes.LATITUDE}`] === undefined) {
                        paths.push([feature.attributes.LONGITUDE, feature.attributes.LATITUDE]);
                        coordinateMap[`${feature.attributes.LONGITUDE}#${feature.attributes.LATITUDE}`] = true;
                    }
                    // if(coordinateMap.get({x:feature.attributes.LONGITUDE, y:feature.attributes.LATITUDE})===null){
                    //     coordinateMap.set({x:feature.attributes.LONGITUDE, y:feature.attributes.LATITUDE},true);
                    // }
                });
                // console.log(paths.length);
                const polyline = {
                    type: "polyline",
                    paths: [paths],
                };
                const simpleLineSymbol = {
                    type: "simple-line",
                    color: [226, 119, 40], // Orange
                    width: 2
                };
                const popupTemplate = {
                    title: "Segment",
                    content: `County: ${countySelect.value} <br> ID_PREFIX: ${routeIDSelect.value} <br> ROUTE_NO: ${routeSelect.value} <br> Mile Point Start :${milePointStartInput.value} <br> Mile Point End :${milePointEndInput.value} `
                };
                const polylineGraphic = new Graphic({
                    geometry: polyline,
                    symbol: simpleLineSymbol,
                    popupTemplate: popupTemplate

                });
                view.graphics.add(polylineGraphic);
                view.goTo(view.graphics, {zoom: 4});


                //  const symbol = {
                //    type: "simple-fill",
                //    color: [20, 130, 200, 0.5],
                //    outline: {
                //      color: "white",
                //      width: .5
                //    },
                //  };
                //
                //  const popupTemplate = {
                //    title: "Parcel {ROAD_NAME}",
                //    content: "County: {COUNTY} <br> ID_PREFIX: {ID_PREFIX} <br> ROAD_NAME: {ROAD_NAME}"
                //  };
                //
                //  // Assign styles and popup to features
                //  results.features.map((feature) => {
                //    feature.symbol = symbol;
                //    feature.popupTemplate = popupTemplate;
                //    return feature;
                //  });
                //
                // // Clear display
                //  view.popup.close();
                //  view.graphics.removeAll();
                //  // Add features to graphics layer
                //  view.graphics.addMany(results.features);
            }
        })
        // unmounting map
        return (() => {
            if (!!view) {
                view.destroy();
                view = null;
            }
        })
    });

    return (
        <div>
            <div style={{height: '100vh', width: '75vw', float: 'left'}} ref={mapRef}/>
            <br/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
                <label id="locationTypeLabel">Location Type: </label>
                <select id="locationTypeSelect"
                        value={locationType}
                        onChange={(e) => setLocationType(e.target.value)}
                    // style={{width: '200px', fontFamily: 'Avenir Next', fontSize: '1em', float: 'left'}}
                    // onChange={setCounty}
                >
                        <option key={"locationType1"} value={"Segment"}>
                            {"Segment"}
                        </option>
                    <option key={"locationType2"} value={"Intersection"}>
                        {"Intersection"}
                    </option>
                    <option key={"locationType3"} value={"Ramp"}>
                        {"Ramp"}
                    </option>
                </select>
            </div>
            <br/><br/>
            {locationType==="Segment"&&<div id="segmentDiv" className="esri-widget">
                <h2 id="mainLabel">Location Info</h2>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
                    <label id="countLabel">County: </label>
                    <select id="countySelect"
                            value={county}
                            onChange={(e) => setCounty(e.target.value)}
                        // style={{width: '200px', fontFamily: 'Avenir Next', fontSize: '1em', float: 'left'}}
                        // onChange={setCounty}
                    >
                        {countyMap.map(p => (
                            <option key={"county" + p.id} value={"COUNTY=" + p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
                <br/><br/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
                    <label id="prefixLabel">RO:&nbsp;&nbsp;&nbsp;</label>
                    <select id="routeSelect"
                            value={route}
                            onChange={(e) => {
                                setRoute(e.target.value)
                            }}
                    />
                </div>
                <br/><br/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
                    <label id="routeNoLabel">Route Number: </label>
                    <select id="routeIdSelect"
                            value={routeID}
                            onChange={(e) => {
                                setRouteID(e.target.value)
                            }}
                    />
                </div>
                <br/><br/>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>

                    <label id="mpFromLabel">MP From: </label>
                    <input id="milePointStartInput"
                           value={milePointStart}
                           onChange={(e) => {
                               setMilePointStart(e.target.value)
                           }}
                    />
                </div>
                <br/><br/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
                    <label id="mpToLabel">MP To: </label>
                    <input id="milePointEndInput"
                           value={milePointEnd}
                           onChange={(e) => {
                               setmilePointEnd(e.target.value)
                           }}
                    /></div>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>

                    <label id="countMeasureLabel">CounterMeasure: </label>
                    {/*<SelectSearch id="countMeasureInput" options={counterMeasureMap} search={true} placeholder="Choose your countermeasure" />*/}
                    {/*<Autocomplete*/}
                    {/*    disablePortal*/}
                    {/*    id="countMeasureInput"*/}
                    {/*    options={counterMeasureMap}*/}
                    {/*    sx={{ width: 300 }}*/}
                    {/*    renderInput={(params) => <TextField {...params} label="CounterMeasure" />}*/}
                    {/*/>*/}
                    <select id="countMeasureInput"
                           value={countMeasure}
                           onChange={(e) => {
                               setCountMeasure(e.target.value)
                           }}
                    >

                        {counterMeasureMap.map(p => (
                            <option key={"counterMeasure" + p.value} value={p.label}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </div>
                <br/><br/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
                    <label id="startDateLabel">Start Date: </label>
                    <input id="startDateInput"
                           value={startDate}
                           onChange={(e) => {
                               setStartDate(e.target.value)
                           }}
                    /></div>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
                    <label id="endDateLabel">EndDate: </label>
                    <input id="endDateInput"
                           value={endDate}
                           onChange={(e) => {
                               setEndDate(e.target.value)
                           }}
                    /></div>
<br/>
                <button id="saveButton"/>
                <br/><br/>
                <button id="crashButton"/>
            </div>}
        </div>

    )
}



