package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type Robot struct {
	x, y, Vx, Vy int
}

const sizeX = 101
const sizeY = 103

func checkSolid(robots *[][2]int) bool {
	plot := make([][]int, sizeX)
	for i, _ := range plot {
		plot[i] = make([]int, sizeY)
	}
	for _, robot := range *robots {
		plot[robot[0]][robot[1]]++
	}
	for i := range sizeX {
		streak := 0
		for j := range sizeY {
			count := plot[i][j]
			if count == 0 {
				streak = 0
			} else {
				streak++
				if streak > 10 {
					return true
				}
			}
		}
	}
	return false
}

var numsExp = regexp.MustCompile(`-?\d+`)

func positiveMod(base, modulo int) int {
	mod := base % modulo
	if mod < 0 {
		mod += modulo
	}
	return mod
}

func parseLine(line string) Robot {
	nums := numsExp.FindAllString(line, 4)
	output := make([]int, 4)
	for i, value := range nums {
		num, _ := strconv.Atoi(value)
		output[i] = num
	}
	return Robot{output[0], output[1], output[2], output[3]}
}

func sim(robots *[]Robot, t int, animate bool) int {
	newPos := make([][2]int, len(*robots))
	for i, robot := range *robots {
		newPos[i] = [2]int{positiveMod(robot.x+robot.Vx*t, sizeX), positiveMod(robot.y+robot.Vy*t, sizeY)}
	}
	if animate {
		if checkSolid(&newPos) {
			return t
		}
		return 0
	}
	notX, notY := (sizeX-1)/2, (sizeY-1)/2
	var quadrants [2][2]int
	for _, pos := range newPos {
		if pos[0] != notX && pos[1] != notY {
			i, j := 1, 1
			if pos[0] < notX {
				i = 0
			}
			if pos[1] < notY {
				j = 0
			}

			quadrants[i][j]++
		}
	}
	return quadrants[0][0] * quadrants[0][1] * quadrants[1][0] * quadrants[1][1]
}

func main() {
	file, _ := os.ReadFile("day14.txt")
	var robots []Robot
	for _, line := range strings.Split(strings.Trim(string(file), "\n"), "\n") {
		robots = append(robots, parseLine(line))
	}
	ans1 := sim(&robots, 100, false)

	for i := 0; ; i++ {
		treeAt := sim(&robots, i, true)
		if treeAt > 0 {
			fmt.Println(ans1, treeAt)
			break
		}
	}
}
