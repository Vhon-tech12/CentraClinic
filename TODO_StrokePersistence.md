# TODO: Refactor Stroke Persistence in HeadTemplateModal

## Objective
Refactor stroke handling to make strokes fully persistent immediately after drawing, eliminating the separate `data` and `tempData` state pattern.

## Current Issue
- Strokes are stored in two separate states (`data` for persistent, `tempData` for temporary/preview)
- This creates complexity and potential edge cases where strokes could be lost
- Strokes may disappear when pointer is lifted before proper state synchronization

## Plan

### Step 1: Create Single Unified Stroke State
- Replace separate `data` and `tempData` states with a single `strokes` state
- Use a separate `activeStroke` ref for real-time drawing preview

### Step 2: Refactor startStroke Functions
- `start2DStroke` - Initialize `activeStroke` ref with first point
- `start3DStroke` - Initialize `activeStroke` ref

### Step 3: Refactor drawStroke Functions  
- `draw2DStroke` - Update canvas preview and `activeStroke` ref in real-time
- `draw3DStroke` - Update `activeStroke` ref for 3D preview

### Step 4: Refactor endStroke Functions
- `end2DStroke` - Commit `activeStroke` to persistent state immediately on pointer up
- `end3DStroke` - Commit `activeStroke` to persistent state immediately on pointer up

### Step 5: Update Rendering Logic
- Update 2D canvas rendering to combine persistent strokes + active stroke for preview
- Update 3D rendering to combine persistent strokes + active stroke

### Step 6: Update Undo/Clear Functions
- Modify undo to work with single state
- Modify clear to work with single state

### Step 7: Update Mode Switching Logic
- Ensure strokes are properly committed when switching from Draw to View mode

## Files to Edit
- `components/HeadTemplateModal.tsx`

## Testing
- Verify 2D strokes persist after drawing
- Verify 3D strokes persist after drawing  
- Verify undo works correctly
- Verify clear works correctly
- Verify save captures all strokes
- Verify mode switching doesn't lose strokes

