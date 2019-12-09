

// ****************************************************************************
// *                             functions extracted                          *
// ****************************************************************************
   // Setup all UI elements once the loading was completed.
   function setupUi() 
   // function volumerenderingOnOff(bool) 
   // function thresholdVolume(event, ui) 
   function windowLevelVolume(event, ui) 
   function opacity3dVolume(event, ui) 
   function volumeslicingSag(event, ui) 
   function volumeslicingAx(event, ui) 
   function volumeslicingCor(event, ui) 
   function fgColorVolume(hex, rgb) 
   function bgColorVolume(hex, rgb) 
   // LABELMAP
   function opacityLabelmap(event, ui) 
   function toggleLabelmapVisibility() 
   // MESH
   function toggleMeshVisibility() 
   function meshColor(hex, rgb) 
   function opacityMesh(event, ui) 
   function thresholdScalars(event, ui) 
   function scalarsMinColor(hex, rgb) 
   function scalarsMaxColor(hex, rgb) 
   // Fibers
   function toggleFibersVisibility() 
   function thresholdFibers(event, ui) 
// ****************************************************************************


// ****************************************************************************
// *                            variables extracted                           *
// ****************************************************************************
   //volumeRendering
   volume.volumeRendering = this.volumeRendering
   //lowerThreshold
   volume.lowerThreshold = this.lowerThreshold
   //upperThreshold
   volume.upperThreshold = this.upperThreshold
   //windowLow
   volume.windowLow = this.windowLow
   //windowHigh
   volume.windowHigh = this.windowHigh
   //opacity
   volume.opacity = this.opacity
   //indexY
   volume.indexX = this.indexX
   //indexX
   volume.indexZ = this.indexZ
   //indexPA
   volume.indexY = this.indexY
   //maxColor
   volume.maxColor = this.maxColor
   //minColor
   volume.minColor = this.minColor
   //opacity
   volume.labelmap.opacity = this.labelmap.opacity
   //visible
   volume.labelmap.visible = this.labelmap.visible
   //visible
   mesh.visible = thisisible
   //color
   mesh.color = thisolor
   //opacity
   mesh.opacity = thispacity
   //lowerThreshold
   mesh.scalars.lowerThreshold = thiscalars.lowerThreshold
   //upperThreshold
   mesh.scalars.upperThreshold = thiscalars.upperThreshold
   //minColor
   mesh.scalars.minColor = thiscalars.minColor
   //maxColor
   mesh.scalars.maxColor = thiscalars.maxColor
   //visible
   fibers.visible = this.visible
   //lowerThreshold
   fibers.scalars.lowerThreshold = this.scalars.lowerThreshold
   //upperThreshold
   fibers.scalars.upperThreshold = this.scalars.upperThreshold
// ****************************************************************************