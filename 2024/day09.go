package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

type Space struct {
	id   int
	size int
}

func compact(row *[]int) {
	for {
		first0 := slices.Index(*row, 0)
		lastNum := -1
		length := len(*row)
		for i := range length {
			at := length - i - 1
			term := (*row)[at]
			if term > 0 {
				lastNum = at
				break
			}
		}
		if lastNum >= 0 && lastNum <= first0 {
			return
		}
		(*row)[first0] = (*row)[lastNum]
		(*row)[lastNum] = 0
	}
}

func collapse(line *[]Space) {
	baseLength := len(*line)
	for backIndex := range baseLength {
		index := baseLength - backIndex - 1
		if (*line)[index].size == 0 {
			*line = slices.Delete(*line, index, index+1)
		}
	}
checkGaps:
	for {
		for i, term := range *line {
			if i > 0 {
				nextTerm := (*line)[i-1]
				if nextTerm.id == 0 && term.id == 0 {
					term.size += nextTerm.size
					(*line)[i-1] = term
					*line = slices.Delete(*line, i, i+1)
					continue checkGaps
				}
			}
		}
		return
	}
}

func packetCompact(line *[]Space) {
	maxIdTried := (*line)[len(*line)-1].id
	if maxIdTried == 0 {
		maxIdTried = (*line)[len(*line)-2].id
	}
	maxIdTried++
checkMovable:
	for {
		for mainCursor := len(*line) - 1; mainCursor > 0; mainCursor-- {
			mainTerm := (*line)[mainCursor]
			if mainTerm.id == 0 {
				continue
			}
			if mainTerm.id >= maxIdTried {
				continue
			}
			for gapCursor, term := range *line {
				if gapCursor > mainCursor {
					break
				}
				if term.id != 0 || term.size < mainTerm.size {
					continue
				}
				// Move
				term.size -= mainTerm.size
				(*line)[gapCursor] = term
				*line = slices.Insert(*line, gapCursor, mainTerm)
				maxIdTried = mainTerm.id
				mainTerm.id = 0
				(*line)[mainCursor+1] = mainTerm
				collapse(line)
				continue checkMovable
			}
			maxIdTried = mainTerm.id
		}
		break
	}
}

func checksum(row *[]int) int {
	sum := 0
	for i, num := range *row {
		if num > 0 {
			sum += i * (num - 1)
		}
	}
	return sum
}
func compactChecksum(line *[]Space) int {
	sum := 0
	cursor := 0
	for _, space := range *line {
		if space.id > 0 {
			indexSum := (cursor*2 + space.size - 1) * space.size / 2
			sum += (space.id - 1) * indexSum
		}
		cursor += space.size
	}
	return sum
}

func main() {
	file, _ := os.ReadFile("day09.txt")
	input := (strings.Trim(string(file), "\n"))
	length := 0
	for _, char := range input {
		num, _ := strconv.Atoi(string(char))
		length += num
	}
	expanded := make([]int, length)
	compacted := make([]Space, len(input))

	cursor := 0
	blanks := false
	id := 1 // We represent IDs as id+1 because yes.
	for i, char := range input {
		num, _ := strconv.Atoi(string(char))
		if !blanks {
			for range num {
				expanded[cursor] = id
				cursor++
			}
			compacted[i] = Space{id: id, size: num}
			id++
		} else {
			cursor += num
			compacted[i] = Space{id: 0, size: num}
		}
		blanks = !blanks
	}
	compact(&expanded)
	fmt.Println(checksum(&expanded))

	packetCompact(&compacted)
	fmt.Println(compactChecksum(&compacted))
}
