export function txtSlicer(txt:string, maxLetters:number=50){
    if(txt.length >= 50) return(`${txt.slice(0,maxLetters)} ...`);
    return txt;
}