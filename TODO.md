# TODO: Improve Attached Educational Materials UI

## Task
Improve the UI of the "Attached Educational Materials" section inside a SOAP Note modal.

## Plan

- [ ] 1. Update types/EducationalMaterial.ts - Add optional description field
- [ ] 2. Create new component: AttachedMaterialsList.tsx - Grid layout with larger thumbnails
- [ ] 3. Create new component: MaterialPreviewPanel.tsx - Side panel for preview
- [ ] 4. Update soapnotemodal.tsx - Integrate new components
- [ ] 5. Update EducationalMaterialModal.tsx - Add description to mock data

## Goals
- Grid or list layout optimized for modal width
- Clear visual affordance that items are clickable
- Hover and active states
- Preview opens in a side panel or overlay (not full page)
- Preview includes title, category, and content preview
- Easy close / back to list
- Make educational materials easier to scan
- Make preview interaction feel smooth and intentional
- Avoid clutter inside the modal
- Keep it clinician-friendly and fast to use
