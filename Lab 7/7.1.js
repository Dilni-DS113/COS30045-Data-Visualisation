var w = 600;
var h = 300;
var padding = 60;
var dataset;

d3.csv("Unemployment_78-95.csv", function (d) {
    return {
        date: new Date(+d.year, +d.month - 1),
        number: +d.number
    };
}).then(function (data) {
    dataset = data;
    lineChart(dataset);
    console.table(dataset, ["date", "number"]);
})


function lineChart(dataset) {
    var svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h);


    xScale = d3.scaleTime()
        .domain([d3.min(dataset, function (d) { return d.date; }),
        d3.max(dataset, function (d) { return d.date; })])
        .range([padding, w - padding]);

    yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) { return d.number; })])
        .range([h - padding, padding]);

    // ******Area graph *****
    area = d3.area()
        .x(function (d) { return xScale(d.date); })

        // base line for area shape
        .y0(function () { return yScale.range()[0]; })

        .y1(function (d) { return yScale(d.number); });

    svg.append("path")
        .datum(dataset)
        .attr("class", "area")
        .attr("d", area);

    // ******Line graph *****
    // line = d3.line()
    //     .x(function (d) { return xScale(d.date); })
    //     .y(function (d) { return yScale(d.number); });


    // svg.append("path")
    // .datum(dataset)
    // .attr("class", "line")
    // .attr("d", line);

    //**************Axis**************    

    var xAxis = d3.axisBottom().ticks(5).scale(xScale);
    svg.append("g").attr("transform", "translate(0," + (h - padding) + ")").call(xAxis);

    var yAxis = d3.axisLeft().ticks(5).scale(yScale);
    svg.append("g").attr("transform", "translate(" + padding + ",0)").call(yAxis);

    // ***** 7.1 annotation *****  
    svg.append("line")
        .attr("class", "line halfMilMark")
        // start of line 
        .attr("x1", padding)
        .attr("y1", yScale(500000))
        // end of line 
        .attr("x2", w)
        .attr("y2", yScale(500000))

    svg.append("text")
        .attr("class", "halfMilLabel")
        .attr("x", padding + 10)
        .attr("y", yScale(500000) - 7)
        .text("Half a Million unemployed")






}
