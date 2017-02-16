var ntt = ntt || {};
//---------------Shuffle --------------------------

ntt.shuffle = function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

///----------------picking category for tunes -----------------------------------------
ntt.pickCategory = function pickCategory(e) {
  this.$li = $(e.currentTarget);
  this.chosenCategory = (this.$li.html()).replace(/ /g, '').toLowerCase();

  if (this.chosenCategory === 'pop') {
    this.currenttunes = this.shuffle(this.poptunes);
  }else if (this.chosenCategory === 'rock') {
    this.currenttunes = this.shuffle(this.rocktunes);
  }else if (this.chosenCategory === 'hiphop'){
    this.currenttunes = this.shuffle(this.hiphoptunes);
  }else if (this.chosenCategory === 'all'){
    this.currenttunes = this.shuffle(this.alltunes);
  }
  this.$cats.hide();
  this.$selector.hide();
  this.$go.show();
  this.$ready.show();
};
//------------Creating object of both correct answer and wrong answers----------------
ntt.makingGame = function makingGame() {
  for (let i=0; i<this.currenttunes.length; i++) {
    this.randomrandom = [];
    this.huw = (this.currenttunes[i]);

    this.random1 = this.currenttunes[Math.ceil(Math.random()*(this.currenttunes.length-1))];
    while (this.random1 === this.huw) {
      this.random1 = this.currenttunes[Math.ceil(Math.random()*(this.currenttunes.length-1))];
    }
    this.random2 = this.currenttunes[Math.ceil(Math.random()*(this.currenttunes.length)-1)];
    while (this.random2 === this.random1 || this.random2 === this.huw) {
      this.random2 = this.currenttunes[Math.ceil(Math.random()*(this.currenttunes.length)-1)];
    }
    this.random3 = this.currenttunes[Math.ceil(Math.random()*(this.currenttunes.length)-1)];
    while (this.random3 === this.random1 || this.random3 === this.random2 || this.random3 === this.huw) {
      this.random3 = this.currenttunes[Math.ceil(Math.random()*(this.currenttunes.length)-1)];
    }
    this.indtune = document.createElement('audio');
    this.mp3files = this.huw.replace(/ /g, '_');
    this.indtune.src = (`tunes/${this.mp3files}.mp3`);

    this.randomrandom.push(this.huw);
    this.randomrandom.push(this.random1);
    this.randomrandom.push(this.random2);
    this.randomrandom.push(this.random3);
    this.songbits.push(this.indtune);
    this.multipleanswers.push({
      audio: this.huw,
      options: this.shuffle(this.randomrandom)
    });
    // console.log(this.multipleanswers[i].audio);
    // console.log(this.multipleanswers[i].options);
  }
  this.$options.show();

};

//----------Updating multiplechoice------------------
ntt.updateOptions = function updateOptions() {
  this.len= (this.multipleanswers[0].options);
  this.$answers.show();
  for (let i=0; i<this.$options.length; i++) {
    this.$options[i].textContent = this.len[i];
  }
};

// -------------- Adding score/ feedback --------------
ntt.checkAnswer = function checkAnswer(e) {
  this.$li = $(e.currentTarget);
  this.chosenanswer = (this.$li.html());
  this.correctanswer= (this.multipleanswers[0].audio).toString();
  if (this.correctanswer === this.chosenanswer) {
    this.$bing.play();
    this.startingscore = this.startingscore+ parseFloat((this.answerTimeRemaining)*10);
    this.$score.text('Your score is:  ' + this.startingscore);
    this.$feedback.text('Correct!');
    this.visScore();
    this.$feedback.removeClass('lose');
    this.$feedback.addClass('win');
  } else {
    this.$feedback.text('Incorrect!');
    this.$feedback.removeClass('win');
    this.$feedback.addClass('lose');
    if (this.startingscore >=1) {
      this.startingscore = this.startingscore-10;
      this.$score.text('Your score is:  ' + this.startingscore);
    }
  }
  this.stopTunes();
  this.multipleanswers.splice(0,1);
  this.songbits.splice(0,1);
  this.updateOptions();
  this.clearQuestionTimer();
  this.startQuestionTimer();
};
//-------------hiding stuff ---------------------------
ntt.hideStuff = function hideStuff() {
  this.$go.hide();
  this.$ready.hide();
};
//-----------Song stuff -------------------------------
ntt.playTunes = function playTunes() {
  this.songbits[0].play();
};
ntt.stopTunes = function stopTunes() {
  this.songbits[0].pause();
};
//-------------Clock stuff ----------------------------
ntt.startRoundTimer = function startRoundTimer(){
  this.roundTimerId = setInterval(() => {
    this.roundTimeRemaining--;
    this.$roundtimer.text(this.roundTimeRemaining);
    if (this.roundTimeRemaining <=0) {
      clearInterval(this.roundTimerId);
      this.clearQuestionTimer();
      this.stopTunes();
      this.endGame();
      this.$clap.play();
    }
  }, 1000);
};

