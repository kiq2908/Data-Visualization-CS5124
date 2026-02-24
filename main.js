// Main application script for Global Trends Visualization

// used for debugging and confirming that the script is loaded
console.log("Global Trends application loaded.");

// Global variables to hold data
let globalData = []; // array to hold the filtered data for the selected year
const SELECTED_YEAR = 2020; //most recent year

// label for the x-axis in the scatterplot
const X_AXIS_LABEL = "Average years of schooling"; 
// label for the y-axis in the scatterplot
const Y_AXIS_LABEL = "Total fertility rate"; 

// Define margins and dimensions for charts
const margin = {top: 20, right: 30, bottom: 40, left: 50};
// Reminder: we will calculate width/height dynamically based on container size by changing from the fixed
// dimension to extractiong the current dimension by HTML container


// Create a tooltip div that is hidden by default
const tooltip = d3.select("body")
    .append("div")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "1px solid #ccc")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("pointer-events", "none") // Start hidden and ignore mouse events
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
        initHistograms();
        initScatterplot();
        
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

// 1. Histogram Function 
// We will create two histograms: one for education and one for fertility 
function initHistograms() { 

// A helper function to draw one histogram so we don't copy-paste code  
function createHistogram(selector, dataKey, color) {  
// 1. Set up dimensions  
const width = 500 - margin.left - margin.right;  //
const height = 300 - margin.top - margin.bottom;  
  
  
// 2. Create SVG container   
const svg = d3.select(selector)  
.append("svg")  
.attr("width", width + margin.left + margin.right)  
.attr("height", height + margin.top + margin.bottom)  
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
.style("fill", color);  
  
  
// 6. Add Axes  
svg.append("g")  
.attr("transform", `translate(0, ${height})`)  
.call(d3.axisBottom(x));  
  
  
svg.append("g")  
.call(d3.axisLeft(y));  
}  
  
  
// Call the helper for Education  
createHistogram("#vis1_education_dist", "Average years of schooling", "#69b3a2");  
// Call the helper for Fertility  
createHistogram("#vis2_fertility_dist", "Total fertility rate", "#404080");  
}  
  
  
// 2. Scatterplot Function  
function initScatterplot() {  
// 1. Set up dimensions  
const width = 1000 - margin.left - margin.right; // Bigger width for scatter  
const height = 500 - margin.top - margin.bottom;  
  
  
// 2. Create SVG  
const svg = d3.select("#vis3_scatterplot")  
.append("svg")  
.attr("width", width + margin.left + margin.right)  
.attr("height", height + margin.top + margin.bottom)  
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
        <strong>${d.Entity}</strong><br/>
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
svg.append("text")  
.attr("text-anchor", "end")  
.attr("x", width)  
.attr("y", height - 10)  
.text(X_AXIS_LABEL);  
  
  
svg.append("text")  
.attr("text-anchor", "end")  
.attr("transform", "rotate(-90)")  
.attr("y", -margin.left + 20)  
.attr("x", -margin.top)  
.text(Y_AXIS_LABEL);  
}