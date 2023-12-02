var w = 500; // width of SVG space 
        var h = 100; // height of SVG space
        var scale = 4; //scale to make sure graph uses all svg space
        var bar_padding = 1; // space between bars 
        var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
        
        d3.csv("Task_2.4_data.csv").then(function(data){ // Enables use of the cvs file data 
            console.log(data); // checking if data was retrived 
            wombatSightings = data; // saves data from cvs file to  wombatSightings variable
           barChart(wombatSightings); // pass  wombatSightings variable to barChart function
        })

        // Function draws the bar graph using the same method as 2.2 but uses  wombatSightings that dataset 
        function barChart(){
            svg.selectAll("rect").data(wombatSightings).enter().append("rect")
            .attr("x", function (d, i) {
                return i * (w / wombatSightings.length); // exchanging variable dataset for wombatSightings

            }).attr("y", function (d) {
                return (h - (d.wombats * scale)); // In addition remember to id which coloum the data comes from hence d.wombats
            })
            .attr("width", (w / wombatSightings.length) - bar_padding) // exchanging variable dataset for wombatSightings
            .attr("height", function (d) {
                return d.wombats * scale; // In addition remember to id which coloum the data comes from hence d.wombats
            }).style('fill', function(d){
                if(d.wombats <= 10){ // changes colour depending on data value range 
                    return "pink"
                }
                else{
                    return "rgb(110, 162, 245)"
                }

            }) 
        }