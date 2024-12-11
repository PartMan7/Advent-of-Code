package main

import (
	"fmt"
	"os"
	"strings"
)

func progress(n1, n2 [2]int, antinodes *[][]bool) {
	lenX := len(*antinodes)
	lenY := len((*antinodes)[0])
	nextX := 2*n1[0] - n2[0]
	nextY := 2*n1[1] - n2[1]
	if nextX >= 0 && nextX < lenX && nextY >= 0 && nextY < lenY {
		(*antinodes)[nextX][nextY] = true
	}
}

func shoot(n1, n2 [2]int, resNodes *[][]bool) {
	lenX := len(*resNodes)
	lenY := len((*resNodes)[0])
	if n1[0] == n2[0] {
		// Horizontal lines can't use a slope
		for i := range lenY {
			(*resNodes)[n1[0]][i] = true
		}
		return
	}
	if n1[0] > n2[0] {
		// We only run one for each pair
		return
	}
	slope, base := n2[1]-n1[1], n2[0]-n1[0]
	for i := range lenX {
		if i != n1[0] && ((n1[0]-i)*slope)%base == 0 {
			// is in line
			j := n1[1] - ((n1[0]-i)*slope)/base
			if j >= 0 && j < lenY {
				(*resNodes)[i][j] = true
			}
		}
	}
}

func main() {
	file, _ := os.ReadFile("day08.txt")
	nodesMap := make(map[rune][][2]int)
	lines := strings.Split(strings.Trim(string(file), "\n"), "\n")
	antinodes := make([][]bool, len(lines))
	resNodes := make([][]bool, len(lines))
	for i, line := range lines {
		antinodes[i] = make([]bool, len(line))
		resNodes[i] = make([]bool, len(line))
		for j, char := range line {
			if char != '.' {
				resNodes[i][j] = true
				lookup, exists := nodesMap[char]
				if !exists {
					lookup = make([][2]int, 0)
				}
				lookup = append(lookup, [2]int{i, j})
				nodesMap[char] = lookup
			}
		}
	}

	for _, nodes := range nodesMap {
		for _, n1 := range nodes {
			for _, n2 := range nodes {
				if n1[0] == n2[0] && n1[1] == n2[1] {
					continue
				}
				progress(n1, n2, &antinodes)
				shoot(n1, n2, &resNodes)
			}
		}
	}

	count1 := 0
	count2 := 0
	for _, line := range antinodes {
		for _, occupied := range line {
			if occupied {
				count1++
			}
		}
	}
	for _, line := range resNodes {
		for _, occupied := range line {
			if occupied {
				count2++
			}
		}
	}
	fmt.Println(count1, count2)
}