ntt.startQuestionTimer= function startQuestionTimer(){
  this.answerTimerId = setInterval(() => {
    this.answerTimeRemaining--;
    this.$questiontimer.text(this.answerTimeRemaining);
    if ((this.answerTimeRemaining <=-1)&&(this.roundTimeRemaining>0)){
      clearInterval(this.answerTimerId);
      this.stopTunes();
      this.multipleanswers.splice(0,1);
      this.songbits.splice(0,1);
      this.updateOptions();
      this.playTunes();
      this.clearQuestionTimer();
      this.startQuestionTimer();
    }
  }, 1000);
};

ntt.clearQuestionTimer= function clearQuestionTimer() {
  clearInterval(this.answerTimerId);
  this.answerTimerId = null;
  this.answerTimeRemaining =7;
  this.$questiontimer.text(7);
};
//-----------score bar---------------------------------------
ntt.visScore = function visScore() {
  this.$visualscore.css({'height': '+=10'});
};
//-----------end game ---------------------------------------
ntt.endGame = function endGame() {
  this.$options.hide();
  this.$gameover = document.createElement('div');
  this.$gameovertext = document.createElement('h2');
  this.$yourscore = document.createElement('p');
  this.$gameover.classList.add('gameover');
  this.$gameovertext.textContent= 'CONGRATULATIONS';
  this.$yourscore.textContent = ('Your score was     ' + this.startingscore);
  this.$questions.append(this.$gameover);
  this.$gameover.append(this.$gameovertext);
  this.$gameover.append(this.$yourscore);
  this.$replay.show();
};

ntt.startAgain =function startAgain() {
  this.$goagain = $('.gameover');
  this.$goagain.remove();
  this.$li = $('li');
  this.startingscore = 0;
  this.roundTimeRemaining = 60;
  this.roundTimerId = null;
  this.answerTimeRemaining =7;
  this.answerTimerId = null;
  this.$selector.show();
  this.$cats.show();
  this.$replay.hide();
  this.$roundtimer.text(60);
  this.$score.text('Your score is:  0');
  this.currenttunes = [];
  this.multipleanswers = [];
  this.songbits = [];
  this.$visualscore.css({'height': '20'});
  this.$feedback.text('');
  this.$feedback.removeClass('win');
  this.$feedback.removeClass('lose');
};

ntt.instructionSliding= function instructionSliding() {
  this.$instructions.slideToggle('slow');
};
//////---------------- JQueeerrryyyyyyyiiinnnggg

ntt.play = function() {
  this.$instructions = $('.instructions');
  this.$questions = $('.questions');
  this.$ready = $('.ready');
  this.$roundtimer = $('.rounds');
  this.$questiontimer = $('.tunes');
  this.$go = $('.go');
  this.$answers = $('.multipchoice');
  this.$options = $('.choices');
  this.$score = $('.score');
  this.$feedback =$('.feedback');
  this.$visualscore = $('.visualscore');
  this.$replay= $('.replay');
  this.$bing = $('.bing').get(0);
  this.$clap=$('.clap').get(0);
  this.$li = $('li');
  this.$cats= $('.cats');
  this.$selector= $('.pleaseselect');
  this.startingscore = 0;
  this.roundTimeRemaining =60;
  this.roundTimerId = null;
  this.answerTimeRemaining =7;
  this.answerTimerId = null;
  this.multipleanswers = [];
  this.songbits = [];
  this.currenttunes = [];
  // this.shufflecheck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  // console.log('before');
  // console.log(this.shufflecheck);
  // this.shuffle(this.shufflecheck);
  // console.log('after');
  // console.log(this.shufflecheck);
  this.$go.hide();
  this.$ready.hide();
  this.$replay.hide();
  this.$options.hide();

  this.$instructions.on('click', this.instructionSliding.bind(this));
  this.$cats.on('click', this.pickCategory.bind(this));
  this.$go.on('click', this.makingGame.bind(this));
  this.$go.on('click', this.playTunes.bind(this));
  this.$options.on('click', this.checkAnswer.bind(this));
  this.$options.on('click', this.playTunes.bind(this));
  this.$go.on('click', this.startRoundTimer.bind(this));
  this.$go.on('click', this.startQuestionTimer.bind(this));
  this.$go.on('click', this.hideStuff.bind(this));
  this.$go.on('click', this.updateOptions.bind(this));
  this.$replay.on('click', this.startAgain.bind(this));
};

$(ntt.play.bind(ntt));
