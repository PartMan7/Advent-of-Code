package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

var numsExp = regexp.MustCompile(`\d+`)

func numsFromLine(line string) (int, int) {
	nums := numsExp.FindAllString(line, 2)
	num1, _ := strconv.Atoi(nums[0])
	num2, _ := strconv.Atoi(nums[1])
	return num1, num2
}

func tryhard(Ax, Ay, Bx, By, targetX, targetY int) (int, int) {
	targetX2, targetY2 := targetX+10000000000000, targetY+10000000000000
	p1 := Ax * (Bx*targetY - By*targetX) / (Ay*Bx - Ax*By)
	q1 := Ay * p1 / Ax
	p2 := Ax * (Bx*targetY2 - By*targetX2) / (Ay*Bx - Ax*By)
	q2 := Ay * p2 / Ax

	tokens1, tokens2 := 0, 0
	if p1%Ax == 0 && q1%Ay == 0 && (targetX-p1)%Bx == 0 && (targetY-q1)%By == 0 {
		tokens1 = 3*p1/Ax + (targetX-p1)/Bx
	}
	if p2%Ax == 0 && q2%Ay == 0 && ((targetX2)-p2)%Bx == 0 && ((targetY2)-q2)%By == 0 {
		tokens2 = 3*p2/Ax + ((targetX2)-p2)/Bx
	}
	return tokens1, tokens2
}

func main() {
	file, _ := os.ReadFile("day13.txt")

	sum1, sum2 := 0, 0
	for _, input := range strings.Split(strings.Trim(string(file), "\n"), "\n\n") {
		lines := strings.Split(input, "\n")
		Ax, Ay := numsFromLine(lines[0])
		Bx, By := numsFromLine(lines[1])
		targetX, targetY := numsFromLine(lines[2])

		tokens1, tokens2 := tryhard(Ax, Ay, Bx, By, targetX, targetY)
		sum1 += tokens1
		sum2 += tokens2
	}

	fmt.Println(sum1, sum2)
}
