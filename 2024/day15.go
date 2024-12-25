package main

import (
	"fmt"
	"os"
	"regexp"
	"slices"
	"strconv"
	"strings"
)

type Dir struct {
	name string
	key  byte
	X, Y int
}

var dirs = map[byte]Dir{
	'^': Dir{"up", '^', -1, 0},
	'>': Dir{"right", '^', 0, 1},
	'v': Dir{"down", '^', 1, 0},
	'<': Dir{"left", '^', 0, -1},
}

func tryMove(move byte, posX, posY *int, grid *[][]byte) {
	dir, _ := dirs[move]
	nextX, nextY := *posX+dir.X, *posY+dir.Y
	next := (*grid)[nextX][nextY]
	if next == '#' {
		return
	}
	if next == '.' {
		*posX, *posY = nextX, nextY
		return
	}
	// next == 'O'
	nextGapX, nextGapY := 0, 0
	for i := 2; ; i++ {
		x, y := *posX+i*dir.X, *posY+i*dir.Y
		value := (*grid)[x][y]
		if value == '#' {
			// Hit wall
			return
		}
		if value == '.' {
			// Gap!
			nextGapX, nextGapY = x, y
			break
		}
	}
	*posX, *posY = nextX, nextY

	movedToLine := (*grid)[nextGapX]
	movedToLine[nextGapY] = 'O'
	(*grid)[nextGapX] = movedToLine

	nextLine := (*grid)[nextX]
	nextLine[nextY] = '.'
	(*grid)[nextX] = nextLine
}

// down is 1 for down, -1 for up
func moveVert(down int, points *[][2]int, grid *[][]byte) {
	slices.SortFunc(*points, func(point1, point2 [2]int) int {
		return down * (point2[0] - point1[0])
	})
	for _, point := range *points {
		line := (*grid)[point[0]+down]
		line[point[1]] = (*grid)[point[0]][point[1]]
		prevLine := (*grid)[point[0]]
		prevLine[point[1]] = '.'
		(*grid)[point[0]+down] = line
		(*grid)[point[0]] = prevLine
	}
}
func tryMove2(move byte, posX, posY *int, grid *[][]byte) {
	dir, _ := dirs[move]
	nextX, nextY := *posX+dir.X, *posY+dir.Y
	next := (*grid)[nextX][nextY]
	if next == '#' {
		return
	}
	if next == '.' {
		*posX, *posY = nextX, nextY
		return
	}
	// next == '[' or ']'
	// Horizontal
	if dir.X == 0 {
		nextGapY := 0
		for i := 2; ; i++ {
			y := *posY + i*dir.Y
			value := (*grid)[*posX][y]
			if value == '#' {
				// Hit wall
				return
			}
			if value == '.' {
				// Gap!
				nextGapY = y
				break
			}
		}
		*posY = nextY

		line := (*grid)[*posX]
		for j := nextGapY; j != nextY; j -= dir.Y {
			line[j] = line[j-dir.Y]
		}
		line[nextY] = '.'
		(*grid)[*posX] = line
	} else {
		// Vertical
		// ...ouch
		down := dir.X
		head := [][2]int{[2]int{nextX, *posY}}
		if next == ']' {
			head = append(head, [2]int{nextX, *posY - 1})
		} else if next == '[' {
			head = append(head, [2]int{nextX, *posY + 1})
		}
		cursor := 0
		for cursor < len(head) {
			nextPoint := head[cursor]
			switch after := (*grid)[nextPoint[0]+down][nextPoint[1]]; after {
			case '#':
				return
			case '[', ']':
				offset := 1
				if after == ']' {
					offset = -1
				}
				head = append(head, [2]int{nextPoint[0] + down, nextPoint[1]}, [2]int{nextPoint[0] + down, nextPoint[1] + offset})
			}
			cursor++
		}

		uniqueMap := make(map[int][2]int)
		var uniqueHead [][2]int
		for _, point := range head {
			uniqueMap[point[0]*100+point[1]] = point
		}
		for _, point := range uniqueMap {
			uniqueHead = append(uniqueHead, point)
		}
		moveVert(down, &uniqueHead, grid)
		*posX = nextX
	}
	return
}

func gps(grid *[][]byte) int {
	sum := 0
	for i, row := range *grid {
		for j, char := range row {
			if char == 'O' || char == '[' {
				sum += 100*i + j
			}
		}
	}
	return sum
}

var numsExp = regexp.MustCompile(`-?\d+`)

func parseLine(line string) [3]int {
	nums := numsExp.FindAllString(line, 3)
	output := make([]int, 3)
	for i, value := range nums {
		num, _ := strconv.Atoi(value)
		output[i] = num
	}
	return [3]int{output[0], output[1], output[2]}
}

func main() {
	file, _ := os.ReadFile("day15.txt")
	data := strings.Split(strings.Trim(string(file), "\n"), "\n\n")
	moves := []byte(data[1])
	grid := strings.Split(data[0], "\n")
	grid1 := make([][]byte, len(grid))
	for i, line := range grid {
		grid1[i] = []byte(line)
	}
	grid2 := make([][]byte, len(grid))

	posX, posY := 0, 0

lookupRobot:
	for i, line := range grid1 {
		for j, char := range line {
			if char == '@' {
				posX, posY = i, j
				line[j] = '.'
				grid1[i] = line
				break lookupRobot
			}
		}
	}
	for i, line := range grid1 {
		grid2[i] = make([]byte, len(line)*2)
		for j, char := range line {
			var c1, c2 byte
			switch char {
			case '#':
				c1, c2 = '#', '#'
			case 'O':
				c1, c2 = '[', ']'
			case '.':
				c1, c2 = '.', '.'
			}
			grid2[i][j*2], grid2[i][j*2+1] = c1, c2
		}
	}
	pos2X, pos2Y := posX, 2*posY

	for _, move := range moves {
		if move != '\n' {
			tryMove(move, &posX, &posY, &grid1)
			tryMove2(move, &pos2X, &pos2Y, &grid2)
		}
	}

	fmt.Println(gps(&grid1), gps(&grid2))
}
