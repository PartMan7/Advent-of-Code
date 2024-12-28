package main

import (
	"fmt"
	"os"
	"strings"
)

var combos = make(map[string]int)

func checkCombos(pattern string, towels *[]string) int {
	if pattern == "" {
		return 1
	}
	combo, cached := combos[pattern]
	if cached {
		return combo
	}
	ways := 0
	for _, towel := range *towels {
		if strings.HasPrefix(pattern, towel) {
			ways += checkCombos(strings.TrimPrefix(pattern, towel), towels)
		}
	}
	combos[pattern] = ways
	return ways
}

func main() {
	file, _ := os.ReadFile("day19.txt")
	portions := strings.Split(strings.Trim(string(file), "\n"), "\n\n")
	towels := strings.Split(portions[0], ", ")
	patterns := strings.Split(portions[1], "\n")
	ans1, ans2 := 0, 0
	for _, pattern := range patterns {
		ways := checkCombos(pattern, &towels)
		if ways > 0 {
			ans1++
			ans2 += ways
		}
	}
	fmt.Println(ans1, ans2)
}
