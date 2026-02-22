# Daily supply of calories per person - Data package

This data package contains the data that powers the chart ["Daily supply of calories per person"](https://ourworldindata.org/grapher/daily-per-capita-caloric-supply?v=1&csvType=full&useColumnShortNames=false) on the Our World in Data website. It was downloaded on February 19, 2026.

### Active Filters

A filtered subset of the full data was downloaded. The following filters were applied:

## CSV Structure

The high level structure of the CSV file is that each row is an observation for an entity (usually a country or region) and a timepoint (usually a year).

The first two columns in the CSV file are "Entity" and "Code". "Entity" is the name of the entity (e.g. "United States"). "Code" is the OWID internal entity code that we use if the entity is a country or region. For most countries, this is the same as the [iso alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) code of the entity (e.g. "USA") - for non-standard countries like historical countries these are custom codes.

The third column is either "Year" or "Day". If the data is annual, this is "Year" and contains only the year as an integer. If the column is "Day", the column contains a date string in the form "YYYY-MM-DD".

The final column is the data column, which is the time series that powers the chart. If the CSV data is downloaded using the "full data" option, then the column corresponds to the time series below. If the CSV data is downloaded using the "only selected data visible in the chart" option then the data column is transformed depending on the chart type and thus the association with the time series might not be as straightforward.


## Metadata.json structure

The .metadata.json file contains metadata about the data package. The "charts" key contains information to recreate the chart, like the title, subtitle etc.. The "columns" key contains information about each of the columns in the csv, like the unit, timespan covered, citation for the data etc..

## About the data

Our World in Data is almost never the original producer of the data - almost all of the data we use has been compiled by others. If you want to re-use data, it is your responsibility to ensure that you adhere to the sources' license and to credit them correctly. Please note that a single time series may have more than one source - e.g. when we stich together data from different time periods by different producers or when we calculate per capita metrics using population data from a second source.

## Detailed information about the data


## Daily calorie supply per person
Last updated: March 26, 2025  
Next update: March 2026  
Date range: 1274–2022  
Unit: kilocalories per day  


### How to cite this data

#### In-line citation
If you have limited space (e.g. in data visualizations), you can use this abbreviated in-line citation:  
Food and Agriculture Organization of the United Nations (2024) and other sources – with major processing by Our World in Data

#### Full citation
Food and Agriculture Organization of the United Nations (2024); Harris et al. (2015); Floud et al. (2011); Jonsson (1998); Grigg (1995); Fogel (2004); Food and Agriculture Organization of the United Nations (2000); Food and Agriculture Organization of the United Nations (1949); USDA Economic Research Service (ERS) (2015) – with major processing by Our World in Data. “Daily calorie supply per person” [dataset]. Food and Agriculture Organization of the United Nations, “Food Balances: Food Balances (-2013, old methodology and population)”; Food and Agriculture Organization of the United Nations, “Food Balances: Food Balances (2010-)”; Harris et al., “How Many Calories? Food Availability in England and Wales in the Eighteenth and Nineteenth Centuries”; Floud et al., “The Changing Body”; Jonsson, “Changes in food consumption in Iceland, 1770-1940”; Grigg, “The nutritional transition in Western Europe”; Fogel, “The Escape from Hunger and Premature Death”; Food and Agriculture Organization of the United Nations, “The State of Food and Agriculture 2000”; Food and Agriculture Organization of the United Nations, “The State of Food and Agriculture 1949”; USDA Economic Research Service (ERS), “U.S. food supply:  Nutrients and other food components, per capita per day” [original data].
Source: Food and Agriculture Organization of the United Nations (2024), Harris et al. (2015), Floud et al. (2011), Jonsson (1998), Grigg (1995), Fogel (2004), Food and Agriculture Organization of the United Nations (2000), Food and Agriculture Organization of the United Nations (1949), USDA Economic Research Service (ERS) (2015) – with major processing by Our World In Data

### What you should know about this data
* This data shows per capita daily calorie supply, which is the amount of calories available to an average person, and does not necessarily correspond to the calories actually consumed by that person.
* Calorie supply is always larger than actual calorie consumption, since there may be waste at the household level.
* For historical data, daily calorie supply and consumption are sometimes used interchangeably, due to poor data availability.
* This data does not give a complete picture of nutrition - for a healthy diet [we need much more](https://ourworldindata.org/micronutrient-deficiency) than just energy. But as the most basic criteria of food security, getting enough calories is an important measure. It is used as input for the most important metrics used to assess global malnutrition: [undernourishment](https://ourworldindata.org/undernourishment-definition).

### Sources

#### Food and Agriculture Organization of the United Nations – Food Balances: Food Balances (-2013, old methodology and population)
Retrieved on: 2025-03-17  
Retrieved from: http://www.fao.org/faostat/en/#data/FBSH  

#### Food and Agriculture Organization of the United Nations – Food Balances: Food Balances (2010-)
Retrieved on: 2025-03-17  
Retrieved from: http://www.fao.org/faostat/en/#data/FBS  

#### Harris et al. – How Many Calories? Food Availability in England and Wales in the Eighteenth and Nineteenth Centuries
Retrieved on: 2024-05-23  
Retrieved from: https://www.emerald.com/insight/content/doi/10.1108/S0363-326820150000031003/full/html  

#### Floud et al. – The Changing Body
Retrieved on: 2024-05-27  
Retrieved from: https://www.cambridge.org/core/books/changing-body/DE3BB0E3577205AC26823CF2120D8B7E  

#### Jonsson – Changes in food consumption in Iceland, 1770-1940
Retrieved on: 2024-05-27  
Retrieved from: https://www.tandfonline.com/doi/abs/10.1080/03585522.1998.10414677  

#### Grigg – The nutritional transition in Western Europe
Retrieved on: 2024-05-27  
Retrieved from: https://www.sciencedirect.com/science/article/abs/pii/S0305748885700187?via%3Dihub  

#### Fogel – The Escape from Hunger and Premature Death
Retrieved on: 2024-05-27  
Retrieved from: https://www.cambridge.org/core/books/escape-from-hunger-and-premature-death-17002100/384C6032DE4E73C90EF6C9D1E55009CA  

#### Food and Agriculture Organization of the United Nations – The State of Food and Agriculture 2000
Retrieved on: 2024-05-27  
Retrieved from: https://www.fao.org/agrifood-economics/publications/detail/en/c/122046/  

#### Food and Agriculture Organization of the United Nations – The State of Food and Agriculture 1949
Retrieved on: 2024-05-27  
Retrieved from: https://www.un-ilibrary.org/content/books/9789210472654  

#### USDA Economic Research Service (ERS) – U.S. food supply:  Nutrients and other food components, per capita per day
Retrieved on: 2025-03-26  
Retrieved from: https://www.ers.usda.gov/data-products/food-availability-per-capita-data-system/food-availability-per-capita-data-system/  

#### Notes on our processing step for this indicator
- For all countries, the data after 1960 is taken from FAOSTAT Food Balances datasets ([old](https://www.fao.org/faostat/en/#data/FBSH) and [new](https://www.fao.org/faostat/en/#data/FBS) methodologies combined).
- For the UK: We load Appendix Table from [Harris et al. (2015)](https://www.emerald.com/insight/content/doi/10.1108/S0363-326820150000031003/full/html). From that table, we select values from [Broadberry et al. (2015)](https://www.cambridge.org/core/books/british-economic-growth-12701870/A270234C137117C8E0F1D1E7E6F0DA56) and the corrected values from [Floud et al (2011)](https://www.cambridge.org/core/books/changing-body/DE3BB0E3577205AC26823CF2120D8B7E) (taking the average value of Estimates (A) and (B)).
- For the US: For years 1800-1900, we use Table 6.6 of [Floud et al. (2011)](https://www.cambridge.org/core/books/changing-body/DE3BB0E3577205AC26823CF2120D8B7E). For years 1900-1960, we use [the archived table of food supply from USDA](https://www.ers.usda.gov/webdocs/DataFiles/50472/nutrients.xls?v=6096.1).
- For Iceland: We use Table 5 of [Jonsson (1994)](https://www.tandfonline.com/doi/abs/10.1080/03585522.1998.10414677).
- For Finland, Germany, Italy, Norway: We use Table 1 from [Grigg (1995)](https://www.sciencedirect.com/science/article/abs/pii/S0305748885700187), which is a compilation of many sources.
- For France: We use Table 1 from Grigg (1995).
  - We include the two additional data points (1705 and 1785) from [Fogel (2004)](https://www.cambridge.org/core/books/escape-from-hunger-and-premature-death-17002100/384C6032DE4E73C90EF6C9D1E55009CA).
- For Belgium and Netherlands: We use Table 5.5 of Floud et al. (2011).
- For Uganda, Cambodia, China, India, Brazil, Mexico, and Peru for 1936 and 1947: We use Table 11 of [FAO (2000)](https://www.fao.org/4/x4400e/x4400e.pdf) (The State of Food and Agriculture).
- For many countries (including some of the above) for 1947 and 1948: We use values from Table 15 from [FAO (1949)](https://www.fao.org/4/ap637e/ap637e.pdf).
- Note that prior to 1961, data for the UK may correspond to England, or England and Wales; and Tanzania refers to Tanganyika.


    