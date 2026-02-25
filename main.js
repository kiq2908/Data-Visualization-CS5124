// Main application script for Global Trends Visualization

// used for debugging and confirming that the script is loaded
console.log("Global Trends application loaded.");

// Global variables to hold data
let globalData = []; // array to hold the filtered data for the selected year
const SELECTED_YEAR = 2020; //most recent year

// label for the x-axis in the Scatterplot
const X_AXIS_LABEL = "Average years of schooling"; 
// label for the y-axis in the Scatterplot
const Y_AXIS_LABEL = "Total fertility rate"; 

// Define margins and dimensions for charts
const margin = {top: 20, right: 30, bottom: 40, left: 50};
// Reminder: we will calculate width/height dynamically based on container size by changing from the fixed
// dimension to extractiong the current dimension by HTML container


// Create a tooltip div that is hidden by default
const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip-custom")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "1px solid #ccc")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("box-shadow", "0 2px 5px rgba(0,0,0,0.2)");


// run the loadData function once the DOM (web page) is fully loaded
// the document object represents the web page, 
// and we listen for the 'DOMContentLoaded' event 
// (browser completely loaded the HTML, but before images and other resources)
// to ensure all elements are available before we try to manipulate them
document.addEventListener('DOMContentLoaded', function() {
    loadData();
});

// the function that loads the CSV data, processes it, and initializes the visualizations
function loadData() {
    d3.csv("Merged_Data/merged_education_fertility_data.csv").then(data => {
        console.log("Raw data loaded:", data[0]);

        // Parse data: Convert strings to numbers
        data.forEach(d => {
            d.Year = +d.Year;
            d['Average years of schooling'] = +d['Average years of schooling'];
            d['Total fertility rate'] = +d['Total fertility rate'];
        });

        // Filter data for the selected year and where both values exist
        globalData = data.filter(d => 
            d.Year === SELECTED_YEAR && 
            d['Average years of schooling'] > 0 && 
            d['Total fertility rate'] > 0
        );

        console.log(`Filtered data for ${SELECTED_YEAR}:`, globalData.length, "records");
        console.log("Sample record:", globalData[0]);

        // Initialize visualizations
        
        // Draw Histogram
        initHistograms();
        // Draw Scatterplot
        initScatterplot();
        // Draw Map
        initMap();

        // Temporary: Display a message on the page
        // d3.select("#vis1_education_dist")
        //     .append("p")
        //     .text(`Data loaded successfully! Found ${globalData.length} countries for year ${SELECTED_YEAR}.`);

        // d3.select("#vis2_fertility_dist")
        //     .append("p")
        //     .text(`Data loaded successfully! Found ${globalData.length} countries for year ${SELECTED_YEAR}.`);

    }).catch(error => {
        console.error("Error loading the data:", error);
        d3.select("body").append("p").style("color", "red").text("Error loading data. Check console for details.");
    });
}

// LEVEL 1: Basic Visualizations (Histograms and Scatterplot)

