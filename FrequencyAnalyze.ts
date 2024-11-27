import fs from 'fs';
import {replaceLetters,sortObject,countLetters,sortLetters,countPairsAndSort,applyKey} from './commonMethods';
class FrequencyAnalyze {
    public static analyzeTextEng(){
        const input:string = fs.readFileSync('./textToAnalyzeEng.txt', 'utf8');
        const [dict,totalLetterCount]=countLetters(input);
        const dataToWrite=sortLetters(dict,totalLetterCount as number);
        const sortedDict=sortObject(dict)
        fs.writeFileSync(`freqEng.json`, JSON.stringify(sortedDict));//analyze to be used while decryption
        fs.writeFileSync(`freqEng.txt`, dataToWrite);//frequency analyze table
        //["e","t","o","i","r","s","a","n","c","h","y","l","p","d","m","u","g","f","b","w","k","v","x","q","j","z"] correct frequency analysis for the input
    }
    public static analyzePairsEng(){
        const input:string = fs.readFileSync('./textToAnalyzeEng.txt', 'utf8');
        const sortedTextPairs=countPairsAndSort(input);
        fs.writeFileSync(`textPairsEng.json`, JSON.stringify(sortedTextPairs,null,1));
        const input2:string = fs.readFileSync('./engciphertext.html', 'utf8');
        const sortedInputPairs=countPairsAndSort(input2);
        fs.writeFileSync(`cipherPairsEng.json`, JSON.stringify(sortedInputPairs,null,1));
    }
    public static decryptEng(){
        const sortedAnalysis= JSON.parse(fs.readFileSync('./freqEng.json', 'utf8'));
        const input:string = fs.readFileSync('./engciphertext.html', 'utf8');
        const [dict,]=countLetters(input);
        const sortedInput=sortObject(dict)
        const decryptedText=replaceLetters(input,sortedInput,sortedAnalysis);
        fs.writeFileSync(`engDecrypted.html`,decryptedText);
    }
    public static testEng() {
        const input:string = fs.readFileSync('./engciphertext.html', 'utf8');
        const alphabet=["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        const decKey="bnthavqscwgfjeiuxdmlkpzyor"
        const encKey="eairnlkdomutsbyvgzhcpfjqxw";

        const decrypted=applyKey(input,decKey,alphabet);
        const encrypted=applyKey(decrypted,encKey,alphabet);
        console.log(decrypted)
        console.log(encrypted)
    }
    public static analyzeTextTur() {
        const input: string = fs.readFileSync('./textToAnalyzeTur.txt', 'utf8');
        const [dict,totalLetterCount]=countLetters(input);
        const dataToWrite=sortLetters(dict,totalLetterCount as number);
        const sortedDict=sortObject(dict)
        fs.writeFileSync(`freqTur.json`, JSON.stringify(sortedDict));
        fs.writeFileSync(`freqTur.txt`, dataToWrite);
        //["a","e","l","r","i","n","k","ı","t","m","u","d","s","o","b","y","ü","c","ş","p","g","ç","z","f","h","ğ","v","ö","j","w","x","q"] correct frequency analysis for the input
    }
    public static analyzePairsTur(){
        const input:string = fs.readFileSync('./textToAnalyzeTur.txt', 'utf8');
        const sortedTextPairs=countPairsAndSort(input);
        fs.writeFileSync(`textPairsTur.json`, JSON.stringify(sortedTextPairs,null,1));
        const input2:string = fs.readFileSync('./turciphertext.html', 'utf8');
        const sortedInputPairs=countPairsAndSort(input2);
        fs.writeFileSync(`cipherPairsTur.json`, JSON.stringify(sortedInputPairs,null,1));
    }
    public static decryptTur(){
        const sortedAnalysis= JSON.parse(fs.readFileSync('./freqTur.json', 'utf8'));
        const input:string = fs.readFileSync('./turciphertext.html', 'utf8');
        const [dict,]=countLetters(input);
        const sortedInput=sortObject(dict)
        const decryptedText=replaceLetters(input,sortedInput,sortedAnalysis);
        fs.writeFileSync(`turDecrypted.html`, decryptedText);
    }
    public static testTur() {
        const input:string = fs.readFileSync('./turciphertext.html', 'utf8');
        const alphabet=["a", "b", "c","ç", "d", "e", "f", "g","ğ", "h", "ı","i", "j", "k", "l", "m", "n",
            "o","ö", "p", "r", "s","ş", "t", "u","ü", "v", "y", "z"]
        const decKey="cikloamrpzçjsyıefhnvgbüdğöutş"
        const encKey="esaıtmnruolbicçfödüğgjzyvşpkh";
        const decrypted=applyKey(input,decKey,alphabet);
        const encrypted=applyKey(decrypted,encKey,alphabet);
        console.log(decrypted)
        console.log(encrypted)
    }
}
if (process.argv[2] == "tur"){
    if (process.argv[3] == "analyze")
        FrequencyAnalyze.analyzeTextTur();
    else if(process.argv[3] == "decrypt")
        FrequencyAnalyze.decryptTur();
    else if(process.argv[3] == "pairs")
        FrequencyAnalyze.analyzePairsTur();
    else if(process.argv[3] == "test")
        FrequencyAnalyze.testTur();
}
else if(process.argv[2] == "eng"){
    if (process.argv[3] == "analyze")
        FrequencyAnalyze.analyzeTextEng();
    else if(process.argv[3] == "decrypt")
        FrequencyAnalyze.decryptEng();
    else if(process.argv[3] == "pairs")
        FrequencyAnalyze.analyzePairsEng();
    else if(process.argv[3] == "test")
        FrequencyAnalyze.testEng();
}