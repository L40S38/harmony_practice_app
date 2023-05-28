const mm = window.mm;

  //2つの間のランダムな整数をとる

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }


  let viz_a;
  PianoHarmonyPracticePlayer = new mm.Player(false, {
    run: (note) => viz_a.redraw(note),
    stop: () => {console.log('done');harmonyFinishedState();}
  });

  NoPianoHarmonyPracticePlayer = new mm.Player(false, {
    run: (note) => {},
    stop: () => {console.log('done');harmonyFinishedState();}
  });

  let harmonySequence;
  let answerSequence;
  let root;

  function ready(chordType){
    document.getElementById(chordType).removeAttribute('hidden');
  }

  function harmony(chordType){
    //console.log(document.getElementById('check-answer'));
    console.log(chordType);
    document.getElementById('check-answer').setAttribute('hidden',true);
    root = getRandomInt(53,65);
    switch(chordType){
      case 'Major':
        harmonySequence = {
          notes:[
              {pitch: root, startTime: 0.0, endTime: 8.0},
              {pitch: root+7, startTime: 2.0, endTime: 8.0}
          ],
          totalTime:8
        };
        answerSequence = {
          notes:[
              {pitch: root, startTime: 0.0, endTime: 8.0},
              {pitch: root+7, startTime: 2.0, endTime: 8.0},
              {pitch: root+4, startTime: 4.0, endTime: 8.0}
          ],
          totalTime:8
        };
        break;
      case 'Minor':
        harmonySequence = {
          notes:[
              {pitch: root, startTime: 0.0, endTime: 8.0},
              {pitch: root+7, startTime: 2.0, endTime: 8.0}
          ],
          totalTime:8
        };
        answerSequence = {
          notes:[
              {pitch: root, startTime: 0.0, endTime: 8.0},
              {pitch: root+7, startTime: 2.0, endTime: 8.0},
              {pitch: root+3, startTime: 4.0, endTime: 8.0}
          ],
          totalTime:8
        };
        break;
      default:
        break;
    }
    //viz_a = new mm.PianoRollCanvasVisualizer(answerSequence, document.getElementById('canvas_a'));

    NoPianoHarmonyPracticePlayer.start(harmonySequence);
    
  }
  
  function harmonyFinishedState(){
    try{
        document.getElementById('check-answer').removeAttribute('hidden');
        var config = {
          showOnlyOctavesUsed:true,
          noteHeight:1000
        };
        viz_a = new mm.WaterfallSVGVisualizer(answerSequence, document.getElementById('canvas_a'),config);
        var elements = document.getElementsByClassName('waterfall-notes-container');
        console.log(elements);
        for(var i=0; i<elements.length; i++)
          elements[i].setAttribute('hidden',true);
    }catch(e){
        console.log(e);
    }
    
  }

  function answer(){
    PianoHarmonyPracticePlayer.start(answerSequence);
  }

  function recordPlayer(){
    harmonyPracticePlayer.start(harmonySequence);
  }