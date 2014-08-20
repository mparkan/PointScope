/**
* PointScope
* Last update: 04 Aug 2014
*
* Licensed under the GPL Version 3 license.
* http://www.gnu.org/licenses/gpl-3.0.html
*
*/

// TO DO : customize error messages

PointScope.Readers.readCSV = function (e) {

    var csv = e.target.result;
    var pointCollection = new PointCollection();

    var allTextLines = csv.split(/\r\n|\n/); // split text input by row
    console.log('number of entries:' + allTextLines.length);

    // parse header
    var header = allTextLines[0].split(',');
    console.log(header);

    var lasKeyMap = {
        'x' : 'X',
        'y' : 'Y',
        'z' : 'Z',
        'i' : 'Intensity',
        'r' : 'Return Number',
        'n' : 'Number of Returns (given pulse)',
        'd' : 'Scan Direction Flag',
        'e' : 'Edge of Flight Line',
        'c' : 'Classification',
        'a' : 'Scan Angle Rank',
        'u' : 'User Data',
        'p' : 'Point Source ID',
        'R' : 'Red',
        'G' : 'Green',
        'B' : 'Blue'
    };

    // check if header syntax is correct
    var charsToSearch = ["x", "y", "z", "i", "r", "n", "d", "e", "c", "a", "u", "p", "R", "G", "B"];
    validFormatFlag = true;
    for ( var i = 0; i < header.length; i++ ) {

        if (charsToSearch.indexOf(header[i]) == -1) {
            
            validFormatFlag = false;
            alert('CSV header format not supported');
            return;
            
        }

    }

    var lines = [];
    for ( var i = 0; i < allTextLines.length-1; i++ ) {
      
      lines[i] = allTextLines[i+1].split(','); // array of strings
      for ( var j = 0; j < lines[i].length; j++ ){
        pointCollection.points[lasKeyMap[header[j]]].push( parseFloat(lines[i][j]) );
      }
      
    }

    pointCollection.publicHeader['Generating Software'] = undefined;
    
    validFormatFlag = true;
    return pointCollection;
};