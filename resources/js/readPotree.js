
// function to load Potree point cloud into a Pointscope renderer

PointScope.Readers.initPotree = function () {

    PointScope.Readers.tiledCloud = true;

    PointScope.PsInterface.PointCollection = new PointScope.PsInterface.PsPointCollection();

    // Potree variables
    var defaultPointSize = 0.03;
    var defaultLOD = 15;
    var pointcloudPath = "http://localhost/sitn3d/lib/PointScope/vendors/potree/resources/pointclouds/lion_takanawa/cloud.js";
    var pointclouds = [];
    
    
    
    PointScope.PsInterface.resetThree();
    
    // load texture
    var image = document.createElement( 'img' );
    // light and large points
    image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABmgAAAZoBeoMgkgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF+SURBVFiFzZe9TgJBFIU/JhGooTP+sIW+gZWNvAGJL8Mr0Fhjb2tiaSjAxieAShNYTTA00CvFsdgZJUjY2cDueJJpdnbvd3Znc+dMSRKeqgDXwBVwAtSAup2bAwvgHXgC7oFPr6qS0kYk6VZSLH9N7DNRWv1tk1VJN5JmGcDrmtka1awGjiX1dwCvq29rehm4kDTaI9xpZGtvNXAkaZgD3GloGRsNVCT1coQ79Szrj4FOAXCnjuOWlPSBBvAMHPo2hR31AVwCsbEX2gXCsaw2QElSGXgBTgs0APAGnBugFQCOZbYM0AwAd2oaIApoIDIku1oo1Qy/W2oI1U36PfnKkISJUJobkiQTSgsDjAMaGBtgENDAoCTpAHglTCs+M8ASeCwYjmUu/812HAN3BcGxrBj4X5EseChdjeV5mBjKI5avfol9LkdPa2+eZsD9Ex1J0x3AU1vjZ82zGHCjIamr7IfTrn12a33XB3xUJsmPTZIUtel4PiFp7Q/Al0/Rb2X6IK6n1dgiAAAAAElFTkSuQmCC";

    PointScope.Renderer.texture = new THREE.Texture( image );
    
    image.onload = function()  {
        PointScope.Renderer.texture.needsUpdate = true;
        PointScope.Renderer.render();
    };

    // renderer
    PointScope.Renderer.renderer = new THREE.WebGLRenderer({ 
        antialias: false 
    });
    
    PointScope.Renderer.renderer.setSize(document.getElementById("container").offsetWidth, window.innerHeight);
    PointScope.Renderer.container = document.getElementById('container');
    PointScope.Renderer.container.appendChild(PointScope.Renderer.renderer.domElement );

    // add camera
    PointScope.Renderer.camera = new THREE.PerspectiveCamera( 60, document.getElementById("container").offsetWidth / window.innerHeight, 1, 10000 );
    PointScope.Renderer.camera.position.z = 300;
    
    // add view controls
    PointScope.Renderer.clock = new THREE.Clock();
    PointScope.Renderer.updateViewController('Trackball');
    
    // add scene
    PointScope.Renderer.scene = new THREE.Scene();

    // render particles 
    // PointScope.Renderer.num_particles = Math.round(1 * PointScope.PsInterface.pointCollection.computedMetadata['Number of point records']);
    // console.log('N part: '  + PointScope.Renderer.num_particles);
    
    // check number of points
    // PointScope.Renderer.splitCloud = Math.ceil(PointScope.Renderer.num_particles / 16777215);

    PointScope.Renderer.attributes = {
        alpha: { type: 'f', value: 1.0 }, // set individual point transparency
        customColor: { type: 'c', value: 0xffffff } // set individual point color
    }; 

    PointScope.Renderer.uniforms = {
        color:     { type: "c", value: new THREE.Color( 0xffffff ) },
        texture:   { type: "t", value: PointScope.Renderer.texture },
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

    // // get Proj4 definition from SRID
    // switch (PointScope.PsInterface.pointCollection.variableLengthHeader.GeoKeyDirectoryTag === null){
        // case true:

            // // SRS is undefined
            // $('#SRSModal').modal('show'); // ask user to specify SRS
            // PointScope.PsInterface.pointCollection.computedMetadata.SRID = undefined; 
            // PointScope.PsInterface.pointCollection.computedMetadata.SRN = undefined; 
            // PointScope.PsInterface.pointCollection.computedMetadata.SRS = undefined;
            // PointScope.PsInterface.projFlag = false;
            // break;

        // case false:

            // // SRS is defined
            // if (!(PointScope.PsInterface.pointCollection.variableLengthHeader.GeoKeyDirectoryTag.pKeys.wKeyID['3072'] === undefined)){
                // srid = 'EPSG:' + PointScope.PsInterface.pointCollection.variableLengthHeader.GeoKeyDirectoryTag.pKeys.wKeyID['3072'].wValue_Offset;
                // PointScope.PsInterface.projFlag = true;
                // PointScope.Renderer.setSRS();
            // }

            // if (!(PointScope.PsInterface.pointCollection.variableLengthHeader.GeoKeyDirectoryTag.pKeys.wKeyID['2048'] === undefined)){
                // srid = 'EPSG:' + PointScope.PsInterface.pointCollection.variableLengthHeader.GeoKeyDirectoryTag.pKeys.wKeyID['2048'].wValue_Offset;
                // PointScope.PsInterface.projFlag = true;
                // PointScope.Renderer.setSRS();
            // }

            // break;
    // }
    
    // // translate the coordinates so that the point cloud is centered at 0,0,0
    // var k = 0;
    // var x_offset = PointScope.Renderer.geometry.boundingBox.min.x + boundingBoxSize.x/2;
    // var y_offset = PointScope.Renderer.geometry.boundingBox.min.y + boundingBoxSize.y/2;
    // var z_offset = PointScope.Renderer.geometry.boundingBox.min.z + boundingBoxSize.z/2;

    // for ( var i = 0; i < PointScope.Renderer.num_particles; i++ ) {

        // PointScope.Renderer.positions[k]     -= x_offset;
        // PointScope.Renderer.positions[k + 1] -= y_offset;
        // PointScope.Renderer.positions[k + 2] -= z_offset;
        // k += 3;

    // }
                

    window.addEventListener( 'resize', PointScope.Renderer.onWindowResize, false );

    // camera and controls
    PointScope.Renderer.camera.position.z = 25;
    PointScope.Renderer.camera.position.y = 10;
    PointScope.Renderer.camera.position.x = 15;
    PointScope.Readers.pointcloudMaterial = new THREE.PointCloudMaterial( { size: defaultPointSize, vertexColors: true } );
    
    // load pointcloud
    var pco = POCLoader.load(pointcloudPath);
    
    // add axis
    PointScope.Renderer.axes = new THREE.AxisHelper(Math.max(pco.boundingBox.size().x * 2, pco.boundingBox.size().y * 2, pco.boundingBox.size().z * 2));
    document.getElementById('axis_display').checked ? PointScope.Renderer.scene.add(PointScope.Renderer.axes) : PointScope.Renderer.scene.remove(PointScope.Renderer.axes);
    
    
    // add the bounding box
    var bounding_box_mesh = new THREE.Mesh(
        new THREE.BoxGeometry(pco.boundingBox.size().x, pco.boundingBox.size().y, pco.boundingBox.size().z),  
        new THREE.MeshBasicMaterial({ color : 0xFFFF00})
    );

    PointScope.Renderer.boxHelper = new THREE.BoxHelper( bounding_box_mesh );
    document.getElementById('bbox_display').checked ? PointScope.Renderer.scene.add(PointScope.Renderer.boxHelper) : PointScope.Renderer.scene.remove(PointScope.Renderer.boxHelper);

    // Calculate metadata for Potree clouds
    PointScope.Readers.setPotreeMedata(pco);

    var pointCloud = new Potree.PointCloudOctree(pco, PointScope.Renderer.shaderMaterial );

    
    console.log(pointCloud);
    pointCloud.LOD = defaultLOD;
    pointCloud.rotation.set(Math.PI,-1.2,0);
    pointCloud.moveToOrigin();
    pointCloud.moveToGroundPlane();
    PointScope.Renderer.scene.add(pointCloud);
    
    for(var i = -2; i <= 2; i++){
        for(var j = -2; j <= 2; j++){
            var pointcloud = new Potree.PointCloudOctree(pco, PointScope.Readers.pointcloudMaterial);
            pointcloud.LOD = defaultLOD;
            pointcloud.rotation.set(Math.PI/2, 0.85* -Math.PI/2, -0.0);
            pointcloud.moveToOrigin();
            pointcloud.moveToGroundPlane();
            pointcloud.position.x += 8*i;
            pointcloud.position.z += 8*j;
            pointclouds.push(pointcloud);
            PointScope.Renderer.scene.add(pointcloud);
        }
    }

    function render() {
   
        requestAnimationFrame(render);
        var numVisibleNodes = 0;
        var numVisiblePoints = 0;
        for(var i = 0; i < pointclouds.length; i++){
            var pointcloud = pointclouds[i];
            pointcloud.update(PointScope.Renderer.camera);
            numVisibleNodes += pointcloud.numVisibleNodes;
            numVisiblePoints += pointcloud.numVisiblePoints;
        }

        PointScope.Renderer.renderer.render(PointScope.Renderer.scene, PointScope.Renderer.camera);
        
        document.getElementById("lblNumVisibleNodes").innerHTML = "Nombre de noeuds visibles: " + numVisibleNodes;
        document.getElementById("lblNumVisiblePoints").innerHTML = "Nombre de points visibles: " + Potree.utils.addCommas(numVisiblePoints);

        // stats.update();
        PointScope.Renderer.controls.update(0.1);

    };
    
    render();
    PointScope.PsInterface.resetFlag = true;
    PointScope.Readers.setPotreeDisplayInfo();
    PointScope.PsInterface.printPotreeMetadata();
};

/**
 * method to fill PointCollection minimal metadata info required by PointScope.PsInterface.printMetadata method
 */
PointScope.Readers.setPotreeMedata = function(pco) {

    PointScope.PsInterface.PointCollection.computedMetadata['Number of point records'] = 5000000000;
    PointScope.PsInterface.PointCollection.publicHeader['Generating Software'] = "TerraScan"
    PointScope.PsInterface.PointCollection.computedMetadata.SRID = "EPSG:21781";
    PointScope.PsInterface.PointCollection.computedMetadata['Unique classes'] = [1,2,3,4,5,6];
    
    PointScope.PsInterface.PointCollection.computedMetadata['Number of point records'] = PointScope.Renderer.num_particles;
    PointScope.PsInterface.PointCollection.computedMetadata['X min'] = pco.boundingBox.min.x;
    PointScope.PsInterface.PointCollection.computedMetadata['X max'] = pco.boundingBox.max.x;
    PointScope.PsInterface.PointCollection.computedMetadata['Y min'] = pco.boundingBox.min.y;
    PointScope.PsInterface.PointCollection.computedMetadata['Y max'] = pco.boundingBox.max.y;
    PointScope.PsInterface.PointCollection.computedMetadata['Z min'] = pco.boundingBox.min.z;
    PointScope.PsInterface.PointCollection.computedMetadata['Z max'] = pco.boundingBox.max.z;
    PointScope.PsInterface.PointCollection.computedMetadata['X center'] = pco.boundingBox.max.x - pco.boundingBox.size().x / 2;
    PointScope.PsInterface.PointCollection.computedMetadata['Y center'] = pco.boundingBox.max.y - pco.boundingBox.size().y / 2;
    PointScope.PsInterface.PointCollection.computedMetadata['Z center'] = pco.boundingBox.max.z - pco.boundingBox.size().z / 2;
    PointScope.PsInterface.PointCollection.computedMetadata['X size'] = pco.boundingBox.size().x;
    PointScope.PsInterface.PointCollection.computedMetadata['Y size'] = pco.boundingBox.size().y;
    PointScope.PsInterface.PointCollection.computedMetadata['Z size'] = pco.boundingBox.size().z;
}


/**
 * Prints the metadata to dedicated tab
 */
PointScope.PsInterface.printPotreeMetadata = function() {

    document.getElementById('metadata_filename').innerHTML = "Vol LiDAR cantonal";
    document.getElementById('metadata_date_modification').innerHTML = "2010";
    document.getElementById('metadata_npoints').innerHTML = PointScope.PsInterface.PointCollection.computedMetadata['Number of point records'];
    document.getElementById('metadata_xextent').innerHTML = PointScope.PsInterface.PointCollection.computedMetadata['X min'].toFixed(2) + ', ' + PointScope.PsInterface.PointCollection.computedMetadata['X max'].toFixed(2);
    document.getElementById('metadata_yextent').innerHTML = PointScope.PsInterface.PointCollection.computedMetadata['Y min'].toFixed(2) + ', ' + PointScope.PsInterface.PointCollection.computedMetadata['Y max'].toFixed(2);
    document.getElementById('metadata_zextent').innerHTML = PointScope.PsInterface.PointCollection.computedMetadata['Z min'].toFixed(2) + ', ' + PointScope.PsInterface.PointCollection.computedMetadata['Z max'].toFixed(2);
    document.getElementById('metadata_software').innerHTML = PointScope.PsInterface.PointCollection.publicHeader['Generating Software'];
    document.getElementById('metadata_srid').innerHTML = PointScope.PsInterface.PointCollection.computedMetadata.SRID + ' (' + PointScope.PsInterface.PointCollection.computedMetadata.SRID + ')'; 
    document.getElementById('metadata_srs').innerHTML = PointScope.PsInterface.PointCollection.computedMetadata.SRID;

};

/**
 * Sets the displace info for Potree point clouds - not sure it will be used...
 */
PointScope.Readers.setPotreeDisplayInfo = function () {
    PointScope.Renderer.displayInfo = {

        'RGB' : {'colormapName' : 'none', 'discrete' : false, 'nColors' : 256 , 'valueRange' : undefined, 'legendText' : undefined},
        'Elevation' : {'colormapName' : 'jet', 'discrete' : false, 'nColors' : 256, 'valueRange' : [PointScope.PsInterface.PointCollection.computedMetadata['Z min'], PointScope.PsInterface.PointCollection.computedMetadata['Z max']], 'legendText' : undefined},
        'Intensity' : {'colormapName' : 'jet', 'discrete' : false, 'nColors' : 256, 'valueRange' : [PointScope.PsInterface.PointCollection.computedMetadata['Intensity min'], PointScope.PsInterface.PointCollection.computedMetadata['Intensity max']], 'legendText' : undefined},
        'Classification' : {'colormapName' : 'classification', 'discrete' : true, 'nColors' : PointScope.PsInterface.PointCollection.computedMetadata['Unique classes'].length, 'valueRange' : PointScope.PsInterface.PointCollection.computedMetadata['Unique classes'], 'legendText' : 
        {'0' : '0', '1' : '1', '2' : '2', '3' : '3', '4' : '4', '5' : '5', '6' : '6', '7' : '7', '8' : '8', '9' : '9', '10' : '10', '11' : '11', '12' : '12', '13' : '13', '14' : '14', '15' : '15', '16' : '16', 
        '17' : '17', '18' : '18', '19' : '19', '20' : '20', '21' : '21', '22' : '22', '23' : '23', '24' : '24', '25' : '25', '26' : '26', '27' : '27', '28' : '28', '29' : '29', '30' : '30', '31' : '31'}},
        'ReturnNumber' : {'colormapName' : 'five', 'discrete' : true, 'nColors' : 5, 'valueRange' : [0, 1, 2, 3, 4], 'legendText' : {'0' : '1', '1' : '2', '2' : '3', '3' : '4', '4' : '5'}},
        'FlightLineEdge' : {'colormapName' : 'bin', 'discrete' : true, 'nColors' : 2, 'valueRange' : [0, 1], 'legendText' : {'0' : 'inner', '1' : 'edge'}},
        'None' : {'colormapName' : 'none', 'discrete' : true, 'nColors' : 2, 'valueRange' : undefined, 'legendText' : undefined}

    };
}