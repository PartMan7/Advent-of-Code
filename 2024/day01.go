package main

import (
	"fmt"
	"math"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"
)

func main() {
	file, _ := os.ReadFile("day01.txt")
	entries := strings.Split(string(file), "\n")
	var list1 []int
	var list2 []int
	map2 := make(map[int]int)

	spaces := regexp.MustCompile(" +")

	for _, entry := range entries {
		if len(entry) > 0 {
			parts := spaces.Split(entry, 2)
			val1, _ := strconv.Atoi(parts[0])
			val2, _ := strconv.Atoi(parts[1])
			list1 = append(list1, val1)
			list2 = append(list2, val2)
			map2[val2]++
		}
	}

	sort.Ints(list1)
	sort.Ints(list2)

	sum := 0
	similarity := 0
	for index, val1 := range list1 {
		sum += int(math.Abs(float64(val1) - float64(list2[index])))
		similarity += val1 * map2[val1]
	}

	fmt.Println(sum, similarity)
}
