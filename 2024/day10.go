package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func lookup(graph *[][]int, i, j int) int {
	lenX := len(*graph)
	lenY := len((*graph)[0])
	if i < 0 || i >= lenX || j < 0 || j >= lenY {
		return -1
	}
	return (*graph)[i][j]
}

func climb(graph *[][]int, i, j int, height int) [][2]int {
	if height == 9 && lookup(graph, i, j) == height {
		return [][2]int{{i, j}}
	}
	var found [][2]int
	for _, coords := range [][2]int{{i + 1, j}, {i - 1, j}, {i, j + 1}, {i, j - 1}} {
		if lookup(graph, coords[0], coords[1]) == height+1 {
			found = append(found, climb(graph, coords[0], coords[1], height+1)...)
		}
	}
	return found
}

func trails(graph *[][]int) (int, int) {
	var allHeads [][2]int
	for i, row := range *graph {
		for j, num := range row {
			if num == 0 {
				allHeads = append(allHeads, [2]int{i, j})
			}
		}
	}

	count1 := 0
	count2 := 0
	for _, head := range allHeads {
		found := climb(graph, head[0], head[1], 0)
		tailsMap := make(map[int]bool)
		for _, tail := range found {
			tailsMap[100*tail[0]+tail[1]] = true
		}
		count1 += len(tailsMap)
		count2 += len(found)
	}
	return count1, count2
}

func main() {
	file, _ := os.ReadFile("day10.txt")
	input := strings.Split(strings.Trim(string(file), "\n"), "\n")
	graph := make([][]int, len(input))
	for i, row := range input {
		graph[i] = make([]int, len(row))
		for j, char := range row {
			num, _ := strconv.Atoi(string(char))
			graph[i][j] = num
		}
	}

	fmt.Println(trails(&graph))
}
