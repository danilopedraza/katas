package main

import (
	"testing"

	"github.com/ddsgok/bdd"
)

func Test_Add_up_to_two_numbers(t *testing.T) {
	given := bdd.Sentences().Given()

	given(t, "an empty string", func(when bdd.When) {

		when(`add("") is called`, func(it bdd.It) {

			it("should return 0", func(assert bdd.Assert) {
				result, err := add("")
				assert.Equal(0, result)
				assert.Equal(nil, err)
			})
		})
	})

	given(t, "a string with a single number", func(when bdd.When) {

		when(`add("1") is called`, func(it bdd.It) {

			it("should return 1", func(assert bdd.Assert) {
				result, err := add("1")
				assert.Equal(1, result)
				assert.Equal(err, nil)
			})
		})

		when(`add("2") is called`, func(it bdd.It) {

			it("should return 2", func(assert bdd.Assert) {
				result, err := add("2")
				assert.Equal(2, result)
				assert.Equal(err, nil)
			})
		})

		when(`add("52") is called`, func(it bdd.It) {

			it("should return 52", func(assert bdd.Assert) {
				result, err := add("52")
				assert.Equal(52, result)
				assert.Equal(nil, err)
			})
		})
	})

	given(t, "a string with two numbers", func(when bdd.When) {

		when(`add("0,1") is called`, func(it bdd.It) {

			it("should return 1", func(assert bdd.Assert) {
				result, err := add("0,1")
				assert.Equal(1, result)
				assert.Equal(nil, err)
			})
		})

		when(`add("1,1") is called`, func(it bdd.It) {

			it("should return 2", func(assert bdd.Assert) {
				result, err := add("1,1")
				assert.Equal(2, result)
				assert.Equal(nil, err)
			})
		})

		when(`add("13,255") is called`, func(it bdd.It) {

			it("should return 268", func(assert bdd.Assert) {
				result, err := add("13,255")
				assert.Equal(268, result)
				assert.Equal(nil, err)
			})
		})
	})
}

func Test_Add_an_arbitrary_amount_of_numbers(t *testing.T) {
	given := bdd.Sentences().Given()

	given(t, "a string with three numbers", func(when bdd.When) {

		when(`add("0,0,0") is called`, func(it bdd.It) {

			it("should return 0", func(assert bdd.Assert) {
				result, err := add("0,0,0")
				assert.Equal(0, result)
				assert.Equal(nil, err)
			})
		})

		when(`add("0,0,1") is called`, func(it bdd.It) {

			it("should return 1", func(assert bdd.Assert) {
				result, err := add("0,0,1")
				assert.Equal(1, result)
				assert.Equal(nil, err)
			})
		})

		when(`add("3,11,1") is called`, func(it bdd.It) {

			it("should return 15", func(assert bdd.Assert) {
				result, err := add("3,11,1")
				assert.Equal(15, result)
				assert.Equal(nil, err)
			})
		})
	})

	given(t, "a string with four numbers", func(when bdd.When) {

		when(`add("1,1,1,1") is called`, func(it bdd.It) {

			it("should return 4", func(assert bdd.Assert) {
				result, err := add("1,1,1,1")
				assert.Equal(4, result)
				assert.Equal(nil, err)
			})
		})
	})
}

func Test_Use_comma_and_new_line_as_delimiters_between_numbers(t *testing.T) {
	given := bdd.Sentences().Given()

	given(t, "a string with two numbers", func(when bdd.When) {

		when(`add("0\n0") is called`, func(it bdd.It) {

			it("should return 0", func(assert bdd.Assert) {
				result, err := add("0\n0")
				assert.Equal(0, result)
				assert.Equal(nil, err)
			})
		})

		when(`add("0\n1") is called`, func(it bdd.It) {

			it("should return 1", func(assert bdd.Assert) {
				result, err := add("0\n1")
				assert.Equal(1, result)
				assert.Equal(nil, err)
			})
		})
	})

	given(t, "a string with three numbers", func(when bdd.When) {

		when(`add("1,1\n1") is called`, func(it bdd.It) {

			it("should return 3", func(assert bdd.Assert) {
				result, err := add("1,1\n1")
				assert.Equal(3, result)
				assert.Equal(nil, err)
			})
		})
	})
}

func Test_Allow_a_custom_delimiter(t *testing.T) {
	given := bdd.Sentences().Given()

	given(t, "a string with no numbers", func(when bdd.When) {

		when(`add("//.\n") is called`, func(it bdd.It) {

			it("should return 0", func(assert bdd.Assert) {
				result, err := add("//.\n")
				assert.Equal(0, result)
				assert.Equal(nil, err)
			})
		})
	})

	given(t, "a string with a single number", func(when bdd.When) {

		when(`add("//.\n1") is called`, func(it bdd.It) {

			it("should return 1", func(assert bdd.Assert) {
				result, err := add("//.\n1")
				assert.Equal(1, result)
				assert.Equal(nil, err)
			})
		})
	})

	given(t, "a string with two numbers", func(when bdd.When) {

		when(`add("//.\n1.2") is called`, func(it bdd.It) {

			it("should return 3", func(assert bdd.Assert) {
				result, err := add("//.\n1.2")
				assert.Equal(3, result)
				assert.Equal(nil, err)
			})
		})

		when(`add("//bbbb\n123bbbb24") is called`, func(it bdd.It) {

			it("should return 147", func(assert bdd.Assert) {
				result, err := add("//bbbb\n123bbbb24")
				assert.Equal(147, result)
				assert.Equal(nil, err)
			})
		})

		when(`add("//56\n1568") is called`, func(it bdd.It) {

			it("should return 9", func(assert bdd.Assert) {
				result, err := add("//56\n1568")
				assert.Equal(9, result)
				assert.Equal(nil, err)
			})
		})
	})
}

func Test_Forbid_negative_numbers(t *testing.T) {
	given := bdd.Sentences().Given()

	given(t, "a string with a negative number", func(when bdd.When) {
		when(`add("-1") is called`, func(it bdd.It) {
			it("should return an error", func(assert bdd.Assert) {
				result, err := add("-1")
				assert.Equal(0, result)
				assert.Equal(`negatives not allowed: -1`, err.Error())
			})
		})
	})

	given(t, "a string with several negative numbers", func(when bdd.When) {
		when(`add("-1,1,-5") is called`, func(it bdd.It) {
			it("should return an error", func(assert bdd.Assert) {
				result, err := add("-1,1,-5")
				assert.Equal(0, result)
				assert.Equal(`negatives not allowed: -1, -5`, err.Error())
			})
		})
	})
}

func Test_Ignore_big_numbers(t *testing.T) {
	given := bdd.Sentences().Given()

	given(t, "a string with a big number", func(when bdd.When) {
		when(`add("1001") is called`, func(it bdd.It) {
			it("should return 0", func(assert bdd.Assert) {
				result, err := add("1001")
				assert.Equal(0, result)
				assert.Equal(nil, err)
			})
		})

		when(`add("1000") is called`, func(it bdd.It) {
			it("should return 1000", func(assert bdd.Assert) {
				result, err := add("1000")
				assert.Equal(1000, result)
				assert.Equal(nil, err)
			})
		})
	})
}