// 1. Histogram Function 
// We will create two histograms: one for education and one for fertility 
function initHistograms() { 

// A helper function to draw one histogram so we don't copy-paste code  
function createHistogram(selector, dataKey, color) {  
// 1. Set up dimensions  
const width = 400 - margin.left - margin.right;  //
const height = 250 - margin.top - margin.bottom;  
  
  
// 2. Create SVG container   
const svg = d3.select(selector)  
.append("svg")  
.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
.style("width", "100%")
.style("height", "100%")
.append("g")  
.attr("transform", `translate(${margin.left},${margin.top})`);  
  
  
// 3. Create X scale (linear scale for numbers)  
const x = d3.scaleLinear()  
.domain([0, d3.max(globalData, d => d[dataKey])]) // From 0 to max value  
.range([0, width]);  
  
  
// 4. Create Y scale (counts) - we need to calculate bins first  
const histogram = d3.bin()  
.domain(x.domain())  
.thresholds(x.ticks(20)); // Try to make ~20 bars  
  
  
const bins = histogram(globalData.map(d => d[dataKey]));  
  
  
const y = d3.scaleLinear()  
.domain([0, d3.max(bins, d => d.length)])  
.range([height, 0]);  
  
  
// 5. Draw Bars  
svg.selectAll("rect")  
.data(bins)  
.join("rect")  
.attr("x", 1)  
.attr("transform", d => `translate(${x(d.x0)}, ${y(d.length)})`)  
.attr("width", d => x(d.x1) - x(d.x0) - 1)  
.attr("height", d => height - y(d.length))  
.style("fill", color)

// Adding Linked Highlighting 
.on("mouseover", function(event, d) {
const minVal = d.x0;
const maxVal = d.x1;

// 1. Highlight the bar itself
d3.select(this).style("fill", "orange");

// 2. Filter Update the Scatterplot
d3.select("#vis3_scatterplot")
    .selectAll("circle")
    .style("opacity", circleData => {
        const val = circleData[dataKey];
        if (val >= minVal && val < maxVal) return 1.0; 
        else return 0.1;
    })
    .style("stroke", circleData => {
        const val = circleData[dataKey];
        return (val >= minVal && val < maxVal) ? "black" : "none";
    });
})
.on("mouseout", function() {
    // 1. Return bar to original color
    d3.select(this).style("fill", color);

    // 2. Return scatterplot to normal
    d3.select("#vis3_scatterplot")
        .selectAll("circle")
        .style("opacity", 0.7)
        .style("stroke", "white");
});
  
// 6. Add Axes  
svg.append("g")  
.attr("transform", `translate(0, ${height})`)  
.call(d3.axisBottom(x));  
  
  
svg.append("g")  
.call(d3.axisLeft(y));

// 7. Add Axis Labels

// X-axis Label
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 35) // Position below the x-axis
    .style("font-size", "12px")
    .text(dataKey); // Use the data variable name as the label

// Y-axis Label
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -35) // Position to the left of y-axis
    .attr("x", 0)
    .style("font-size", "12px")
    .text("Country Counts"); // Label for counts
}  
  
  
// Call the helper for Education  
createHistogram("#vis1_education_dist", "Average years of schooling", "#69b3a2");  
// Call the helper for Fertility  
createHistogram("#vis2_fertility_dist", "Total fertility rate", "#404080");  
}  
  
  
// 2. Scatterplot Function  
function initScatterplot() {  
// 1. Set up dimensions  
const width = 500 - margin.left - margin.right; // Bigger width for scatter  
const height = 350 - margin.top - margin.bottom;  
  
  
// 2. Create SVG  
const svg = d3.select("#vis3_scatterplot")  
.append("svg")  
.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
.style("width", "100%")
.style("height", "100%")
.append("g")  
.attr("transform", `translate(${margin.left},${margin.top})`);  
  
  
// 3. Scales  
const x = d3.scaleLinear()  
.domain([0, d3.max(globalData, d => d['Average years of schooling'])])  
.range([0, width]);  
  
  
const y = d3.scaleLinear()  
.domain([0, d3.max(globalData, d => d['Total fertility rate'])])  
.range([height, 0]);  
  
  
// 4. Draw Circles (Dots)  
svg.append('g')  
.selectAll("circle")  
.data(globalData)  
.join("circle")  
.attr("cx", d => x(d['Average years of schooling']))  
.attr("cy", d => y(d['Total fertility rate']))  
.attr("r", 5) // Radius of dots  
.style("fill", "#69b3a2")  
.style("opacity", 0.7)  
.style("stroke", "white")
  
// Tooltip Interactions
.on("mouseover", function(event, d) {
    // 1. Make the dot bigger and darker to show selection
    d3.select(this)
        .transition().duration(100)
        .attr("r", 8)
        .style("opacity", 1)
        .style("stroke", "black");

    // 2. Show the tooltip div
    tooltip.transition().duration(200).style("opacity", 0.9);

    // 3. Set the text inside the tooltip
    tooltip.html(`
        <strong>${d.Entity} (${d.Year})</strong><br/>
        Schooling: ${d['Average years of schooling']} years<br/>
        Fertility: ${d['Total fertility rate']} children
    `);
})
.on("mousemove", function(event, d) {
    // Move the tooltip to where the mouse is
    // We add offsets (10px) so the mouse doesn't cover the text
    tooltip
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 28) + "px");
})
.on("mouseout", function(event, d) {
    // 1. Return dot to normal size/color
    d3.select(this)
        .transition().duration(200)
        .attr("r", 5)
        .style("opacity", 0.7)
        .style("stroke", "white");

    // 2. Hide the tooltip
    tooltip.transition().duration(500).style("opacity", 0);
});
  
// 5. Add Axes  
svg.append("g")  
.attr("transform", `translate(0, ${height})`)  
.call(d3.axisBottom(x));  
  
  
svg.append("g")  
.call(d3.axisLeft(y));  
  
  
// 6. Add Labels  
// X axis label for Scatterplot
svg.append("text")  
.attr("text-anchor", "end")  
.attr("x", width)  
.attr("y", height - 10)  
.text(X_AXIS_LABEL);  
  
// Y axis label for Scatterplot (rotated)
svg.append("text")  
.attr("text-anchor", "end")  
.attr("transform", "rotate(-90)")  
.attr("y", -margin.left + 20)  
.attr("x", -margin.top)  
.text(Y_AXIS_LABEL);  
}

// LEVEL 2: CHOROPLETH MAP

