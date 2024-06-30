const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe("absolute", () =>{
	it("should return positive number if input is positive", () => {
		const result = lib.absolute(1);
		expect(result).toBe(1);
	});

	it("should return positive number if input is negative", () => {
		const result = lib.absolute(-1);
		expect(result).toBe(1);
	});

	it("should return 0 if input is 0", () => {
		const result = lib.absolute(0);
		expect(result).toBe(0);
	});
});

describe("greet", () =>{
	it("should return the greeting message", () => {
		const result = lib.greet("Alex");
		expect(result).toMatch(/Alex/);
	});
})

describe("getCurrencies", () =>{
	it("should return currency array", () => {
		const result = lib.getCurrencies("Alex");
		expect(result).toEqual(expect.arrayContaining(['AUD', 'USD', 'EUR']));
	});
})

describe("getProduct", () =>{
	it("should return a product array", () => {
		const result = lib.getProduct(1);
		expect(result).toMatchObject({id: 1, price: 10});

		expect(result).toHaveProperty("id", 1);
	});
})

describe("registerUser", () =>{
	it("should throw if username is falsy", () => {
		const args = [null, undefined, NaN, false, '', 0];
		args.forEach(a=>{
			expect(() => {lib.registerUser(a)}).toThrow();
		});
	});

	it("should return an object is valid username is passed", () => {
		const result = lib.registerUser("Alex");
		expect(result).toMatchObject({username: "Alex"});
		expect(result.id).toBeGreaterThan(0);
	})
})


describe("applyDiscount", () =>{
	it("should apply 10% discount when user points is more than 10", () => {
		db.getCustomerSync = function(customerID){
			console.log("fake reading customer");
			return {customerId: customerID, points: 20};
		}
		const order = {customerId: 1, totalPrice: 20};
		lib.applyDiscount(order);
		expect(order.totalPrice).toBe(18);
	});
})

describe("notifyCustomer", () =>{
	it("should notify customer", () => {
		// db.getCustomerSync = function(customerID){
		// 	return {email: 'a'};
		// }

		db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});

		mail.send = jest.fn();

		// let sendEmail = false;
		// mail.send = function(email, message){
		// 	sendEmail = true;
		// }

		lib.notifyCustomer({customerId: 1});
		// expect(sendEmail).toBe(true);
		expect(mail.send).toHaveBeenCalled();
		expect(mail.send.mock.calls[0][0]).toBe('a');
		expect(mail.send.mock.calls[0][1]).toMatch(/order/);
	});
})
