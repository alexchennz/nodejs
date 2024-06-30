function logger(req, res, next){
	console.log("Loading...");
	next();
}

module.exports = logger;