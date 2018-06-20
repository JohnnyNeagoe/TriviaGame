
var triviaQuestions = [{
	question: "What year did batman first appear in a comic book?",
	answerList: ["1920", "1939", "1995", "1988"],
	answer: 1
},{
	question: "What year was the character of Robin first introduced?",
	answerList: ["1957", "1981", "1945", "1940"],
	answer: 3
},{
	question: "What super villain once broke Batman's back, leaving him crippled and wheelchair-bound?",
	answerList: ["Bane", "The Joker", "Killer Croc", "Deadshot"],
	answer: 0
},{
	question: "Which famous anti-hero does the actress Margot Robbie play in the Batman spinoff movie, Suicide Squad?",
	answerList: ["Posion Ivy", "Harley Quinn", "Cat Woman", "Bat Girl"],
	answer: 1
},{
	question: "What were the names of Bruce Wayne's parents?",
	answerList: ["Geroge and Elane", "Beth and John", "Mark and Lacy", "Thomas and Martha"],
	answer: 3
},{
	question: "What former District Attorney became the villain known as Two-Face?",
	answerList: ["Jason Blood", "Harvey Dent", "Floyd Lawton", "John Johnson"],
	answer: 1
},{
	question: "What villain did Arnold Schwarzenegger play in Batman & Robin?",
	answerList: ["The Penguin", "Mr. Freeze", "Sub-Zero", "Bane"],
	answer: 1
},{
	question: "Who is the Joker's accomplice and lover?",
	answerList: ["Harley Quinn", "Posion Ivy", "Cat Woman", "Clown Girl"],
	answer: 0
},{
	question: "Where does Batman send his most twisted foes for rehabilitation?",
	answerList: ["Gotham Medical", "Prison", "Arkham Asylum", "Insane Island"],
	answer: 2
},{
	question: "Which of these actors have not taken on the role of Batman",
	answerList: ["Chirstian Bale", "Ben Afleck", "Robert Downy Junior", "George Clooney"],
	answer: 2
},{
	question: "What color was the original Batmobile?",
	answerList: ["Red", "Dark Green", "Black", "Gray"],
	answer: 0
},{
	question: "What event traumatized and shaped Bruce Wayne as a kid, and led to his becoming Batman?",
	answerList: ["House burned down", "Parents were mugged and killed", "Car Accident", "Attacked by Bats"],
	answer: 1
},{
	question: "What character in Batman Begins and The Dark Knight was created by the director, Chistopher Nolen?",
	answerList: ["Commissioner Gordon", "Rachel Daws", "Alfred", "The Joker"],
	answer: 1
},{
	question: "What is Batman's real name",
	answerList: ["Robin", "Bruce Banner", "Bruce Wayne", "Wayne Brucey"],
	answer: 2
},{
	question: "What late actor received critical accliam for their portrail of the infamous villan known as The Joker",
	answerList: ["Tom Hardy", "Chirtian Bale", "Heath Ledger", "Johnny Neagoe"],
	answer: 2
}];
var gifArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen','fourteen','fifteen'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var answered;
var seconds; var time; var userSelect; 
var messages = {
	correct: "Yes, that's right! Good Job!",
	incorrect: "Sorry that is incorrect!",
	endTime: "Sorry! Out of time!",
	finished: "Well played, lets see how you scored!"
}
$('#start').on('click', function(){
	$(this).hide();
	newGame();
});
$('#startOver').on('click', function(){
	$(this).hide();
	newGame();
});
function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	$('#currentQuestion').html('Question # '+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}
function countdown(){
	seconds = 10;
	$('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}
function showCountdown(){
	seconds--;
	$('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}
function answerPage(){
	$("#currentQuestion").empty();
	$(".thisChoice").empty();
	$(".question").empty();

	var rightAnswer = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$("#gif").html("<img src = 'assets/images/"+ gifArray[currentQuestion] +".gif' width = '400px'>");
	if ((userSelect === rightAnswerIndex) && (answered == true)){
		correctAnswer++;
        $('#message').html(messages.correct);
        $("#timer").empty();
        
	} else if((userSelect !== rightAnswer) && (answered == true)){
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswer);
        $("#timer").empty();
	} else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswer);
        answered = true;
        $("#timer").empty();
	}
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}
function scoreboard(){
	$("#timer").empty();
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOver').addClass('reset');
	$('#startOver').show();
	$('#startOver').html("<button id='reset' type='button' class='btn btn-success'>" + 'Start Over?' + "</button>");
}








