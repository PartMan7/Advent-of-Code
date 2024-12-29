package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func mix(val, into int) int {
	return val ^ into
}

const two24 = 16777216

func iter(num int) int {
	i1 := mix(num*64, num) % two24
	i2 := mix(i1/32, i1) % two24
	return mix(i2*2048, i2) % two24
}

func store(bananas int, key int, cache *map[int][]int, seeds, iSeed int) {
	arr, exists := (*cache)[key]
	if !exists {
		arr = make([]int, seeds)
	}
	if arr[iSeed] == 0 {
		arr[iSeed] = bananas
		(*cache)[key] = arr
	}
}

func main() {
	file, _ := os.ReadFile("day22.txt")
	var seeds []int
	for _, line := range strings.Split(strings.Trim(string(file), "\n"), "\n") {
		num, _ := strconv.Atoi(line)
		seeds = append(seeds, num)
	}
	cache := make(map[int][]int)
	ans1 := 0
	for iSeed, seed := range seeds {
		diffs := make([]int, 2000)
		secret := seed
		for i := range 2000 {
			base := secret
			secret = iter(secret)
			diffs[i] = (secret % 10) - (base % 10)

			if i >= 3 {
				key := diffs[i-3]*19*19*19 + diffs[i-2]*19*19 + diffs[i-1]*19 + diffs[i]
				store(secret%10, key, &cache, len(seeds), iSeed)
			}
		}
		ans1 += secret
	}
	maxVal := 0
	for _, value := range cache {
		sum := 0
		for _, num := range value {
			sum += num
		}
		if sum > maxVal {
			maxVal = sum
		}
	}
	fmt.Println(ans1, maxVal)
}
