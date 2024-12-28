package main

import (
	"fmt"
	"os"
	"slices"
	"sort"
	"strconv"
	"strings"
)

const STEPS = 1024
const GRID_SIZE = 71

type State struct {
	X, Y  int
	steps int
	heur  int
}

var visited = make(map[[2]int]int)
var queue []State

var grid = make(map[[2]int]bool)

func canVisit(state State) bool {
	key := [2]int{state.X, state.Y}
	if !(state.X >= 0 && state.X < GRID_SIZE && state.Y >= 0 && state.Y < GRID_SIZE) {
		return false
	}
	if grid[key] {
		return false
	}
	res, exists := visited[key]
	if !exists {
		visited[key] = state.steps
		return true
	}
	if res <= state.steps {
		return false
	}
	visited[key] = state.steps
	return true
}

func enqueue(newState State) {
	at := sort.Search(len(queue), func(index int) bool {
		if queue[index].heur != newState.heur {
			return queue[index].heur <= newState.heur
		}
		return queue[index].steps >= newState.steps
	})
	queue = slices.Insert(queue, at, newState)
}

func dijkstra() int {
	targetX, targetY := GRID_SIZE-1, GRID_SIZE-1
	queue = []State{{0, 0, 0, (GRID_SIZE - 1) * 2}}
	for len(queue) > 0 {
		length := len(queue)
		next := queue[length-1]
		queue = queue[:length-1]
		if next.X == targetX && next.Y == targetY {
			return next.steps
		}
		for x := range 2 {
			y := 1 - x
			for negative := range 2 {
				if negative == 1 {
					x, y = -x, -y
				}
				posX, posY := next.X+x, next.Y+y
				nextState := State{posX, posY, next.steps + 1, next.steps + targetY - posX + targetY - posY}
				if canVisit(nextState) {
					enqueue(nextState)
				}
			}
		}
	}
	return -1
}

func parseLine(line string) [2]int {
	var out [2]int
	for i, numStr := range strings.Split(line, ",") {
		num, _ := strconv.Atoi(numStr)
		out[i] = num
	}
	return out
}

func main() {
	file, _ := os.ReadFile("day18.txt")
	lines := strings.Split(strings.Trim(string(file), "\n"), "\n")
	points := make([][2]int, len(lines))
	for i, line := range lines {
		points[i] = parseLine(line)
	}
	for i := range STEPS {
		grid[points[i]] = true
	}
	ans1 := dijkstra()
	var ans2 [2]int
	for i := STEPS; ; i++ {
		point := points[i]
		grid[point] = true
		visited = make(map[[2]int]int)
		res := dijkstra()
		if res == -1 {
			ans2 = point
			break
		}
	}
	fmt.Println(ans1, fmt.Sprintf("%d,%d", ans2[0], ans2[1]))
}