function initMap() {
    const width = 1000;
    const height = 500;
    
    // 1. Create SVG
    const svg = d3.select("#vis_map")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%")
        .style("height", "100%");

    // 2. Define Map Projection
    const projection = d3.geoMercator()
        .scale(120)
        .center([0, 20])
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // 3. Define Color Scales
    const colorScaleEducation = d3.scaleSequential()
        .interpolator(d3.interpolateYlGnBu)
        .domain([0, 14]); 

    const colorScaleFertility = d3.scaleSequential()
        .interpolator(d3.interpolateYlOrRd)
        .domain([0, 7]); 

    // --- HELPER FUNCTION: Find Country Data ---
    // Fix the matching issues
    function findCountryData(geoFeature) {
        // 1. Try matching by 3-letter Code (Best)
        const geoID = geoFeature.id ? geoFeature.id.trim().toUpperCase() : "";
        if (geoID.length === 3) {
            const match = globalData.find(row => row.Code === geoID);
            if (match) return match;
        }

        // 2. If no code match, try matching by Name (Fallback)
        const geoName = geoFeature.properties.name;
        const matchByName = globalData.find(row => row.Entity === geoName);
        return matchByName;
    }

    // 4. Load GeoJSON Data
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(topo) {
        
        let currentMetric = "Average years of schooling";

        // 5. Draw the Map
        const mapLayer = svg.append("g")
            .selectAll("path")
            .data(topo.features)
            .join("path")
            .attr("d", path)
            .attr("fill", function(d) {
                const countryData = findCountryData(d); // Use helper
                
                if (countryData) {
                   return colorScaleEducation(countryData[currentMetric]);
                } else {
                   return "#ccc"; // Grey for missing data
                }
            })
            .style("stroke", "#fff")
            .style("stroke-width", "0.5px")
            
            // Add Tooltip
            .on("mouseover", function(event, d) {
                const countryData = findCountryData(d); // Use helper here too!
                
                d3.select(this)
                    .style("stroke", "black")
                    .style("stroke-width", "1px");

                tooltip.transition().duration(200).style("opacity", 0.9);
                
                if (countryData) {
                    tooltip.html(`
                        <strong>${countryData.Entity} (${countryData.Year})</strong><br/>
                        ${currentMetric}: ${countryData[currentMetric]}
                    `);
                } else {
                    tooltip.html(`<strong>${d.properties.name}</strong><br/>No data`);
                }
            })
            .on("mousemove", function(event) {
                tooltip
                    .style("left", (event.pageX + 15) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                d3.select(this)
                    .style("stroke", "#fff")
                    .style("stroke-width", "0.5px");
                tooltip.transition().duration(500).style("opacity", 0);
            });

        // --- ADD LEGEND ---
        // Create a group for the legend
        const legendGroup = svg.append("g")
            .attr("id", "map-legend")
            .attr("transform", `translate(20, ${height - 40})`);

        // Create a linear gradient for the legend
        const defs = svg.append("defs");
        const linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient");

        // Draw the legend rectangle
        legendGroup.append("rect")
            .attr("width", 200)
            .attr("height", 15)
            .style("fill", "url(#linear-gradient)");

        // Add text labels for min and max
        const legendMinText = legendGroup.append("text")
            .attr("x", 0)
            .attr("y", -5)
            .style("font-size", "12px");

        const legendMaxText = legendGroup.append("text")
            .attr("x", 200)
            .attr("y", -5)
            .attr("text-anchor", "end")
            .style("font-size", "12px");

        // Function to update the legend based on the current metric
        function updateLegend(metric) {
            const scale = (metric === "Average years of schooling") ? colorScaleEducation : colorScaleFertility;
            const domain = scale.domain();
            
            // Update gradient colors
            linearGradient.selectAll("stop").remove();
            linearGradient.append("stop").attr("offset", "0%").attr("stop-color", scale(domain[0]));
            linearGradient.append("stop").attr("offset", "100%").attr("stop-color", scale(domain[1]));

            // Update text
            legendMinText.text(domain[0]);
            legendMaxText.text(domain[1] + (metric === "Average years of schooling" ? " years" : " children"));
        }

        // Initialize legend
        updateLegend(currentMetric);

        // 6. Handle Dropdown Change
        d3.select("#mapMetricSelect").on("change", function(event) {
            currentMetric = event.target.value;
            
            const scale = (currentMetric === "Average years of schooling") 
                          ? colorScaleEducation 
                          : colorScaleFertility;

            mapLayer.transition().duration(1000)
                .attr("fill", function(d) {
                    const countryData = findCountryData(d); // Use helper here too!
                    if (countryData) {
                        return scale(countryData[currentMetric]);
                    }
                    return "#ccc";
                });
                
            // Update the legend
            updateLegend(currentMetric);
        });

    });
}