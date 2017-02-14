$(() => {

// -------------- Constants and variables ------------------------------

  const $instructions = $('.instructions');
  const $questions = $('.questions');
  const $name = $('.name');
  const $roundtimer = $('.rounds');
  const $questiontimer = $('.tunes');
  const $go = $('button');
  const $answers = $('ul');
  const $options = $('.choices');
  const $score = $('.score');
  const $feedback =$('.feedback');
  const $visualscore = $('.visualscore');

  let $li = $('li');
  let startingscore = 0;
  let roundTimeRemaining = 60;
  let roundTimerId = null;
  let answerTimeRemaining =7;
  let answerTimerId = null;

//-------------Not!!!! Hardcoded array--object----- array ----------------------------
  const tunes = ['Apologize','Forget You','Hero','It Wasnt Me','Whole Again','Yeah'];


  // shuffle(tunes);

  const multipleanswers = [];
  const songbits = [];
  for (let i=0; i<tunes.length; i++) {

    const randomrandom = [];
    const huw = (tunes[i]);
    let random1 = tunes[Math.ceil(Math.random()*(tunes.length-1))];
    while (random1 === huw) {
      random1 = tunes[Math.ceil(Math.random()*(tunes.length-1))];
    }
    let random2 = tunes[Math.ceil(Math.random()*(tunes.length)-1)];
    while (random2 === random1 || random2 === huw) { //while??
      random2 = tunes[Math.ceil(Math.random()*(tunes.length)-1)];
    }
    let random3 = tunes[Math.ceil(Math.random()*(tunes.length)-1)];
    while (random3 === random1 || random3 === random2 || random3 === huw) {
      random3 = tunes[Math.ceil(Math.random()*(tunes.length)-1)];
    }
    const indtune = document.createElement('audio');
    const mp3files = (tunes[i]).replace(/ /g, '_');
    indtune.src = (`tunes/${mp3files}.mp3`);
    // new Audio(tunes[i].replace(/' '/g, '_').mp3);
    // console.log((tunes[i]).replace(/ /g, '_'));
    randomrandom.push(huw);
    randomrandom.push(random1);
    randomrandom.push(random2);
    randomrandom.push(random3);
    songbits.push(indtune);
    multipleanswers.push({
      audio: tunes[i],
      options: shuffle(randomrandom)
    });
  }
  // console.log(multipleanswers);
  console.log(songbits);
  // console.log((tunes[i].replace(/' '/g, '_').mp3));

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

  // shuffle(multipleanswers);
  // console.log('after!!');
  // console.log(multipleanswers[0].audio);
  // console.log(multipleanswers[0].options);
  //
  // console.log($options.length);
  // console.log(multipleanswers[0].options.length);


//----------Showing answers after first click
  function updateOptions () {
    const len= (multipleanswers[0].options);
    $answers.show();
    for (let i=0; i<$options.length; i++) {
      $options[i].textContent = len[i];
    }
  }

// -------------- Adding score/ feedback
  function checkAnswer (e) {
    $li = $(e.currentTarget);
    const chosenanswer = ($li.html());
    const correctanswer= (multipleanswers[0].audio).toString();
    if (correctanswer === chosenanswer) {
      startingscore = startingscore+ parseFloat(answerTimeRemaining);
      $score.text('Your score is:  ' + startingscore);
      $feedback.text('Correct!');
    } else {
      $feedback.text('Incorrect!');
      if (startingscore >=1) {
        startingscore = startingscore-5;
        $score.text('Your score is:  ' + startingscore);

      }
    }
    stoptunes();
    multipleanswers.splice(0,1);
    songbits.splice(0,1);
    updateOptions();
    console.log(multipleanswers[0].audio);
    console.log(multipleanswers[0].options);
    console.log(songbits[0]);
    clearQuestionTimer();
    startQuestionTimer();

  }

  function hideStuff() {
    $name.hide();
    $go.hide();
  }
  // const $songbits = $('.songbits');
  function playtunes () {
    // for (let i=0; i<tunes.length; i++) {
    songbits[0].play();
  //   // }
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
      }
    }, 1000);

  }

  function startQuestionTimer(){
    answerTimerId = setInterval(() => {
      answerTimeRemaining--;
      $questiontimer.text(answerTimeRemaining);
      if (answerTimeRemaining <=0) {
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

//////---------------- JQueeerrryyyyyyyiiinnnggg

  $answers.hide();
  $go.on('click', playtunes);
  $options.on('click', checkAnswer);
  $options.on('click', playtunes);
  $go.on('click', startRoundTimer);
  $go.on('click', startQuestionTimer);
  $go.on('click', hideStuff);
  $go.on('click', updateOptions);
});
