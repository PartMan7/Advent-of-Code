package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

func check(list []string, rules *[][2]string) bool {
	for _, rule := range *rules {
		i1 := slices.Index(list, rule[0])
		i2 := slices.Index(list, rule[1])
		if i1 != -1 && i2 != -1 {
			if i1 >= i2 {
				return false
			}
		}
	}
	return true
}

func main() {
	file, _ := os.ReadFile("day05.txt")
	_rawData := strings.Split(strings.Trim(string(file), "\n"), "\n\n")
	_rules := strings.Split(_rawData[0], "\n")
	rules := make([][2]string, len(_rules))
	for i, rule := range _rules {
		sides := strings.Split(rule, "|")
		rules[i] = [2]string{sides[0], sides[1]}
	}
	_lists := strings.Split(_rawData[1], "\n")
	lists := make([][]string, len(_lists))
	for i, list := range _lists {
		lists[i] = strings.Split(list, ",")
	}

	count1 := 0
	count2 := 0
	for _, list := range lists {
		length := len(list)
		if check(list, &rules) {
			num, _ := strconv.Atoi(list[(length + 1) / 2 - 1])
			count1 += num
		} else {
			slices.SortFunc(list, func(a, b string) int {
				if slices.Contains(_rules, fmt.Sprintf("%s|%s", a, b)) {
					return 1
				}
				return -1
			})
			num, _ := strconv.Atoi(list[(length + 1) / 2 - 1])
			count2 += num
		}
	}
	fmt.Println(count1, count2)
}
