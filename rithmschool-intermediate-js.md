Lesson: https://www.rithmschool.com/courses/intermediate-javascript/javascript-higher-order-functions

# Higher Order Functions and Timers
## Basic example of Higher Order Function
- setTimeout is a function that takes in a function and executes that function after a given amount of time
ex. setTimeout(function ...i lost it...)

### Can create our own!
function sendMessage(message, fn) {
	return fn(message);
}
sendMessage("hi", alert());
- common error: alert() returns undefined and then is passed into sendMessage. you should use "alert" instead of "alert()" because the "()" invokes the function
--> sendMessage("hi", alert);

- higher order functions are useful to learn when you get into async coding / AJAX

### Anonymous functions
sendMessage("Hi", function(m) { console.log(m + " from a callback function!"); });
- just prints whatever you pass in + " from a callback function"
- 

## Another Example of a HOF
function each(array, fn) {
	for (var i = 0; i < array.length; i++) {
		fn(array[i]);
	}
}

each([1,2,3,4], function(val) { console.log(val + " * 2 = " + (val * 2)); });	

### Another Example: map
[5,6,7,8].map(function(val) { console.log(val * 10); });
- this function returns [undefined, undefined, undefined, undefined]
- need to return if we actually want the array to be updated

function map(array, fn) {
	var returnArray = [];
	for(var i = 0; i < array.length; i++) {
		returnArray.push(fn(array[i]));
	}
	return returnArray;
}
map([1,2,3], function(val) { return val * 10; });
=> returns [10,20,30]

#### also works
function map(array, fn) {
        for(var i = 0; i < array.length; i++) {
                array[i] = fn(array[i]);
        }
        return array;
}


## How Javascript runs functions in general
- this is generally for async computations
- there is a runtime javascript queue
- if you have a function that waits for 0 seconds and executes, it wont actually be run immediately. it will only be run after everything that's currently running is done 

# Closures
function outer(a) { 
	return function inner(b) {
		return a + b;
	}
}

resultOfOuter = outer(5);
=> returns the function "inner(b) {
                return a + b;
        }"

resultOfOuter(11);
=> returns 16

outer(12)(2)
=> returns 14

- The value of "a" is kept in memory until the garbage collector runs
- Runs into this when programming in the DOM, event driven stuff

function createInstructors(){
    var instructors = ["Elie", "Matt", "Tim"];
    return {
        showInstructors: function displayAllInstructors(){
            return instructors;
        },
        addInstructor: function addNewInstructor(instructor){
            instructors.push(instructor)
            return instructors;
        }
    }
}
- this function uses closures because the two inner functions still have access to the "instructors" function
- this is a jankier version of a class
- could just use a class for this...
- this is done because js doesn't have real classes earlier on

## Immediately Invoked Function Expression
This is used by surrounding something in parens. i.e...
var instructorModule = (function createInstructors(){
    var instructors = ["Elie", "Matt", "Tim"];
    return {
        showInstructors: function displayAllInstructors(){
            return instructors;
        },
        addInstructor: function addNewInstructor(instructor){
            instructors.push(instructor)
            return instructors;
        }
    }
})();
   ^ invoking the function
- instructorModule doesn't hold the function, it holds the return value
- useful because this function has access to a private array that the user doesn't have access to
- used to mimic a class before classes were a thing in JS


## What are common use cases right now for closures?
-


# Promises
- used with AJAX to deal with async code
- a Promise is a way to get some thing that's going to happen in the future
- like a deli ticket
- a "Promise" to do some work in the future
- they are built into the browser

var p = new Promise(function(accept, reject) {})
- this is a HOF that takes 2 functions as parameters
- accept is the function you call when the thing you're trying to do succeeds
- reject is the function you call when the thing you're trying to do throws some error or fails in some way

var p = new Promise(function(accept, reject) { accept("it works"); })

to give a callback, use then()
p.then(function(data) { console.log(data); })
- usually people implement the .then()
- don't usually implement the promise, usually just pulls them in from a library

var p = new Promise(function(accept, reject) {
        setTimeout(function() {
                if (Math.random() > 0.5) { accept("it works"); }
                else { reject("FAILED!!") };
        }, 2000);
})


p.then(function(data) { console.log(data); });

use .catch to catch the error and do something with it

## Real Life example
go to https://jquery.com, jquery should be loaded there and can use in the Console in Chrome
$.get("https://pokeapi.co/api/v2/pokemon/ditto/").then(function() { console.log("done"); });
to look at the actual return value: $.get("https://pokeapi.co/api/v2/pokemon/ditto/").then(function(data) { console.log(data); });
- there is an attribute called "front_default" under sprites key
- we can display it by doing: $.get("https://pokeapi.co/api/v2/pokemon/ditto/").then(function(data) { console.log(data.sprites.front_default); }); 

I still don't know what jQuery is but I guess this is an example of a Promise
- the API call is made and the response is given some time in the future
