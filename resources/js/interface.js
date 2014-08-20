/**
* PointScope
* Last update: 04 Aug 2014
*
* Licensed under the GPL Version 3 license.
* http://www.gnu.org/licenses/gpl-3.0.html
*
*/

// Point collection object
PointScope.PsInterface.PointCollection = function () {
    // attributes
    this.publicHeader = {
        'File Signature (“LASF”)': null,
        'File Source ID' : null,
        'Global Encoding' : null,
        'Project ID - GUID data 1' : null,
        'Project ID - GUID data 2' : null,
        'Project ID - GUID data 3' : null,
        'Project ID - GUID data 4' : null,
        'Version Major' : null,
        'Version Minor' : null,
        'System Identifier' : null,
        'Generating Software' : null,
        'File Creation Day of Year' : null,
        'File Creation Year' : null
    };

    this.variableLengthHeader = {
        'GeoKeyDirectoryTag' : null,
        'GeoDoubleParamsTag' : null,
        'GeoAsciiParamsTag' : null
    };

    this.computedMetadata = {
        'SRID' : null,
        'SRN' : null,
        'SRS' : null,
        'Number of point records' : null,
        'X min' : null,
        'X max' : null,
        'Y min' : null,
        'Y max' : null,
        'Z min' : null,
        'Z max' : null,
        'X center' : null,
        'Y center' : null,
        'Z center' : null,
        'X size' : null,
        'Y size' : null,
        'Z size' : null,
        'Intensity min' : null,
        'Intensity max' : null,
        'Unique classes' : null
    };

    this.points = {
        'X' : [],
        'Y' : [],
        'Z' : [],
        'Intensity' : [],
        'Return Number' : [],
        'Number of Returns' : [],
        'Scan Direction Flag' : [],
        'Edge of Flight Line' : [],
        'Classification' : [],
        'Scan Angle Rank' : [],
        'User Data' : [],
        'Point Source ID' : [],
        'GPS Time' : [],
        'Red' : [],
        'Green' : [],
        'Blue' : []
    };

};

/**
 * GeoJSON Object
 * @param type 
 * @param crs reference system
 * @param crs reference system
 * @return geojson features
 */
PointScope.PsInterface.geoJSON = function (type, crs, features) {

    this.type = type;
    this.crs = {};
    this.crs.type = "name";
    this.crs.properties = crs;
    this.features = features;

};

/**
 * method to reproject geosJSON features
 * @param from source crs 
 * @param to destination crs
 */
PointScope.PsInterface.geoJSON.prototype.reproject = function(from, to) {

    for (var i = 0; i < this.features.length; i++) {
        switch (this.features[i].geometry.type) {
        case "Polygon":
            for (var j = 0; j < this.features[i].geometry.coordinates.length; j++){
                this.features[i].geometry.coordinates[j] = this.features[i].geometry.coordinates[j].map(function (x) { return proj4(from, to, x); });
            }
            break;
        case "LineString":
            this.features[i].geometry.coordinates = this.features[i].geometry.coordinates.map(function(x) { return proj4(from, to, x); });
            break;
        }    
    }
};

/**
 * method to check for webgl support
 * @param evt event
 */
PointScope.PsInterface.handleInput = function (evt) {
    // Check for WebGL support
    if (Detector.webgl) {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // FileReader are supported.
            console.log('handleFiles(files) - success');
            PointScope.PsInterface.handleFileSelect(evt);
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
    } else {
        Detector.addGetWebGLMessage();
    }
};

/**
 * method to update progress bar during file loading
 * @param evt event
 */
