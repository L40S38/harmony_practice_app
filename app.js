const mm = window.mm;
const startSectionTop = document.getElementById('startSection').getBoundingClientRect().top;
const checkAnswerSectionTop = document.getElementById('checkAnswerSection').getBoundingClientRect().top;

var ChordType = '';

let harmonySequence;
let answerSequence;
let answerSingleSequence;
let step5Sequence;
let root = -1;

var config = {};
var pressedButtonId;

//2つの間のランダムな整数をとる

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

function chordToNotes(root, chordType, startTime, endTime) {
	/*
	if(Pitch.indexOf(root)==-1){
		throw (new Error('root invalid value'));
	}else if(chordData.chordType){
		throw (new Error('chordType invalid value'));
	}*/
	var sequence = mm.NoteSequence.create();
	for (var i = 0; i < chordData[chordType].length; i++) {
		sequence.notes.push({ pitch: root + chordData[chordType][i], startTime: startTime + 2.0 * i, endTime: endTime });
	}
	sequence.totalTime = endTime;
	return sequence;
}

function constructStep5Sequence(root, startTime) {
	step5Sequence = mm.NoteSequence.create({ quantizationInfo: { stepsPerQuarter: 4 }, tempos: [{ qpm: 120 }] });
	//step5Sequence = mm.sequences.createQuantizedNoteSequence(stepsPerQuarter=4,qpm=120);
	for (var i = 0; i < 13; i++) {
		step5Sequence.notes.push(mm.NoteSequence.Note.create({ pitch: root + i, quantizedStartStep: startTime + 4.0 * i, quantizedEndStep: startTime + 4.0 * i + 1.0 }));
		step5Sequence.notes.push(mm.NoteSequence.Note.create({ pitch: root + i + 7, quantizedStartStep: startTime + 4.0 * i + 1.0, quantizedEndStep: startTime + 4.0 * i + 2.0 }));
		step5Sequence.notes.push(mm.NoteSequence.Note.create({ pitch: root + i, quantizedStartStep: startTime + 4.0 * i + 2.0, quantizedEndStep: startTime + 4.0 * i + 3.0 }));
	}
	step5Sequence.totalQuantizedSteps = 4.0 * 14;
	//step5Sequence = mm.sequences.unquantizeSequence(step5Sequence,120);
	//step5Sequence.totalTime = 4.0 * 14;
	console.log(step5Sequence);
	newTempo = 40;
	//step5Sequence.totalTime = Math.max(step5Sequence.totalTime,step5Sequence*120/newTempo);
	console.log(step5Sequence);
	//step5Player.setTempo(newTempo);
	//console.log(step5Sequence);
	//return sequence;
}

function constructAnswerSequence(root, chordType, startTime, endTime) {
	var delta = chordData[chordType][chordData[chordType].length-1];
	console.log(root,delta,root+delta);
	var sequence = mm.NoteSequence.create();
	sequence.notes.push({ pitch: root + delta, startTime: startTime, endTime: endTime });
	sequence.totalTime = endTime;
	return sequence;
}

playStep5Button = document.getElementById("playStep5Button");

step5Player = new mm.Player(false, {
	run: (note) => {
		playStep5Button.classList.add('hovered');
		document.getElementById("playStep5Button").textContent = "停止";
	},
	stop: () => {
		playStep5Button.classList.remove('hovered');
		document.getElementById("playStep5Button").textContent = "再生";
		console.log("done");
	}
});

let viz_a;
PianoHarmonyPracticePlayer = new mm.Player(false, {
	run: (note) => {
		viz_a.redraw(note);
		document.getElementById(pressedButtonId).classList.add('hovered');
	},
	stop: () => {
		console.log('done');
		harmonyFinishedState('step3');
	}
});

NoPianoHarmonyPracticePlayer = new mm.Player(false, {
	run: (note) => {
		//console.log(note)
		document.getElementById("startButton").classList.add('hovered');
		document.getElementById("startButton").textContent = "再生中";
	},
	stop: () => {
		console.log('done');
		harmonyFinishedState('step2');
	}
});

const chordTypeList = new Array([
	'5step', 'Major', 'Minor'
]);

function ready(chordType) {
	ChordType = chordType;
	document.getElementById('startSection').removeAttribute('hidden');
	document.getElementById(chordType).removeAttribute('hidden');
	document.getElementById('checkAnswerSection').setAttribute('hidden', true);
	document.getElementById('selectSection').setAttribute('hidden', true);
	constructStep5Sequence(60, 0.0);
	window.scrollTo({
		top: startSectionTop,
		behavior: 'smooth'
	});
};

