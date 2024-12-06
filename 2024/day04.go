package main

import (
	"fmt"
	"os"
	"strings"
)

func checkXmas(x, y, dirX, dirY int, grid *[]string) bool {
	if dirX == 0 && dirY == 0 {
		return false
	}

	X := len(*grid)
	Y := len((*grid)[0])

	for i := range 4 {
		posX := x + i*dirX
		posY := y + i*dirY
		if posX >= 0 && posY >= 0 && posX < X && posY < Y {
			letter := ((*grid)[posX][posY])
			if letter != "XMAS"[i] {
				return false
			}
		} else {
			return false
		}
	}
	return true
}

func gotSM(c1 byte, c2 byte) bool {
	return (c1 == 'M' && c2 == 'S') || (c1 == 'S' && c2 == 'M')
}

func checkCrossMas(x, y int, grid *[]string) bool {
	X := len(*grid)
	Y := len((*grid)[0])

	if x == 0 || y == 0 || x == X-1 || y == Y-1 {
		return false
	}

	if (*grid)[x][y] != 'A' {
		return false
	}

	topLeft := (*grid)[x-1][y-1]
	bottomLeft := (*grid)[x+1][y-1]
	topRight := (*grid)[x-1][y+1]
	bottomRight := (*grid)[x+1][y+1]

	return gotSM(topLeft, bottomRight) && gotSM(topRight, bottomLeft)
}

func main() {
	file, _ := os.ReadFile("day04.txt")
	linesData := strings.Split(strings.Trim(string(file), "\n"), "\n")
	lines := &linesData

	X := len(linesData)
	Y := len((linesData)[0])

	count1 := 0
	count2 := 0

	for x := range X {
		for y := range Y {
			for i := -1; i <= 1; i++ {
				for j := -1; j <= 1; j++ {
					if checkXmas(x, y, i, j, lines) {
						count1++
					}
				}
			}
			if checkCrossMas(x, y, lines) {
				count2++
			}
		}
	}

	fmt.Println(count1, count2)
}
