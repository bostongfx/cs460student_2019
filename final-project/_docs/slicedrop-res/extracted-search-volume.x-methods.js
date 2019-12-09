

Searching 74 files for "volume."

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\index.html:
  <script type='text/javascript' src='js/jquery.idTabs.js'></script>
  <script type='text/javascript' src='js/jquery.sidebar.js'></script>
 <script type='text/javascript' src='js/jquery.sidebar.volume.js'></script>
  <script type='text/javascript' src='js/jquery.sidebar.mesh.js'></script>
  <script type='text/javascript' src='js/jquery.sidebar.fibers.js'></script>

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\js\x.controller.js:
  
    // VOLUME
   if (_data.volume.file.length > 0) {
  
      // update threshold slider
     jQuery('#threshold-volume').dragslider("option", "max", volume.max);
     jQuery('#threshold-volume').dragslider("option", "min", volume.min);
      jQuery('#threshold-volume').dragslider("option", "values",
         [volume.min, volume.max]);
  
      // update window/level slider
     jQuery('#windowlevel-volume').dragslider("option", "max", volume.max);
     jQuery('#windowlevel-volume').dragslider("option", "min", volume.min);
      jQuery('#windowlevel-volume').dragslider("option", "values",
         [volume.min, volume.max/2]);
  
     volume.windowHigh = volume.max/2;
  
      // update 3d opacity
      jQuery('#opacity-volume').slider("option", "value", 20);
     volume.opacity = 0.2; // re-propagate
     volume.modified();
  
      // update 2d slice sliders
     var dim = volume.range;
  
      // ax
   ..
      jQuery("#blue_slider").slider("option", "min", 0);
      jQuery("#blue_slider").slider("option", "max", dim[2] - 1);
     jQuery("#blue_slider").slider("option", "value", volume.indexZ);
  
      // sag
   ..
      jQuery("#red_slider").slider("option", "min", 0);
      jQuery("#red_slider").slider("option", "max", dim[0] - 1);
     jQuery("#red_slider").slider("option", "value", volume.indexX);
  
      // cor
   ..
      jQuery("#green_slider").slider("option", "min", 0);
      jQuery("#green_slider").slider("option", "max", dim[1] - 1);
     jQuery("#green_slider").slider("option", "value", volume.indexY);
  
  
   ..
  
      jQuery('#opacity-labelmap').slider("option", "value", 40);
     volume.labelmap.opacity = 0.4; // re-propagate
  
  
  ...
  
    if (bool) {
     volume.lowerThreshold = (volume.min + (volume.max/10));
    }
  
   volume.volumeRendering = bool;
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'volumeRendering', volume.volumeRendering), 150);
    }
  
  ...
    }
  
   volume.lowerThreshold = ui.values[0];
   volume.upperThreshold = ui.values[1];
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'lowerThreshold', volume.lowerThreshold), 150);
      clearTimeout(RT._updater2);
     RT._updater2 = setTimeout(RT.pushVolume.bind(RT, 'upperThreshold', volume.upperThreshold), 150);
  
    }
  ...
    }
  
   volume.windowLow = ui.values[0];
   volume.windowHigh = ui.values[1];
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'windowLow', volume.windowLow), 150);
      clearTimeout(RT._updater2);
     RT._updater2 = setTimeout(RT.pushVolume.bind(RT, 'windowHigh', volume.windowHigh), 150);
  
    }
  ...
    }
  
   volume.opacity = ui.value / 100;
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'opacity', volume.opacity), 150);
  
    }
  ...
    }
  
   volume.indexX = Math
        .floor(jQuery('#red_slider').slider("option", "value"));
  
  ...
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexY', volume.indexX), 150);
  
    }
  ...
    }
  
   volume.indexZ = Math.floor(jQuery('#blue_slider').slider("option", "value"));
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexX', volume.indexZ), 150);
  
    }
  ...
    }
  
   volume.indexY = Math.floor(jQuery('#green_slider').slider("option", "value"));
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexPA', volume.indexY), 150);
  
    }
  ...
    }
  
   volume.maxColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'maxColor', volume.maxColor), 150);
  
    }
  ...
    }
  
   volume.minColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'minColor', volume.minColor), 150);
  
    }
  ...
    }
  
   volume.labelmap.opacity = ui.value / 100;
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushLabelmap.bind(RT, 'opacity', volume.labelmap.opacity), 150);
  
    }
  ...
    }
  
   volume.labelmap.visible = !volume.labelmap.visible;
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushLabelmap.bind(RT, 'visible', volume.labelmap.visible), 150);
  
    }

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\js\x.examples.js:
      // it's a volume
      volume = new X.volume();
     volume.file = _file;
     _data.volume.file = [volume.file];
      ren3d.add(volume);
  
   ..
      // all files were loaded so re-attach the filedata so the
      // dropbox sharing can work
       if (_data.volume.file.length > 0) {
  
         _data.volume.filedata = [volume.filedata];
  
        }

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\js\x.realtime.js:
      RT._link.bind('client-volume-sync', function(data) {
  
       if (_data.volume.file.length == 0) {
          return;
        }
   ..
  
        // propagate back to UI
       jQuery("#yellow_slider").slider("option", "value", volume.indexLR);
       jQuery("#red_slider").slider("option", "value", volume.indexIS);
       jQuery("#green_slider").slider("option", "value", volume.indexPA);
  
       if (volume.volumeRendering) {
          jQuery('#slicing').removeClass('ui-state-active');
          jQuery('#volumerendering').addClass('ui-state-active');
   ..
        }
  
       jQuery('#opacity-volume').slider("option", "value", volume.opacity * 100);
       jQuery('#threshold-volume').dragslider("option", "values", [volume.lowerThreshold, volume.upperThreshold]);
       jQuery('#windowlevel-volume').dragslider("option", "values", [volume.windowLow, volume.windowHigh]);
  
       var bgColor = ((1 << 24) + (volume.minColor[0] * 255 << 16) +
           (volume.minColor[1] * 255 << 8) + volume.minColor[2] * 255)
            .toString(16).substr(1);
  
       var fgColor = ((1 << 24) + (volume.maxColor[0] * 255 << 16) +
           (volume.maxColor[1] * 255 << 8) + volume.maxColor[2] * 255)
            .toString(16).substr(1);
  
   ..
        }
  
       volume.labelmap[data.target] = data.value;
  
        // propagate back to UI
       if (!volume.labelmap.visible) {
          $('#labelmapvisibility').removeClass('show-icon');
          $('#labelmapvisibility').addClass('hide-icon');
   ..
          $('#labelmapvisibility').removeClass('hide-icon');
        }
       jQuery('#opacity-labelmap').slider("option", "value", volume.labelmap.opacity * 100);
  
      });

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\js\x.rendering.js:
      window.console.log('Loading completed.');
  
     if (_data.volume.file.length > 0) {
  
        // show any volume also in 2d
  ...
    var _updateThreeDSag = function() {
  
     if (_data.volume.file.length > 0) {
  
       jQuery('#red_slider').slider("option", "value",volume.indexX);
       // jQuery('#red_slider').slider("option", "value",volume.indexY);
       // jQuery('#green_slider').slider("option", "value",volume.indexZ);
  
        if (RT.linked) {
  
          clearTimeout(RT._updater);
         RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexX', volume.indexX), 150);
  
        }
  ...
    var _updateThreeDAx = function() {
  
     if (_data.volume.file.length > 0) {
  
       jQuery('#blue_slider').slider("option", "value",volume.indexZ);
  
        if (RT.linked) {
  
          clearTimeout(RT._updater);
         RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexZ', volume.indexZ), 150);
  
        }
  ...
    var _updateThreeDCor = function() {
  
     if (_data.volume.file.length > 0) {
  
       jQuery('#green_slider').slider("option", "value",volume.indexY);
  
        if (RT.linked) {
  
          clearTimeout(RT._updater);
         RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexY', volume.indexY), 150);
  
        }
  ...
    var _updateWLSlider = function() {
  
     jQuery('#windowlevel-volume').dragslider("option", "values", [volume.windowLow, volume.windowHigh]);
  
      if (RT.linked) {
  
        clearTimeout(RT._updater);
       RT._updater = setTimeout(RT.pushVolume.bind(RT, 'windowLow', volume.windowLow), 150);
        clearTimeout(RT._updater2);
       RT._updater2 = setTimeout(RT.pushVolume.bind(RT, 'windowHigh', volume.windowHigh), 150);
  
      }
  ...
      var _smaller_volume = data['volume']['file'][0];
      var _smaller_data = data['volume']['filedata'][0];
     if (_smaller_volume.size < data['volume']['file'][1]) {
  
        // this is the smaller volume so configure it as a labelmap
  ...
     // we have a volume
     volume = new X.volume();
    volume.file = data['volume']['file'].map(function(v) {
  
       return v.name;
  
     });
    volume.filedata = data['volume']['filedata'];
     var colortableParent = volume;
  
  ...
  
       // we have a label map
      volume.labelmap.file = data['labelmap']['file'].map(function(v) {
  
         return v.name;
  
       });
      volume.labelmap.filedata = data['labelmap']['filedata'];
      colortableParent = volume.labelmap;
  
     }
  
     // add callbacks for computing
    volume.onComputing = function(direction) {
       //console.log('computing', direction);
     }
  
    volume.onComputingProgress = function(value) {
       //console.log(value);
     }
  
    volume.onComputingEnd = function(direction) {
       //console.log('computing end', direction);
     }
  ...
  
  
   jQuery('#red_slider').slider("option", "value",volume.indexX);
  
   jQuery('#green_slider').slider("option", "value",volume.indexY);
  
   jQuery('#blue_slider').slider("option", "value",volume.indexZ);
  
  

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\js\x.scene.js:
  
              if (typeof scene.volume != 'undefined' &&
                 typeof scene.volume.file != 'undefined') {
               if (scene.volume.file.length > 0) {
  
                  volume = new X.volume();
                 volume.file = scene.volume.file;
                 _data.volume.file = volume.file;
  
                  if (typeof scene.labelmap != 'undefined' &&
   ..
                    if (scene.labelmap.file.length > 0) {
  
                     volume.labelmap.file = scene.labelmap.file[0];
                     _data.labelmap.file = volume.labelmap.file;
  
                      if (typeof scene.colortable != 'undefined' &&
   ..
                        if (scene.colortable.file.length > 0) {
  
                         volume.labelmap.colortable.file = scene.colortable.file[0];
                         _data.colortable.file = volume.labelmap.colortable.file;
  
                        }
   ..
                //
                if (typeof scene.volume != 'undefined' &&
                   typeof scene.volume.file != 'undefined') {
                 if (scene.volume.file.length > 0) {
  
                   if (typeof scene.volume.transform != 'undefined') {
                      // the transform
                     volume.transform.matrix = new Float32Array(
                         scene.volume.transform);
                    }
  
                   if (typeof scene.volume.indexIS != 'undefined') {
                     volume.indexIS = scene.volume.indexIS;
                    }
                   if (typeof scene.volume.indexLR != 'undefined') {
                     volume.indexLR = scene.volume.indexLR;
                    }
                   if (typeof scene.volume.indexPA != 'undefined') {
                     volume.indexPA = scene.volume.indexPA;
                    }
                    jQuery("#yellow_slider").slider("option", "value",
                       volume.indexLR);
                    jQuery("#red_slider")
                       .slider("option", "value", volume.indexAX);
                    jQuery("#green_slider").slider("option", "value",
                       volume.indexPA);
  
                   if (typeof scene.volume.volumeRendering != 'undefined') {
                     if (scene.volume.volumeRendering) {
                       volume.volumeRendering = true;
                        jQuery('#slicing').removeClass('ui-state-active');
                        jQuery('#volumerendering').addClass('ui-state-active');
  ...
                        jQuery('#opacity-volume').show();
  
                       if (typeof scene.volume.opacity != 'undefined') {
                         volume.opacity = scene.volume.opacity;
                        }
  
  ...
                    }
                    jQuery('#opacity-volume').slider("option", "value",
                       volume.opacity * 100);
  
                   if (typeof scene.volume.lowerThreshold != 'undefined') {
                     volume.lowerThreshold = scene.volume.lowerThreshold;
                    }
                   if (typeof scene.volume.upperThreshold != 'undefined') {
                     volume.upperThreshold = scene.volume.upperThreshold;
                    }
                    jQuery('#threshold-volume').dragslider("option", "values",
                       [volume.lowerThreshold, volume.upperThreshold]);
  
                   if (typeof scene.volume.windowLow != 'undefined') {
                     volume.windowLow = scene.volume.windowLow;
                    }
                   if (typeof scene.volume.windowHigh != 'undefined') {
                     volume.windowHigh = scene.volume.windowHigh;
                    }
                    jQuery('#windowlevel-volume').dragslider("option", "values",
                       [volume.windowLow, volume.windowHigh]);
  
                   if (typeof scene.volume.minColor != 'undefined') {
                     volume.minColor = scene.volume.minColor;
                    }
                   var bgColor = ((1 << 24) + (volume.minColor[0] * 255 << 16) +
                       (volume.minColor[1] * 255 << 8) + volume.minColor[2] * 255)
                        .toString(16).substr(1);
  
                   if (typeof scene.volume.maxColor != 'undefined') {
                     volume.maxColor = scene.volume.maxColor;
                    }
                   var fgColor = ((1 << 24) + (volume.maxColor[0] * 255 << 16) +
                       (volume.maxColor[1] * 255 << 8) + volume.maxColor[2] * 255)
                        .toString(16).substr(1);
  
  ...
  
                    if (typeof scene.labelmap.visible != 'undefined') {
                     volume.labelmap.visible = scene.labelmap.visible;
                    }
  
                   if (!volume.labelmap.visible) {
                      $('#labelmapvisibility').removeClass('show-icon');
                      $('#labelmapvisibility').addClass('hide-icon');
  ...
  
                    if (typeof scene.labelmap.opacity != 'undefined') {
                     volume.labelmap.opacity = scene.labelmap.opacity;
                    }
                    jQuery('#opacity-labelmap').slider("option", "value",
                       volume.labelmap.opacity * 100);
                  }
                }
  ...
                // dropbox sharing can work
                if (typeof scene.volume != 'undefined' &&
                   typeof scene.volume.file != 'undefined') {
                 if (scene.volume.file.length > 0) {
  
                   _data.volume.filedata = volume.filedata;
  
                  }
  ...
                  if (scene.labelmap.file.length > 0) {
  
                   _data.labelmap.filedata = volume.labelmap.filedata;
  
                  }
  ...
                  if (scene.colortable.file.length > 0) {
  
                   _data.colortable.filedata = volume.labelmap.colortable.filedata;
  
                  }

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\js\x.share.js:
  
    // store properties regarding volume, mesh, fibers
   if ( _data.volume.file.length > 0 ) {
  
     _scene.volume.indexIS = volume.indexIS;
     _scene.volume.indexLR = volume.indexLR;
     _scene.volume.indexPA = volume.indexPA;
     _scene.volume.lowerThreshold = volume.lowerThreshold;
     _scene.volume.upperThreshold = volume.upperThreshold;
     _scene.volume.opacity = volume.opacity;
     _scene.volume.windowLow = volume.windowLow;
     _scene.volume.windowHigh = volume.windowHigh;
     _scene.volume.minColor = volume.minColor;
     _scene.volume.maxColor = volume.maxColor;
     _scene.volume.volumeRendering = volume.volumeRendering;
     _scene.volume.transform = Array.apply([], volume.transform.matrix);
  
    }
  
    if ( _data.labelmap.file.length > 0 ) {
     _scene.labelmap.visible = volume.labelmap.visible;
     _scene.labelmap.opacity = volume.labelmap.opacity;
    }
  

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\js\xtk.js:
  this.e.xa.Ja);this.e.c[b].c[e]=k;this.e.c[b].q(q)}j=We(j,this.b[b].Fa,this.b[b].i,this.b[b].w,this.ma,this.$,this,q,t);j.c[0].O=u;this.L&&(j.e=j.G,j.e=this.e.c[b].c[e].G);a.c[e]=j}a.c[e].O=q}jf(this,0.75);setTimeout(function(){for(e=3*d;e<c;e++){if(a.c[e]==t){var j=Nc();j[0]=this.b[b].k[0][0][0]+this.b[b].B[0]*e;j[1]=this.b[b].k[0][0][1]+this.b[b].B[1]*e;j[2]=this.b[b].k[0][0][2]+this.b[b].B[2]*e;if(this.L){var k=We(j,this.b[b].Fa,this.b[b].i,this.b[b].w,this.ma,this.e.$,this.e,this.e.L,this.e.xa.Ja);
  this.e.c[b].c[e]=k;this.e.c[b].q(q)}j=We(j,this.b[b].Fa,this.b[b].i,this.b[b].w,this.ma,this.$,this,q,t);j.c[0].O=u;this.L&&(j.e=j.G,j.e=this.e.c[b].c[e].G);a.c[e]=j}a.c[e].O=q}jf(this,1);setTimeout(function(){this.Qd&&this.c[b].q(q);this.X=b;this.j=u;if(this.Qd){var a=new Sd;a.D=this;this.dispatchEvent(a);this.onComputingEnd(b)}this.Qd=u}.bind(this),10)}.bind(this),10)}.bind(this),10)}.bind(this),10)}.bind(a),10)}else{c=a.c[a.X];c.visible=u;var c=a.c[b],e=c.c.length,d;for(d=0;d<e;d++)c.c[d].O=q;
 a.X=b;a.j=u}}function jf(a,b){var c=new Rd;c.yd=b;a.dispatchEvent(c);a.onComputingProgress(100*b)}Q.prototype.Df=aa();Q.prototype.Ff=aa();Q.prototype.Ef=aa();A("X.volume",Q);A("X.volume.prototype.modified",Q.prototype.q);A("X.volume.prototype.destroy",Q.prototype.Ta);A("X.volume.prototype.sliceInfoChanged",Q.prototype.fk);A("X.volume.prototype.onComputing",Q.prototype.Df);A("X.volume.prototype.onComputingProgress",Q.prototype.Ff);A("X.volume.prototype.onComputingEnd",Q.prototype.Ef);function kf(){Y.call(this);this.f="parserOFF"}C(kf,Y);
  kf.prototype.parse=function(a,b,c){function e(){l===d&&m(Error("End of file reached unexpectedly."));for(var a=l;a<d;++a)if(10===f[a]){var b=Te(f,l,a);l=a+1;return b}l=d;return Te(f,l,d-1)}D.Ia(this.f+".parse");this.J=c;var d=c.byteLength,f=Z(this,"uchar",d);c=[];b.h=new V(d);b.n=new V(d);for(var g=b.h,h=b.n,l=0,j=e(),j=("OFF"===j?e():j).split(" "),k=j[0],j=j[1];k--;){var n=e(),n=n.split(" ");c.push([parseFloat(n[0]),parseFloat(n[1]),parseFloat(n[2])])}for(;j--;){var n=e(),n=n.split(" "),s=c[parseInt(n[1],
  10)],k=c[parseInt(n[2],10)],n=c[parseInt(n[3],10)];g.add(s[0],s[1],s[2]);g.add(k[0],k[1],k[2]);g.add(n[0],n[1],n[2]);s=new S(s[0],s[1],s[2]);n=new S(n[0],n[1],n[2]);k=Jc((new S(k[0],k[1],k[2])).wa(s),n.wa(s));k.normalize();h.add(k.x,k.y,k.d);h.add(k.x,k.y,k.d);h.add(k.x,k.y,k.d)}D.Ca(this.f+".parse");c=new md;c.D=b;c.v=a;this.dispatchEvent(c)};A("X.parserOFF",kf);A("X.parserOFF.prototype.parse",kf.prototype.parse);function lf(){Y.call(this);this.f="parserDCM"}C(lf,Y);

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\x\index.html:
  <script type='text/javascript' src='js/jquery.idTabs.js'></script>
  <script type='text/javascript' src='js/jquery.sidebar.js'></script>
 <script type='text/javascript' src='js/jquery.sidebar.volume.js'></script>
  <script type='text/javascript' src='js/jquery.sidebar.mesh.js'></script>
  <script type='text/javascript' src='js/jquery.sidebar.fibers.js'></script>

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\x\js\slicedrop-contains-list.txt:
  js/jquery.sidebar.js:
  js/jquery.sidebar.mesh.js:
 js/jquery.sidebar.volume.js:
  x/LICENSE:
  x/css/frontpage.css:
   ..
  x/js/jquery.sidebar.js:
  x/js/jquery.sidebar.mesh.js:
 x/js/jquery.sidebar.volume.js:
  

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\x\js\x.controller.js:
  
    // VOLUME
   if (_data.volume.file.length > 0) {
  
      // update threshold slider
     jQuery('#threshold-volume').dragslider("option", "max", volume.max);
     jQuery('#threshold-volume').dragslider("option", "min", volume.min);
      jQuery('#threshold-volume').dragslider("option", "values",
         [volume.min, volume.max]);
  
      // update window/level slider
     jQuery('#windowlevel-volume').dragslider("option", "max", volume.max);
     jQuery('#windowlevel-volume').dragslider("option", "min", volume.min);
      jQuery('#windowlevel-volume').dragslider("option", "values",
         [volume.min, volume.max/5]);
  
     volume.windowHigh = volume.max/5;
  
      // update 3d opacity
      jQuery('#opacity-volume').slider("option", "value", 20);
     volume.opacity = 0.2; // re-propagate
     volume.modified();
  
      // update 2d slice sliders
     var dim = volume.dimensionsRAS;
      jQuery("#red_slider").slider("option", "disabled", false);
      jQuery("#red_slider").slider("option", "min", 0);
      jQuery("#red_slider").slider("option", "max", dim[2] - 1);
     jQuery("#red_slider").slider("option", "value", volume.indexIS);
      jQuery("#yellow_slider").slider("option", "disabled", false);
      jQuery("#yellow_slider").slider("option", "min", 0);
      jQuery("#yellow_slider").slider("option", "max", dim[0] - 1);
     jQuery("#yellow_slider").slider("option", "value", volume.indexLR);
      jQuery("#green_slider").slider("option", "disabled", false);
      jQuery("#green_slider").slider("option", "min", 0);
      jQuery("#green_slider").slider("option", "max", dim[1] - 1);
     jQuery("#green_slider").slider("option", "value", volume.indexPA);
  
      jQuery('#volume .menu').removeClass('menuDisabled');
   ..
  
      jQuery('#opacity-labelmap').slider("option", "value", 40);
     volume.labelmap.opacity = 0.4; // re-propagate
  
  
   ..
    }
  
   volume.volumeRendering = bool;
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'volumeRendering', volume.volumeRendering), 150);
    }
  
  ...
    }
  
   volume.lowerThreshold = ui.values[0];
   volume.upperThreshold = ui.values[1];
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'lowerThreshold', volume.lowerThreshold), 150);
      clearTimeout(RT._updater2);
     RT._updater2 = setTimeout(RT.pushVolume.bind(RT, 'upperThreshold', volume.upperThreshold), 150);
  
    }
  ...
    }
  
   volume.windowLow = ui.values[0];
   volume.windowHigh = ui.values[1];
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'windowLow', volume.windowLow), 150);
      clearTimeout(RT._updater2);
     RT._updater2 = setTimeout(RT.pushVolume.bind(RT, 'windowHigh', volume.windowHigh), 150);
  
    }
  ...
    }
  
   volume.opacity = ui.value / 100;
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'opacity', volume.opacity), 150);
  
    }
  ...
    }
  
   volume.indexLR = Math
        .floor(jQuery('#yellow_slider').slider("option", "value"));
  
  ...
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexLR', volume.indexLR), 150);
  
    }
  ...
    }
  
   volume.indexIS = Math.floor(jQuery('#red_slider').slider("option", "value"));
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexIS', volume.indexIS), 150);
  
    }
  ...
    }
  
   volume.indexPA = Math.floor(jQuery('#green_slider').slider("option", "value"));
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexPA', volume.indexPA), 150);
  
    }
  ...
    }
  
   volume.maxColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'maxColor', volume.maxColor), 150);
  
    }
  ...
    }
  
   volume.minColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushVolume.bind(RT, 'minColor', volume.minColor), 150);
  
    }
  ...
    }
  
   volume.labelmap.opacity = ui.value / 100;
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushLabelmap.bind(RT, 'opacity', volume.labelmap.opacity), 150);
  
    }
  ...
    }
  
   volume.labelmap.visible = !volume.labelmap.visible;
  
    if (RT.linked) {
  
      clearTimeout(RT._updater);
     RT._updater = setTimeout(RT.pushLabelmap.bind(RT, 'visible', volume.labelmap.visible), 150);
  
    }

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\x\js\x.examples.js:
      // it's a volume
      volume = new X.volume();
     volume.file = _file;
     _data.volume.file = [volume.file];
      ren3d.add(volume);
  
   ..
      // all files were loaded so re-attach the filedata so the
      // dropbox sharing can work
       if (_data.volume.file.length > 0) {
  
         _data.volume.filedata = [volume.filedata];
  
        }

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\x\js\x.realtime.js:
      RT._link.bind('client-volume-sync', function(data) {
  
       if (_data.volume.file.length == 0) {
          return;
        }
   ..
  
        // propagate back to UI
       jQuery("#yellow_slider").slider("option", "value", volume.indexLR);
       jQuery("#red_slider").slider("option", "value", volume.indexIS);
       jQuery("#green_slider").slider("option", "value", volume.indexPA);
  
       if (volume.volumeRendering) {
          jQuery('#slicing').removeClass('ui-state-active');
          jQuery('#volumerendering').addClass('ui-state-active');
   ..
        }
  
       jQuery('#opacity-volume').slider("option", "value", volume.opacity * 100);
       jQuery('#threshold-volume').dragslider("option", "values", [volume.lowerThreshold, volume.upperThreshold]);
       jQuery('#windowlevel-volume').dragslider("option", "values", [volume.windowLow, volume.windowHigh]);
  
       var bgColor = ((1 << 24) + (volume.minColor[0] * 255 << 16) +
           (volume.minColor[1] * 255 << 8) + volume.minColor[2] * 255)
            .toString(16).substr(1);
  
       var fgColor = ((1 << 24) + (volume.maxColor[0] * 255 << 16) +
           (volume.maxColor[1] * 255 << 8) + volume.maxColor[2] * 255)
            .toString(16).substr(1);
  
   ..
        }
  
       volume.labelmap[data.target] = data.value;
  
        // propagate back to UI
       if (!volume.labelmap.visible) {
          $('#labelmapvisibility').removeClass('show-icon');
          $('#labelmapvisibility').addClass('hide-icon');
   ..
          $('#labelmapvisibility').removeClass('hide-icon');
        }
       jQuery('#opacity-labelmap').slider("option", "value", volume.labelmap.opacity * 100);
  
      });

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\x\js\x.rendering.js:
      window.console.log('Loading completed.');
  
     if (_data.volume.file.length > 0) {
  
        // show any volume also in 2d
  ...
    var _updateThreeDSag = function() {
  
     if (_data.volume.file.length > 0) {
  
       jQuery('#yellow_slider').slider("option", "value",volume.indexLR);
       // jQuery('#red_slider').slider("option", "value",volume.indexY);
       // jQuery('#green_slider').slider("option", "value",volume.indexZ);
  
        if (RT.linked) {
  
          clearTimeout(RT._updater);
         RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexLR', volume.indexLR), 150);
  
        }
  ...
    var _updateThreeDAx = function() {
  
     if (_data.volume.file.length > 0) {
  
       jQuery('#red_slider').slider("option", "value",volume.indexIS);
  
        if (RT.linked) {
  
          clearTimeout(RT._updater);
         RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexIS', volume.indexIS), 150);
  
        }
  ...
    var _updateThreeDCor = function() {
  
     if (_data.volume.file.length > 0) {
  
       jQuery('#green_slider').slider("option", "value",volume.indexPA);
  
        if (RT.linked) {
  
          clearTimeout(RT._updater);
         RT._updater = setTimeout(RT.pushVolume.bind(RT, 'indexPA', volume.indexPA), 150);
  
        }
  ...
    var _updateWLSlider = function() {
  
     jQuery('#windowlevel-volume').dragslider("option", "values", [volume.windowLow, volume.windowHigh]);
  
      if (RT.linked) {
  
        clearTimeout(RT._updater);
       RT._updater = setTimeout(RT.pushVolume.bind(RT, 'windowLow', volume.windowLow), 150);
        clearTimeout(RT._updater2);
       RT._updater2 = setTimeout(RT.pushVolume.bind(RT, 'windowHigh', volume.windowHigh), 150);
  
      }
  ...
      var _smaller_volume = data['volume']['file'][0];
      var _smaller_data = data['volume']['filedata'][0];
     if (_smaller_volume.size < data['volume']['file'][1]) {
  
        // this is the smaller volume so configure it as a labelmap
  ...
     // we have a volume
     volume = new X.volume();
    volume.file = data['volume']['file'].map(function(v) {
  
       return v.name;
  
     });
    volume.filedata = data['volume']['filedata'];
     var colortableParent = volume;
  
  ...
  
       // we have a label map
      volume.labelmap.file = data['labelmap']['file'].map(function(v) {
  
         return v.name;
  
       });
      volume.labelmap.filedata = data['labelmap']['filedata'];
      colortableParent = volume.labelmap;
  
     }

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\x\js\x.scene.js:
  
              if (typeof scene.volume != 'undefined' &&
                 typeof scene.volume.file != 'undefined') {
               if (scene.volume.file.length > 0) {
  
                  volume = new X.volume();
                 volume.file = scene.volume.file;
                 _data.volume.file = volume.file;
  
                  if (typeof scene.labelmap != 'undefined' &&
   ..
                    if (scene.labelmap.file.length > 0) {
  
                     volume.labelmap.file = scene.labelmap.file[0];
                     _data.labelmap.file = volume.labelmap.file;
  
                      if (typeof scene.colortable != 'undefined' &&
   ..
                        if (scene.colortable.file.length > 0) {
  
                         volume.labelmap.colortable.file = scene.colortable.file[0];
                         _data.colortable.file = volume.labelmap.colortable.file;
  
                        }
   ..
                //
                if (typeof scene.volume != 'undefined' &&
                   typeof scene.volume.file != 'undefined') {
                 if (scene.volume.file.length > 0) {
  
                   if (typeof scene.volume.transform != 'undefined') {
                      // the transform
                     volume.transform.matrix = new Float32Array(
                         scene.volume.transform);
                    }
  
                   if (typeof scene.volume.indexIS != 'undefined') {
                     volume.indexIS = scene.volume.indexIS;
                    }
                   if (typeof scene.volume.indexLR != 'undefined') {
                     volume.indexLR = scene.volume.indexLR;
                    }
                   if (typeof scene.volume.indexPA != 'undefined') {
                     volume.indexPA = scene.volume.indexPA;
                    }
                    jQuery("#yellow_slider").slider("option", "value",
                       volume.indexLR);
                    jQuery("#red_slider")
                       .slider("option", "value", volume.indexAX);
                    jQuery("#green_slider").slider("option", "value",
                       volume.indexPA);
  
                   if (typeof scene.volume.volumeRendering != 'undefined') {
                     if (scene.volume.volumeRendering) {
                       volume.volumeRendering = true;
                        jQuery('#slicing').removeClass('ui-state-active');
                        jQuery('#volumerendering').addClass('ui-state-active');
  ...
                        jQuery('#opacity-volume').show();
  
                       if (typeof scene.volume.opacity != 'undefined') {
                         volume.opacity = scene.volume.opacity;
                        }
  
  ...
                    }
                    jQuery('#opacity-volume').slider("option", "value",
                       volume.opacity * 100);
  
                   if (typeof scene.volume.lowerThreshold != 'undefined') {
                     volume.lowerThreshold = scene.volume.lowerThreshold;
                    }
                   if (typeof scene.volume.upperThreshold != 'undefined') {
                     volume.upperThreshold = scene.volume.upperThreshold;
                    }
                    jQuery('#threshold-volume').dragslider("option", "values",
                       [volume.lowerThreshold, volume.upperThreshold]);
  
                   if (typeof scene.volume.windowLow != 'undefined') {
                     volume.windowLow = scene.volume.windowLow;
                    }
                   if (typeof scene.volume.windowHigh != 'undefined') {
                     volume.windowHigh = scene.volume.windowHigh;
                    }
                    jQuery('#windowlevel-volume').dragslider("option", "values",
                       [volume.windowLow, volume.windowHigh]);
  
                   if (typeof scene.volume.minColor != 'undefined') {
                     volume.minColor = scene.volume.minColor;
                    }
                   var bgColor = ((1 << 24) + (volume.minColor[0] * 255 << 16) +
                       (volume.minColor[1] * 255 << 8) + volume.minColor[2] * 255)
                        .toString(16).substr(1);
  
                   if (typeof scene.volume.maxColor != 'undefined') {
                     volume.maxColor = scene.volume.maxColor;
                    }
                   var fgColor = ((1 << 24) + (volume.maxColor[0] * 255 << 16) +
                       (volume.maxColor[1] * 255 << 8) + volume.maxColor[2] * 255)
                        .toString(16).substr(1);
  
  ...
  
                    if (typeof scene.labelmap.visible != 'undefined') {
                     volume.labelmap.visible = scene.labelmap.visible;
                    }
  
                   if (!volume.labelmap.visible) {
                      $('#labelmapvisibility').removeClass('show-icon');
                      $('#labelmapvisibility').addClass('hide-icon');
  ...
  
                    if (typeof scene.labelmap.opacity != 'undefined') {
                     volume.labelmap.opacity = scene.labelmap.opacity;
                    }
                    jQuery('#opacity-labelmap').slider("option", "value",
                       volume.labelmap.opacity * 100);
                  }
                }
  ...
                // dropbox sharing can work
                if (typeof scene.volume != 'undefined' &&
                   typeof scene.volume.file != 'undefined') {
                 if (scene.volume.file.length > 0) {
  
                   _data.volume.filedata = volume.filedata;
  
                  }
  ...
                  if (scene.labelmap.file.length > 0) {
  
                   _data.labelmap.filedata = volume.labelmap.filedata;
  
                  }
  ...
                  if (scene.colortable.file.length > 0) {
  
                   _data.colortable.filedata = volume.labelmap.colortable.filedata;
  
                  }

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\x\js\x.share.js:
  
    // store properties regarding volume, mesh, fibers
   if ( _data.volume.file.length > 0 ) {
  
     _scene.volume.indexIS = volume.indexIS;
     _scene.volume.indexLR = volume.indexLR;
     _scene.volume.indexPA = volume.indexPA;
     _scene.volume.lowerThreshold = volume.lowerThreshold;
     _scene.volume.upperThreshold = volume.upperThreshold;
     _scene.volume.opacity = volume.opacity;
     _scene.volume.windowLow = volume.windowLow;
     _scene.volume.windowHigh = volume.windowHigh;
     _scene.volume.minColor = volume.minColor;
     _scene.volume.maxColor = volume.maxColor;
     _scene.volume.volumeRendering = volume.volumeRendering;
     _scene.volume.transform = Array.apply([], volume.transform.matrix);
  
    }
  
    if ( _data.labelmap.file.length > 0 ) {
     _scene.labelmap.visible = volume.labelmap.visible;
     _scene.labelmap.opacity = volume.labelmap.opacity;
    }
  

C:\users\owner\documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\x\js\xtk.js:
  P.prototype.__defineGetter__("indexPA",function(){return this.wb=0!=this.G[2][0]?this.ca:0!=this.G[2][1]?this.T:this.da});P.prototype.__defineSetter__("indexPA",function(a){y(a)&&(0!=this.G[2][0]?this.ca=a:0!=this.G[2][1]?this.T=a:this.da=a,this.wb=a,this.l(s))});P.prototype.__defineGetter__("indexX",t("T"));P.prototype.__defineSetter__("indexX",function(a){y(a)&&(0<=a&&a<this.uc.h.length)&&(this.T=a,this.l(s))});P.prototype.__defineGetter__("indexY",t("ca"));
  P.prototype.__defineSetter__("indexY",function(a){y(a)&&(0<=a&&a<this.vc.h.length)&&(this.ca=a,this.l(s))});P.prototype.__defineGetter__("indexZ",t("da"));P.prototype.__defineSetter__("indexZ",function(a){y(a)&&(0<=a&&a<this.wc.h.length)&&(this.da=a,this.l(s))});P.prototype.__defineGetter__("windowLow",t("X"));P.prototype.__defineSetter__("windowLow",ba("X"));P.prototype.__defineGetter__("windowHigh",t("W"));P.prototype.__defineSetter__("windowHigh",ba("W"));
 P.prototype.__defineGetter__("borders",t("fb"));P.prototype.__defineSetter__("borders",ba("fb"));P.prototype.__defineGetter__("reslicing",t("ze"));P.prototype.__defineSetter__("reslicing",ba("ze"));function Ae(a,b){var c=(b+2)%3,c=0!=a.G[0][c]?2:0!=a.G[1][c]?0:1;0!=a.G[2][1]&&(c=(c+1)%3);if(a.Qa&&(a.e||c!=a.Jb)){var d=a.h[a.Jb];d.visible=s;var d=a.h[c],e=d.h.length,f;for(f=0;f<e;f++)d.h[f].sa=q;a.Jb=c;a.e=s}}C("X.volume",P);C("X.volume.prototype.modified",P.prototype.l);function Ce(){vd.call(this);this.c="parserSTL"}D(Ce,vd);
  Ce.prototype.parse=function(a,b,c){I.va(this.c+".parse");this.z=c;var d=b.j,e=b.k;if("solid"==xd(Z(this,"uchar",5))){b.j=d=new W(c.byteLength);b.k=e=new W(c.byteLength);var f=d,d=e,e=Z(this,"uchar",c.byteLength-5);c=e.length;var g=s,h=s,j=0,k;for(k=0;k<c;k++)if(10==e[k]){if(g||h){var m=xd(e,j,k).split(" "),h=parseFloat(m[0]),p=parseFloat(m[1]),m=parseFloat(m[2]);g?(d.add(h,p,m),d.add(h,p,m),d.add(h,p,m)):f.add(h,p,m);h=g=s}}else 32==e[k-1]&&(102==e[k]?(j=k+=13,g=q):118==e[k]&&(j=k+=7,h=q))}else{this.F=
  80;f=Z(this,"uint");b.j=d=new W(9*f);b.k=e=new W(9*f);for(c=c=0;c<f;c++)g=Z(this,"float",12),j=g[0],k=g[1],h=g[2],e.add(j,k,h),e.add(j,k,h),e.add(j,k,h),d.add(g[3],g[4],g[5]),d.add(g[6],g[7],g[8]),d.add(g[9],g[10],g[11]),this.F+=2}I.qa(this.c+".parse");f=new Xc;f.aa=b;f.v=a;this.dispatchEvent(f)};C("X.parserSTL",Ce);C("X.parserSTL.prototype.parse",Ce.prototype.parse);function De(){vd.call(this);this.c="parserDCM"}D(De,vd);

C:\Users\Owner\Documents\_COURSEWORK-REPOS\cs460student\final-project\slicedrop-repository\x\js\slicedrop-contains-list.txt:
  js/jquery.sidebar.js:
  js/jquery.sidebar.mesh.js:
 js/jquery.sidebar.volume.js:
  x/LICENSE:
  x/css/frontpage.css:
   ..
  x/js/jquery.sidebar.js:
  x/js/jquery.sidebar.mesh.js:
 x/js/jquery.sidebar.volume.js:
 matches across 18 files
