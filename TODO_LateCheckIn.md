# Late Check-In Feature TODO

## Approved Plan
Target: app/secretary/dashboard/page.tsx (secretary dashboard table)

**Changes:**
1. Add `lateArrival?: boolean;` to Patient interface
2. Add `handleLateCheckIn(patient)`: update status 'Checked-In', lateArrival true, show toast
3. In table Actions: conditional button for status==='No Show'

No DB/backend changes (uses mock data).

## Implementation Steps
- [x] Create TODO.md ✅
- [x] Edit Patient interface
- [x] Add handleLateCheckIn handler
- [x] Add Late Check-In button in Actions column
- [x] Test functionality
- [x] Mark complete & cleanup TODO

**Verify:** Sample patient #2 (Maria Santos) is 'No Show' - perfect test case.

