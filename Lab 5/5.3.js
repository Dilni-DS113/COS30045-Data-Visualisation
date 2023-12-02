var w = 500;
var scale = 4;
var h = 100;
var dataset = [14, 5, 26, 23, 9, 15, 27];
Maxvalues = 25
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var xScale =
    d3.scaleBand() // Calling scaling function
        .domain(d3.range(dataset.length)) // Input domain 
        .rangeRound([0, w]) // Ouput range of screen rangeround() rounds the numbers into whole values
        .paddingInner(0.03);
var yScale =
    d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .rangeRound([0, h])

svg.selectAll("rect").data(dataset).enter().append("rect")
    .attr("x", function (d, i) { return xScale(i); })
    .attr("y", function (d) { return h - yScale(d); })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) { return yScale(d); })
    .style('fill', "rgb(110, 162, 245)")

d3.select("#Add") // if using id remember to add # before 
    .on("click", function () {
        var newNumber = Math.floor(Math.random() * Maxvalues);
        dataset.push(newNumber);
        xScale.domain(d3.range(dataset.length)); // Matching length of the data set to the width of the chart 

        var bar = svg.selectAll("rect").data(dataset)
        bar.enter().append("rect").attr("x", w).attr("y", function (d) {
            return h - yScale(d);
        })
            .merge(bar)
            .transition()
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i)
            }).attr("y", function (d) {
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return yScale(d);
            }).style('fill', "rgb(110, 162, 245)")


    })

d3.select("#Remove")
    .on("click", function () {
        dataset.shift();
        xScale.domain(d3.range(dataset.length)); // Update xScale domain to match the new dataset

        var bars = svg.selectAll("rect").data(dataset);

        bars.exit()
            .transition()
            .duration(500)
            .delay(function (d, i) { return i * 100; }) // Delay the transition based on data index
            .attr("x", w)
            .remove();

        bars.transition()
            .duration(500)
            .delay(function (d, i) { return i * 100; })
            .attr("x", function (d, i) { return xScale(i); }) // Update x position based on new xScale
            .attr("y", function (d) { return h - yScale(d); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return yScale(d); });

    })