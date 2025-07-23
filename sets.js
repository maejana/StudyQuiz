import {texts} from "./texts.js";

export function saveSets(sets) {
    localStorage.setItem('questionSets', JSON.stringify(sets));
    require('fs').writeFileSync('sets.json', JSON.stringify(sets, null, 2));
}
export function loadSets() {
    const data = localStorage.getItem('questionSets');
    return data ? JSON.parse(data) : [];
}
export function addSet(setName) {
    const sets = loadSets();
    sets.push({ setName: setName, questions: [] });
    saveSets(sets);
}
export function addQuestionToSet(setName, questionObj) {
    const sets = loadSets();
    const set = sets.find(s => s.setName === setName);
    if (set) {
        set.questions.push(questionObj);
        saveSets(sets);
    }
}