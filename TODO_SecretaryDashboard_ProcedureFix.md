**Procedure Scheduling After Consultation Complete ✅**

- After "Complete" consultation:
  - Sets `procedureRequired = true` if `visitType === 'PROCEDURE'` or service contains keywords: Cleaning, Surgery, Biopsy, Endoscopy, Tonsillectomy, Laryngoscopy
  - Shows "Schedule Procedure" button for those patients (no longer gated by old condition)
  - Toast indicates next step

**Demo patients:**
- Juan Dela Cruz (id1): "Ear Cleaning Procedure" → Procedure button after complete
- Ana Garcia (id4): Already completed with procedureRequired

**Flow:** Check-in → Vitals → Doctor → Complete → Schedule Procedure/Follow-up

Test with `npm run dev` at /secretary/dashboard
