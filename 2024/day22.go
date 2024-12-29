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

func prune(val int) int {
	return val % 16777216
}

func iter(num int) int {
	i1 := prune(mix(num*64, num))
	i2 := prune(mix(i1/32, i1))
	return prune(mix(i2*2048, i2))
}

func store(bananas int, key *[4]int, cache *map[[4]int][]int, seeds, iSeed int) {
	arr, exists := (*cache)[*key]
	if !exists {
		arr = make([]int, seeds)
	}
	if arr[iSeed] == 0 {
		arr[iSeed] = bananas
		(*cache)[*key] = arr
	}
}

func main() {
	file, _ := os.ReadFile("day22.txt")
	var seeds []int
	for _, line := range strings.Split(strings.Trim(string(file), "\n"), "\n") {
		num, _ := strconv.Atoi(line)
		seeds = append(seeds, num)
	}
	cache := make(map[[4]int][]int)
	ans1 := 0
	for iSeed, seed := range seeds {
		diffs := make([]int, 2000)
		secret := seed
		for i := range 2000 {
			base := secret
			secret = iter(secret)
			diffs[i] = (secret % 10) - (base % 10)

			if i >= 3 {
				// enough to start indexing
				key := [4]int{diffs[i-3], diffs[i-2], diffs[i-1], diffs[i]}
				store(secret%10, &key, &cache, len(seeds), iSeed)
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
