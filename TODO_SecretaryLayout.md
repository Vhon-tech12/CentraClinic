# Secretary Layout Refactoring TODO

## Task
Refactor the Next.js App Router structure for the secretary dashboard to properly separate layout from page content.

## Steps:
- [x] 1. Analyze current file structure and understand the issue
- [x] 2. Update app/secretary/layout.tsx with proper sidebar
- [x] 3. Update app/secretary/dashboard/page.tsx to remove duplicate layout code
- [x] 4. Verify the changes work correctly

## Files to Edit:
1. `app/secretary/layout.tsx` - Add new inline sidebar with secretary-specific links
2. `app/secretary/dashboard/page.tsx` - Remove duplicate SecretaryLayout function

