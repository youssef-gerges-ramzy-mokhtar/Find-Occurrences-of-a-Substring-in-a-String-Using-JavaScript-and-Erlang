"use strict"; // do not modify or delete this line

//Task 1
//data is a string, patterns is an array of patterns
function find(data, patterns) {
	let frequencies={};
	let offsets={};
	
	//your implementation goes here
	const data_arr = data.split('');
	patterns.forEach(function(pattern, patternIdx) {
		// For Empty Data or Pattern should be ignored and an empty list should be used
		let freq = 0;
		const offset = [];

		data_arr.forEach(function(dataEl, dataIdx) {
			if (!isSubstr(data, pattern, dataIdx)) return;
			offset.push(dataIdx);
		})

		frequencies[pattern] = offset.length;
		offsets[pattern] = offset;
	})

	return {frequencies, offsets};
}

function isSubstr(data, pattern, startPos) {
	if (data === '' || pattern === '') return false;
	if (startPos + (pattern.length - 1) >= data.length) return false;

	let exist = true;
	pattern.split('').forEach(function(patterChar, patternIdx) {
		if (data[startPos + patternIdx] !== patterChar) {exist = false; return;}
	})

	return exist;
}

// const data = "AACGTCGACG";
// const patterns = ["C", "CG"];
// console.log(data)
// console.log(find(data, patterns));


//use these for results of analyse1, analyse2 and analyse3
const results1 = {};
const results2 = {};
const results3 = {};

//Task 2
function analysingFiles(data, patterns, resultsObj) {
	data = data.split(/\r?\n/);
	patterns = patterns.split(/\r?\n/);

	const results = {};
	data.forEach(function(data, idx) {
		results[data] = find(data, patterns);
	})

	for (const key in results)
		resultsObj[key] = results[key];
}

function analyse1(dataFile, patternFile){
	//your implementation goes here
	const fs = require("fs");
	fs.readFile(patternFile, "utf8", function(err, patterns) {
		fs.readFile(dataFile, "utf8", function(err, data) {
			analysingFiles(data, patterns, results1);
			// console.log(results1);
			print(results1);
		})
	})
}
analyse1("file.data", "file.pattern");


//Task 3
const readFilePromise = (filePath) => {
	//your implementation goes here
	const fs = require("fs");
	return new Promise(function(resolve, reject) {
		fs.readFile(filePath, "utf8", function(err, data) {
			if (err) reject(err);
			else resolve(data);
		})
	})
}

function analyse2(dataFile, patternFile) {
	//your implementation goes here
	const dataPromise = readFilePromise(dataFile);
	const patternPromise = readFilePromise(patternFile);
	
	Promise.all([dataPromise, patternPromise]).then(function(values) {
		analysingFiles(values[0], values[1], results2);
		// console.log(results2);
		print(results2);
	})
}
analyse2("file.data", "file.pattern");


//Task 4 
async function analyse3(dataFile, patternFile) {
	//your implementation for analyse3 goes here
	const data = await readFilePromise(dataFile);
	const pattern = await readFilePromise(patternFile);

	analysingFiles(data, pattern, results3);
	// console.log(results3);
	print(results3);
}
analyse3("file.data", "file.pattern");



//-------------------------------------------------------------------------------
//do not modify this function
function print(results){
	console.log("Printing results...");
	Object.keys(results).forEach(function(elem){
		console.log("sequence: ", elem);
		console.log("frequencies are: ", results[elem].frequencies);
		console.log("offsets are: ", results[elem].offsets);
		console.log("---------------------------");
	});
}
//--------------- export the find function (required for the marking script)
module.exports ={find}; //do not modify this line
