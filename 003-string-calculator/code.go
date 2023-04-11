package main

import (
	"bytes"
	"errors"
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

func hasCustomDelimiter(numbers string) bool {
	regex := "^//[.\n]\n"
	matched, _ := regexp.MatchString(regex, numbers)

	return matched
}

func splitByCustom(numbers string) []string {
	delimiter := string(numbers[2])

	numbers = numbers[4:]
	if numbers == "" {
		return []string{}
	}

	return strings.Split(numbers, delimiter)
}

func splitByDefault(numbers string) []string {
	if numbers == "" {
		return []string{}
	}
	regex := regexp.MustCompile("[,\n]")
	return regex.Split(numbers, -1)
}

func splitNumbers(numbers string) []string {
	if hasCustomDelimiter(numbers) {
		return splitByCustom(numbers)
	}

	return splitByDefault(numbers)
}

func isNotValid(strNum string) bool {
	regex := "^-"
	notValid, _ := regexp.Match(regex, []byte(strNum))

	return notValid
}

func getNegatives(separated []string) []string {
	negatives := []string{}
	for i := 0; i < len(separated); i++ {
		if isNotValid(separated[i]) {
			negatives = append(negatives, separated[i])
		}
	}

	return negatives
}

func getErrorMessage(separated []string) (int, error) {
	var buffer bytes.Buffer
	buffer.WriteString("negatives not allowed: ")

	negatives := getNegatives(separated)
	buffer.WriteString(strings.Join(negatives, ", "))

	return 0, errors.New(buffer.String())
}

func validateAndParse(strNum string, separated []string) (int, error) {
	if isNotValid(strNum) {
		return getErrorMessage(separated)
	}

	return strconv.Atoi(strNum)
}

func parseNumbers(separated []string) ([]int, error) {
	parsed := []int{}
	for i := 0; i < len(separated); i++ {
		num, err := validateAndParse(separated[i], separated)
		if err != nil {
			return []int{}, err
		}

		parsed = append(parsed, num)
	}

	return parsed, nil
}

func ignoreBigNumbers(parsed []int) []int {
	smallNumbers := []int{}
	for i := 0; i < len(parsed); i++ {
		if parsed[i] <= 1000 {
			smallNumbers = append(smallNumbers, parsed[i])
		} else {
			continue
		}
	}

	return smallNumbers
}

func getSum(parsed []int) int {
	smallNumbers := ignoreBigNumbers(parsed)
	result := 0
	for i := 0; i < len(smallNumbers); i++ {
		result += smallNumbers[i]
	}

	return result
}

func add(numbers string) (int, error) {
	separated := splitNumbers(numbers)
	parsed, err := parseNumbers(separated)

	return getSum(parsed), err
}

func main() {
	fmt.Println("Hello, Go!")
}
