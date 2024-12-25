package main

import (
	"fmt"
	"os"
	"slices"
	"sort"
	"strings"
)

var targetX, targetY int
var maze []string

type Dir struct {
	adj  [2]byte
	X, Y int
}

var dirs = map[byte]Dir{
	'^': Dir{[2]byte{'<', '>'}, -1, 0},
	'>': Dir{[2]byte{'^', 'v'}, 0, 1},
	'v': Dir{[2]byte{'>', '<'}, 1, 0},
	'<': Dir{[2]byte{'v', '^'}, 0, -1},
}

type State struct {
	X, Y   int
	facing byte
	score  int
	from   string
}

type Track struct {
	score int
	from  []string
}

var visited = make(map[string]Track)
var queue []State

func serialize(state State) string {
	return fmt.Sprintf("%d,%d,%c", state.X, state.Y, state.facing)
}

func enqueue(newState State) {
	if maze[newState.X][newState.Y] != '.' {
		return
	}
	at := sort.Search(len(queue), func(index int) bool {
		return queue[index].score <= newState.score
	})
	queue = slices.Insert(queue, at, newState)
}

var seatsList = make(map[string]bool)
var endedFacing []byte

func trace(key string) {
	entry, exists := visited[key]
	if !exists {
		return
	}
	for _, from := range entry.from {
		if from == "" {
			return
		}
		pos := from[:len(from)-2]
		seatsList[pos] = true
		trace(from)
	}
}

func goodSeats() int {
	for _, dir := range endedFacing {
		trace(fmt.Sprintf("%d,%d,%c", targetX, targetY, dir))
	}
	return len(seatsList) + 1 // for the base seat
}

func dijkstra(startX, startY int, facing byte) (ans1 int, seats int) {
	ans1 = -1
	queue = append(queue, State{startX, startY, facing, 0, ""})
	for len(queue) > 0 {
		length := len(queue)
		node := queue[length-1]
		if ans1 >= 0 && node.score > ans1 {
			break
		}
		queue = queue[:length-1]

		key := serialize(node)
		value, exists := visited[key]
		if exists && value.score < node.score {
			continue
		}
		if !exists || value.score > node.score {
			newTrack := Track{node.score, []string{node.from}}
			visited[key] = newTrack
		} else if !slices.Contains(value.from, node.from) {
			value.from = append(value.from, node.from)
			visited[key] = value
		}

		if node.X == targetX && node.Y == targetY {
			if ans1 < 0 || ans1 > node.score {
				ans1 = node.score
				endedFacing = []byte{node.facing}
			} else if ans1 == node.score && !slices.Contains(endedFacing, node.facing) {
				endedFacing = append(endedFacing, node.facing)
			}
			continue
		}

		dir, _ := dirs[node.facing]
		enqueue(State{node.X + dir.X, node.Y + dir.Y, node.facing, node.score + 1, key})
		for _, newDir := range dir.adj {
			if maze[node.X+dirs[newDir].X][node.Y+dirs[newDir].Y] == '.' {
				enqueue(State{node.X, node.Y, newDir, node.score + 1000, key})
			}
		}
	}
	return ans1, goodSeats()
}

func main() {
	file, _ := os.ReadFile("day16.txt")
	startX, startY := 0, 0
	maze = strings.Split(strings.Trim(string(file), "\n"), "\n")

	for i, line := range maze {
		if j := strings.IndexByte(line, 'S'); j >= 0 {
			startX, startY = i, j
			maze[i] = strings.Replace(line, "S", ".", 1)
		}
		if j := strings.IndexByte(line, 'E'); j >= 0 {
			targetX, targetY = i, j
			maze[i] = strings.Replace(line, "E", ".", 1)
		}
	}
	fmt.Println(dijkstra(startX, startY, '>'))
}
