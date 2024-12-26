package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

var numsExp = regexp.MustCompile(`\d+`)

func parseLine(line string) int {
	nums := numsExp.FindAllString(line, 1)
	num, _ := strconv.Atoi(nums[0])
	return num
}

func intPow(base, power, cap int) int {
	out := 1
	for range power {
		out *= base
		if out > cap {
			break
		}
	}
	return out
}

var cursor = 0

func run(registers [3]int, program []int) (output []int) {
	getNext := func() (val int, ok bool) {
		if cursor >= len(program) {
			return 0, false
		}
		val = program[cursor]
		cursor++
		return val, true
	}
	lookup := func(value int) (val int) {
		if value < 4 {
			return value
		}
		return registers[value-4]
	}
	getCombo := func() (val int, ok bool) {
		next, ok := getNext()
		if !ok {
			return 0, false
		}
		return lookup(next), true
	}
loop:
	for cursor < len(program) {
		op, ok := getNext()
		if !ok {
			break
		}
		switch op {
		case 0, 6, 7:
			// adv, bdv, cdv
			register := op - 5
			if op == 0 {
				register = 0
			}
			combo, ok := getCombo()
			if !ok {
				break loop
			}
			registers[register] = registers[0] / intPow(2, combo, registers[0])
		case 1:
			// bxl
			next, ok := getNext()
			if !ok {
				break loop
			}
			registers[1] = registers[1] ^ next
		case 2:
			// bst
			combo, ok := getCombo()
			if !ok {
				break loop
			}
			registers[1] = combo % 8
		case 3:
			// jnz
			next, ok := getNext()
			if !ok {
				break loop
			}
			if registers[0] != 0 {
				cursor = next
			}
		case 4:
			// bxc
			_, ok := getNext()
			if !ok {
				break loop
			}
			registers[1] = registers[1] ^ registers[2]
		case 5:
			// out
			combo, ok := getCombo()
			if !ok {
				break loop
			}
			output = append(output, combo%8)
		}
	}
	return output
}

func check(nextA, A, B1, B2 int) int {
	// This only works assuming the program to be 2,4,1,B1,7,5,1,B2,0,3,4,6,5,5,3,0
	b := nextA ^ B1
	c := (A + nextA) / intPow(2, b, A+nextA)
	b = (b ^ B2) ^ c
	return b % 8
}
func backsolve(cursor, A int, program *[]int) (output int, ok bool) {
	B1, B2 := (*program)[3], (*program)[7]
	if cursor < 0 {
		return A, true
	}
	target := (*program)[cursor]
	A *= 8
	for a := range 8 {
		if check(a, A, B1, B2) == target {
			res, ok := backsolve(cursor-1, A+a, program)
			if ok {
				return res, true
			}
		}
	}
	return 0, false
}

func main() {
	file, _ := os.ReadFile("day17.txt")
	lines := strings.Split(string(file), "\n")
	A, B, C := parseLine(lines[0]), parseLine(lines[1]), parseLine(lines[2])
	var program []int
	for _, value := range numsExp.FindAllString(lines[4], -1) {
		num, _ := strconv.Atoi(value)
		program = append(program, num)
	}
	output := run([3]int{A, B, C}, program)
	ans1 := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(output)), ","), "[]")
	ans2, _ := backsolve(len(program)-1, 0, &program)

	fmt.Println(ans1, ans2)
}
