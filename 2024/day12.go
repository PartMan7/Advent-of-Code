package main

import (
	"fmt"
	"os"
	"strings"
)

func lookup(visited *[][]bool, i, j int) (bool, bool) {
	lenX, lenY := len(*visited), len((*visited)[0])
	if i < 0 || i >= lenX || j < 0 || j >= lenY {
		return false, false
	}
	return (*visited)[i][j], true
}

func traverse(x, y int, plot *[]string, visited *[][]bool) (int, int, int) {
	(*visited)[x][y] = true
	plant := (*plot)[x][y]
	area, perimeter, sides := 1, 0, 0
	for useX := range 2 {
		for sign := range 2 {
			offsetX := useX * (1 - 2*sign)
			offsetY := (1 - useX) * (1 - 2*sign)

			i, j := x+offsetX, y+offsetY
			hit, ok := lookup(visited, i, j)
			if ok && (*plot)[i][j] == plant {
				if hit {
					continue
				}
				newArea, newPerimeter, newSides := traverse(i, j, plot, visited)
				area += newArea
				perimeter += newPerimeter
				sides += newSides
			} else {
				// Going out of bounds or another plant
				perimeter++
				// Check if we already have a 'side' instantiated
				perpI, perpJ := x+offsetY, y+offsetX
				diagI, diagJ := x+offsetX+offsetY, y+offsetX+offsetY
				_, perpOk := lookup(visited, perpI, perpJ)
				_, diagOk := lookup(visited, diagI, diagJ)
				if (!perpOk || (*plot)[perpI][perpJ] != plant) || (diagOk && (*plot)[diagI][diagJ] == plant) {
					sides++
				}
			}
		}
	}
	return area, perimeter, sides
}

func getUnvisited(visited *[][]bool) (int, int, bool) {
	lenX, lenY := len(*visited), len((*visited)[0])
	for i := range lenX {
		for j := range lenY {
			if !(*visited)[i][j] {
				return i, j, false
			}
		}
	}
	return 0, 0, true
}

func main() {
	file, _ := os.ReadFile("day12.txt")
	plot := strings.Split(strings.Trim(string(file), "\n"), "\n")

	fence1 := 0
	fence2 := 0
	lenX, lenY := len(plot), len((plot)[0])
	visited := make([][]bool, lenX)
	for i := range lenX {
		visited[i] = make([]bool, lenY)
	}

	for {
		exploreX, exploreY, done := getUnvisited(&visited)
		if done {
			break
		}
		area, perimeter, sides := traverse(exploreX, exploreY, &plot, &visited)
		fence1 += area * perimeter
		fence2 += area * sides
	}
	fmt.Println(fence1, fence2)
}
