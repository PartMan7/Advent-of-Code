package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	newlinesFile, _ := os.ReadFile("day03.txt")
	file := (strings.ReplaceAll(string(newlinesFile), "\n", ""))
	mulExp := regexp.MustCompile(`mul\((\d+),(\d+)\)`)
	doDontExp := regexp.MustCompile(`don't\(\).*?(do\(\)|$)`)
	results1 := mulExp.FindAllStringSubmatch(file, -1)
	trimmedFile := string(doDontExp.ReplaceAll([]byte(file), []byte("$1")))
	results2 := mulExp.FindAllStringSubmatch(trimmedFile, -1)
	sum1 := 0
	for _, result := range results1 {
		num1, _ := strconv.Atoi((result[1]))
		num2, _ := strconv.Atoi((result[2]))
		sum1 += num1 * num2
	}
	sum2 := 0
	for _, result := range results2 {
		num1, _ := strconv.Atoi((result[1]))
		num2, _ := strconv.Atoi((result[2]))
		sum2 += num1 * num2
	}
	fmt.Println(sum1, sum2)
}
