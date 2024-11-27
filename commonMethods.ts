export function replaceLetters(input: string, sortedInput: any[], sortedAnalysis: any) {
    let decryptedText="";
    for (const letter of input){
        const char=letter.toLowerCase();
        if (char.match(/[a-z]/) || char.match(/[ığşüçö]/)){
            const index=sortedInput.indexOf(char)
            decryptedText+=(("found_letters_will_be_upper_case_to_distinguish".indexOf(sortedAnalysis[index])==-1)?sortedAnalysis[index]:sortedAnalysis[index].toUpperCase());
        }
        else
            decryptedText+=letter;
    }
    return decryptedText;
}
export function sortObject(originalObj: { } ){
    let obj=JSON.parse(JSON.stringify(originalObj))
    let sorted=[];
    let sorted2={};
    while (Object.keys(obj).length>0){
        let largestRemaining=0;
        let largestRemainingLetter="";
        Object.entries(obj) .forEach(([letter, value]) =>{
            if (value as any>largestRemaining){
                largestRemaining=(value as any);
                largestRemainingLetter=letter;
            }
        })
        sorted2[largestRemainingLetter]=largestRemaining;
        sorted.push(largestRemainingLetter);
        delete obj[largestRemainingLetter];
    }
    return sorted;
}

export function applyKey(input:string,key:string,alphabet:string[]){
    let text="";
    for (const letter of input){
        const char=letter.toLowerCase();
        if (char.match(/[a-z]/) ||  char.match(/[ığşüçö]/)){
            const index=alphabet.indexOf(char)
            text+=key.charAt(index)
        }
        else
            text+=letter;
    }
    return text;
}
export function countLetters(input: string) {
    let dict = {}
    let totalLetterCount:number = 0;
    for (const letter of input){
        const char=letter.toLowerCase();
        if (char.match(/[a-z]/) || char.match(/[ığşüçö]/)) {
            if (dict[char])
                dict[char]++;
            else
                dict[char] = 1;
            totalLetterCount++;
        }
    }
    return [dict,totalLetterCount];
}

export function sortLetters(dict: {}, totalLetterCount:number) {
    let sortedFreq=[];
    const sorted=Object.entries(dict).sort((a,b)=>((b[1] as any) - (a[1] as any)))
    sorted.forEach(([letter, value],index) =>{
        sortedFreq[index]=[letter,value,(value as number)/totalLetterCount]
    })
    let dataToWrite="Letter\tCount\tRatio\n"
    sortedFreq.forEach(([letter,count,ratio])=>{
        dataToWrite+=letter.toUpperCase()+"\t\t"+count+"\t"+ratio+"\n";
    });
    return dataToWrite;
}

export function countPairsAndSort(input: string) {
    let dict={}
    for (let i=0;i<input.length-1;i++){
        const firstChar=(input.charAt(i)).toLowerCase();
        if (firstChar.match(/[a-z]/) || firstChar.match(/[ığşüçö]/)){
            const secondChar=(input.charAt(i+1)).toLowerCase();
            if (secondChar.match(/[a-z]/) || secondChar.match(/[ığşüçö]/)){
                if (dict[firstChar+secondChar])
                    dict[firstChar+secondChar]++;
                else
                    dict[firstChar+secondChar]=1;
            }
        }
    }
    return sortObject(dict);
}