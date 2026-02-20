# Persisted Information - SimpleSequence

## URGENT: Color Palette Fix Required - Option A (Cyan Only)

### User Request
The user wants **Option A**: Use ONLY the original cyan/blue brand colors with varying hues and opacities. NO new colors (no lime, emerald, red, purple, etc.).

Original brand color: rgba(103,232,249,...) / #67E8F9 (cyan/primary)

### Task List (All Pending)
1. fix_diagnose_cyan - Rewrite diagnose-friction diagram with cyan only
2. fix_map_cyan - Rewrite map-sequences diagram with cyan only
3. fix_locate_cyan - Rewrite locate-leverage diagram with cyan only
4. fix_architect_cyan - Rewrite architect-flow diagram with cyan only
5. fix_home_cyan - Revert home.tsx accents back to primary cyan

### Color Values to Use (Cyan Opacity Variations)
- Bright/highlight: rgba(103,232,249,0.9) or rgba(103,232,249,1)
- Core/primary: rgba(103,232,249,0.6) or rgba(103,232,249,0.7)
- Muted/background: rgba(103,232,249,0.2) or rgba(103,232,249,0.3)
- Very subtle: rgba(103,232,249,0.1) or rgba(103,232,249,0.05)

### Files to Update
1. client/src/components/ui/diagnose-friction-diagram.tsx
2. client/src/components/ui/map-sequences-diagram.tsx
3. client/src/components/ui/locate-leverage-diagram.tsx
4. client/src/components/ui/architect-flow-diagram.tsx
5. client/src/pages/home.tsx (timeline, impact badges, START HERE badge)

### Previous Failed Attempts (Don't Repeat!)
- First: Used red/purple (user rejected)
- Second: Used emerald only (user rejected)
- Third: Used lime only (user rejected)
- Fourth: Used 3-tone lime (user rejected)
- NOW: User wants original cyan only with opacity variations

### Key Implementation Notes
- Use Tailwind's `text-primary`, `bg-primary`, `border-primary` where possible
- For SVG elements, use rgba(103,232,249,X) with varying opacities
- Friction/alert elements: use higher opacity (0.8-1.0)
- Normal elements: use medium opacity (0.5-0.7)
- Background/subtle elements: use lower opacity (0.1-0.3)
- All diagrams currently have lime colors that need to be changed to cyan

### Application Status
- Workflow "Start application" is running on port 5000
