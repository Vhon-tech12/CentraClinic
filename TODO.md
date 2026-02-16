# Admin UI Light Theme Conversion - TODO List

## Summary
Convert the entire admin side UI from dark theme to light-only theme.

## Files Analyzed
- `app/globals.css` - Has both light and dark mode CSS variables
- `app/admin/layout.tsx` - Dark mode bg
- `app/admin/dashboard/page.tsx` - Dark mode styles
- `app/admin/patients/page.tsx` - Dark mode styles
- `app/admin/appointments/page.tsx` - Dark mode styles
- `app/admin/report/page.tsx` - Simple, minimal styles
- `components/Sidebar.js` - Dark mode styles
- `components/StatCard.js` - Dark mode styles
- `components/UIHelpers.tsx` - Dark mode styles
- `components/HeadTemplateModal.tsx` - Already light theme ✓
- `components/PatientDetailsModal.tsx` - Dark mode styles
- `components/AddPatientModal.tsx` - Dark mode styles
- Additional modal components to check

## Conversion Plan

### Phase 1: Global Styles
- [ ] 1.1 Update `app/globals.css` - Keep light mode, remove/ignore dark mode CSS variables

### Phase 2: Admin Layout & Pages
- [ ] 2.1 Update `app/admin/layout.tsx` - Change background to white/light-gray
- [ ] 2.2 Update `app/admin/dashboard/page.tsx` - Convert all dark backgrounds to white/light-gray
- [ ] 2.3 Update `app/admin/patients/page.tsx` - Convert dark styles to light
- [ ] 2.4 Update `app/admin/appointments/page.tsx` - Convert dark styles to light
- [ ] 2.5 Update `app/admin/report/page.tsx` - Already simple, verify light theme

### Phase 3: Core Components
- [ ] 3.1 Update `components/Sidebar.js` - Light background and text
- [ ] 3.2 Update `components/StatCard.js` - Light card backgrounds
- [ ] 3.3 Update `components/UIHelpers.tsx` - Light form inputs and components

### Phase 4: Modal Components
- [ ] 4.1 Update `components/PatientDetailsModal.tsx` - Light modal background
- [ ] 4.2 Update `components/AddPatientModal.tsx` - Light modal background
- [ ] 4.3 Check and update other admin modals (AppointmentRequestModal, SoapNoteModal, MedicalHistoryModal, etc.)

### Phase 5: Additional Components
- [ ] 5.1 Check and update other components used in admin (Profile.js, etc.)

## Light Theme Design Specs
- **Background**: `bg-white` or `bg-gray-50` for main content areas
- **Cards**: `bg-white` with `border-gray-200` shadow
- **Text**: `text-gray-800` or `text-gray-900` for headings, `text-gray-600` for body
- **Borders**: `border-gray-200` or `border-gray-300`
- **Inputs**: `bg-white` with `border-gray-300`, `text-gray-800`
- **Buttons**: Keep primary colors but ensure good contrast
- **Sidebar**: `bg-white` or `bg-gray-50` with `text-gray-700`

## Progress: Not Started
