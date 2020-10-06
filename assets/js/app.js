// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 660;

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 100,
    left: 100,
};
  
  // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
  
  // Select body, append SVG area to it, and set the dimensions
    var svg = d3
      .select("body")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
  // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
  // to the margins set in the "chartMargin" object.
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("/assets/js/data.csv").then(function(data) {
  //Read full data
    console.log("Full data")
    console.log(data)

  //Get smoking data  
    var smokes = data.map(data => data.smokes)
    console.log("Smoking data")
    console.log(smokes)

  // Get income data
    var income = data.map(data => data.income)
    console.log("Income data")
    console.log(income)

  //Create scales
    var yScale = d3.scaleLinear()
      .domain([0,40])
      .range([chartHeight,0]);

    var xScale = d3.scaleLinear()
      .domain([(d3.min(income)-10000),d3.max(income)])
      .range([0,chartWidth]);
  
  //Create Axises
    var yAxis = d3.axisLeft(yScale)
    var xAxis = d3.axisBottom(xScale)

    chartGroup.append("g").call(yAxis)
    chartGroup.append("g").attr("transform", `translate(0,${chartHeight})`)
      .call(xAxis)

    console.log(income)

    // chartGroup.selectAll(".scatter")
    // .data(data)
    // .enter()
    // .append("circle")
    // .attr("cx", function(d){
    //   return xScale(d.income);
    // })
    // .attr("cy", function(d){
    //   return yScale(d.smokes);
    // })
    // .attr("r", 5)
    // .attr("stroke", "CadetBlue")
    // .attr("stroke", "CadetBlue")
    // .attr("stroke-width", "1")

    chartGroup.selectAll(".scatter")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d){
      return xScale(d.income);
    })
    .attr("cy", function(d){
      return yScale(d.smokes);
    })
    .attr("r", 10)
    .attr("stroke", "CadetBlue")
    .attr("fill", "CadetBlue")
    .attr("stroke-width", "1")
    
    chartGroup.selectAll(".scatter")
    .data(data)
    .enter()
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", function(d){
      return (xScale(d.income)+7);
    })
    .attr("y", function(d){
      return (yScale(d.smokes)+3);
    })
    .attr("font-size","10px")
    .text(function(d){
      return (d.abbr);
    });
    
    
    
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", chartWidth-230)
    .attr("y", chartHeight + 75)
    .text("Income per capita");

    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", -150)
    .attr("y", 25)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Precentage of Smokers");

});