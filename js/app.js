$(() => {
  // const $instructions = $('.instructions');

  const $questions = $('.questions');
  const $name = $('.name');
  const $roundtimer = $('.rounds');
  const $questiontimer = $('.tunes');
  const $button = $('button');

  // const answers = ['a','b','c','d','e','f','g','h','i','j','k'];

  const multipleanswers =
    [{ audio: 'a',
      options: ['b', 'a', 'c', 'g']},
    { audio: 'b',
      options: ['f', 'j','h','b']},
    { audio: 'c',
      options: ['i','b','c','g']}];



  function qanda () {
    for (let i = 0; i<multipleanswers.length; i++) {

    }
  }

  const randomaudio = multipleanswers[Math.floor(Math.random()*multipleanswers.length)].audio;
  const randomoptions = multipleanswers[Math.floor(Math.random()*multipleanswers.length)].options;

  console.log(randomaudio);
  console.log(randomoptions);



  // function noDuplicates () {
  //   if ($answers === $randomAnswer1) {
  //     console.log($answers);
  // //     console.log($answers);
  //
  //   }
  // }
  let roundTimeRemaining = 90;
  let answerTimeRemaining =15;
  let timerId = null;




  function hideStuff() {
    $name.hide();
    $button.hide();
  }

  function startRoundTimer(){
    timerId = setInterval(() => {
      roundTimeRemaining--;
      $roundtimer.text(roundTimeRemaining);
      if (roundTimeRemaining <=0) {
        clearInterval(timerId);
      }
    }, 1000);
  }

  function startQuestionTimer(){
    timerId = setInterval(() => {
      answerTimeRemaining--;
      $questiontimer.text(answerTimeRemaining);
      if (answerTimeRemaining <=0) {
        clearInterval(timerId);
      }
    }, 1000);
  }

  $button.on('click', startRoundTimer);
  $button.on('click', startQuestionTimer);
  $button.on('click', hideStuff);

});
