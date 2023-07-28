# Game of Life

- A version of Conway's Game of Life
- Game is best viewed on 4K+ screens, so either use it on that or zoom out


## Version 1

- Includes all 4 different rendering methods for the level, from slow, to slower, to more compact, to fast
- Has the old UI


## Version 2

- Includes only the fast version of the rendering
- Everything is in one monolithic file, but still readable
- Has the new UI


## Version 3

- Has everything from Version 2
- But now it's mostly modular
- Many smaller, but more maneuverable files
- Has an even more improved UI
- Required to run on server, use either python:
  - python -m http.server [port]
- or npm:
  1. npm install http-server -g
  2. http-server 


## Version 4

- Same as version 3, but minified for speed
- A small improvement to loading speed for the webpage
- Probably will not be updated again
- Run like version 3
