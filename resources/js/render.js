/**
* PointScope
* Last update: 04 Aug 2014
*
* Licensed under the GPL Version 3 license.
* http://www.gnu.org/licenses/gpl-3.0.html
*
*/


PointScope.Renderer.findMin = function (a) {

    var minVal = a[0];
    for (var i = 1; i < a.length; i++ ) {
        a[i] < minVal ? minVal = a[i] : null;
    }
    return minVal;

};

PointScope.Renderer.findMax = function (a) {

    var maxVal = a[0]; 
    for ( var i = 1; i < a.length; i++ ) {
        a[i] > maxVal ? maxVal = a[i] : null;
    }
    return maxVal;

};

PointScope.Renderer.setSRS = function () {
    console.log('setSRS()');
    try {
        var srid = "";
        if (!PointScope.PsInterface.projFlag) {
            srid = document.getElementById('userSRS').value;
        }
        
        
        
        PointScope.PsInterface.pointCollection.computedMetadata.SRID = srid ;
        PointScope.PsInterface.pointCollection.computedMetadata.SRN = PointScope.Projections.prjdefs[srid][0];
        PointScope.PsInterface.pointCollection.computedMetadata.SRN = PointScope.Projections.prjdefs[srid][1];

        // create map bounding box
        var type = "FeatureCollection";
        var crs = {"name":"urn:ogc:def:crs:EPSG::" + srid.substring(5)};
        var features = [{"type":"Feature","properties":{"name":"bounding box"},"geometry":{"type":"Polygon","coordinates":[[
            [PointScope.PsInterface.pointCollection.computedMetadata['X min'], PointScope.PsInterface.pointCollection.computedMetadata['Y min']],
            [PointScope.PsInterface.pointCollection.computedMetadata['X min'], PointScope.PsInterface.pointCollection.computedMetadata['Y max']],
            [PointScope.PsInterface.pointCollection.computedMetadata['X max'], PointScope.PsInterface.pointCollection.computedMetadata['Y max']],
            [PointScope.PsInterface.pointCollection.computedMetadata['X max'], PointScope.PsInterface.pointCollection.computedMetadata['Y min']],
            [PointScope.PsInterface.pointCollection.computedMetadata['X min'], PointScope.PsInterface.pointCollection.computedMetadata['Y min']]]]}}];

        PointScope.Renderer.mapBoundingBox = new PointScope.PsInterface.geoJSON(type, crs, features);
        console.log('mapBoundingBox');
        console.log(PointScope.Renderer.mapBoundingBox);

        // create map axis
        var axisLength = Math.max(PointScope.PsInterface.pointCollection.computedMetadata['X size'], PointScope.PsInterface.pointCollection.computedMetadata['Y size'], PointScope.PsInterface.pointCollection.computedMetadata['Z size']);

        console.log('axisLength');
        console.log(axisLength);

        type = "FeatureCollection";
        crs = {"name":"urn:ogc:def:crs:EPSG::" + srid.substring(5)};
        features = [
            { "type": "Feature", "properties": {"color" : "#FF0000"}, "geometry": {"type": "LineString", "coordinates": [
                [PointScope.PsInterface.pointCollection.computedMetadata['X center'], PointScope.PsInterface.pointCollection.computedMetadata['Y center']], 
                [PointScope.PsInterface.pointCollection.computedMetadata['X center'] + axisLength, PointScope.PsInterface.pointCollection.computedMetadata['Y center']] 
                ]
            }},
            { "type": "Feature", "properties": {"color" : "#00FF00"}, "geometry": {"type": "LineString", "coordinates": [
                [PointScope.PsInterface.pointCollection.computedMetadata['X center'], PointScope.PsInterface.pointCollection.computedMetadata['Y center']], 
                [PointScope.PsInterface.pointCollection.computedMetadata['X center'], PointScope.PsInterface.pointCollection.computedMetadata['Y center'] + axisLength] 
                ]
            }}
        ];

        PointScope.Renderer.mapAxis = new PointScope.PsInterface.geoJSON(type, crs, features);
        console.log('mapAxis');
        console.log(PointScope.Renderer.mapAxis);        
        console.log(JSON.stringify(PointScope.Renderer.mapAxis));

        // compute bounding box coordinates in lat/long
        PointScope.Renderer.bbox_local_srs = JSON.stringify(PointScope.Renderer.mapBoundingBox);
        console.log(PointScope.Renderer.mapBoundingBox);
        PointScope.Renderer.mapBoundingBox.reproject(PointScope.Projections.prjdefs[srid][1],"+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");
        PointScope.Renderer.mapBoundingBox.crs = {"name":"urn:ogc:def:crs:EPSG::4326"};
        PointScope.Renderer.bbox_global_srs = JSON.stringify(PointScope.Renderer.mapBoundingBox);

        // compute axis coordinates in lat/long
        var vaxis_local_srs = JSON.stringify(PointScope.Renderer.mapAxis);
        PointScope.Renderer.mapAxis.reproject(PointScope.Projections.prjdefs[srid][1],'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
        PointScope.Renderer.mapAxis.crs = {"name":"urn:ogc:def:crs:EPSG::4326"};
        var axis_global_srs = JSON.stringify(PointScope.Renderer.mapAxis);
        console.log('axis_global_srs');
        console.log(axis_global_srs);

        // update metadata display
        document.getElementById('metadata_srid').innerHTML = PointScope.PsInterface.pointCollection.computedMetadata.SRN + ' (' + PointScope.PsInterface.pointCollection.computedMetadata.SRID + ')'; 
        document.getElementById('metadata_srs').innerHTML = PointScope.PsInterface.pointCollection.computedMetadata.SRS;

        // update projection availability flag
        PointScope.PsInterface.projFlag = true;

        // update download menu
        PointScope.PsInterface.printDownload();

        document.getElementById('userInputSRS').className = "form-group";
        document.getElementById('userSRSLabel').innerHTML = "Please indicate the SRS to use in this project:";
        $('#SRSModal').modal('hide');
        console.log('SRS available');

    } 
    catch(err) {
        console.log(err);
        document.getElementById('userInputSRS').className = "form-group has-error has-feedback";
        document.getElementById('userSRSLabel').innerHTML = "The SRS your entered is invalid";
        PointScope.PsInterface.projFlag = false;
        console.log('SRS unavailable');

    }
    
};

PointScope.PsInterface.init = function () {

    if (PointScope.PsInterface.resetFlag){

        for ( var i = PointScope.Renderer.scene.children.length - 1; i >= 0 ; i -- ) {

          var obj = scene.children[i];
          scene.remove(obj);

          if (obj.geometry) {                                                                          
            obj.geometry.dispose();                                                                  
          }
          if (obj.material) {
            obj.material.dispose();
          }
          if (obj.dispose) {
            obj.dispose();
          }
          console.log(obj);

          obj = undefined; 
          delete(obj); // remove reference

          console.log(obj);
        }

        texture.dispose();
        texture = undefined;
        delete(texture);

        container.removeChild( renderer.domElement);

        geometry.dispose();
        geometry = undefined;
        delete(obj);

        shaderMaterial.dispose();
        shaderMaterial = undefined;
        delete(shaderMaterial);

        PointScope.Renderer.renderer = undefined;
        PointScope.Renderer.camera = undefined;
        PointScope.Renderer.controls = undefined;
        PointScope.Renderer.scene = undefined;
        PointScope.Renderer.uniforms = undefined;
        PointScope.Renderer.attributes = undefined;
        PointScope.Renderer.positions = undefined;
        PointScope.Renderer.colors = undefined;

    }

    // load texture
    var image = document.createElement( 'img' );
    // light and large points
    image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABmgAAAZoBeoMgkgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF+SURBVFiFzZe9TgJBFIU/JhGooTP+sIW+gZWNvAGJL8Mr0Fhjb2tiaSjAxieAShNYTTA00CvFsdgZJUjY2cDueJJpdnbvd3Znc+dMSRKeqgDXwBVwAtSAup2bAwvgHXgC7oFPr6qS0kYk6VZSLH9N7DNRWv1tk1VJN5JmGcDrmtka1awGjiX1dwCvq29rehm4kDTaI9xpZGtvNXAkaZgD3GloGRsNVCT1coQ79Szrj4FOAXCnjuOWlPSBBvAMHPo2hR31AVwCsbEX2gXCsaw2QElSGXgBTgs0APAGnBugFQCOZbYM0AwAd2oaIApoIDIku1oo1Qy/W2oI1U36PfnKkISJUJobkiQTSgsDjAMaGBtgENDAoCTpAHglTCs+M8ASeCwYjmUu/812HAN3BcGxrBj4X5EseChdjeV5mBjKI5avfol9LkdPa2+eZsD9Ex1J0x3AU1vjZ82zGHCjIamr7IfTrn12a33XB3xUJsmPTZIUtel4PiFp7Q/Al0/Rb2X6IK6n1dgiAAAAAElFTkSuQmCC";
    // dark and small points
    //image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sHDgwCEMBJZu0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAABM5JREFUWMO1V0tPG2cUPZ4Hxh6DazIOrjFNqJs0FIMqWFgWQkatsmvVbtggKlSVRVf5AWz4AWz4AUSKEChll19QJYSXkECuhFxsHjEhxCYm+DWGMZ5HF72DJq4bAzFXurI0M/I5997v3u9cC65vTJVn2lX/xHINQOYSBLTLEuIuCWw4Z3IGAEvf6ASmVHjNzHCXBG4A0AjACsAOwEbO0nsFQBnAGYASAIl+ZRMR7SolMEdsByD09fV5R0ZGgg8ePPjW5/N1iqLYpuu6RZblciKR2I9Go69evnwZnZ+fjwI4IS8AKBIRzeQfJWCANwKwh0KhtrGxsYehUOin1tbW+zzP23ietzY2NnIAoGmaLsuyUiqVyvl8XtrY2NiamZn589mzZxsAUgCOAeQAnFI2tI+VxIjaAeDzoaGh7xYWFuZOTk6OZVk+12uYqqq6JEnn0Wg0OT4+/geAXwGEAdwDIFJQXC1wO4DWR48e/RCPxxclSSroVzRFUbSDg4P848ePFwH8DuAhkWih83TRQWxFOXgAwvDwcOfo6OhvXV1d39tsNtuVBwTDWBwOh1UUxVsMw1hXVlbSdCgNV43uYSvrHg6H24aHh38eHBz85TrgF9FYLHA4HLzH43FvbW2d7u/vG+dANp8FpqIlbd3d3V8Fg8EfBUFw4BONZVmL3+9vHhkZCQL4AoAHgJPK8G+yzC0XDofdoVAo5PP5vkadTBAEtr+/39ff3x8gAp/RPOEqx2qjx+NpvXv3bk9DQ0NDvQgwDIOWlhZrMBj8kgi0UJdxRgYMArzL5XJ7vd57qLPZ7Xamp6fnNgBXtQxcjFuHw+Hyer3t9SYgCAITCAScAJoBNNEY/08GOFVVrfVMv7kMNDntFD1vjIAPrlRN0xjckOm6biFQ3jwNPwDMZrOnqVTqfb3Bi8Wivru7W/VCYkwPlKOjo0IikXh7EwQikYgE4Nw0CfXKDCipVCoTj8df3QABbW1tLUc6oUgkFPMkVACUNjc337148eKvw8PDbJ2jP1taWkoCyNDVXDSECmNSK4qiKNLq6urW8+fPI/UicHx8rD59+jSVy+WOAKSJhKENwFItLtoxk8mwsixzHR0dHe3t7c5PAU+n09rs7OzJkydPYqVSaQfANoDXALIk31S2smU1TWMPDg7K5XKZ7+3t9TudTut1U7+wsFCcmJiIpdPpbQBxADsAknQWymYCOukBHYCuKApisdhpMpnURFEU79y503TVyKenpzOTk5M7e3t7MQKPV0Zv1gNm+awB0MvlshqLxfLb29uyJElWURSbXC4XXyvqxcXFs6mpqeTc3Nzu3t7e3wQcA7BPZ8Cov1pNlJplmQtAG8MwHV6v95tAINA5MDBwPxAIuLu6upr8fr/VAN3c3JQjkcjZ+vp6fnl5+d2bN29SuVzuNYAEpf01CdRChUL+X1VskHACuA3Ay3Fcu9vt7nA6nZ7m5uYWQRCaNE3jVVW15PP580KhIGUymWw2m00DOAJwSP4WwPtq4LX2Ao6USxNlQyS/RcQcdLGwlNIz6vEMAaZpNzCk2Pll94LK/cDYimxERiBwG10sxjgvEZBE0UpE6vxj+0Ct5bTaXthgEhRmja8QWNkkPGsuIpfdjpkK+cZUWTC0KredVmtD/gdlSl6EG4AMvQAAAABJRU5ErkJggg==";

    var texture = new THREE.Texture( image );
    image.onload = function()  {
        texture.needsUpdate = true;
        PointScope.Renderer.render();
    };

    // renderer
    PointScope.Renderer.renderer = new THREE.WebGLRenderer( { 
        antialias: false 
    } );
    PointScope.Renderer.renderer.setSize(document.getElementById("container").offsetWidth, window.innerHeight);
    var container = document.getElementById('container');
    container.appendChild(PointScope.Renderer.renderer.domElement );

    // add camera
    PointScope.Renderer.camera = new THREE.PerspectiveCamera( 60, document.getElementById("container").offsetWidth / window.innerHeight, 1, 10000 );
    PointScope.Renderer.camera.position.z = 300;
    
    // add view controls
    PointScope.Renderer.clock = new THREE.Clock();
    PointScope.Renderer.updateViewController('Trackball');
    
    // add scene
    PointScope.Renderer.scene = new THREE.Scene();

    // render particles 
    PointScope.Renderer.num_particles = Math.round(1 * PointScope.PsInterface.pointCollection.computedMetadata['Number of point records']);
    console.log('N part: '  + PointScope.Renderer.num_particles);
    
    // check number of points
    PointScope.Renderer.splitCloud = Math.ceil(PointScope.Renderer.num_particles / 16777215);

    PointScope.Renderer.attributes = {
        alpha: { type: 'f', value: 1.0 }, // set individual point transparency
        customColor: { type: 'c', value: 0xffffff } // set individual point color
    }; 

    PointScope.Renderer.uniforms = {
        color:     { type: "c", value: new THREE.Color( 0xffffff ) },
        texture:   { type: "t", value: texture },
        size:        { type: 'f', value: document.getElementById('scalePoints').value },
        alpha: { type: 'f', value: document.getElementById('alphaPoints').value }
    };

    PointScope.Renderer.shaderMaterial = new THREE.ShaderMaterial( {
        uniforms: PointScope.Renderer.uniforms,
        attributes: PointScope.Renderer.attributes,
        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        depthTest: true,
        transparent: true
    });
    
    // create data views
    PointScope.Renderer.dv1 = new DataView(PointScope.PsInterface.pointCollection.points.X);
    PointScope.Renderer.dv2 = new DataView(PointScope.PsInterface.pointCollection.points.Y);
    PointScope.Renderer.dv3 = new DataView(PointScope.PsInterface.pointCollection.points.Z);
    PointScope.Renderer.dv4 = new DataView(PointScope.PsInterface.pointCollection.points.Intensity);
    PointScope.Renderer.dv5 = new DataView(PointScope.PsInterface.pointCollection.points.SubByteFields);
    PointScope.Renderer.dv6 = new DataView(PointScope.PsInterface.pointCollection.points.Classification);
    //dv7 = new DataView(PointScope.PsInterface.pointCollection.points['Scan Angle Rank']);
    //dv8 = new DataView(PointScope.PsInterface.pointCollection.points['User Data']);
    //dv9 = new DataView(PointScope.PsInterface.pointCollection.points['Point Source ID']);
    PointScope.Renderer.dv11 = new DataView(PointScope.PsInterface.pointCollection.points.Red);
    PointScope.Renderer.dv12 = new DataView(PointScope.PsInterface.pointCollection.points.Green);
    PointScope.Renderer.dv13 = new DataView(PointScope.PsInterface.pointCollection.points.Blue);
    
    // set point positions and size
    PointScope.Renderer.geometry = new THREE.BufferGeometry();
    PointScope.Renderer.positions = new Float32Array(PointScope.Renderer.num_particles * 3 );
    PointScope.Renderer.colors = new Float32Array(PointScope.Renderer.num_particles * 3 );
    
    var k = 0;
    var writeOffsetInt32 = 0;
    for ( var i = 0; i < PointScope.Renderer.num_particles; i++ ) {
        // set point position
        PointScope.Renderer.positions[k]     = PointScope.Renderer.dv1.getInt32(writeOffsetInt32, true) * PointScope.PsInterface.pointCollection.publicHeader['X scale factor'] + PointScope.PsInterface.pointCollection.publicHeader['X offset']; //x
        PointScope.Renderer.positions[k + 1] = PointScope.Renderer.dv2.getInt32(writeOffsetInt32, true) * PointScope.PsInterface.pointCollection.publicHeader['Y scale factor'] + PointScope.PsInterface.pointCollection.publicHeader['Y offset']; //y
        PointScope.Renderer.positions[k + 2] = PointScope.Renderer.dv3.getInt32(writeOffsetInt32, true) * PointScope.PsInterface.pointCollection.publicHeader['Z scale factor'] + PointScope.PsInterface.pointCollection.publicHeader['Z offset']; //z
        k += 3;
        writeOffsetInt32 += 4;
    }
    
    // add geometry attributes
    PointScope.Renderer.geometryArray = [];
    PointScope.Renderer.pointCloudArray = [];

    for (var i = 0; i < PointScope.Renderer.splitCloud; i++) {
        PointScope.Renderer.geometryArray[i] = new THREE.BufferGeometry();
        PointScope.Renderer.geometryArray[i].addAttribute( 'position', new THREE.BufferAttribute( PointScope.Renderer.positions.subarray(i*50331645, (i+1)*50331645), 3 ) );
        PointScope.Renderer.pointCloudArray[i] = new THREE.PointCloud(PointScope.Renderer.geometryArray[i], PointScope.Renderer.shaderMaterial );
    }

    PointScope.Renderer.geometry.addAttribute( 'position', new THREE.BufferAttribute( PointScope.Renderer.positions, 3 ) );

    // compute the bounding box
    PointScope.Renderer.geometry.computeBoundingBox();

    // bounding box dimensions (in world coordinates)
    var boundingBoxSize = PointScope.Renderer.geometry.boundingBox.size();
    console.log('bounding box: ' + JSON.stringify(boundingBoxSize)); 

    PointScope.PsInterface.pointCollection.computedMetadata['Number of point records'] = PointScope.Renderer.num_particles;
    PointScope.PsInterface.pointCollection.computedMetadata['X min'] = PointScope.Renderer.geometry.boundingBox.min.x;
    PointScope.PsInterface.pointCollection.computedMetadata['X max'] = PointScope.Renderer.geometry.boundingBox.max.x;
    PointScope.PsInterface.pointCollection.computedMetadata['Y min'] = PointScope.Renderer.geometry.boundingBox.min.y;
    PointScope.PsInterface.pointCollection.computedMetadata['Y max'] = PointScope.Renderer.geometry.boundingBox.max.y;
    PointScope.PsInterface.pointCollection.computedMetadata['Z min'] = PointScope.Renderer.geometry.boundingBox.min.z;
    PointScope.PsInterface.pointCollection.computedMetadata['Z max'] = PointScope.Renderer.geometry.boundingBox.max.z;
    PointScope.PsInterface.pointCollection.computedMetadata['X center'] = PointScope.Renderer.geometry.boundingBox.max.x - boundingBoxSize.x / 2;
    PointScope.PsInterface.pointCollection.computedMetadata['Y center'] = PointScope.Renderer.geometry.boundingBox.max.y - boundingBoxSize.y / 2;
    PointScope.PsInterface.pointCollection.computedMetadata['Z center'] = PointScope.Renderer.geometry.boundingBox.max.z - boundingBoxSize.z / 2;
    PointScope.PsInterface.pointCollection.computedMetadata['X size'] = boundingBoxSize.x;
    PointScope.PsInterface.pointCollection.computedMetadata['Y size'] = boundingBoxSize.y;
    PointScope.PsInterface.pointCollection.computedMetadata['Z size'] = boundingBoxSize.z;

    // delete geometry
    
    // get Proj4 definition from SRID
    switch (PointScope.PsInterface.pointCollection.variableLengthHeader.GeoKeyDirectoryTag === null){
        case true:

            // SRS is undefined
            $('#SRSModal').modal('show'); // ask user to specify SRS
            PointScope.PsInterface.pointCollection.computedMetadata.SRID = undefined; 
            PointScope.PsInterface.pointCollection.computedMetadata.SRN = undefined; 
            PointScope.PsInterface.pointCollection.computedMetadata.SRS = undefined;
            PointScope.PsInterface.projFlag = false;
            break;

        case false:

            // SRS is defined
            if (!(PointScope.PsInterface.pointCollection.variableLengthHeader.GeoKeyDirectoryTag.pKeys.wKeyID['3072'] === undefined)){
                srid = 'EPSG:' + PointScope.PsInterface.pointCollection.variableLengthHeader.GeoKeyDirectoryTag.pKeys.wKeyID['3072'].wValue_Offset;
                PointScope.PsInterface.projFlag = true;
                setSRS();
            }

            if (!(PointScope.PsInterface.pointCollection.variableLengthHeader.GeoKeyDirectoryTag.pKeys.wKeyID['2048'] === undefined)){
                srid = 'EPSG:' + PointScope.PsInterface.pointCollection.variableLengthHeader.GeoKeyDirectoryTag.pKeys.wKeyID['2048'].wValue_Offset;
                PointScope.PsInterface.projFlag = true;
                setSRS();
            }

            break;
    }
    
    // translate the coordinates so that the point cloud is centered at 0,0,0
    var k = 0;
    var x_offset = PointScope.Renderer.geometry.boundingBox.min.x + boundingBoxSize.x/2;
    var y_offset = PointScope.Renderer.geometry.boundingBox.min.y + boundingBoxSize.y/2;
    var z_offset = PointScope.Renderer.geometry.boundingBox.min.z + boundingBoxSize.z/2;

    for ( var i = 0; i < PointScope.Renderer.num_particles; i++ ) {

        PointScope.Renderer.positions[k]     -= x_offset;
        PointScope.Renderer.positions[k + 1] -= y_offset;
        PointScope.Renderer.positions[k + 2] -= z_offset;
        k += 3;

    }
                
    console.log('bounding box (screen):');
    PointScope.Renderer.geometry.computeBoundingBox();
    console.log(PointScope.Renderer.geometry.boundingBox);

    // set display options
    PointScope.Renderer.displayInfo = {

        'RGB' : {'colormapName' : 'none', 'discrete' : false, 'nColors' : 256 , 'valueRange' : undefined, 'legendText' : undefined},
        'Elevation' : {'colormapName' : 'jet', 'discrete' : false, 'nColors' : 256, 'valueRange' : [PointScope.PsInterface.pointCollection.computedMetadata['Z min'], PointScope.PsInterface.pointCollection.computedMetadata['Z max']], 'legendText' : undefined},
        'Intensity' : {'colormapName' : 'jet', 'discrete' : false, 'nColors' : 256, 'valueRange' : [PointScope.PsInterface.pointCollection.computedMetadata['Intensity min'], PointScope.PsInterface.pointCollection.computedMetadata['Intensity max']], 'legendText' : undefined},
        'Classification' : {'colormapName' : 'classification', 'discrete' : true, 'nColors' : PointScope.PsInterface.pointCollection.computedMetadata['Unique classes'].length, 'valueRange' : PointScope.PsInterface.pointCollection.computedMetadata['Unique classes'], 'legendText' : 
        {'0' : '0', '1' : '1', '2' : '2', '3' : '3', '4' : '4', '5' : '5', '6' : '6', '7' : '7', '8' : '8', '9' : '9', '10' : '10', '11' : '11', '12' : '12', '13' : '13', '14' : '14', '15' : '15', '16' : '16', 
        '17' : '17', '18' : '18', '19' : '19', '20' : '20', '21' : '21', '22' : '22', '23' : '23', '24' : '24', '25' : '25', '26' : '26', '27' : '27', '28' : '28', '29' : '29', '30' : '30', '31' : '31'}},
        'ReturnNumber' : {'colormapName' : 'five', 'discrete' : true, 'nColors' : 5, 'valueRange' : [0, 1, 2, 3, 4], 'legendText' : {'0' : '1', '1' : '2', '2' : '3', '3' : '4', '4' : '5'}},
        'FlightLineEdge' : {'colormapName' : 'bin', 'discrete' : true, 'nColors' : 2, 'valueRange' : [0, 1], 'legendText' : {'0' : 'inner', '1' : 'edge'}},
        'None' : {'colormapName' : 'none', 'discrete' : true, 'nColors' : 2, 'valueRange' : undefined, 'legendText' : undefined}

    };
    
    // set initial point colors
    document.getElementById('colorPointsBy').value = 'Elevation'; //'None'
    PointScope.Renderer.updatePointColors(false);

    console.log('geometry:');
    console.log(PointScope.Renderer.geometry); 

    // add the bounding box
    var bounding_box_mesh = new THREE.Mesh(
    
        new THREE.BoxGeometry(boundingBoxSize.x, boundingBoxSize.y, boundingBoxSize.z),  
        new THREE.MeshBasicMaterial({ color : 0xFFFF00})

    );

    PointScope.Renderer.boxHelper = new THREE.BoxHelper( bounding_box_mesh );
    document.getElementById('bbox_display').checked ? PointScope.Renderer.scene.add(PointScope.Renderer.boxHelper) : PointScope.Renderer.scene.remove(PointScope.Renderer.boxHelper); // toggle bounding box display

    // add axis
    console.log('boundingBoxSize');
    console.log(boundingBoxSize.toArray());
    console.log(Math.max(boundingBoxSize.x, boundingBoxSize.y, boundingBoxSize.z));
    PointScope.Renderer.axes = new THREE.AxisHelper(Math.max(boundingBoxSize.x, boundingBoxSize.y, boundingBoxSize.z));
    document.getElementById('axis_display').checked ? PointScope.Renderer.scene.add(PointScope.Renderer.axes) : PointScope.Renderer.scene.remove(PointScope.Renderer.axes);

    // add clouds to scene
    for (var i = 0; i < PointScope.Renderer.splitCloud; i++) {

        PointScope.Renderer.scene.add(PointScope.Renderer.pointCloudArray[i]);

    }

    window.addEventListener( 'resize', PointScope.Renderer.onWindowResize, false );

    // render scene
    PointScope.Renderer.render();
    PointScope.PsInterface.resetFlag = true;

};

PointScope.Renderer.onWindowResize = function() {
    
    PointScope.Renderer.camera.aspect = document.getElementById("container").offsetWidth / window.innerHeight;
    PointScope.Renderer.camera.updateProjectionMatrix();
    renderer.setSize( document.getElementById("container").offsetWidth, window.innerHeight );
    //controls.handleResize();
        
    render();

};

PointScope.Renderer.updateViewController = function(option) {
    
    PointScope.Renderer.controls = undefined;
    
    switch(option){
    case 'Trackball':
        
        // reset domElement to remove anonymous event listeners
        var old_element = document.getElementById('empty');
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        
        // add camera controls
        PointScope.Renderer.controls = new THREE.TrackballControls(PointScope.Renderer.camera, document.getElementById('empty'));

        // set control options
        PointScope.Renderer.controls.rotateSpeed = 1.0;
        PointScope.Renderer.controls.zoomSpeed = 1.2;
        PointScope.Renderer.controls.panSpeed = 0.8;
        PointScope.Renderer.controls.noZoom = false;
        PointScope.Renderer.controls.noPan = false;
        PointScope.Renderer.controls.noRotate = false;
        PointScope.Renderer.controls.noRoll = false;
        PointScope.Renderer.controls.staticMoving = true;
        PointScope.Renderer.controls.dynamicDampingFactor = 0.3;
        //controls.keys = [ 65, 83, 68 ];
        //controls.addEventListener( 'change', render );
        break;
    case 'Fly':
        
        // reset domElement to remove anonymous event listeners
        old_element = document.getElementById('empty');
        new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        
        // add camera controls
        PointScope.Renderer.controls = new THREE.FlyControls(PointScope.Renderer.camera, document.getElementById('empty'));
        
        // set control options
        PointScope.Renderer.controls.movementSpeed = 200;
        PointScope.Renderer.controls.rollSpeed = Math.PI / 12;
        PointScope.Renderer.controls.autoForward = false;
        PointScope.Renderer.controls.dragToLook = true;
        break;
    }
};

PointScope.Renderer.updatePointScale = function() {
    
    console.log('update point size');
    document.getElementById('scalePoints').value <= 10.0 ? PointScope.Renderer.uniforms.size.value = document.getElementById('scalePoints').value : PointScope.Renderer.uniforms.size.value = 10.0;
    PointScope.Renderer.render();

};

PointScope.Renderer.updatePointAlpha = function() {
    
    console.log('update point alpha');
    document.getElementById('alphaPoints').value <= 1.0 ? PointScope.Renderer.uniforms.alpha.value = document.getElementById('alphaPoints').value : PointScope.Renderer.uniforms.alpha.value = 1.0;
    PointScope.Renderer.render();
    
};

PointScope.Renderer.updatePointColors = function(renderOn) {

    console.log('update color');
    var k;
    var colormapName = 'none';
    var valueRange = [];
    var legendText = [];
    switch(document.getElementById('colorPointsBy').value) {
        case 'RGB':
            console.log('RGB');
            colormapName = 'none';
            valueRange = [];
            legendText = [];
            writeOffsetUint16 = 0;
            k = 0;
            for ( var i = 0; i < PointScope.Renderer.num_particles; i++ ) {
                PointScope.Renderer.colors[k] = PointScope.Renderer.dv11.getUint16(writeOffsetUint16, true)/32767; 
                PointScope.Renderer.colors[k + 1] = PointScope.Renderer.dv12.getUint16(writeOffsetUint16, true)/32767;
                PointScope.Renderer.colors[k + 2] = PointScope.Renderer.dv13.getUint16(writeOffsetUint16, true)/32767;
                k += 3;
                writeOffsetUint16 += 2;
            }
            break;
        case 'Classification':
            console.log('Classification');
            colormapName = 'classification';
            valueRange = [0, 31];
            legendText = {};
            writeOffsetUint8 = 0;
            k = 0;
            for ( var i = 0; i < PointScope.Renderer.num_particles-2; i++ ) {
                var currentColor = PointScope.Colormaps.colormap[colormapName][PointScope.Renderer.dv6.getUint8(writeOffsetUint8, true) & 31];
                PointScope.Renderer.colors[k]     = currentColor[0]; 
                PointScope.Renderer.colors[k + 1] = currentColor[1];
                PointScope.Renderer.colors[k + 2] = currentColor[2];
                k += 3;
                writeOffsetUint8 += 1;
            }
            break;
        case 'Elevation':
            console.log('Elevation');
            colormapName = 'jet';
            valueRange = [PointScope.PsInterface.pointCollection.computedMetadata['Z min'], PointScope.PsInterface.pointCollection.computedMetadata['Z max']];
            legendText = {};
            k = 0;
            var scaled_max = PointScope.Renderer.geometry.boundingBox.max.z - PointScope.Renderer.geometry.boundingBox.min.z;
            for ( var i = 0; i < PointScope.Renderer.num_particles-2; i++ ) {
                var currentColor = PointScope.Colormaps.colormap[colormapName][Math.round(255*(PointScope.Renderer.positions[3*i+2] + PointScope.Renderer.geometry.boundingBox.max.z)/scaled_max)];
                PointScope.Renderer.colors[k]     = currentColor[0]; 
                PointScope.Renderer.colors[k + 1] = currentColor[1];
                PointScope.Renderer.colors[k + 2] = currentColor[2];
                k += 3;    
            }
            break;
        case 'Intensity':
            console.log('Intensity');
            colormapName = 'jet';
            valueRange = [PointScope.PsInterface.pointCollection.computedMetadata['Intensity min'], PointScope.PsInterface.pointCollection.computedMetadata['Intensity max']];
            legendText = {};
            writeOffsetUint16 = 0;
            k = 0;
            var scaled_intensity = PointScope.PsInterface.pointCollection.computedMetadata['Intensity max'] - PointScope.PsInterface.pointCollection.computedMetadata['Intensity min'];
            scaled_intensity === 0 ? scaled_intensity = 1 : null;
            
            for ( var i = 0; i < PointScope.Renderer.num_particles; i++ ) {
                var currentColor = PointScope.Colormaps.colormap[colormapName][Math.round(255*(PointScope.Renderer.dv4.getUint16(writeOffsetUint16, true) -    PointScope.PsInterface.pointCollection.computedMetadata['Intensity min'] )/scaled_intensity)];
                PointScope.Renderer.colors[k]     = currentColor[0];
                PointScope.Renderer.colors[k + 1] = currentColor[1];
                PointScope.Renderer.colors[k + 2] = currentColor[2];
                k += 3;
                writeOffsetUint16 += 2;
            }
            break;
        case 'ReturnNumber':
            console.log('ReturnNumber');
            colormapName = 'five';
            valueRange = [1 , 5];
            writeOffsetUint8 = 0;
            k = 0;
            for ( var i = 0; i < PointScope.Renderer.num_particles; i++ ) {
                var currentColor = PointScope.Colormaps.colormap[colormapName][(PointScope.Renderer.dv5.getUint8(writeOffsetUint8, true) & 7)-1]; // Return Number, 3 bits (bits 0, 1, 2), 3 bits, * 
                PointScope.Renderer.colors[k]     = currentColor[0]; 
                PointScope.Renderer.colors[k + 1] = currentColor[1];
                PointScope.Renderer.colors[k + 2] = currentColor[2];
                k += 3;
                writeOffsetUint8 += 1;
            }
            break;        
        case 'FlightLineEdge':
            console.log('FlightLineEdge');
            colormapName = 'bin';
            valueRange = [0 , 1];
            legendText = {'0' : 'inner flightline', '1' : 'flightline edge'};
            writeOffsetUint8 = 0;
            k = 0;
            for ( var i = 0; i < PointScope.Renderer.num_particles; i++ ) {
                var currentColor = PointScope.Colormaps.colormap[colormapName][(PointScope.Renderer.dv5.getUint8(writeOffsetUint8, true) >> 7) & 1];
                PointScope.Renderer.colors[k]     = currentColor[0]; 
                PointScope.Renderer.colors[k + 1] = currentColor[1];
                PointScope.Renderer.colors[k + 2] = currentColor[2];
                k += 3;
                writeOffsetUint8 += 1;
            }
            break;        
        case 'None':
            console.log('None');
            colormapName = 'none';
            valueRange = [];
            legendText = [];
            k = 0;
            for ( var i = 0; i < PointScope.Renderer.num_particles; i++ ) {
                PointScope.Renderer.colors[k]     = 1;
                PointScope.Renderer.colors[k + 1] = 1;
                PointScope.Renderer.colors[k + 2] = 1;
                k += 3;    
            }
            break;
    }
    
    // update colors
    for (var i = 0; i < PointScope.Renderer.splitCloud; i++) {
    
        if (PointScope.Renderer.geometryArray[i].attributes.customColor === undefined){
        
                PointScope.Renderer.geometryArray[i].addAttribute( 'customColor', new THREE.BufferAttribute(PointScope.Renderer.colors.subarray(i*50331645, (i+1)*50331645), 3 ) );
                console.log('add customColor');
                
        } else {
        
                PointScope.Renderer.geometryArray[i].attributes.customColor.needsUpdate = true;
                console.log('update customColor');
                renderOn = true;
        }
                
    }

    console.log(renderOn);
    renderOn ? PointScope.Renderer.render() : null;
    PointScope.Renderer.updateColorbar(document.getElementById('colorPointsBy').value);
};

PointScope.Renderer.updateColorbar = function(colorPointsBy) {
    
    var colormapName = PointScope.Renderer.displayInfo[colorPointsBy].colormapName;
    var valueRange = PointScope.Renderer.displayInfo[colorPointsBy].valueRange;
    
    if (colormapName == 'none'){

        document.getElementById('colorbar').innerHTML = ''; // hide colorbar
    } else {
        var ncolors = PointScope.Renderer.displayInfo[colorPointsBy].nColors;
        if (ncolors <= 2) {
            var colorbarHeight = 140;
        }
        
        if (ncolors > 2 && ncolors <= 8) {
            var colorbarHeight = 250;
        }
        
        if (ncolors > 8 && ncolors <= 15) {
            var colorbarHeight = 290;
        }
        
        if (ncolors > 18 && ncolors <= 32) {
            var colorbarHeight = 450;
        }
        
        if (ncolors > 32) {
            var colorbarHeight = 286;
        }
        
        var stepWidth = (colorbarHeight-30) / ncolors;
        
        
        document.getElementById('colorbar').innerHTML = '<canvas width="350px" height="' + colorbarHeight + 'px" id="cv"></canvas>';

        var cv  = document.getElementById('cv');
        var    ctx = cv.getContext('2d');
        
        console.log('PointScope.Colormaps.colormap[ColormapName]');
        console.log(PointScope.Colormaps.colormap[colormapName]);
        
        // fill rectangles
        var offset = 15;
        for (var i = 0; i < ncolors; i++) {

            ctx.beginPath();
            var currentColor;
            PointScope.Renderer.displayInfo[colorPointsBy].discrete ? currentColor = PointScope.Colormaps.colormap[colormapName][valueRange[i]] : currentColor = PointScope.Colormaps.colormap[colormapName][ncolors-i-1];
            var color = 'rgb(' + Math.round(currentColor[0]*255) + ', ' + Math.round(currentColor[1]*255) + ', ' + Math.round(currentColor[2]*255) + ')';
            ctx.fillStyle = color;
            ctx.fillRect(315, offset + i * stepWidth, 35, stepWidth);
        }
        
        // add text legend
        ctx.font = "13px sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "end";
        ctx.textBaseline = "middle"; 
        ctx.shadowColor = "#000000";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 0;
        
        if (!(PointScope.Renderer.displayInfo[colorPointsBy].discrete)) {
        
            tickStep = (colorbarHeight-30) / 6;
            valueStep = (valueRange[1] - valueRange[0]) / 7; // write seven ticks
            for (var i = 0; i < 7; i++) {

                var val = (valueRange[1] - i * valueStep);
                
                if (val > 30000) {
                
                    ctx.fillText(val.toExponential(4), 308, offset + i * tickStep); // convert value to exponential notation
                    
                } else {
                
                    ctx.fillText(val.toFixed(1), 308, offset + i * tickStep);
                    
                }

            }
        } else {
            for (var i = 0; i < ncolors; i++) {
                console.log(PointScope.Renderer.displayInfo[colorPointsBy].legendText[valueRange[i]]);
                ctx.fillText(PointScope.Renderer.displayInfo[colorPointsBy].legendText[valueRange[i]], 308, offset + (i + 0.5) * stepWidth);
            }
        }
    }
};

PointScope.Renderer.updateAxisDisplay = function() {
    
    document.getElementById('axis_display').checked ? PointScope.Renderer.scene.add(PointScope.Renderer.axes) : PointScope.Renderer.scene.remove(PointScope.Renderer.axes);
    PointScope.Renderer.render();
    
};

PointScope.Renderer.updateBoxDisplay = function() {

    document.getElementById('bbox_display').checked ? PointScope.Renderer.scene.add(PointScope.Renderer.boxHelper) : PointScope.Renderer.scene.remove(PointScope.Renderer.boxHelper);
    PointScope.Renderer.render();
    
};

PointScope.Renderer.animate = function () {

    var dt = PointScope.Renderer.clock.getDelta();
    PointScope.Renderer.controls.update(dt);
    PointScope.Renderer.render(PointScope.Renderer.scene,PointScope.Renderer.camera);

    requestAnimationFrame(PointScope.Renderer.animate);

};

PointScope.Renderer.render = function() {

    PointScope.Renderer.renderer.render( PointScope.Renderer.scene, PointScope.Renderer.camera );

};