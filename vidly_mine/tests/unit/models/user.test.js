const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
	it("should return an auth token", ()=>{
		const payload = {_id: new mongoose.Types.ObjectId(), isAdmin: true};
		const user = new User(payload);
		const token = user.generateAuthToken();

		const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
		const privateKey = config.get('jwtPrivateKey');
	});
});