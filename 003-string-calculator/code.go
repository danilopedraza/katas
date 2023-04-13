package main

import (
	"bytes"
	"errors"
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

func hasCharDelimiter(numbers string) bool {
	regex := "^//[.\n]\n"
	matched, _ := regexp.MatchString(regex, numbers)

	return matched
}

func hasStringDelimiters(numbers string) bool {
	regex := `^//(\[(.|\n)*\])+\n`
	matched, _ := regexp.MatchString(regex, numbers)

	return matched
}

func QuoteMeta(delimiters []string) []string {
	result := []string{}

	for i := 0; i < len(delimiters); i++ {
		result = append(result, regexp.QuoteMeta(delimiters[i]))
	}

	return result
}

func getRegex(delimiters []string) regexp.Regexp {
	quoted := QuoteMeta(delimiters)

	return *regexp.MustCompile(strings.Join(quoted, "|"))
}

func splitByCustomStrings(numbers string) []string {
	before, after, _ := strings.Cut(numbers, "]\n")
	if after == "" {
		return []string{}
	}

	delimiters := strings.Split(before[3:], "][")
	regex := getRegex(delimiters)

	return regex.Split(after, -1)
}

func splitByCustomChar(numbers string) []string {
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
	if hasCharDelimiter(numbers) {
		return splitByCustomChar(numbers)
	} else if hasStringDelimiters(numbers) {
		return splitByCustomStrings(numbers)
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

func omitBigNumbers(parsed []int) []int {
	smallNumbers := []int{}
	for i := 0; i < len(parsed); i++ {
		if parsed[i] <= 1000 {
			smallNumbers = append(smallNumbers, parsed[i])
		}
	}

	return smallNumbers
}

func getSum(parsed []int) int {
	smallNumbers := omitBigNumbers(parsed)
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
