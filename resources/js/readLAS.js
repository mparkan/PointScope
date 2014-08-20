/**
* PointScope
* Last update: 04 Aug 2014
*
* Licensed under the GPL Version 3 license.
* http://www.gnu.org/licenses/gpl-3.0.html
*
*/

// convert UInt to character string
PointScope.Readers.uintToString = function (uintArray) {
    var encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

// read the LAS 1.2 public header
PointScope.Readers.readLAS = function (e) {
    
    var arrayBuffer = e.target.result;
    console.log('arrayBuffer')
    var byteLength = arrayBuffer.byteLength;
    var view = new DataView(arrayBuffer);
    
    var pointCollection = new PointScope.PsInterface.PointCollection();

    console.log(pointCollection);
    var current_offset = 0;
    var public_header = {}; 
    
    // File Signature (“LASF”), char[4], 4 bytes, required
    var uintArray = [];
    for ( var i = 0; i < 4; i++ ) {
        uintArray[i] = view.getUint8(0+i);
    }
    public_header['File Signature (“LASF”)'] = PointScope.Readers.uintToString(uintArray);
    pointCollection.publicHeader['File Signature (“LASF”)'] = PointScope.Readers.uintToString(uintArray);
    
    // File Source ID, unsigned short, 2 bytes, required
    public_header['File Source ID'] = view.getUint16(4, true);
    pointCollection.publicHeader['File Source ID'] = view.getUint16(4, true);
    
    // Global Encoding, unsigned short, 2 bytes, required
    public_header['Global Encoding'] = view.getUint16(6, true);
    pointCollection.publicHeader['Global Encoding'] = view.getUint16(6, true);
    
    // Project ID - GUID data 1, unsigned long, 4 bytes, optional 
    public_header['Project ID - GUID data 1'] = view.getUint32(8, true);
    pointCollection.publicHeader['Project ID - GUID data 1'] = view.getUint32(8, true);
    
    // Project ID - GUID data 2, unsigned short 2 byte, optional 
    public_header['Project ID - GUID data 2'] = view.getUint16(12, true);
    pointCollection.publicHeader['Project ID - GUID data 2'] = view.getUint16(12, true);
    
    // Project ID - GUID data 3, unsigned short, 2 byte, optional 
    public_header['Project ID - GUID data 3'] = view.getUint16(14, true);
    pointCollection.publicHeader['Project ID - GUID data 3'] = view.getUint16(14, true);
    
    // Project ID - GUID data 4, unsigned char[8], 8 bytes, optional
    var uintArray = [];
    for ( var i = 0; i < 8; i++ ) {
        uintArray[i] = view.getUint8(16+i);
    }
    public_header['Project ID - GUID data 4'] = PointScope.Readers.uintToString(uintArray);
    pointCollection.publicHeader['Project ID - GUID data 4'] = PointScope.Readers.uintToString(uintArray);
    
    // Version Major, unsigned char, 1 byte, required
    public_header['Version Major'] = view.getUint8(24);
    pointCollection.publicHeader['Version Major'] = view.getUint8(24);
    
    // Version Minor, unsigned char, 1 byte, required
    public_header['Version Minor'] = view.getUint8(25);
    pointCollection.publicHeader['Version Minor'] = view.getUint8(25);
    
    // System Identifier, char[32], 32 bytes, required
    var uintArray = [];
    for ( var i = 0; i < 32; i++ ) {
        uintArray[i] = view.getUint8(26+i, true);
    }
    public_header['System Identifier'] = PointScope.Readers.uintToString(uintArray);
    pointCollection.publicHeader['System Identifier'] = PointScope.Readers.uintToString(uintArray);
    
    // Generating Software, char[32], 32 bytes, required
    var uintArray = [];
    for ( var i = 0; i < 32; i++ ) {
        uintArray[i] = view.getUint8(58+i);
    }
    public_header['Generating Software'] = PointScope.Readers.uintToString(uintArray);
    pointCollection.publicHeader['Generating Software'] = PointScope.Readers.uintToString(uintArray);
    
    // File Creation Day of Year, unsigned short, 2 bytes , optional
    public_header['File Creation Day of Year'] = view.getUint16(90, true);
    pointCollection.publicHeader['File Creation Day of Year'] = view.getUint16(90, true);
    
    // File Creation Year, unsigned short, 2 bytes
    public_header['File Creation Year'] = view.getUint16(92, true);
    pointCollection.publicHeader['File Creation Year'] = view.getUint16(92, true);
    
    // Header Size, unsigned short, 2 bytes, required  
    public_header['Header Size'] = view.getUint16(94, true);
    pointCollection.publicHeader['Header Size'] = view.getUint16(94, true);
    
    // Offset to point data, unsigned long, 4 bytes, required  
    public_header['Offset to point data'] = view.getUint32(96, true);
    pointCollection.publicHeader['Offset to point data'] = view.getUint32(96, true);
    
    // Number of Variable Length Records, unsigned long, 4 bytes, required
    public_header['Number of Variable Length Records'] = view.getUint32(100, true);
    pointCollection.publicHeader['Number of Variable Length Records'] = view.getUint32(100, true);
    
    // Point Data Format ID (0-99 for spec), unsigned char, 1 byte, required
    public_header['Point Data Format ID (0-99 for spec)'] = view.getUint8(104);
    pointCollection.publicHeader['Point Data Format ID (0-99 for spec)'] = view.getUint8(104);
    
    // Point Data Record Length, unsigned short, 2 bytes, required 
    public_header['Point Data Record Length'] = view.getUint16(105, true);
    pointCollection.publicHeader['Point Data Record Length'] = view.getUint16(105, true);

    // Number of point records, unsigned long, 4 bytes, * 
    public_header['Number of point records'] = view.getUint32(107, true);
    pointCollection.publicHeader['Number of point records'] = view.getUint32(107, true);
    
    // Number of points by return, unsigned long[5], 20 bytes, *
    var points_by_return = [];
    for ( var i = 0; i < 5; i++ ) {
        points_by_return[i] = view.getUint32(111+i*4, true);
    }
    public_header['Number of points by return'] = points_by_return;
    pointCollection.publicHeader['Number of points by return'] = points_by_return;
    
    // X scale factor, double, 8 bytes, required
    public_header['X scale factor'] = view.getFloat64(131, true);
    pointCollection.publicHeader['X scale factor'] = view.getFloat64(131, true);
    
    // Y scale factor, double, 8 bytes, required
    public_header['Y scale factor'] = view.getFloat64(139, true);
    pointCollection.publicHeader['Y scale factor'] = view.getFloat64(139, true);
    
    // Z scale factor, double, 8 bytes, required 
    public_header['Z scale factor'] = view.getFloat64(147, true);
    pointCollection.publicHeader['Z scale factor'] = view.getFloat64(147, true);
    
    // X offset, double, 8 bytes, required 
    public_header['X offset'] = view.getFloat64(155, true);
    pointCollection.publicHeader['X offset'] = view.getFloat64(155, true);
    
    // Y offset, double, 8 bytes, required
    public_header['Y offset'] = view.getFloat64(163, true);
    pointCollection.publicHeader['Y offset'] = view.getFloat64(163, true);
    
    // Z offset, double, 8 bytes, required
    public_header['Z offset'] = view.getFloat64(171, true);
    pointCollection.publicHeader['Z offset'] = view.getFloat64(171, true);
    
    // Max X, double, 8 bytes, required
    public_header['Max X'] = view.getFloat64(179, true);
    pointCollection.publicHeader['Max X'] = view.getFloat64(179, true);
    
    // Min X, double, 8 bytes, required
    public_header['Min X'] = view.getFloat64(187, true);    
    pointCollection.publicHeader['Min X'] = view.getFloat64(187, true);
    
    // Max Y, double, 8 bytes, required
    public_header['Max Y'] = view.getFloat64(195, true);
    pointCollection.publicHeader['Max Y'] = view.getFloat64(195, true);
    
    // Min Y, double, 8 bytes, required
    public_header['Min Y'] = view.getFloat64(203, true);    
    pointCollection.publicHeader['Min Y'] = view.getFloat64(203, true);    
    
    // Max Z, double, 8 bytes, required
    public_header['Max Z'] = view.getFloat64(211, true);    
    pointCollection.publicHeader['Max Z'] = view.getFloat64(211, true);
    
    // Min Z, double, 8 bytes, required
    public_header['Min Z'] = view.getFloat64(219, true);    
    pointCollection.publicHeader['Min Z'] = view.getFloat64(219, true);
    
    //console.log(public_header);
    
    // read the variable length Record Header
    var variable_header = {};
    current_offset = 227;
    
    for ( var i = 0; i < pointCollection.publicHeader['Number of Variable Length Records']; i++ ) {
        
        // Reserved, unsigned short, 2 bytes 
        variable_header['Reserved'] = view.getUint16(current_offset, true);
        current_offset += 2;
        
        // User ID, char[16], 16 bytes, required
        var uintArray = [];
        for ( var j = 0; j < 16; j++ ) {
            uintArray[j] = view.getUint8(current_offset+j);
        }
        variable_header['User ID'] = PointScope.Readers.uintToString(uintArray);
        current_offset += 16;
        
        // Record ID, unsigned short, 2 bytes, required
        variable_header['Record ID'] = view.getUint16(current_offset, true);
        current_offset += 2;
        
        // Record Length After Header, unsigned short, 2 bytes, required
        variable_header['Record Length After Header'] = view.getUint16(current_offset, true);
        current_offset += 2;
        
        // Description, char[32], 32 bytes 
        var uintArray = [];
        for ( var j = 0; j < 32; j++ ) {
            uintArray[j] = view.getUint8(current_offset + j);
        }
        variable_header['Description'] = PointScope.Readers.uintToString(uintArray);
        current_offset += 32;
        
        // read GeoKeyDirectoryTag Record
        // The Key ID's from 0 to 32767 are reserved for use by the official GeoTIFF spec, and are broken down into the following sub-domains:
        // [    0,  1023]       Reserved
        // [ 1024,  2047]       GeoTIFF Configuration Keys
        // [ 2048,  3071]       Geographic/Geocentric CS Parameter Keys
        // [ 3072,  4095]       Projected CS Parameter Keys
        // [ 4096,  5119]       Vertical CS Parameter Keys
        // [ 5120, 32767]       Reserved
        // [32768, 65535]       Private use
   
        if (variable_header['Record ID'] == 34735){
        
            var GeoKeyDirectoryTag = {};
            GeoKeyDirectoryTag['wKeyDirectoryVersion'] = view.getUint16(current_offset, true);
            current_offset += 2;
            GeoKeyDirectoryTag['wKeyRevision'] = view.getUint16(current_offset , true);
            current_offset += 2;
            GeoKeyDirectoryTag['wMinorRevision'] = view.getUint16(current_offset, true);
            current_offset += 2;
            GeoKeyDirectoryTag['wNumberOfKeys'] = view.getUint16(current_offset, true);
            current_offset += 2;
            
            var pKeys = { 'wKeyID' : { } };
            var offset = 0;
            for ( var j = 0; j < GeoKeyDirectoryTag['wNumberOfKeys']; j++ ) {
                
                pKeys.wKeyID[view.getUint16(current_offset + offset, true)] = {
                    'wTIFFTagLocation' : view.getUint16(current_offset + 2 + offset, true), 
                    'wCount' : view.getUint16(current_offset + 4 + offset, true), 
                    'wValue_Offset' : view.getUint16(current_offset + 6 + offset, true)
                };
                offset += 8;
                
            }
            GeoKeyDirectoryTag['pKeys'] = pKeys;
            current_offset += 8 * GeoKeyDirectoryTag['wNumberOfKeys'];
            console.log(GeoKeyDirectoryTag);
            pointCollection.variableLengthHeader['GeoKeyDirectoryTag'] = GeoKeyDirectoryTag;
        }
        
        // read GeoDoubleParamsTag Record
        if (variable_header['Record ID'] == 34736){
            
            var GeoDoubleParamsTag = {};
            pDoubleTags = [];
            for ( var j = 0; j < variable_header['Record Length After Header']/8; j++ ) {
                
                pDoubleTags[j] = view.getFloat64(current_offset, true);
                current_offset += 8;
                
            }
            
            GeoDoubleParamsTag['pDoubleTags'] = pDoubleTags;
            console.log(GeoDoubleParamsTag);
            pointCollection.variableLengthHeader['GeoDoubleParamsTag'] = GeoDoubleParamsTag;
        }
        
        // read GeoAsciiParamsTag Record (Optional) 
        if (variable_header['Record ID'] == 34737){
        
            var GeoAsciiParamsTag = {};
            uintArray = [];
            for ( var j = 0; j < variable_header['Record Length After Header']; j++ ) {
                
                uintArray[j] = view.getUint8(current_offset);
                current_offset += 1;
            }
            
            GeoAsciiParamsTag['pAsciiTags'] = PointScope.Readers.uintToString(uintArray);
            console.log(GeoAsciiParamsTag);
            pointCollection.variableLengthHeader['GeoAsciiParamsTag'] = GeoAsciiParamsTag;
        }
        
    }
    
    console.log(variable_header);
                      
    // read point records
    var point_record = {'X' : [], 'Y' : [], 'Z' : [], 'Intensity': [], 'Return Number': [],
                        'Number of Returns' : [], 'Scan Direction Flag': [], 'Edge of Flight Line': [],
                        'Classification' : [], 'Scan Angle Rank': [], 'User Data': [], 
                        'Point Source ID' : [], 'GPS Time' : [], 'Red' : [], 'Green' : [], 'Blue' : []
    };
    
    // set offset based on the point data format
    switch(pointCollection.publicHeader['Point Data Format ID (0-99 for spec)']) {
    case 0:
        var step = 20;
        break;
    case 1:
        var step = 28;
        break;
    case 2:
        var step = 26;
        break;
    case 3:
        var step = 34;
        break;
    }

    current_offset = pointCollection.publicHeader['Offset to point data'];

    var nEntries = (byteLength - current_offset) / step; // number of points
    pointCollection.computedMetadata['Number of point records'] = nEntries;
    
    // create buffers
    pointCollection.points['X'] = new ArrayBuffer(nEntries * 4);
    pointCollection.points['Y'] = new ArrayBuffer(nEntries * 4);
    pointCollection.points['Z'] = new ArrayBuffer(nEntries * 4);
    pointCollection.points['Intensity'] = new ArrayBuffer(nEntries * 2);
    
    pointCollection.points['SubByteFields'] = new ArrayBuffer(nEntries);
    
    pointCollection.points['Classification'] = new ArrayBuffer(nEntries);
    pointCollection.points['Scan Angle Rank'] = new ArrayBuffer(nEntries);
    pointCollection.points['User Data'] = new ArrayBuffer(nEntries);
    pointCollection.points['Point Source ID'] = new ArrayBuffer(nEntries * 2);
    
    pointCollection.points['GPS Time'] = new ArrayBuffer(nEntries * 8);
    pointCollection.points['Red'] = new ArrayBuffer(nEntries * 2);
    pointCollection.points['Green'] = new ArrayBuffer(nEntries * 2);
    pointCollection.points['Blue'] = new ArrayBuffer(nEntries * 2);
    
    // create data views
    var dv1 = new DataView(pointCollection.points['X']);
    var dv2 = new DataView(pointCollection.points['Y']);
    var dv3 = new DataView(pointCollection.points['Z']);
    var dv4 = new DataView(pointCollection.points['Intensity']);
    var dv5 = new DataView(pointCollection.points['SubByteFields']);
    var dv6 = new DataView(pointCollection.points['Classification']);
    var dv7 = new DataView(pointCollection.points['Scan Angle Rank']);
    var dv8 = new DataView(pointCollection.points['User Data']);
    var dv9 = new DataView(pointCollection.points['Point Source ID']);
    
    // set values in buffer
    var minVal = 0;
    var maxVal = 0;
    var a = [];
        
    writeOffsetInt32 = 0;
    writeOffsetUint16 = 0;
    writeOffsetUint8 = 0;
    while(current_offset < byteLength){
        
        // TO DO: store positions as new THREE.Float32Attribute(num_particles, 3)
        
        dv1.setInt32(writeOffsetInt32, view.getInt32(current_offset, true), true); // X, long, 4 bytes, *
        dv2.setInt32(writeOffsetInt32, view.getInt32(current_offset + 4, true), true); // Y, long, 4 bytes, *
        dv3.setInt32(writeOffsetInt32, view.getInt32(current_offset + 8, true), true); // Z, long, 4 bytes, *
        dv4.setUint16(writeOffsetUint16, view.getUint16(current_offset + 12, true), true); // Intensity, unsigned short, 2 bytes
        dv5.setUint8(writeOffsetUint8, view.getUint8(current_offset + 14), true); // Sub byte fields, 1 byte
        dv6.setUint8(writeOffsetUint8, view.getUint8(current_offset + 15), true); // Classification number (0-31), unsigned char, 1 byte, *
        dv7.setUint8(writeOffsetUint8, view.getUint8(current_offset + 16), true); // Scan Angle Rank (-90 to +90) – Left side, char, 1 byte, *
        dv8.setUint8(writeOffsetUint8, view.getUint8(current_offset + 17), true); // User Data, unsigned char, 1 byte 
        dv9.setUint16(writeOffsetUint16, view.getUint16(current_offset + 18, true), true); // Point Source ID, unsigned short, 2 bytes, *
        
        // find intensity min/max
        view.getUint16(current_offset + 12, true) < minVal ? minVal = view.getUint16(current_offset + 12, true) : null;
        view.getUint16(current_offset + 12, true) > maxVal ? maxVal = view.getUint16(current_offset + 12, true) : null;
        
        // find unique classification values
        if (!(a.indexOf(view.getUint8(current_offset + 15, true) & 31) > -1)) {
        
            a.push(view.getUint8(current_offset + 15, true) & 31); // read bits 0-4 only

        }
        
        writeOffsetInt32 += 4;
        writeOffsetUint16 += 2;
        writeOffsetUint8 += 1;
        current_offset += step;
        
    }
    
    // set intensity min/max
    pointCollection.computedMetadata['Intensity min'] = minVal;
    pointCollection.computedMetadata['Intensity max'] = maxVal;
    
    // set classification values
    pointCollection.computedMetadata['Unique classes'] = a.sort(PointScope.PsInterface.sortNumeric);
    console.log('a')
    console.log(a);
    console.log(a.sort(PointScope.PsInterface.sortNumeric));
    
    console.log('Point Data Format ID (0-99 for spec): ' + pointCollection.publicHeader['Point Data Format ID (0-99 for spec)']);
    
    var sub_offset = 0;
    current_offset = pointCollection.publicHeader['Offset to point data'];
    if (pointCollection.publicHeader['Point Data Format ID (0-99 for spec)'] == 1 ||  pointCollection.publicHeader['Point Data Format ID (0-99 for spec)'] == 3){
        console.log('1 || 3');
        
        var dv10 = new DataView(pointCollection.points['GPS Time']);
        writeOffsetFloat64 = 0;
    
        while(current_offset < byteLength){
            dv10.setFloat64(writeOffsetFloat64, view.getFloat64(current_offset + 20, true), true); // GPS Time, double, 8 bytes, * 
            writeOffsetFloat64 += 8;
            current_offset += step;
        }
        sub_offset = 8;
    }
    
    current_offset = pointCollection.publicHeader['Offset to point data'];
    if (pointCollection.publicHeader['Point Data Format ID (0-99 for spec)'] == 2 || pointCollection.publicHeader['Point Data Format ID (0-99 for spec)'] == 3){
        console.log('2 || 3');
        
        var dv11 = new DataView(pointCollection.points['Red']);
        var dv12 = new DataView(pointCollection.points['Green']);
        var dv13 = new DataView(pointCollection.points['Blue']);
        
        writeOffsetUint16 = 0;
        
        while(current_offset < byteLength){
        
            dv11.setUint16(writeOffsetUint16, view.getUint16(current_offset + sub_offset + 20, true), true); // Red, unsigned short, 2 bytes, * 
            dv12.setUint16(writeOffsetUint16, view.getUint16(current_offset + sub_offset + 22, true), true); // Green, unsigned short, 2 bytes, * 
            dv13.setUint16(writeOffsetUint16, view.getUint16(current_offset + sub_offset + 24, true), true); // Blue, unsigned short, 2 bytes, *
            
            writeOffsetUint16 += 2;
            current_offset += step;
        }
    }
    
    validFormatFlag = true;
    return pointCollection;
    
    console.log('las reading done!')
}