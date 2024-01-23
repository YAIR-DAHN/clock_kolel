const fs = require('fs');
const path = require('path');
const listName = JSON.parse(fs.readFileSync('nameList.json', 'utf8'));

function openFile(filePath) {
    let content = fs.readFileSync(path.resolve(__dirname, filePath), { encoding: 'utf8', flag: 'r' });
    return content;
}

let fileName = 'abc.dat';
let r = openFile(fileName);
let lines = r.split('\n');

//let data = lines.map(line => line.split('\t').slice(0, -2)); //הפרדת השורות למערך והפיכת המערך למערך דו מימדי
let data = lines.map(line => line.trimStart().split(/[\t ]/).slice(0, -2));

//data = data.map(line => line.map(item => item.trim())); // מחיקת רווחים מיותרים

let idData = {};

for (let line of data) {
    let idValue = line[0];

    if (!idData[idValue]) {
        idData[idValue] = [["date", "in 1","", "out 1", "", "in 2", "", "out 2"]];
    }
    // בדיקה האם קיים כבר תאריך זהה במערך
    if (idData[idValue].findIndex(findDate) === -1) {
        // idData[idValue].push(line.slice(1));
        let data = line.slice(1);
        idData[idValue].push(data = [line[1], line[2], line[4]]);
    }
    else {
        let index = idData[idValue].findIndex(findDate);
        idData[idValue][index].push(line[2], line[4]);
    }
    // idData[idValue].push(line.slice(1));

    function findDate(arry) {
        // console.log(arry[0]);
        return arry[0] === line[1]
}
}



for (let idValue in idData) {

    // איתור שם האברך
    function getUserById(id) {
        let user = listName.find(user => user.id === id);
        console.log(id);
        return user ? user.name : null;
    }

    let userName = Number(idValue) > 0? getUserById(Number(idValue)): console.log("finish");;// קבלת שם האברך לפי המספר שלו
    let csvFileName = `${userName}.csv`; // יצירת שם קובץ עבור כל אברך

    // idData[idValue].forEach(i => {
    //     i[2] == "0" ? i[2] = "כניסה" : i[2] = "יציאה";
    // }); // כניסה ויציאה במקום 0 ו-1
   
    // idData[idValue].forEach(i => {
    //     i[3] == "0" ? i[3] = "כניסה" : i[3] = "יציאה";
    // }); // כניסה ויציאה במקום 0 ו-1

    let csvContent = idData[idValue].map(line => line.join(',')).join('\n'); // יצירת תוכן הקובץ

    fs.writeFileSync(path.resolve(__dirname, csvFileName), csvContent); // יצירת הקובץ
}
