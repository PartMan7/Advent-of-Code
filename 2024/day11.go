package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func blink(line map[int]int) map[int]int {
	output := make(map[int]int)
	for stone, amount := range line {
		stoneStr := strconv.Itoa(stone)
		if stone == 0 {
			output[1] += amount
		} else if len(stoneStr)%2 == 0 {
			stone1, _ := strconv.Atoi(stoneStr[0 : len(stoneStr)/2])
			stone2, _ := strconv.Atoi(stoneStr[len(stoneStr)/2:])
			output[stone1] += amount
			output[stone2] += amount
		} else {
			output[stone*2024] += amount
		}
	}
	return output
}

func getAmount(line *map[int]int) int {
	total := 0
	for _, amount := range *line {
		total += amount
	}
	return total
}

func main() {
	file, _ := os.ReadFile("day11.txt")
	input := make(map[int]int)
	for _, term := range strings.Split(strings.Trim(string(file), "\n"), " ") {
		num, _ := strconv.Atoi(term)
		input[num]++
	}
	line := input
	for range 25 {
		line = blink(line)
	}
	count1 := getAmount(&line)
	for range 50 {
		line = blink(line)
	}
	count2 := getAmount(&line)
	fmt.Println(count1, count2)
}
