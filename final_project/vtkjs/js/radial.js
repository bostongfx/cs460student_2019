var svg, svg2;
$(document).ready( function(){
  // Create SVG
  var width = 300;
  var height = 300;
  svg = d3.select('body').append('svg');
  svg2 = d3.select('body').append('svg');
  svg.attr('class', 'one');
  svg2.attr('class', 'two');
  svg.attr('width', width).attr('height', height);
  svg2.attr('width', width).attr('height', height);
  r_render(clusters[0]);
});

col_names = [
  'Norm. Signal Est. Err.', 
  'Est. Uncertainty', 
  'RTOP1', 
  'RTOP2', 
  'RTAP1', 
  'RTAP2', 
  'RTPP1', 
  'RTPP2', 
  'Signal Mean'
];

// loop through arrays (getarraynames(0))

num_cols = col_names.length;
CCX = 150;
CCY = 150;
CRAD = 100;

function r_load_file(reader, what, svg) 
{
  reader.setUrl(what).then(function()
  {
    polydata = reader.getOutputData();
    data = 
    {
      lines: []
    };
    ls  = polydata.getLines().getData();
    cs  = polydata.getPoints().getData();
    num_points = 0;
    line = null;
    for (i = 0; i < ls.length; i++)
    {
      if(i == num_points) 
      {
        if (line)
        {
          data.lines.push(line);
        }
        line = [];
        num_points += ls[i] + 1;
      } 
      else
      {
        point =
        {
          x: cs[3 * ls[i]],
          y: cs[3 * ls[i] + 1],
          z: cs[3 * ls[i] + 2],
          value: new Array(num_cols)
        };
        for(k = 0; k < num_cols; k++)
        {
          point.value[k] = polydata.getPointData().getArrays()[k].getData()[ls[i]];
        }
        line.push(point);
      }
    }
    data.lines.push(line);

    // Determine axis endpoint
    function endpoint(r, angle, x, y)
    {
      u = r * Math.cos(angle) + x;
      v = r * Math.sin(angle) + y;
      return [u, v];
    }         
    // Render circles
    var circle = svg.append('circle');
    circle.attr('cx', CCX).attr('cy', CCY).attr('r', CRAD).attr('stroke', '#efefef').attr('fill', '#fafafa');
    circle = svg.append('circle');
    circle.attr('cx', CCX).attr('cy', CCY).attr('r', CRAD * 0.25).attr('stroke', '#efefef').attr('fill', 'none');
    circle = svg.append('circle');
    circle.attr('cx', CCX).attr('cy', CCY).attr('r', CRAD * 0.5).attr('stroke', '#efefef').attr('fill', 'none');
    circle = svg.append('circle');
    circle.attr('cx', CCX).attr('cy', CCY).attr('r', CRAD * 0.75).attr('stroke', '#efefef').attr('fill', 'none');
    // Render axes
    for(k = 0; k < num_cols; k++)
    {
      angle = -Math.PI / 2 + k * (Math.PI * 2 / num_cols);
      uv = endpoint(CRAD, angle, CCX, CCY);
      var line = svg.append('line');
      line.attr('x1', CCX).attr('y1', CCY).attr('x2', uv[0]).attr('y2', uv[1])
      .attr('stroke', '#666')
      .attr('stroke-width', '1');

      var label = svg.append("text");
      label.attr("class", "legend")
      .style("font-size", "11px")
      .style("font-family", 'Verdana')
      .attr("text-anchor", "middle")
      .attr("x", uv[0])
      .attr("y", uv[1])
      .text(col_names[k]);
      //.attr('stroke-dasharray', '1')
      // Offset for the labels
      if(uv[0] > CCX)
      {
        label.attr('dx', 25);
      }
      if(uv[1] > CCY)
      {
        label.attr('dy', 25);
      }
      if(uv[0] < CCX)
      {
        label.attr('dx', -25);
      }
      if(uv[1] < CCY)
      {
        label.attr('dy', -25);
      }

      // Render ticks on axes
      for(t = 0.25; t < 1; t += 0.25)
      {
        d1 = t + 0.0025;
        d2 = t - 0.0025;
        t1 = endpoint(d1 * CRAD, angle, CCX, CCY);
        t2 = endpoint(d2 * CRAD, angle, CCX, CCY);
        var tick = svg.append('line');
        tick.attr('x1', t1[0]).attr('y1', t1[1]).attr('x2', t2[0]).attr('y2', t2[1])
        .attr('stroke', '#666')
        .attr('stroke-width', '7');
      }            
    }      
    // Calculate means per line and for all lines (for value see above)
    var mean = new Array(num_cols);
    var count = new Array(num_cols);
    for(k = 0; k < num_cols; k++)
    {
      mean[k] = 0;
      count[k] = 0;
    }
    for(j = 0; j < data.lines.length; j++)
    {
      var line = data.lines[j];
      for(i = 0; i < line.length; i++)
      {
        for(k = 0; k < num_cols; k++)
        {
          if (Number.isNaN(line[i].value[k]))
          {
            continue;
          } 
          mean[k] += line[i].value[k];
          count[k]++;
        }
      }
    }
    var path = d3.path();
    for(k = 0; k < num_cols; k++)
    {
      mean[k] /= count[k];
      // Draw line
      min = polydata.getPointData().getArrays()[k].getRange()[0];
      max = polydata.getPointData().getArrays()[k].getRange()[1];
      a = mean[k];
      d = (a - min) / (max - min);
      angle = -Math.PI / 2 + k * (Math.PI * 2 / num_cols);
      uv = endpoint(d * CRAD, angle, CCX, CCY);
      if(k == 0)
      {
        path.moveTo(uv[0], uv[1]);
      } else 
      {
        path.lineTo(uv[0], uv[1]);
      }
    }
    path.closePath();
    var p = svg.append('path');
    p.attr('d', path).attr('stroke', 'orange').attr('fill', '#FF9900aa').attr('stroke-width', '2');
  }.bind(reader));
}

function r_render(cluster) 
{
  // clear svg when switching cluster
  svg.selectAll('*').remove();
  svg2.selectAll('*').remove();
  reader = vtk.IO.XML.vtkXMLPolyDataReader.newInstance();
  r_load_file(reader, get_data_path('101', cluster, 'vtp'), svg);
  r_load_file(reader, get_data_path('201', cluster, 'vtp'), svg2);
}