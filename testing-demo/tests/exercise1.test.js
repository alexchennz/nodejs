const exercise1 = require('../exercise1');

describe("fizzBuzz", () =>{
	it('should return error if input type is not a number', ()=>{
		expect(() => {exercise1.fizzBuzz('a')}).toThrow();
		expect(() => {exercise1.fizzBuzz('')}).toThrow();
		expect(() => {exercise1.fizzBuzz(null)}).toThrow();
		expect(() => {exercise1.fizzBuzz(undefined)}).toThrow();
	});

	it('should return FizzBuzz if number is devisible by 3 or 5', ()=>{
		const result = exercise1.fizzBuzz(15);
		expect(result).toBe('FizzBuzz');
	});

	it('should return Fizz if number is devisible by 3 only', ()=>{
		const result = exercise1.fizzBuzz(3);
		expect(result).toBe('Fizz');
	});

	it('should return Fizz if number is devisible by 5 only', ()=>{
		const result = exercise1.fizzBuzz(5);
		expect(result).toBe('Buzz');
	});

	it('should return Fizz if number is not devisible by 3 or 5', ()=>{
		const result = exercise1.fizzBuzz(1);
		expect(result).toBe(1);
	});
})