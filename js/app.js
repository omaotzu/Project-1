$(() => {

// -------------- Constants and variables ------------------------------

  // const $instructions = $('.instructions');
  // const $questions = $('.questions');
  const $name = $('.name');
  const $roundtimer = $('.rounds');
  const $questiontimer = $('.tunes');
  const $go = $('button');
  const $answers = $('ul');
  const $options = $('.choices');
  const $score = $('.score');
  const $feedback =$('.feedback');

  let $li = $('li');
  let startingscore = 0;
  let roundTimeRemaining = 90;
  let roundTimerId = null;
  let answerTimeRemaining =15;
  let answerTimerId = null;

//-------------Hardcoded array--object----- array ----------------------------
  const tunes = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const multipleanswers =
    [{ audio: 'a',
      options: ['b', 'a', 'c', 'g']},
    { audio: 'b',
      options: ['f', 'j','h','b']},
    { audio: 'c',
      options: ['i','b','c','g']}];



  console.log('before!!');
  console.log(multipleanswers[0].audio);
  console.log(multipleanswers[0].options);



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
  shuffle(multipleanswers);
  console.log('after!!');
  console.log(multipleanswers[0].audio);
  console.log(multipleanswers[0].options);

  console.log($options.length);
  console.log(multipleanswers[0].options.length);

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
      startingscore = startingscore+10;
      $score.text('Your score is:  ' + startingscore);
      $feedback.text('Correct!');
    } else {
      $feedback.text('Incorrect!');
      if (startingscore >=1) {
        startingscore = startingscore-10;
        $score.text('Your score is:  ' + startingscore);

      }
    }
    $options.text('');
    multipleanswers.splice(0,1);
    updateOptions();
    console.log(multipleanswers[0].audio);
    console.log(multipleanswers[0].options);
  }

  function hideStuff() {
    $name.hide();
    $go.hide();
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
      }
    }, 1000);
  }


//////---------------- JQueeerrryyyyyyyiiinnnggg

  $answers.hide();
  $options.on('click', checkAnswer);
  $go.on('click', startRoundTimer);
  $go.on('click', startQuestionTimer);
  $go.on('click', hideStuff);
  $go.on('click', updateOptions);
});
