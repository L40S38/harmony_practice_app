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
    '': [0, 7, 4],
    '7': [0, 7, 4, 10],
    'm': [0, 7, 3],
    'm7': [0, 7, 3, 10],
    'M7': [0, 7, 4, 11],
    'mM7': [0, 7, 3, 11],
    //'sus4':[0,5,7],
    //'7sus4':[0,5,7,10],
    'dim': [0, 3, 6],
    'm7-5': [0, 3, 6, 10],
    'aug': [0, 4, 8],
    'add9': [0, 2, 4, 7],
    '6': [0, 4, 7, 9],
    'm6': [0, 3, 7, 9],

    //original
    '5step': [0, 7],
    'single': [0]
};

const soundNameList = [
    "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"
];

const chordDescriptions = {　//出典:https://sakkyoku.info/beginner/chord-type , https://soundquest.jp/category-archive-chord/ 
    '': "明るく安定した響き　メジャーコードともいう",
    '7': "少し濁って不安定な響き　安定した響きのコードに向かいやすい",
    'm': "暗く安定した響き",
    'm7': "暗くて都会的な響き",
    'M7': "明るくて都会的な響き",
    'mM7': "独特の毒気　妖艶な響き",
    //'sus4':"どっちつかずな響き",
    //'7sus4':"sus4より少し大人びた響き",
    'dim': '怪しげな響き　mをさらに暗くした感じ',
    'm7-5': "怪しげな響き",
    'aug': 'イレギュラーな響き　メジャーコードより明るい',
    'add9': 'ファンタジックな響き',
    '6': '7とはまた違った濁りの響き　浮遊感',
    'm6': '枯れた味わい　少し不安定'
}

const chordString = {
    '': "Major",
    '7': "7th",
    'm': "Minor",
    'm7': "Minor 7th",
    'M7': "Major 7th",
    'mM7': "Minor Major 7th",
    //'sus4':"どっちつかずな響き",
    //'7sus4':"sus4より少し大人びた響き",
    'dim': 'diminished',
    'm7-5': "Minor 7th flat 5",
    'aug': 'augument',
    'add9': 'add 9th',
    '6': '6th',
    'm6': 'Minor 6th'
}