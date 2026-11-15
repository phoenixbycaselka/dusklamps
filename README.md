# Dusk Lamps
A small daily lights-out puzzle. Tap a lamp to toggle it and its four neighbours; light them all.
Puzzles are generated from the UTC date (same puzzle for everyone each UTC day; in Sydney it changes at 10–11 am), always solvable. Par is the fewest moves that can solve it, found exactly by a GF(2) solver, so you can match par but never beat it. Sizes 4–6.

Play: https://phoenixbycaselka.github.io/dusklamps/

`node test.js` checks solvability, determinism and that par equals a brute-force minimum on 4×4. MIT licence. No dependencies.
