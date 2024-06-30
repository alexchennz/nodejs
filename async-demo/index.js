console.log('before');
// getUser(1, (user) => {
// 	getRepositories(user.gitHubUsername, (repos) => {
// 		getCommits(repos[0], (commits) => {
// 			console.log(commits);
// 		});
// 	});
// });

// const p = getUser(1);
// p
// .then(user => getRepositories(user.gitHubUsername))
// .then(repos => getCommits(repos[0]))
// .then(commits => console.log("Commits", commits))
// .catch(err => console.log("Error", err.message));


async function displayCommits(){
	try{
		const user = await getUser(1);
		const repos = await getRepositories(user.gitHubUsername);
		const commits = await getCommits(repos[0]);

		console.log("Commits", commits);
	}
	catch(err){
		console.log("Error", err.message);
	}

	
}

displayCommits();

// console.log(user);
console.log('after');

// function getRepositories(user){
// 	getRepositories(user.gitHubUsername, getCommits);
// }

function getCommits(repo){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Calling Github API....');
			resolve(['commit']);
		}, 2000);
	});
}

// function displayCommits(commits){
// 	console.log(commits);
// }


function getUser(id){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('read a user from database....');
			resolve({id: id, gitHubUsername: "Alex"});
		}, 2000);
	});
	
}

function getRepositories(username){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Calling Github API....');
			resolve(['repo1', 'repo2', 'repo3']);
		}, 2000);
	});
	
}

