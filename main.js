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
// We will calculate width/height dynamically based on container size

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
        //initHistograms();
        //initScatterplot();
        
        // Temporary: Display a message on the page
        d3.select("#vis1_education_dist")
            .append("p")
            .text(`Data loaded successfully! Found ${globalData.length} countries for year ${SELECTED_YEAR}.`);

        d3.select("#vis2_fertility_dist")
            .append("p")
            .text(`Data loaded successfully! Found ${globalData.length} countries for year ${SELECTED_YEAR}.`);

    }).catch(error => {
        console.error("Error loading the data:", error);
        d3.select("body").append("p").style("color", "red").text("Error loading data. Check console for details.");
    });
}

