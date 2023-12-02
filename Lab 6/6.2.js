var w = 500;
var scale = 4;
var h = 300;
var dataset = [14, 5, 26, 23, 9, 15, 27];
Maxvalues = 25
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var xScale = d3.scaleBand() // Calling scaling function
        .domain(d3.range(dataset.length)) // Input domain 
        .rangeRound([0, w]) // Ouput range of screen rangeround() rounds the numbers into whole values
        .paddingInner(0.03);
        
var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .rangeRound([0, h])



d3.select("#Add") // if using id remember to add # before 
    .on("click", function () {
        var newNumber = Math.floor(Math.random() * Maxvalues);
        dataset.push(newNumber);
        xScale.domain(d3.range(dataset.length)); // Matching length of the data set to the width of the chart 

        var bar = svg.selectAll("rect").data(dataset)
        bar.enter().append("rect").attr("x", w).attr("y", function (d) {
            return h - yScale(d);
        })
            .on("mouseover", function (event, d) {
                var xp = parseFloat(d3.select(this).attr("x"))
                var yp = parseFloat(d3.select(this).attr("y"));
                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", xp)
                    .attr("y", yp)
                    .text(d)
                    .style("padding-top", "50px")
                    .style("padding-right", "30px")
                    .style("padding-bottom", "50px")
                    .style("padding-left", "80px")
                    .style("font-family", "sans-serif")
                    .style("font-size", "11px")
                    .style("font-weight", "bold")
                    .style('fill', "black")
                    .text(d)
                    ;
            })

            svg.selectAll("rect").data(dataset).enter().append("rect")
            .attr("x", function (d, i) { return xScale(i); })
            .attr("y", function (d) { return h - yScale(d); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return yScale(d); }).style('fill', "rgb(110, 162, 245)")
            .on("mouseover", function () { d3.select(this).style('fill', "rgb(255, 229, 180)") })
            .on("mouseout", function () { d3.select(this).style('fill', "rgb(110, 162, 245)") })
            .on("mouseout", function () {
                d3.select('#tooltip').remove();
            })
            .merge(bar)
            .transition()
            .duration(500)
            .delay(function (d, i) { return i * 100; })
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
        var bar = svg.selectAll("rect").data(dataset)
        bar.exit()
            .transition()
            .duration(500) // keeps this
            .delay(50)
            .attr("x", w).remove();

    })
d3.select("#sort")
    .on("click",function(){
        
        var sortbars = function(){
            sortorder = false
            sortorder = !sortorder

            svg.selectAll("rect").sort(function(a,b){
                if(sortorder){
                 return d3.ascending(a, b);   
                }else{
                    return d3.descending(a, b);
                }
            }).transition("sortBars")
              .duration(1000)
              .attr("x",function(d, i){
                return xScale(i);
              })
        }
        sortbars();
    })


svg.selectAll("rect").data(dataset).enter().append("rect")
    .attr("x", function (d, i) { return xScale(i); })
    .attr("y", function (d) { return h - yScale(d); })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) { return yScale(d); }).style('fill', "rgb(110, 162, 245)")
    .on("mouseover", function () { d3.select(this).style('fill', "rgb(255, 229, 180)") })
    .on("mouseout", function () { d3.select(this).style('fill', "rgb(110, 162, 245)") })

svg.selectAll("rect").data(dataset).enter().append("rect")
    .attr("x", function (d, i) { return xScale(i); })
    .attr("y", function (d) { return h - yScale(d); })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) { return yScale(d); }).style('fill', "rgb(110, 162, 245)")
    .on("mouseover", function (event, d) {
        var xp = parseFloat(d3.select(this).attr("x"))
        var yp = parseFloat(d3.select(this).attr("y"));
        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", xp)
            .attr("y", yp)
            .style("padding-top", "50px")
            .style("padding-right", "30px")
            .style("padding-bottom", "50px")
            .style("padding-left", "80px")
            .style("font-family", "sans-serif")
            .style("font-size", "11px")
            .style("font-weight", "bold")
            .style('fill', "black")
            .text(d);
    }).on("mouseout", function () { d3.select('#tooltip').remove(); })


