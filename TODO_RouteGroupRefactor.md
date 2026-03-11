# Route Group Refactoring - TODO

## Task: Separate public layout from secretary dashboard using Next.js Route Groups

### Steps:
- [x] 1. Create `app/(public)/layout.tsx` - Public layout with NavBar
- [x] 2. Move `app/page.tsx` → `app/(public)/page.tsx`
- [x] 3. Move `app/about/page.tsx` → `app/(public)/about/page.tsx`
- [x] 4. Move `app/service/page.tsx` → `app/(public)/service/page.tsx`
- [x] 5. Move `app/FAQs/page.tsx` → `app/(public)/FAQs/page.tsx`
- [x] 6. Update `app/layout.tsx` - Remove ConditionalNavBar
- [x] 7. Update `components/ConditionalNavBar.tsx` - Add /secretary check
- [x] 8. Clean up old public directories

## ✅ Completed - Updated Folder Structure:
```
app/
├── (public)/                    ← Route Group
│   ├── layout.tsx               ← Contains NavBar + Footer + Providers
│   ├── page.tsx                → Home
│   ├── about/page.tsx          → About
│   ├── service/page.tsx        → Services
│   └── FAQs/page.tsx           → FAQs
├── secretary/
│   ├── layout.tsx              ← Contains sidebar only (no NavBar)
│   └── dashboard/page.tsx      → Secretary Dashboard
├── admin/                      ← Admin routes (have their own layout)
├── appointment/                ← Public pages without navbar (handled by ConditionalNavBar)
├── booking/                    ← Public pages without navbar
├── login/                      ← Public pages without navbar
└── layout.tsx                  ← Root layout (minimal - no NavBar)
```


