//longgiro = 3;
    var fotopan2 = "";
    function panorama1(foto){
    document.getElementById('container3').innerHTML='';
	   
      PSV = new PhotoSphereViewer({
      //panorama: 'http://127.0.0.1/neiva/panoramas/' + foto + '.jpg',
      panorama: 'http://www.gesstor360.com/soledad_operativo/panoramas/' + foto + '.jpg',
      container: container3,
      default_fov: 90,
      default_lat: 0,
      default_long: 3,
      time_anim: 3000,
      foto: foto,
      //touchmove_two_fingers: true,
     // navbar: true,  
      
    navbar: [
    'autorotate',
    'zoom',
    'markers',
    'download',
    'fullscreen',
    {
      id: 'my-button',
      title: 'GESSTOR-360',
      className: 'custom-button',
      //content: 'Custom',
      onClick: function() {
      // alert('Hello from custom button');
      }
    }
    //'caption',
        
    
  ],
              
      mousemove: true,
      navbar_style: {
      backgroundColor: 'rgba(58, 67, 77, 0.7)'                        },
      //loading_img: 'http://tassedecafe.org/wp-content/uploads/2013/01/parc-saint-pierre-amiens.jpg',
      time_anim: false,
      //caption: 'Bryce Canyon National Park <b>&copy; Mark Doliner</b>',
      //mousewheel: false,
      touchmove_two_fingers: true,
  /*size: {
    height: 10
  },*/

  // list of markers     
  markers: [
    /*  {
      // image marker that opens the panel when clicked
   id: 'logo',
      x: 2500,
      y: 1000,
      image: 'http://www.ideepcucuta.com/imagenes/gesstor.png',
      width: 32,
      height: 32,
      anchor: 'bottom center',
      tooltip: 'A image marker. <b>Click me!</b>',
      content: document.getElementById('container3').innerHTML
    },/*
    {
      // html marker with custom style
      id: 'text',
      longitude: 0,
      latitude: 0,
      html: 'HTML <b>marker</b> &hearts;',
      anchor: 'bottom right',
      scale: [0.5, 1.5],
      style: {
        maxWidth: '100px',
        color: 'white',
        fontSize: '20px',
        fontFamily: 'Helvetica, sans-serif',
        textAlign: 'center'
      },
      tooltip: {
        content: 'An HTML marker',
        position: 'right'
      }
    },
    {
      // polygon marker
      id: 'polygon',
      polygon_px: [
        [3184, 794], [3268, 841], [3367, 1194],
        [3327, 1307], [3065, 1221], [3097, 847]
      ],
      svgStyle: {
        fill: 'rgba(200, 0, 0, 0.2)',
        stroke: 'rgba(200, 0, 50, 0.8)',
        strokeWidth: '2px'
      },
      tooltip: {
        content: 'Prueba con poligono',
        position: 'right bottom'
      }
    },
    {
      // polyline marker
      id: 'polyline',
      polyline_rad: [
        [5.924, 0.064], [5.859, -0.061], [5.710, -0.132], [5.410, -0.287], [4.329, -0.490], [3.838, -0.370], [3.725, -0.241]
      ],
      svgStyle: {
        stroke: 'rgba(140, 190, 10, 0.8)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '10px'
      },
      tooltip: 'Prueba con linea'
    },*/
   /* {
      // circle marker
       id: '#' + Math.random(),
       x: xmarker,
       y: ymarker,
        circle: 5,
        svgStyle: {
        fill       : 'rgba(0, 0, 0, 0.5)',
        stroke     : '#ff0000',
        strokeWidth: '2px'
},
    tooltip: 'Este aviso no aparece en la base de datos de Industria y Comercio',
    data: {
      generated: true
    }
    }*/
  ]
         
});
 
var photosphereG = PSV.loader.psv.config.foto;
console.log(photosphereG);
fotopan2 = search("soledad:buscar_foto_operativo", photosphereG);
console.log(fotopan2);
var resx = fotopan2[0][1];
var resx = resx - 12;
var resy = fotopan2[0][2];
var resy = resy - 15;
res = [resx, resy]; 
 
 

        
/**
 * Create a new marker when the user clicks somewhere
 */
PSV.on('click', function(e) {
  PSV.addMarker({
    id: '#' + Math.random(),
    longitude: e.longitude,
    latitude: e.latitude,
    /*image: 'http://localhost/DemoNeiva/imagenes/letrero.png',
    width: 62,
    height: 62,
    anchor: 'bottom center',
    mousewheel: true,*/
    circle: 5,
    svgStyle: {
    fill       : 'rgba(0, 0, 0, 0.5)',
    stroke     : '#ff0000',
    strokeWidth: '2px'
},
    tooltip: '',
    data: {
      generated: true
    }
  });
    mapviewer(foto, e);
});

PSV.on('position-updated', function(e) {
	
	var giro = e.longitude;
	
	giropsv(giro);
	
	
});


/*PSV.on('before-render', function(e) {
	console.log("listo");
	
});*/
/**
 * Delete a generated marker when the user clicks on it
 */
PSV.on('select-marker', function(marker) {
  if (marker.data && marker.data.generated) {
      var respmarkdata = search("soledad:respmarkdata", marker.x, marker.y);
 
      var table = document.getElementById("tblatt");
                        table.innerHTML = "";
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        cell1.colSpan = 2;
                        cell1.innerHTML = "<b>INFORMACION DEL OBJETO</b>";
                        var select = [];
                        var sel = [];
                        var medicion = respmarkdata[0][3];
                        var observaciones = respmarkdata[0][2];
                        var tipo = respmarkdata[0][1];
                        if (medicion == 0){
                            medicion = "Sin Información";
                        }
                        else{
                           medicion = medicion + " m2" 
                        }
                        if (!observaciones){
                            observaciones = "Sin Información";
                            }
                        if (tipo == "avisosyletreros"){
                            tipo = "Avisos y Tableros";
                        }
                        if (tipo == "senalizacion"){
                            tipo = "Señalización";
                        }
                        //var imag = [];
                        //var stv = [];
                        //var ig = [];
                        select[0] = "<b>Fotografía</b>";
                        select[1] = "<b>Tipo de Elemento</b>";
                        select[2] = "<b>Observaciones</b>";
                        select[3] = "<b>Medición</b>";
                        sel[0] = respmarkdata[0][0];
                        sel[1] = tipo;
                        sel[2] = observaciones;
                        sel[3] = medicion;
                        var campos = 3;
                        for (i = 0; i < select.length; i++) {
                            row = table.insertRow(i + 1);
                            cell1 = row.insertCell(0);
                            cell2 = row.insertCell(1);
                            cell1.innerHTML = select[i];
                            cell2.innerHTML = sel[i];
                            //sel[i].appendChild(imag[i]);
                            //cell2.appendChild(stv[i]);
                            //stv[i].appendChild(ig[i]);                
                        } 
                    document.getElementById("botonminimizar").style.display = "block";
					document.getElementById("panel_atr").style.display = "block";
                        
   }
 });
  
        
PSV.on('ready', function(e) {
	var photosphereG = PSV.loader.psv.config.foto;
   fotopan2 = search("soledad:buscar_foto", photosphereG);
  try{     
 var nummark = search("soledad:totalmarcas", foto);
   }        
        catch (err) {
    }

for (i = 0; i < nummark.length; i++) {
PSV.addMarker({
    id: '#' + Math.random(),
    x: nummark[i][0],
    y: nummark[i][1],
    circle: 5,
    svgStyle: {
    fill       : 'rgba(0, 0, 0, 0.5)',
    stroke     : '#ff0000',
    strokeWidth: '2px'
},
    tooltip: 'Haga clic para ver los atributos',
    data: {
      generated: true
    }
  });

   // console.log(nummark[i][1]);
}
});        
      
}