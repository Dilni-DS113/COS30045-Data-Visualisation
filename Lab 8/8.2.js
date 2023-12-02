var w = 600;
var h = 300;

var color = d3.scaleQuantize().range(['#f1eef6', '#d7b5d8', '#df65b0', '#dd1c77', '#980043'])
var projection = d3.geoMercator().center([145, -36.5]).translate([w / 2, h / 2]).scale(2450);

var path = d3.geoPath().projection(projection);
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

d3.csv("VIC_LGA_unemployment.csv").then(function(data) {
    color.domain([
        d3.min(data, function (d) { return d.unemployed; }), 
        d3.max(data, function (d) { return d.unemployed; })
    ]);

    d3.json("LGA_VIC.json").then(function (json) {
        for (var i = 0; i < data.length; i++) {
            var dataState = data[i].LGA;
            var dataValue = parseFloat(data[i].unemployed);

            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.LGA_name;
              
                if (dataState == jsonState) {
                  json.features[j].properties.unemployed = dataValue;
                  break;
                }
              }
        }
        
        d3.csv("VIC_city.csv").then(function(data){
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d){
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function(d){
                    return projection([d.lon, d.lat])[1];
                })
                .attr("r",5)
                .style("fill","rbg(162,255,122)")
                .style("stroke","grey")
                .style("stroke-width",0.25)
                .style("opacity",0.75)
                .append("title")
                .text(function(d){
                    return d.place + " : Pop. " + formatAsThousands(d.population);
                });
        });

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                var value = d.properties.unemployed;
                if (value) {
                    return color(value);
                }
                else {
                    console.log("No value for " + d.properties.LGA_name);
                    return "#ccc";
                }
            });
    });
});







