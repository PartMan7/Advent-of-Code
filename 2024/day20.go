package main

import (
	"fmt"
	"os"
	"strings"
)

var target [2]int
var maze []string

var path = make(map[[2]int]int)

func abs(val int) int {
	if val < 0 {
		return -val
	}
	return val
}

func tracer(start [2]int) {
	steps := 0
	prev := [2]int{0, 0}
	path[start] = 0
	current := start
	for {
		if current == target {
			break
		}
		steps++
	dirs:
		for x := range 2 {
			y := 1 - x
			for negative := range 2 {
				if negative == 1 {
					x, y = -x, -y
				}
				pos := [2]int{current[0] + x, current[1] + y}
				if maze[pos[0]][pos[1]] == '.' && pos != prev {
					prev = current
					current = pos
					path[pos] = steps
					break dirs
				}
			}
		}
	}
}

func getCheats(radius int) int {
	cheats := make(map[[2][2]int]int)
	lenX, lenY := len(maze), len(maze[0])
	for point, baseCost := range path {
		for i := -radius; i <= radius; i++ {
			x := point[0] + i
			if x < 0 || x >= lenX {
				continue
			}
			for j := abs(i) - radius; j <= radius-abs(i); j++ {
				y := point[1] + j
				if y < 0 || y >= lenY {
					continue
				}
				refCost := baseCost + abs(i) + abs(j)
				key := [2]int{x, y}
				afterCost := path[key]
				if afterCost > refCost {
					cheatKey := [2][2]int{point, key}
					cheats[cheatKey] = afterCost - refCost
				}
			}
		}
	}
	count := 0
	for _, cheatSave := range cheats {
		if cheatSave >= 100 {
			count++
		}
	}
	return count
}

func main() {
	file, _ := os.ReadFile("day20.txt")
	var start [2]int
	maze = strings.Split(strings.Trim(string(file), "\n"), "\n")

	for i, line := range maze {
		if j := strings.IndexByte(line, 'S'); j >= 0 {
			start = [2]int{i, j}
			maze[i] = strings.Replace(line, "S", ".", 1)
		}
		if j := strings.IndexByte(line, 'E'); j >= 0 {
			target = [2]int{i, j}
			maze[i] = strings.Replace(line, "E", ".", 1)
		}
	}
	tracer(start)
	fmt.Println(getCheats(2), getCheats(20))
}
