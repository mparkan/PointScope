


PointScope.Network.invocation = new XMLHttpRequest();

PointScope.Network.callOtherDomain = function () {
      if(PointScope.Network.invocation) {    
        PointScope.Network.invocation.open('GET', url, true);
        PointScope.Network.invocation.onreadystatechange = handler;
        PointScope.Network.invocation.send(); 
      }
}

PointScope.Network.invocation.onload = function() {
     var responseText = xhr.responseText;
     console.log(responseText);
     // process the response.
};

// Define here url used accross the whole project. For customization, overwrite them in the top html file

PointScope.Network.OsmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
PointScope.Network.ProjectionsUrl = "http://spatialreference.org/ref/epsg/21781/ogcwkt/";