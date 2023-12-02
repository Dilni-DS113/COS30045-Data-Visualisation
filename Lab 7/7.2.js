var w = 600;
var h = 300;
var padding = 60;
var dataset = [23, 12, 4, 6, 9, 10, 20]
var outerRadius = Math.min(w, h) / 2; // changing this from w/2 to decrease the size 
var innerRadius = 0;
var color = d3.scaleOrdinal(d3.schemeCategory10);

var arc = d3.arc().outerRadius(outerRadius).innerRadius(innerRadius);

var pie = d3.pie();

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
console.log(pie(dataset));

var arcs = svg.selectAll("g.arc").data(pie(dataset)).enter().append("g").attr("class", "arc")
 .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")"); // changin this prevents only half the chart from appearing 

arcs.append("path").attr("fill", function (d, i) {
    return color(i);

})

.attr("d", function (d, i) {
    return arc(d, i);

})

arcs.append("text").text(function(d){
    return d.value;
}).attr("transform", function(d){
    return "translate(" + arc.centroid(d) + ")";
})