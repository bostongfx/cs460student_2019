function volumerenderingOnOff(bool) 
   //volumeRendering
   volume.volumeRendering = this.volumeRendering
function thresholdVolume(event, ui) 
function thresholdScalars(event, ui) 
function thresholdFibers(event, ui) 
   //lowerThreshold
   volume.lowerThreshold = this.lowerThreshold
   //upperThreshold
   volume.upperThreshold = this.upperThreshold
   //lowerThreshold
   mesh.scalars.lowerThreshold = thiscalars.lowerThreshold
   //upperThreshold
   mesh.scalars.upperThreshold = thiscalars.upperThreshold
   //lowerThreshold
   fibers.scalars.lowerThreshold = this.scalars.lowerThreshold
   //upperThreshold
   fibers.scalars.upperThreshold = this.scalars.upperThreshold
function windowLevelVolume(event, ui) 
   //windowLow
   volume.windowLow = this.windowLow
   //windowHigh
   volume.windowHigh = this.windowHigh
function opacity3dVolume(event, ui) 
function opacityLabelmap(event, ui) 
function opacityMesh(event, ui) 
   //opacity
   volume.opacity = this.opacity
   //opacity
   volume.labelmap.opacity = this.labelmap.opacity
   //opacity
   mesh.opacity = thispacity
function scalarsMinColor(hex, rgb) 
   function scalarsMaxColor(hex, rgb) 
      mesh.scalars.minColor = thiscalars.minColor
   mesh.scalars.maxColor = thiscalars.maxColor
// MESH
function toggleMeshVisibility() 
   function meshColor(hex, rgb) 
      mesh.visible = thisisible
   mesh.color = thisolor
function fgColorVolume(hex, rgb) 
function bgColorVolume(hex, rgb) 
   //maxColor
   volume.maxColor = this.maxColor
   //minColor
   volume.minColor = this.minColor
//color
//minColor
//maxColor
// LABELMAP
function toggleLabelmapVisibility() 
// Fibers
function toggleFibersVisibility() 
   //visible
   volume.labelmap.visible = this.labelmap.visible
//visible
   //visible
   fibers.visible = this.visible
function volumeslicingSag(event, ui) 
function volumeslicingAx(event, ui) 
function volumeslicingCor(event, ui) 
   //indexY
   volume.indexX = this.indexX
   //indexX
   volume.indexZ = this.indexZ
   //indexPA
   volume.indexY = this.indexY