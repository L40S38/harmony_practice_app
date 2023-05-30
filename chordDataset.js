const Pitch = [
    "C",//60
    "C#",//61...
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
];

const chordData = {
    '':[0,4,7],
    '7':[0,4,7,10],
    'm':[0,3,7],
    'm7':[0,3,7,10],
    'M7':[0,4,7,11],
    'mM7':[0,3,7,11],
    //'sus4':[0,5,7],
    //'7sus4':[0,5,7,10],
    'dim':[0,3,6],
    'm7-5':[0,3,6,10],
    'aug':[0,4,8],
    'add9':[0,2,4,7],
    '6':[0,4,7,9],
    'm6':[0,3,7,9]
};

const soundNameList = [
    "C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"
];

function chordToNotes(route,chordType,startTime,endTime){
    if(Pitch.indexOf(route)==-1){
        throw (new Error('route invalid value'));
    }else if(ChordData.chordType){
        throw (new Error('chordType invalid value'));
    }
    new notes = [];
    for(var i=0; i<chordData[chordType].length; i++){
        notes.push({pitch: route+chordData[chordType][i], startTime: startTime+2.0*i, endTime: endTime});
    }
    notes.push({pitch: route-24, startTime: startTime, endTime: endTime});
}