# Ceiling Grid Planner

A canvas-based ceiling grid editor application

The application allows users to visualise and edit a rectangular ceiling grid using standard 0.6m × 0.6m tiles, supporting component placement, dragging, panning, and zooming — with performance suitable for large grids.

![Product screenshot](/media/productScreenshot.png)

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Features

* High-performance canvas rendering designed to scale to large grids (100×100+).
* Smooth pan and zoom interactions (editor-style navigation).
* Place, move, and remove ceiling components:

  * Lights
  * Air supply points
  * Air return points
  * Smoke detectors
  * Invalid ceiling areas
* Grid-snapped drag and drop with collision detection.
* Dynamic grid resizing via toolbar controls.

---

## Architectural Notes

* React is used for application state, UI controls, and business logic.
* HTML5 Canvas is used for rendering the grid and components to avoid DOM performance bottlenecks when zooming and displaying large visible areas.
* Zooming and panning are implemented via canvas transforms rather than DOM re-layout.
* Grid data is stored using a sparse data model, keeping empty cells cost-free and enabling large grid sizes.

---

## Tech Stack

* React 18 + TypeScript
* HTML5 Canvas API
* Vite

---

## Scope & Trade-offs

This project is intentionally implemented as an MVP, focusing on:

* Correct architectural decisions
* Performance-aware rendering
* Clear, maintainable code

Some production concerns (full accessibility support, persistence, undo/redo) are acknowledged but out of scope for this exercise.