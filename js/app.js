
// -------------- Constants/variables ------------------------------
function play() {
  const $instructions = $('.instructions');
  const $questions = $('.questions');
  const $ready = $('.ready');
  const $roundtimer = $('.rounds');
  const $questiontimer = $('.tunes');
  const $go = $('.go');
  const $answers = $('ul');
  const $options = $('.choices');
  const $score = $('.score');
  const $feedback =$('.feedback');
  const $visualscore = $('.visualscore');
  const $replay= $('.replay');
  const $bing = $('.bing').get(0);
  const $bong = $('.bong').get(0);
  let $li = $('li');
  let startingscore = 0;
  let roundTimeRemaining =60;
  let roundTimerId = null;
  let answerTimeRemaining =7;
  let answerTimerId = null;

//-------------Array---------------------------
  const tunes = ['American Boy','Apologize','Bad Romance','Dilemma','Firework','Forget You','Gold Digger','Hero','Hey Ya', 'Hips Dont Lie', 'I Dont Feel Like Dancing', 'In For The Kill', 'Independent Woman', 'Is This The Way To Amarillo','It Wasnt Me','Love The Way You Lie', 'Low', 'Moves Like Jagger', 'Poker Face', 'Pure And Simple','Sex On Fire','Sexy And I Know It', 'Single Ladies', 'Someone Like You', 'Use Somebody', 'Viva La Vida', 'When Love Takes Over', 'Where Is The Love', 'Whole Again','Yeah'];

  let currenttunes = tunes;
  shuffle(currenttunes);

//------------Creating object of both correct answer and wrong answers----------------
  let multipleanswers = [];
  let songbits = [];

  function makingGame() {
    for (let i=0; i<currenttunes.length; i++) {
      const randomrandom = [];
      const huw = (currenttunes[i]);
      let random1 = currenttunes[Math.ceil(Math.random()*(currenttunes.length-1))];
      while (random1 === huw) {
        random1 = currenttunes[Math.ceil(Math.random()*(currenttunes.length-1))];
      }
      let random2 = currenttunes[Math.ceil(Math.random()*(currenttunes.length)-1)];
      while (random2 === random1 || random2 === huw) { //while??
        random2 = currenttunes[Math.ceil(Math.random()*(currenttunes.length)-1)];
      }
      let random3 = currenttunes[Math.ceil(Math.random()*(currenttunes.length)-1)];
      while (random3 === random1 || random3 === random2 || random3 === huw) {
        random3 = currenttunes[Math.ceil(Math.random()*(currenttunes.length)-1)];
      }
      const indtune = document.createElement('audio');
      const mp3files = (currenttunes[i]).replace(/ /g, '_');
      indtune.src = (`tunes/${mp3files}.mp3`);

      randomrandom.push(huw);
      randomrandom.push(random1);
      randomrandom.push(random2);
      randomrandom.push(random3);
      songbits.push(indtune);
      multipleanswers.push({
        audio: currenttunes[i],
        options: shuffle(randomrandom)
      });
    }
  }
//---------------Shuffle --------------------------
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

//----------Updating multiplechoice------------------
  function updateOptions () {
    const len= (multipleanswers[0].options);
    $answers.show();
    for (let i=0; i<$options.length; i++) {
      $options[i].textContent = len[i];
    }
  }

// -------------- Adding score/ feedback --------------
  function checkAnswer (e) {
    $li = $(e.currentTarget);
    const chosenanswer = ($li.html());
    const correctanswer= (multipleanswers[0].audio).toString();
    if (correctanswer === chosenanswer) {
      $bing.play();
      startingscore = startingscore+ parseFloat((answerTimeRemaining)*10);
      $score.text('Your score is:  ' + startingscore);
      $feedback.text('Correct!');
      visscore();
    } else {
      $feedback.text('Incorrect!');
      $bong.play();
      if (startingscore >=1) {
        startingscore = startingscore-10;
        $score.text('Your score is:  ' + startingscore);
      }
    }
    stoptunes();
    multipleanswers.splice(0,1);
    songbits.splice(0,1);
    updateOptions();
    clearQuestionTimer();
    startQuestionTimer();
  }
//-------------hiding stuff ---------------------------
  function hideStuff() {
    $go.hide();
    $ready.hide();
  }
//-----------Song stuff -------------------------------
  function playtunes () {
    songbits[0].play();
  }
  function stoptunes () {
    songbits[0].pause();
  }
//-------------Clock stuff ----------------------------
  function startRoundTimer(){
    roundTimerId = setInterval(() => {
      roundTimeRemaining--;
      $roundtimer.text(roundTimeRemaining);
      if (roundTimeRemaining <=0) {
        clearInterval(roundTimerId);
        $answers.hide();
        clearQuestionTimer();
        stoptunes();
        endgame();
      }
    }, 1000);
  }

  function startQuestionTimer(){
    answerTimerId = setInterval(() => {
      answerTimeRemaining--;
      $questiontimer.text(answerTimeRemaining);
      if ((answerTimeRemaining <=-1)&&(roundTimeRemaining>0)){
        clearInterval(answerTimerId);
        stoptunes();
        multipleanswers.splice(0,1);
        songbits.splice(0,1);
        updateOptions();
        playtunes();
        clearQuestionTimer();
        startQuestionTimer();
      }
    }, 1000);
  }

  function clearQuestionTimer() {
    clearInterval(answerTimerId);
    answerTimerId = null;
    answerTimeRemaining =7;
    $questiontimer.text(7);
  }
//-----------score bar---------------------------------------
  function visscore() {
    $visualscore.css({'height': '+=10'});
  }
//-----------end game ---------------------------------------
  function endgame() {
    const $gameover = document.createElement('div');
    const $gameovertext = document.createElement('h2');
    const $yourscore = document.createElement('p');
    $gameover.classList.add('gameover');
    $gameovertext.textContent= 'CONGRATULATIONS';
    $yourscore.textContent = ('Your score was     ' + startingscore);
    $questions.append($gameover);
    $gameover.append($gameovertext);
    $gameover.append($yourscore);
    $replay.show();
  }

  function startagain () {
    const $goagain = $('.gameover');
    $goagain.remove();
    $li = $('li');
    startingscore = 0;
    roundTimeRemaining = 60;
    roundTimerId = null;
    answerTimeRemaining =7;
    answerTimerId = null;
    $go.show();
    $ready.show();
    $replay.hide();
    $roundtimer.text(60);
    $score.text('Your score is:  0');
    currenttunes = tunes;
    shuffle(currenttunes);
    multipleanswers = [];
    songbits = [];
    makingGame();
    $visualscore.css({'height': '20'});
  }

  function instructionsliding() {
    $instructions.slideToggle('slow');
  }
//////---------------- JQueeerrryyyyyyyiiinnnggg
  $replay.hide();
  $answers.hide();
  $instructions.on('click', instructionsliding);
  $go.on('click', makingGame);
  $go.on('click', playtunes);
  $options.on('click', checkAnswer);
  $options.on('click', playtunes);
  $go.on('click', startRoundTimer);
  $go.on('click', startQuestionTimer);
  $go.on('click', hideStuff);
  $go.on('click', updateOptions);
  $replay.on('click', startagain);
}

$(() => {
  play();
});
