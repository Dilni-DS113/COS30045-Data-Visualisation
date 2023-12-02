
      var w = 500; // width of SVG space 
      var h = 300; // height of SVG space (Changed from 100 as points where squished)
      var padding = 35;
      // Random data 
      var dataset = [];
      var datapoints = 50;
      var xrange = Math.random() * 1000;
      var yrange = Math.random() * 1000;
        for(var i = 0; i < datapoints; i++ ){
            var newnum1 = Math.floor(Math.random() * xrange);
            var newnum2 = Math.floor(Math.random() * yrange);
            dataset.push([newnum1,newnum2]);
        }
        var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
     
      //************** Lab task 3.1**************
      // Cal the max and min of the x input of the data set range (or domain range)
      var xScale = d3.scaleLinear().domain([d3.min(dataset, function(d){return d[0];}), d3.max(dataset, function(d) {return d[0];})])
      .range([padding ,w - padding]); // Sets the range to the width for svg canvous (x axis)

      // Cal the max and min of the y input of the data set range 
      var yScale = d3.scaleLinear().domain([d3.min(dataset, function(d){return d[1];}), d3.max(dataset, function(d){return d[1];})])
      .range([h - padding,padding ]); // Sets the range to the hight for svg canvous (y axis)

      svg.selectAll("circle").data(dataset).enter().append("circle")
          .attr("cx", function (d) {
              return xScale(d[0]); // returning the x point in each array of the dataset
          }) 
          .attr("cy", function (d) {
              return yScale(d[1]); // returning the y point in each array of the dataset
          })
          .attr("r", 5) // the radius if a point in the scatter plot graph
          .style('fill', "rgb(250, 42, 91)")
      
          svg.selectAll("text").data(dataset).enter().append("text")
          .text(function (d) {
              return d[0] + "," + d[1]; // prints out the x and y value of the point
          })
          .attr("x", function (d) {
              return xScale(d[0]); // x corridinate point of the text x corridiant point
          })
          .attr("y",function(d){
              return yScale(d[1]); // y corridinate point of the text y corridiant point
          })
          .style('fill', "black")
          .style("font-family","sans-serif")
          .style("font-size","11px")
          
    //************** Lab task 3.2**************    
    var xAxis = d3.axisBottom().ticks(5).scale(xScale);
    svg.append("g").attr("transform", "translate(0, "+ (h - padding) +")").call(xAxis);

    var yAxis = d3.axisLeft().ticks(10).scale(yScale);
    svg.append("g").attr("transform", "translate(" + padding + ",0)").call(yAxis);