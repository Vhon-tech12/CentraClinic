# TODO: Apply Box3 Centering + Camera Auto-Fit to All Anatomy Tabs

## Task
Apply the same Box3 centering + camera auto-fit logic to ALL anatomy tabs (Ear, Nose, Throat, Head) in HeadTemplateModal.tsx

## Steps:
- [x] 1. Create generic `ModelCenterer` component that works for ALL anatomy tabs
- [x] 2. Add refs for Ear and Nose models (Throat ref already exists)
- [x] 3. Update MODEL_CONFIG to remove hardcoded camera positions
- [x] 4. Apply Box3 centering logic to each model
- [x] 5. Auto-fit camera distance based on model size
- [x] 6. Run logic whenever tab changes

## Implementation Details:
- Use THREE.Box3().setFromObject(activeModelRef) for each visible anatomy group
- Center model using position.sub(center)
- Compute size and auto-fit camera based on max dimension
- Do NOT use hardcoded camera distances

## Expected Result:
- Each anatomy tab is centered and properly scaled
- Ear should not appear tiny
- Camera distance adapts per model size

