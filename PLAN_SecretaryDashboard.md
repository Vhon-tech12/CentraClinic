# Secretary Dashboard Implementation Plan

## Information Gathered:
- Existing secretary dashboard at `app/secretary/dashboard/page.tsx` - basic table with limited functionality
- Secretary layout at `app/secretary/layout.tsx` - provides sidebar navigation with Dashboard, Patients, Appointments, Vitals
- Admin dashboard at `app/admin/dashboard/page.tsx` - has good UI patterns (StatCards, charts, tables)
- Project uses Tailwind CSS, lucide-react icons, TypeScript
- Light theme used throughout

## Plan:
I will completely redesign the secretary dashboard to include all required workflow features:

### 1. Update `app/secretary/dashboard/page.tsx` with:
- **Today's Appointments Table** with columns: Patient Name, Appointment Time, Status, Actions
- **Status values**: Pending, Checked-In, Vitals Recorded, Ready for Doctor, Consultation, Completed
- **Action buttons**: [Check-In], [Record Vitals], [Send to Doctor]
- **Doctor Queue Section** showing patients ready for consultation

### 2. Create Modal Components (inline in dashboard):
- **Patient Identity Verification Modal**: Name, Birthdate, Contact Number
- **Patient Intake/Vitals Modal**: Height, Weight, Blood Pressure, Temperature, Pulse
- **Chief Complaint Modal**: Dropdown (Ear Pain, Nose Bleeding, Sore Throat, Difficulty Breathing) + Notes field

### 3. Sample Data Structure:
```typescript
interface Patient {
  id: number;
  name: string;
  birthdate: string;
  contactNumber: string;
  appointmentTime: string;
  service: string;
  status: 'Pending' | 'Checked-In' | 'Vitals Recorded' | 'Ready for Doctor' | 'Consultation' | 'Completed';
  vitals?: {
    height: string;
    weight: string;
    bloodPressure: string;
    temperature: string;
    pulse: string;
  };
  chiefComplaint?: {
    complaint: string;
    notes: string;
  };
}
```

### 4. Workflow Simulation:
- Click [Check-In] → Opens Identity Verification Modal → Submit → Status: Pending → Checked-In
- Click [Record Vitals] → Opens Vitals Modal → Submit → Status: Checked-In → Vitals Recorded
- Click [Send to Doctor] → Opens Chief Complaint Modal → Submit → Status: Vitals Recorded → Ready for Doctor
- Patients with "Ready for Doctor" status appear in Doctor Queue section

### 5. UI Features:
- Clean, modern dashboard layout matching admin dashboard style
- Real-time status updates (simulated with React state)
- Color-coded status badges
- Modal overlays for data entry
- Responsive design

## Dependent Files to be edited:
1. `app/secretary/dashboard/page.tsx` - Main dashboard with all features

## Followup steps:
- Test the dashboard workflow by clicking through action buttons
- Verify modal opens and closes properly
- Verify status updates correctly
- Check Doctor Queue updates when patient is ready