function harmony() {
	console.log(NoPianoHarmonyPracticePlayer.getPlayState());
	if (NoPianoHarmonyPracticePlayer.isPlaying()) {
		NoPianoHarmonyPracticePlayer.stop();
		return;
	}
	//console.log(document.getElementById('check-answer'));
	console.log(ChordType);
	if (root == -1) {
		root = getRandomInt(53, 65);
	}

	switch (ChordType) {
		case '5step':
			harmonySequence = chordToNotes(root, 'single', 0.0, 8.0);
			answerSequence = chordToNotes(root, '5step', 0.0, 8.0);
			answerSingleSequence = constructAnswerSequence(root, '5step', 0.0, 2.0);
			break;
		case 'Major':
			harmonySequence = chordToNotes(root, '5step', 0.0, 8.0);
			answerSequence = chordToNotes(root, '', 0.0, 8.0);
			answerSingleSequence = constructAnswerSequence(root, '', 0.0, 2.0);
			break;
		case 'Minor':
			harmonySequence = chordToNotes(root, '5step', 0.0, 8.0);
			answerSequence = chordToNotes(root, 'm', 0.0, 8.0);
			answerSingleSequence = constructAnswerSequence(root, 'm', 0.0, 2.0);
			break;
		case '7th':
			harmonySequence = chordToNotes(root, '', 0.0, 8.0);
			answerSequence = chordToNotes(root, '7', 0.0, 8.0);
			answerSingleSequence = constructAnswerSequence(root, '7', 0.0, 2.0);
			break;
		case 'Major 7th':
			harmonySequence = chordToNotes(root, '', 0.0, 8.0);
			answerSequence = chordToNotes(root, 'M7', 0.0, 8.0);
			answerSingleSequence = constructAnswerSequence(root, 'M7', 0.0, 2.0);
			break;
		case 'Minor 7th':
			harmonySequence = chordToNotes(root, 'm', 0.0, 8.0);
			answerSequence = chordToNotes(root, 'm7', 0.0, 8.0);
			answerSingleSequence = constructAnswerSequence(root, 'm7', 0.0, 2.0);
			break;
		case 'Minor Major 7th':
			harmonySequence = chordToNotes(root, 'm', 0.0, 8.0);
			answerSequence = chordToNotes(root, 'mM7', 0.0, 8.0);
			answerSingleSequence = constructAnswerSequence(root, 'mM7', 0.0, 2.0);
			break;
		default:
			console.log("undefined chord clicked");
			break;
	}
	//viz_a = new mm.PianoRollCanvasVisualizer(answerSequence, document.getElementById('canvas_a'));
	//console.log(harmonySequence);
	NoPianoHarmonyPracticePlayer.start(harmonySequence);
};

function waterfallHide() {
	var elements = document.getElementsByClassName('waterfall-notes-container');
	console.log(elements);
	for (var i = 0; i < elements.length; i++) {
		elements[i].setAttribute('hidden', true);
	}
};

function harmonyFinishedState(step) {
	if (step == "step2") {
		//console.log(document.getElementById("goToLastStep").classList);
		document.getElementById("startButton").textContent = "もう一度再生する";
		document.getElementById("goToLastStep").classList.remove('disabled');
		document.getElementById('startButton').classList.remove('hovered');
	} else if (step == "step3") {
		document.getElementById(pressedButtonId).classList.remove('hovered');
	}
};



function checkAnswer() {
	var classList = document.getElementById('goToLastStep').classList;
	for (var i = 0; i < classList.length; i++) {
		if (classList[i] == 'disabled') {
			document.getElementById('caution').textContent = '音が鳴り終わるまで押さないでください';
			return;
		}
	}
	try {
		document.getElementById('checkAnswerSection').removeAttribute('hidden');
		document.getElementById('startSection').setAttribute('hidden', true);
		viz_a = new mm.WaterfallSVGVisualizer(answerSequence, document.getElementById('canvas_a'), config);
		//waterfallHide();
	} catch (e) {
		console.log(e);
	}
	window.scrollTo({
		top: checkAnswerSectionTop,
		behavior: 'smooth'
	});

};

function answer() {
	console.log(PianoHarmonyPracticePlayer.getPlayState());
	if (PianoHarmonyPracticePlayer.isPlaying()) {
		PianoHarmonyPracticePlayer.stop();
	}
	pressedButtonId = 'playAllNoteButton';
	viz_a = new mm.WaterfallSVGVisualizer(answerSequence, document.getElementById('canvas_a'), config);
	//waterfallHide();
	PianoHarmonyPracticePlayer.start(answerSequence);
};

function answerSingle() {
	console.log(PianoHarmonyPracticePlayer.getPlayState());
	if (PianoHarmonyPracticePlayer.isPlaying()) {
		PianoHarmonyPracticePlayer.stop();
	}
	pressedButtonId = 'playSingleNoteButton';
	console.log(answerSingleSequence);
	viz_a = new mm.WaterfallSVGVisualizer(answerSingleSequence, document.getElementById('canvas_a'), config);
	//waterfallHide();
	PianoHarmonyPracticePlayer.start(answerSingleSequence);
};

function recordPlayer() {
	harmonyPracticePlayer.start(harmonySequence);
};

function step5() {
	if (step5Player.isPlaying()) {
		//document.getElementById("playStep5Button").textContent = "再生";
		step5Player.stop();
	} else {
		//constructStep5Sequence(60,0);
		step5Player.start(step5Sequence, newTempo);
	}
}