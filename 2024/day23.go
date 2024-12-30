package main

import (
	"fmt"
	"os"
	"slices"
	"sort"
	"strings"
)

func intersect[T int | string](lists ...[]T) []T {
	var out []T
mainLoop:
	for _, term := range lists[0] {
		for i, slice := range lists {
			if i > 0 {
				if !slices.Contains(slice, term) {
					continue mainLoop
				}
			}
		}
		out = append(out, term)
	}
	return out
}

func main() {
	file, _ := os.ReadFile("day23.txt")
	data := strings.Split(strings.Trim(string(file), "\n"), "\n")
	var pairs [][2]string
	for _, pair := range data {
		split := strings.Split(pair, "-")
		pairs = append(pairs, [2]string{split[0], split[1]})
	}

	links := make(map[string][]string)
	for _, pair := range pairs {
		links[pair[0]] = append(links[pair[0]], pair[1])
		links[pair[1]] = append(links[pair[1]], pair[0])
	}

	trios := make(map[[3]string]bool)
	for node1, range1 := range links {
		for _, node2 := range range1 {
			if node1 == node2 {
				continue
			}
			hasT := strings.HasPrefix(node1, "t") || strings.HasPrefix(node2, "t")
			range2 := links[node2]
			for _, node := range range1 {
				if slices.Contains(range2, node) {
					if hasT || strings.HasPrefix(node, "t") {
						keyVal := []string{node1, node2, node}
						sort.Strings(keyVal)
						key := [3]string{keyVal[0], keyVal[1], keyVal[2]}
						trios[key] = true
					}
				}
			}
		}
	}

	intersectByNode := func(nodes []string) []string {
		bases := make([][]string, len(nodes))
		for i, node := range nodes {
			bases[i] = links[node]
		}
		return intersect(bases...)
	}

	visited := make(map[string]bool)

	var maxNetwork []string
	maxLen := 0
	var queue [][]string
	for baseNode, _ := range links {
		queue = append(queue, []string{baseNode})
	}
	for len(queue) > 0 {
		length := len(queue)
		next := queue[length-1]
		queue = queue[:length-1]

		if len(next) >= maxLen {
			maxNetwork = next
			maxLen = len(next)
		}
		for _, newNode := range intersectByNode(next) {
			toAppend := append(next[:0:0], next...)
			toAppend = append(toAppend, newNode)
			sort.Strings(toAppend)
			key := strings.Join(toAppend, ",")
			if visited[key] {
				continue
			}
			visited[key] = true
			queue = append(queue, toAppend)
		}
	}

	fmt.Println(len(trios), strings.Join(maxNetwork, ","))
}
