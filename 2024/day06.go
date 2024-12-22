package main

import (
	"fmt"
	"os"
	"strings"
)

type Dir struct {
	name string
	X, Y int
	turn string
}

// Returns (loop?, visited (if not loop))
func walkOnGrid(grid *[][]bool, dirs *map[string]Dir, initX, initY, extraX, extraY int) (bool, [][2]int) {
	lenX := len(*grid)
	lenY := len((*grid)[0])

	posX := initX
	posY := initY

	visited := make([][]bool, lenX)
	for i := range lenX {
		visited[i] = make([]bool, lenY)
	}
	visited[posX][posY] = true

	steps := make(map[string]bool)
	steps[fmt.Sprintf("%d|%d|up", initX, initY)] = true

	dir := (*dirs)["up"]

	for {
		nextX := posX + dir.X
		nextY := posY + dir.Y
		if nextX < 0 || nextX >= lenX || nextY < 0 || nextY >= lenY {
			// Out of bounds
			break
		}
		if (*grid)[nextX][nextY] || (nextX == extraX && nextY == extraY) {
			// Hit obstruction; turn
			dir = (*dirs)[dir.turn]

			key := fmt.Sprintf("%d|%d|%s", posX, posY, dir.name)
			_, inCache := steps[key]
			if inCache {
				return true, nil
			}
			steps[key] = true
			continue
		}
		posX = nextX
		posY = nextY

		visited[posX][posY] = true
	}

	if extraX != -1 || extraY != -1 {
		return false, nil
	}

	var visitedCells [][2]int
	for i, line := range visited {
		for j, cell := range line {
			if cell {
				visitedCells = append(visitedCells, [2]int{i, j})
			}
		}
	}

	return false, visitedCells

}

func main() {
	file, _ := os.ReadFile("day06.txt")
	linesData := strings.Split(strings.Trim(string(file), "\n"), "\n")
	lenX := len(linesData)
	lenY := len(linesData[0])
	var posX, posY int
	grid := make([][]bool, lenX)
	for i, line := range linesData {
		grid[i] = make([]bool, lenY)
		for j, cell := range line {
			if cell == '#' {
				grid[i][j] = true
			} else if cell == '^' {
				posX = i
				posY = j
			}
		}
	}

	dirs := make(map[string]Dir, 4)
	dirs["up"] = Dir{name: "up", X: -1, Y: 0, turn: "right"}
	dirs["right"] = Dir{name: "right", X: 0, Y: 1, turn: "down"}
	dirs["down"] = Dir{name: "down", X: 1, Y: 0, turn: "left"}
	dirs["left"] = Dir{name: "left", X: 0, Y: -1, turn: "up"}

	_, visited := walkOnGrid(&grid, &dirs, posX, posY, -1, -1)
	count2 := 0
	count1 := len(visited)

	for _, obstruction := range visited {
		loop, _ := walkOnGrid(&grid, &dirs, posX, posY, obstruction[0], obstruction[1])
		if loop {
			count2++
		}
	}

	fmt.Println(count1, count2)

}
