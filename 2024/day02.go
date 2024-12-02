package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func is_monotonic(nums []int) bool {
	up := 0
	down := 0

	for i := range len(nums) {
		if i > 0 && nums[i] > 0 {
			last_num := nums[i-1]
			num := nums[i]
			if last_num == 0 {
				if i == 1 {
					continue
				}
				last_num = nums[i-2]
			}
			if num > last_num {
				up++
			} else if num < last_num {
				down++
			}
		}
	}

	return up == 0 || down == 0
}

func is_spiky(nums []int) bool {
	for i := range len(nums) {
		if i > 0 && nums[i] > 0 {
			last_num := nums[i-1]
			if last_num == 0 {
				if i == 1 {
					continue
				}
				last_num = nums[i-2]
			}
			diff := math.Abs(float64(nums[i]) - float64(last_num))
			if diff < 1 || diff > 3 {
				return false
			}
		}
	}

	return true
}

func is_safe(nums []int) bool {
	if !is_monotonic(nums) {
		return false
	}
	if !is_spiky(nums) {
		return false
	}
	return true
}

func is_damped_safe(nums []int) bool {
	if is_safe(nums) {
		return true
	}
	for i := 0; i < len(nums); i++ {
		removed := nums[i]
		nums[i] = 0
		was_safe := is_safe(nums)
		nums[i] = removed
		if was_safe {
			return true
		}
	}
	return false
}

func main() {
	file, _ := os.ReadFile("day02.txt")
	entries := strings.Split(string(file), "\n")
	var levels [][]int
	for _, entry := range entries {
		if len(entry) > 0 {
			num_strs := strings.Split(entry, " ")
			var nums []int
			for _, num_str := range num_strs {
				num, _ := strconv.Atoi(num_str)
				nums = append(nums, num)
			}
			levels = append(levels, nums)
		}
	}
	safe := 0
	damped_safe := 0
	for _, level := range levels {
		if is_safe(level) {
			safe++
		}
		if is_damped_safe(level) {
			damped_safe++
		}
	}
	fmt.Println(safe, damped_safe)
}
