$(() => {
  // const $instructions = $('.instructions');

  const $questions = $('.questions');
  const $name = $('.name');
  const $roundtimer = $('.rounds');
  const $questiontimer = $('.tunes');
  const $button = $('button');
  const $answers = $('ul');
  const $buttons = $('button');
  const userchoice = [];

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


  console.log(multipleanswers[0].options.length);





  function createOptions () {
    const len= (multipleanswers[0].options);
    for (let j=0; j<len.length; j++) {
      const answerboxes = document.createElement('button');
      answerboxes.className = 'answerchoices';
      answerboxes.innerHTML = (len[j]);
      $answers.append(answerboxes);
      console.log(answerboxes);
    }
  }



  // function checkAnswer(){
  //   if (timeRemaining > 0) {
  //     const huw = parseInt($answer.val());
  //     if (huw === (value1 + value2)) {
  //       startingscore++;
  //       $score.text(startingscore);
  //       $feedback.text('Correct!');
  //       $answer.val('');
  //     } else {
  //       if (startingscore >=1) {
  //         startingscore--;
  //         $score.text(startingscore);
  //         $feedback.text('Incorrect!');
  //         $answer.val('');
  //       }
  //     }
  //     newNumbers();
  //   }
  // }

  // }
  // function displayAnswers() {

  // }
  // displayAnswers();


  let roundTimeRemaining = 90;
  let roundTimerId = null;
  let answerTimeRemaining =15;
  let answerTimerId = null;




  function hideStuff() {
    $name.hide();
    $button.hide();
  }

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

  // $li.on('click', nextQuestion);
  $button.on('click', startRoundTimer);
  $button.on('click', startQuestionTimer);
  $button.on('click', hideStuff);
  $button.on('click', createOptions);
});
