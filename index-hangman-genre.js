var foodGenre = ["samosa","pooha","jalebi","dhokla","panipuri","kulche","ghewar","aamras","biryani","parantha"];
var animalsGenre = ["horse","dinosaur","capybara","giraffe","koala","cheetah","hedgehog","donkey","meerkat","racoon"];
var citiesGenre = ["mainpuri","ahemdabad","mawsynram","nashik","ludhiana","coimbatore","madurai","guwahati","bareilly","bhiwandi"]
var gameWord;
var count;
function randomNumberGenerator(choosenGenre){
    return Math.floor(Math.random() * choosenGenre.length);
}
function hangmanGame(selectedWord){
    count = 0;
    gameWord = selectedWord;
    newGameWord = gameWord.split("");
    for(var j=0;j<gameWord.length;j++){
    newGameWord[j] = '_';
    }
    document.querySelector("#lines").innerHTML = newGameWord; 
}
for(i=0;i<document.querySelectorAll(".btns").length;i++){
    document.querySelectorAll(".btns")[i].addEventListener("click",function(){
        checkLetter(this.innerHTML);
        buttonAnimation(this.innerHTML);
    });
}
document.addEventListener("keypress",function(event){
    checkLetter(event.key);
    buttonAnimation(event.key);
});
function resetLives(){
    for(var i=0;i<document.querySelectorAll(".lives").length;i++){
        document.querySelectorAll(".lives")[i].setAttribute("src","images/heart-red.png");
    }
    document.querySelector("#game-status").innerHTML = "";    
    document.querySelector("#choosen-word").innerHTML = "";
    for(var i=0;i<document.querySelectorAll(".btns").length;i++){
        document.querySelectorAll(".btns")[i].classList.remove("pressed");
    }
}
function buttonAnimation(currentKey){
    var activeButton = document.querySelector("."+currentKey);
    activeButton.classList.add("pressed");
}
function checkLetter(key){
    var supportingWord = gameWord.split("");
    var flag = 0;
    for(var i=0;i<gameWord.length;i++){
        if(key === supportingWord[i]){
            newGameWord[i] = key;
            flag = 1;
        }
    }
    if(flag ==  1){
        document.querySelector("#lines").innerHTML = newGameWord;
    }
    else{
        document.querySelectorAll(".lives")[count].setAttribute("src","images/heart-black.webp");
        count += 1;
    }
    if(count === 5){
        document.querySelector("#game-status").innerHTML = "Alas! You lost.";
        document.querySelector("#choosen-word").innerHTML = "The word was : " + gameWord;
    }
    var temp=1;
    for(var i=0;i<gameWord.length;i++){
        if(newGameWord[i]!=supportingWord[i]){
            temp = 0;
            break;
        }
    }
    if(temp == 1){
        document.querySelector("#game-status").innerHTML = "yeah! You won.";
    }
}
for(var i=0;i<document.querySelectorAll(".genre-button").length;i++){
    document.querySelectorAll(".genre-button")[i].addEventListener("click",function(){
        var genreId = this.id;
        if(genreId === "b1"){
            document.querySelector("#choose-genre").innerHTML = "Genre Choosen Food";
            var randomNumber = randomNumberGenerator(foodGenre);
            hangmanGame(foodGenre[randomNumber]);
            resetLives(); 
        }
        else if(genreId === "b2"){
            document.querySelector("#choose-genre").innerHTML = "Genre Choosen Animals"; 
            var randomNumber = randomNumberGenerator(animalsGenre);   
            hangmanGame(animalsGenre[randomNumber]);
            resetLives();
        }
        else {
            document.querySelector("#choose-genre").innerHTML = "Genre Choosen Cities"; 
            var randomNumber = randomNumberGenerator(citiesGenre);  
            hangmanGame(citiesGenre[randomNumber]);
            resetLives();
        }
    });
}
document.querySelector("#restart").addEventListener("click",function(){
    location.replace("index.html");
});