# TODO: Clinical Templates Feature

## Task
Add a READY-MADE CLINICAL TEMPLATE feature to HeadTemplateModal for quick documentation.

## Important Constraints:
- DO NOT MODIFY ANY EXISTING DRAWING LOGIC
- DO NOT CHANGE ANY 3D MODEL CODE
- DO NOT BREAK CURRENT FUNCTIONALITY

## Steps:
- [x] 1. Add clinical templates data structure (Record<TabKey, ClinicalTemplate[]>)
- [x] 2. Add state for selected template
- [x] 3. Add Quick Templates UI section above Clinical Notes panel
- [x] 4. Add function to apply template to clinical notes
- [x] 5. Update template options dynamically when tab changes

## Template Structure:
{
  name: string,
  findings: string,
  impression: string,
  recommendation: string
}

## Templates by Anatomy:
- EAR: Normal Ear Examination, Otitis Media, Impacted Cerumen, Ear Infection
- NOSE: Normal Nasal Examination, Deviated Nasal Septum, Nasal Polyps, Allergic Rhinitis
- THROAT: Normal Throat, Tonsillitis, Pharyngitis, Enlarged Tonsils
- HEAD: Normal Facial Examination, Acne Vulgaris, Facial Asymmetry, Skin Irritation, Post Aesthetic Procedure

## Changes Made:
- Added CLINICAL_TEMPLATES constant with predefined templates for each anatomy
- Added selectedTemplate state to track current selection
- Added applyTemplate() function to populate clinical notes from template
- Added clearTemplateSelection() function to reset template
- Added Quick Templates dropdown UI in Clinical Notes panel
- Templates dynamically change based on selected anatomy tab