PointScope.PsInterface.handleFileSelect = function(evt) {

    // Reset progress indicator on new file selection.
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressBar').innerHTML = '0%';

    var file = evt.target.files[0];
    var sFileName = file.name;
    file.extension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase(); // file extension

    // create file reader
    PointScope.PsInterface.reader = new FileReader();
    PointScope.PsInterface.reader.onerror = PointScope.PsInterface.errorHandler;
    PointScope.PsInterface.reader.onprogress = PointScope.PsInterface.updateProgress;
    PointScope.PsInterface.reader.onabort = function(e) {

    alert('File read cancelled');

    };

    // set progress bar to 0%
    PointScope.PsInterface.reader.onloadstart = function(e) {

    //document.getElementById('progress_bar').className = 'loading';
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressBar').innerHTML = '0%';

    };

    switch(file.extension){
    case 'csv':
        console.log('file is .csv');
        PointScope.PsInterface.reader.readAsText(file); // read data from CSV file
        break;
    case 'las':
        console.log('file is .las');
        PointScope.PsInterface.reader.readAsArrayBuffer(file); // read data from LAS file
        break;
    default:
        alert('unsupported file format!');
        break;
    }

    var container; //stats

    PointScope.PsInterface.reader.onload = function(e) {

        document.getElementById('progressBar').style.width = '100%';
        document.getElementById('progressBar').innerHTML = '100%';
        var ev = e.target.result;

        switch(file.extension){
            case 'csv':
                console.log('file is .csv');
                break;
            case 'las':
                console.log('file is .las');
                console.log(e);
                pointCollection = readLAS(e); // read data from LAS file
                break;
            default:
                alert('unsupported file format!');
            break;
        }

        console.log('File loaded successfuly');

        if (validFormatFlag) {

            // render the point cloud
            PointScope.PsInterface.init(pointCollection);
            PointScope.Renderer.animate();

            // update right panel
            PointScope.PsInterface.printMetadata(file, pointCollection);
            PointScope.PsInterface.printDownload();

            // update map
            PointScope.PsInterface.loadMinimap = true;

        }
    };
};

/**
 * method to abort file loading
 *
 */
PointScope.PsInterface.abortRead = function() {
    PointScope.PsInterface.reader.abort();
};

  /**
 * method to handle file reading errors
 *
 */
PointScope.PsInterface.errorHandler = function(evt){
    // TODO: FileError is deprecated. Please use the 'name' or 'message' attributes of DOMError rather than 'code'. 
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break;
      default:
        alert('An error occurred reading this file.');
    }
};

/**
 * method to abort file loading
 *
 */
PointScope.PsInterface.updateProgress = function(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {

     //console.log(evt)
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      console.log(percentLoaded);
      // Increase the progress bar length.
 
      if (percentLoaded <= 100) {

        $('progressBar').css('width', percentLoaded+'%').attr('aria-valuenow', percentLoaded);
        //document.getElementById('progressBar').style.width = percentLoaded +'%';
        document.getElementById('progressBar').innerHTML = percentLoaded +'%';

        //progress.style.width = percentLoaded + '%';
        //progress.textContent = percentLoaded + '%';

      }

    }
};

/**
 * method to download output
 *
 */
PointScope.PsInterface.printDownload = function() {

    if (projFlag){

        document.getElementById('downloads').innerHTML =
            '<table class="table">' +
            '<thead>' +
              '<tr>' +
                '<th>File</th>'+
                '<th>SRS</th>'+
                '<th>Format</th>'+
              '</tr>'+
            '</thead>'+
            '<tbody>'+
              '<tr>'+
                '<td><a href="data:' + "text/json;charset=utf-8," + encodeURIComponent(PointScope.Renderer.bbox_global_srs) + '" download="PointScope.Renderer.bbox_global_srs.geojson"><b>planimetric bounding box</b></a></td>'+
                '<td>EPSG:4326</td>'+
                '<td>geojson</td>'+
              '</tr>'+
              '<tr>'+
                '<td><a href="data:' + "text/json;charset=utf-8," + encodeURIComponent(PointScope.Renderer.bbox_local_srs) + '" download="PointScope.Renderer.bbox_local_srs.geojson"><b>planimetric bounding box</b></a></td>'+
                '<td>'+ pointCollection.computedMetadata.SRID +'</td>'+
                '<td>geojson</td>'+
              '</tr>'+
            '</tbody>'+
          '</table>';

      } else {
 
        document.getElementById('downloads').innerHTML =
        '<p><span class="glyphicon glyphicon-warning-sign"></span> no download available (SRS was not defined)</p>';

      }
    
};

/**
 * method to print map
 *
 */
