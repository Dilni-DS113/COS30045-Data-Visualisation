var w = 500;
var scale = 4;
var h = 100;
var dataset = [14, 5, 26, 23, 9, 15, 27];
Maxvalues = 25

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
// ISSUE 1 : Scaling doesnt work for y axis

var xScale =
    d3.scaleBand() // Calling scaling function
        .domain(d3.range(dataset.length)) // Input domain 
        .rangeRound([0, w]) // Ouput range of screen rangeround() rounds the numbers into whole values
        .paddingInner(0.03);
var yScale =
    d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .rangeRound([0, h])



d3.select("#Update1") // if using id remember to add # before 
    .on("click", function () {
       // var dataset = [24, 10, 29, 19, 8, 15, 20]; // number of data points

       var numValues = dataset.length
            dataset = [];
            for(var i = 0; i < numValues; i++){
                var newNumber = Math.floor(Math.random() * Maxvalues);
                dataset.push(newNumber);
            }

        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .duration(500) // keeps this
            .delay(50)
            .attr("x", function (d, i) {
                return xScale(i);

            }).attr("y", function (d) {
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return yScale(d);
            })
    })

d3.select("#Transition_1")
    .on("click", function () {
     //   var dataset = [14, 12, 19, 9, 17, 25, 10]; // number of data points
     var numValues = dataset.length
            dataset = [];
            for(var i = 0; i < numValues; i++){
                var newNumber = Math.floor(Math.random() * Maxvalues);
                dataset.push(newNumber);
            }
        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .duration(500) // keeps this
            .delay(function(d,i){return i * 100;})
            .ease(d3.easeBounceOut) // Bounce easing, like a rubber ball.
            .attr("x", function (d, i) {
                return xScale(i);

            }).attr("y", function (d) {
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return yScale(d);
            })
    })

    d3.select("#Transition_2")
    .on("click", function () {
      //  var dataset = [34, 22, 1, 19, 37, 15,23]; // number of data points
      var numValues = dataset.length
            dataset = [];
            for(var i = 0; i < numValues; i++){
                var newNumber = Math.floor(Math.random() * Maxvalues);
                dataset.push(newNumber);
            }
        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .duration(500) // keeps this
            .delay(function(d,i){return i * 100;})
            .ease(d3.easeBackIn.overshoot(1.7)) // Anticipatory easing, like a dancer bending his knees before jumping.
            .attr("x", function (d, i) {
                return xScale(i);

            }).attr("y", function (d) {
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) {
                return yScale(d);
            })
    })



svg.selectAll("rect").data(dataset).enter().append("rect")
    .attr("x", function (d, i) {
        return xScale(i);

    }).attr("y", function (d) {
        return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
        return yScale(d);
    }).style('fill', "rgb(110, 162, 245)") 