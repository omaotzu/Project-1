$(() => {
  const $instructions = $('.instructions');
  const $letsbegin = prompt('Please enter your name?');

  const $questions = $('questions');

  function startQuestions (){
    $questions.text('firsttune');
    $instructions.text('Quess the correct song as quickly as possible!');
    console.log('DONE');
  }

  $letsbegin.on('return', startQuestions);

});