PointScope.PsInterface.printMap = function() {

    // check if projection is available
    if (projFlag){

        console.log('projection available');

        // check if map frame already exists
        // hasLayer( <ILayer> layer )
        if (initMapFlag){

            console.log('reset map');

            // create bounding box layer
            pc_bbox = L.geoJson(PointScope.Renderer.mapBoundingBox, {
                style: {stroke: true,
                        weight: 3,
                        color: '#FFFF00',
                        dashArray: '4, 4' ,
                        fill : false,
                        opacity : 1.0
                        },
                onEachFeature: function (feature, layer) {
                    //layer.bindPopup(feature.properties.name);
                }
            });

            // create xy axis layer

            pc_axis = L.geoJson(PointScope.Renderer.mapAxis, {
                style: function (feature) {
                            return {
                                weight: 2,
                                color: feature.properties.color,
                                opacity : 1.0
                            };
                        },
                onEachFeature: function (feature, layer) {
                    //layer.bindPopup(feature.properties.name);
                }
            });

            // add OSM baselayer
            var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

            var osm = new L.TileLayer(osmUrl, {
                maxZoom: 18,
                attribution: "Map and data © <a href='http://www.openstreetmap.org'>OpenStreetMap</a> and contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>"
                });

            // add Google baselayers
            var ggl = new L.Google(); //.addTo(map);
            var ggl2 = new L.Google('TERRAIN');

            // add map
            mymap = L.map('minimap', {
                layers: [ggl, pc_bbox, pc_axis] //
            });

            // add scale bar
            L.control.scale(
                {
                    position: "bottomleft",
                    maxWidth: 100,
                    metric: true,
                    imperial: false
                }
            ).addTo(mymap);

            // add layer switcher
            mycontrol = new L.Control.Layers( {'OSM':osm, 'Google':ggl, 'Google Terrain':ggl2}, {'Bounding box' : pc_bbox, 'XY axis' : pc_axis});
            mymap.addControl(mycontrol);
            
            initMapFlag = false;

        }

        if (mymap.hasLayer(pc_bbox)){

            mymap.removeLayer(pc_bbox); //remove layer from the map
            pc_bbox.clearLayers(); // clear data from layer
            console.log('pc_bbox empty');
            console.log(pc_bbox);
            
            pc_bbox.addData(PointScope.Renderer.mapBoundingBox);
            mymap.addLayer(pc_bbox);
            console.log('pc_bbox');
            console.log(pc_bbox);
            console.log('hasLayer(pc_bbox): ' + mymap.hasLayer(pc_bbox));

        }

        if (mymap.hasLayer(pc_axis)){

            mymap.removeLayer(pc_axis); //remove layer from the map
            pc_axis.clearLayers(); // clear data from layer
            console.log('pc_axis empty');
            console.log(pc_axis);
            
            pc_axis.addData(PointScope.Renderer.mapAxis);
            mymap.addLayer(pc_axis);
            console.log('pc_axis');
            console.log(pc_axis);
            console.log('hasLayer(pc_axis): ' + mymap.hasLayer(pc_axis));

        }

        // fit view to object bounds
        mymap.fitBounds(pc_bbox.getBounds());

    } else {

        document.getElementById('map').innerHTML = 
          '<div id="minimap" class="panel-body">' +
            '<p><span class="glyphicon glyphicon-warning-sign"></span> no map available (SRS was not defined)</p>' +                
          '</div>';

    }

};

/**
 * method to print metadata
 *
 */
PointScope.PsInterface.printMetadata = function(file, pointCollection) {

    document.getElementById('metadata_filename').innerHTML = file.name;
    document.getElementById('metadata_date_modification').innerHTML = file.lastModifiedDate;
    document.getElementById('metadata_npoints').innerHTML = pointCollection.computedMetadata['Number of point records'];

    document.getElementById('metadata_xextent').innerHTML = pointCollection.computedMetadata['X min'].toFixed(2) + ', ' + pointCollection.computedMetadata['X max'].toFixed(2);
    document.getElementById('metadata_yextent').innerHTML = pointCollection.computedMetadata['Y min'].toFixed(2) + ', ' + pointCollection.computedMetadata['Y max'].toFixed(2);
    document.getElementById('metadata_zextent').innerHTML = pointCollection.computedMetadata['Z min'].toFixed(2) + ', ' + pointCollection.computedMetadata['Z max'].toFixed(2);

    document.getElementById('metadata_software').innerHTML = pointCollection.publicHeader['Generating Software'];
    
    document.getElementById('metadata_srid').innerHTML = pointCollection.computedMetadata.SRID + ' (' + pointCollection.computedMetadata.SRID + ')'; 
    document.getElementById('metadata_srs').innerHTML = pointCollection.computedMetadata.SRID;

};

/**
 * method to find minimum
 * @param a value list
 */
PointScope.PsInterface.findMin = function(a) {

    var minVal = a[0]; 
    for ( var i = 1; i < a.length; i++ ) {
        a[i] < minVal ? minVal = a[i] : null;
    }
    return minVal;

};

/**
 * method to find minimum
 * @param a value list
 */
PointScope.PsInterface.findMax = function(a) {

    var maxVal = a[0]; 
    for ( var i = 1; i < a.length; i++ ) {
        a[i] > maxVal ? maxVal = a[i] : null;
    }
    return maxVal;

};

/**
 * method to sort numeric values
 * @param a value list
 * @param b value list
 */
PointScope.PsInterface.sortNumeric = function(a, b) {

    return a - b;

};