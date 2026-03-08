# Tablet Compatibility Fixes - TODO List

## Status: In Progress

### Fix 1: Image Preview - Replace URL.createObjectURL with FileReader.readAsDataURL
- [x] Modify handleImageUpload to use FileReader.readAsDataURL
- [x] Remove URL.revokeObjectURL calls from handleImageUpload
- [x] Remove URL.revokeObjectURL from handleRemoveImage

### Fix 2: Touch Drawing - Add touch-none class to canvas
- [x] Add touch-none class to the 2D overlay canvas

### Fix 3: OrbitControls - Disable controls in draw mode
- [x] Add enableZoom={mode === "view"} to OrbitControls

### Fix 4: Pointer Pressure - Set default pressure for touch devices
- [x] Update 3D drawing handler (draw3DStroke) for touch pressure
- [x] Update 2D drawing handler (start2DStroke) for touch pressure
- [x] Update 2D drawing handler (draw2DStroke) for touch pressure

### Fix 5: Canvas Resize - Add resize listener
- [x] Add useEffect with resize listener for overlay canvas

