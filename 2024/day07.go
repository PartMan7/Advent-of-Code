package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

type Eq struct {
	target int
	feed   []int
}

func reducer(acc int, index int, line *Eq, useConcat bool) bool {
	target := line.target
	if acc > target {
		return false
	}
	if index == len(line.feed) {
		return acc == target
	}
	next := line.feed[index]
	inter := reducer(acc+next, index+1, line, useConcat) || reducer(acc*next, index+1, line, useConcat)
	if !inter && useConcat {
		nextAcc := acc*int(math.Pow(10, 1+math.Floor(math.Log10(float64(next))))) + next
		inter = reducer(nextAcc, index+1, line, useConcat)
	}
	return inter
}

func main() {
	file, _ := os.ReadFile("day07.txt")
	linesData := strings.Split(strings.Trim(string(file), "\n"), "\n")
	var lines []Eq
	for _, line := range linesData {
		input := strings.Split(line, ": ")
		target, _ := strconv.Atoi(input[0])
		numStrs := strings.Split(input[1], " ")
		var nums []int
		for _, numStr := range numStrs {
			num, _ := strconv.Atoi(numStr)
			nums = append(nums, num)
		}
		lines = append(lines, Eq{target: target, feed: nums})
	}
	count1 := 0
	count2 := 0
	for _, line := range lines {
		if reducer(line.feed[0], 1, &line, false) {
			count1 += line.target
			count2 += line.target
		} else if reducer(line.feed[0], 1, &line, true) {
			count2 += line.target
		}
	}
	fmt.Println(count1, count2)
}
