# SPMB, carousel, educator layout, and map

## What will change
- Add a dedicated **SPMB** menu item and page for registration dates, requirements, stages, costs/status notes, and contact actions.
- Replace the first section below the navigation with an accessible carousel. The first slide introduces the school, the second highlights SPMB, and the remaining slides feature top news; every slide links to its relevant detail page.
- Rename **Guru** in the menu and page to **Tenaga Pendidik**, keeping the existing `/guru` address so current links continue to work.
- Reorganize the educator page with the headmaster centered at the top, followed by the remaining teachers in a separate grid.
- Add an embedded Google map for the school’s current placeholder Bandung address, using the connected Google Maps service.

## Technical details
- Build the carousel as a focused React component with previous/next controls, slide indicators, automatic rotation, pause on interaction, and reduced-motion support.
- Add `src/routes/spmb.tsx` with unique page metadata and update shared navigation.
- Reuse the existing news detail routes for news slides and the existing bundled school photography.
- Load Google Maps Embed with the public connector key, and preserve a clear placeholder if the key is unavailable.
- Keep all existing green, lime, and cream design tokens and Indonesian copy.

## Verification
- Check the desktop and mobile layouts in the live preview.
- Verify carousel controls and links, SPMB navigation, news detail links, educator hierarchy, and map rendering.
- Confirm the latest project build reports no errors.
