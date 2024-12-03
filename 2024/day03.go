package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	file, _ := os.ReadFile("day03.txt")
	file = []byte(strings.ReplaceAll(string(file), "\n", ""))
	mulExp := regexp.MustCompile(`mul\((\d+),(\d+)\)`)
	doDontExp := regexp.MustCompile(`don't\(\).*?(do\(\)|$)`)
	results1 := mulExp.FindAllSubmatch(file, -1)
	trimmedFile := doDontExp.ReplaceAll(file, []byte("$1"))
	results2 := mulExp.FindAllSubmatch(trimmedFile, -1)
	sum1 := 0
	for _, result := range results1 {
		num1, _ := strconv.Atoi(string(result[1]))
		num2, _ := strconv.Atoi(string(result[2]))
		sum1 += num1 * num2
	}
	sum2 := 0
	for _, result := range results2 {
		num1, _ := strconv.Atoi(string(result[1]))
		num2, _ := strconv.Atoi(string(result[2]))
		sum2 += num1 * num2
	}
	fmt.Println(sum1, sum2)
}
