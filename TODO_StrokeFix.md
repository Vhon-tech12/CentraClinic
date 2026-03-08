# Stroke Persistence Fix - Implementation Plan

## Status: Completed

### Step 1: Add Render Trigger State
- [x] Add `renderTrigger` state to force re-renders after stroke completion
- [x] Update end2DStroke to use render trigger
- [x] Update end3DStroke to use render trigger

### Step 2: Fix 3D Stroke Rendering
- [x] Review current 3D stroke rendering logic
- [x] Fix the rendering to ensure strokes for current tab are visible

### Step 3: Fix 2D Stroke Rendering  
- [x] Review current 2D rendering useEffect
- [x] Ensure proper re-render after stroke completion
- [x] Fix getAllStrokes callback dependency

### Changes Made:
1. Added `renderTrigger` state (`useState(0)`)
2. Updated `end3DStroke()` to call `setRenderTrigger(prev => prev + 1)` after persisting stroke
3. Updated `end2DStroke()` to call `setRenderTrigger(prev => prev + 1)` after persisting stroke
4. Added `renderTrigger` to 2D canvas useEffect dependencies

### How it works:
- When user lifts pen/mouse, the stroke is immediately persisted to the strokes state
- The renderTrigger is incremented to force a re-render
- The 2D canvas useEffect picks up the change and redraws all strokes including newly persisted ones
- The 3D canvas uses the strokes state directly, so it will re-render with the new stroke

### Testing
- [ ] Verify 2D strokes persist after drawing
- [ ] Verify 3D strokes persist after drawing
- [ ] Verify undo works correctly
- [ ] Verify clear works correctly
- [ ] Verify save captures all strokes

