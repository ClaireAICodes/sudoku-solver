# AGENTS.md — Sudoku Solver Project Context

**Project:** Sudoku Solver Web App  
**Owner:** Master Phil (ClaireAICodes)  
**Stack:** HTML5, CSS3, Vanilla JavaScript (backtracking algorithm)  
**Deployment:** GitHub Pages → https://claireaicodes.github.io/sudoku-solver/

---

## Purpose

A clean, responsive Sudoku solver that runs entirely in the browser. Enter a puzzle, click Solve, watch the backtracking algorithm fill it instantly.

---

## Repository Policy Compliance

This repo follows the **devops/repo-policy** skill (loaded automatically via MEMORY.md). Key requirements already satisfied:

- ✅ **Created via `gh repo create`** with `--public` (web app → GitHub Pages)
- ✅ **Collaborator added:** `AzureKn1ght` with write access
- ✅ **Metadata set:** description, homepage, topics
- ✅ **GitHub Pages enabled** on `master` branch, root path
- ✅ **Documentation:** This AGENTS.md + clean README

---

## Project Structure

```
sudoku_solver/
├── index.html      # Main HTML structure + grid
├── style.css       # Modern responsive styling, CSS Grid layout
├── script.js       # Backtracking solver + DOM logic
├── AGENTS.md       # This file
```

---

## Algorithm

**Backtracking (DFS)** — standard 9×9 Sudoku solver:
1. Find first empty cell (0)
2. Try digits 1–9 with constraint validation (row, column, 3×3 box)
3. Recurse; backtrack on failure
4. Return solved board or null

Time complexity: O(9^n) worst-case, but Sudoku constraints prune heavily → typically <10ms.

---

## Development Notes

- **Input handling:** `type="text"` + `maxlength=1` + regex filter (only 1–9 accepted)
- **Visual distinction:** User entries = black; solved entries = blue (`#1a73e8`) with light blue background (`#e8f0fe`)
- **No build step** — pure static files, works offline
- **Responsive:** Grid scales down to ~320px width

---

## Commands

| Action | Command |
|--------|---------|
| Local preview | `cd /c/Users/PHIL_AI/Projects/sudoku_solver && python -m http.server 8080` |
| Push updates | `cd /c/Users/PHIL_AI/Projects/sudoku_solver && git add -A && git commit -m "msg" && git push` |
| Check Pages status | `gh api repos/ClaireAICodes/sudoku-solver/pages/builds/latest` |

---

## Future Enhancements (if requested)

- Puzzle generator (difficulty levels)
- Step-by-step solve visualization
- Keyboard navigation (arrow keys between cells)
- Touch-friendly number pad for mobile
- Save/load puzzles to localStorage

---

*Last updated: 2026-07-19 by Claire (Hermes Agent)*