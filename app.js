const mm = window.mm;
var ChordType = '';

  //2つの間のランダムな整数をとる

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function chordToNotes(root,chordType,startTime,endTime){
    /*
    if(Pitch.indexOf(root)==-1){
        throw (new Error('root invalid value'));
    }else if(chordData.chordType){
        throw (new Error('chordType invalid value'));
    }*/
    var sequence = mm.NoteSequence.create();
    for(var i=0; i<chordData[chordType].length; i++){
        sequence.notes.push({pitch: root+chordData[chordType][i], startTime: startTime+2.0*i, endTime: endTime});
    }
    sequence.totalTime = endTime;
    return sequence;
}

  let viz_a;
  PianoHarmonyPracticePlayer = new mm.Player(false, {
    run: (note) => viz_a.redraw(note),
    stop: () => {console.log('done');harmonyFinishedState('step3');}
  });

  NoPianoHarmonyPracticePlayer = new mm.Player(false, {
    run: (note) => {console.log(note)},
    stop: () => {console.log('done');harmonyFinishedState('step2');}
  });

  let harmonySequence;
  let answerSequence;
  let answerSingleSequence;
  let root;

  var config;

  const chordTypeList = new Array([
    '5step','Major','Minor'
  ]);

  function ready(chordType){
    ChordType = chordType;
    document.getElementById('startSection').removeAttribute('hidden');
    document.getElementById(chordType).removeAttribute('hidden');
    document.getElementById('checkAnswerSection').setAttribute('hidden',true);
    document.getElementById('Buttons').setAttribute('hidden',true);
  }

  function harmony(){
    //console.log(document.getElementById('check-answer'));
    console.log(ChordType);
    root = getRandomInt(53,65);
    switch(ChordType){
      case '5step':
        harmonySequence = chordToNotes(root, 'single', 0.0, 8.0);
        answerSequence = chordToNotes(root, '5step', 0.0, 8.0);
        answerSingleSequence = {
          notes:[
            {pitch: root+7, startTime: 0.0, endTime: 2.0}
          ],
          totalTime:2
        }
        break;
      case 'Major':
        harmonySequence = chordToNotes(root, '5step', 0.0, 8.0);
        answerSequence = chordToNotes(root, '', 0.0, 8.0);
        answerSingleSequence = {
          notes:[
            {pitch: root+4, startTime: 0.0, endTime: 2.0}
          ],
          totalTime:2
        }
        break;
      case 'Minor':
        harmonySequence = chordToNotes(root, '5step', 0.0, 8.0);
        answerSequence = chordToNotes(root, 'm', 0.0, 8.0);
        answerSingleSequence = {
          notes:[
            {pitch: root+3, startTime: 0.0, endTime: 2.0}
          ],
          totalTime:2
        }
        break;
      default:
        break;
    }
    //viz_a = new mm.PianoRollCanvasVisualizer(answerSequence, document.getElementById('canvas_a'));
    console.log(harmonySequence);
    NoPianoHarmonyPracticePlayer.start(harmonySequence);
    
  }

  function waterfallHide(){
    var elements = document.getElementsByClassName('waterfall-notes-container');
    console.log(elements);
    for(var i=0; i<elements.length; i++)
      elements[i].setAttribute('hidden',true);
  }

  function harmonyFinishedState(step){
    if(step==="step2"){
      console.log(document.getElementById("goToLastStep").classList);
      document.getElementById("goToLastStep").classList.remove('disabled');
    }
  }



  function checkAnswer(){
    var classList = document.getElementById('goToLastStep').classList;
    for(var i=0;i<classList.length;i++){
      if(classList[i]=='disabled')return;
    }
    try{
        document.getElementById('checkAnswerSection').removeAttribute('hidden');
        document.getElementById('startSection').setAttribute('hidden',true);
        config = {
        };
        viz_a = new mm.WaterfallSVGVisualizer(answerSequence, document.getElementById('canvas_a'),config);
        waterfallHide();
    }catch(e){
        console.log(e);
    }
    
  }

  function answer(){
    console.log(answerSequence);
    viz_a = new mm.WaterfallSVGVisualizer(answerSequence, document.getElementById('canvas_a'),config);
    waterfallHide();
    PianoHarmonyPracticePlayer.start(answerSequence);
  }

  function answerSingle(){
    viz_a = new mm.WaterfallSVGVisualizer(answerSingleSequence, document.getElementById('canvas_a'),config);
    waterfallHide();
    PianoHarmonyPracticePlayer.start(answerSingleSequence);
  }

  function recordPlayer(){
    harmonyPracticePlayer.start(harmonySequence);
  }