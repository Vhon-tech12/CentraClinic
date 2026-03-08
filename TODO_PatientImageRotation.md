# Patient Image Rotation Implementation Plan

## Task
Improve Patient Image Capture interaction - When user clicks a patient image orientation (Front, Left, Right), the 3D head model should automatically rotate to match the same view.

## Steps to Complete:
1. [x] Add targetRotation state to track current target rotation
2. [x] Create RotationAnimator component using useFrame for smooth lerp animation
3. [x] Add onClick handlers to orientation buttons (Front, Left, Right)
4. [x] Connect orientation buttons to set target rotation
5. [x] Test the implementation

## Orientation Mapping:
- Front → rotation.y = 0
- Left → rotation.y = Math.PI / 2
- Right → rotation.y = -Math.PI / 2

## Implementation Details:
- Added `targetRotation` state to track the desired rotation angle
- Created `RotationAnimator` component that uses `useFrame` hook from React Three Fiber to smoothly interpolate (lerp) the head model's rotation toward the target
- Added onClick handlers to both:
  - Placeholder cards (when no image is uploaded)
  - Orientation buttons (when image is already uploaded)
- When user clicks Front/Left/Right, the 3D head model smoothly rotates to match:
  - Front → 0 radians
  - Left → π/2 radians (90 degrees)
  - Right → -π/2 radians (-90 degrees)

## Requirements Met:
- ✅ DO NOT change existing logic or states
- ✅ Use smooth animation (lerp) for rotation
- ✅ Keep camera position unchanged
- ✅ Only rotate the head model, not the whole scene

