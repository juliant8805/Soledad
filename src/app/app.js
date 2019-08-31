// ========= config section ================================================
//var url = 'http://35.184.176.7:8081/geoserver/ows?';
var url = 'http://35.226.110.153:8081/geoserver/ows?';
var featurePrefix = 'soledad';
var featureType = ['predios_street_view_captura', 'gesstorstreetviews', 'wfs_point'];
var featureNS = 'http://soledad';
var srsName = 'EPSG:4326';
var geometryName = 'geom';
var geometryType = 'MultiPolygon';
var fields = ['*'];
var infoFormat = 'application/vnd.ogc.gml/3.1.1';
var center = [-8323241.990028, 1223139.041573];
var zoom = 13;
// =========================================================================
var proj = new ol.proj.Projection({
    code: 'http://www.opengis.net/gml/srs/epsg.xml#4326',
    axis: 'enu'
});
var format = [];
var wmsSource = [];
var codigo_ant = "";
var panoramica="";
function putgif() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 0);
        document.getElementById('carga2').style.display = "block";
    });
}
function quitgif() {
    document.getElementById('carga2').style.display = "none";
}
var rangoarea = async function (x) { // async function expression assigned to a variable
    await putgif();
    await rango(x);
    await quitgif();
};




for (var i = 0; i <= featureType.length - 1; i++)
{
    format[i] = new ol.format.GML({featureNS: featureNS, featureType: featureType[i]});
    wmsSource[i] = new ol.source.TileWMS({
        url: url,
        params: {
            'LAYERS': featurePrefix + ':' + featureType[i],
            'TILED': true
        },
        serverType: 'geoserver'
    });
};
var popup = new app.Popup({
    element: document.getElementById('popup'),
    closeBox: true,
    autoPan: true
});
var highlight = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});
var highlightt = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});
var highlighttt = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});
var PuntoStyle = new ol.style.Style({
        image: new ol.style.Circle({
          radius: 10,
          stroke: new ol.style.Stroke({
            color: 'white',
            width: 2
          }),
          fill: new ol.style.Fill({
            color: '#FF0000'
          })
    })
});


var flagStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/flag.png'
    })
});

var psvgiroStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/psvgiro.png'
    })
});

var psvgiroStyle2 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/psvgiro2.png'
    })
});

var psvgiroStyle3 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/psvgiro3.png'
    })
});

var psvgiroStyle4 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/psvgiro4.png'
    })
});

var psvgiroStyle5 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/psvgiro5.png'
    })
});

var psvgiroStyle6 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/psvgiro6.png'
    })
});

var psvgiroStyle7 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/psvgiro7.png'
    })
});

var psvgiroStyle8 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/psvgiro8.png'
    })
});

var psvgiroStyle9 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/psvgiro9.png'
    })
});

var markStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        //opacity: 0.75,
        scale: 0.25,
        src: './imagenes/marca.png'
    })
});

var markStylePoste = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        //opacity: 0.75,
        scale: 0.25,
        src: './imagenes/marca_poste.png'
    })
});

var markStyleArbol = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        //opacity: 0.75,
        scale: 0.25,
        src: './imagenes/marca_arbol.png'
    })
});

var markStyleAntena = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        //opacity: 0.75,
        scale: 0.25,
        src: './imagenes/marca_antena.png'
    })
});

var markStyleAvisos = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        //opacity: 0.75,
        scale: 0.25,
        src: './imagenes/marca_avisos.png'
    })
});

var markStyleSenalizacion = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        //opacity: 0.75,
        scale: 0.25,
        src: './imagenes/marca_senalizacion.png'
    })
});



var measuring = false;
measureControl = function (opt_options) {
    var options = opt_options || {};
    var button = document.createElement('button');
    button.innerHTML = '<img src="../cucuta/imagenes/measure-control.png" />';
    var this_ = this;
    var handleMeasure = function (e) {
        if (!measuring) {
            this_.getMap().addInteraction(draw);
            measuring = true;
        } else {
            this_.getMap().removeInteraction(draw);
            measuring = false;
        }
    };
    button.addEventListener('click', handleMeasure, false);
    button.addEventListener('touchstart', handleMeasure, false);
    var element = document.createElement('div');
    element.className = 'measure-control ol-unselectable ol-control';
    element.appendChild(button);
    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });
};
ol.inherits(measureControl, ol.control.Control);
var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
});
map = new ol.Map({
    controls: ol.control.defaults().extend([new ol.control.ScaleLine(), new ol.control.ZoomToExtent({
            extent: [-8325183.102637, 1222020.558635, -8321300.877419, 1224257.524511]
        }), new measureControl(),
        new ol.control.OverviewMap({
            className: 'ol-overviewmap ol-custom-overviewmap',
            layers: [new ol.layer.Tile({
                    source: new ol.source.OSM({
                        'url': 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
                    })
                })],
            collapseLabel: '\u00BB',
            label: '\u00AB',
            collapsed: true
        })
    ]).extend([mousePositionControl]),
    // add the popup as a map overlay
    overlays: [popup],
    // render the map in the 'map' div
    target: document.getElementById('map'),
    // use the Canvas renderer
    renderer: 'canvas',
    layers: [layerBase, layerCatastro, layerOrtofoto, recorrido, highlight, highlightt],
    view: new ol.View({
        center: center,
        zoom: zoom,
        //extent: [-8325183.102637, 1222020.558635, -8321300.877419, 1224257.524511],
        maxZoom: 21, minZoom: 1
    })
});

map.getLayerGroup().set('name', 'CAPAS');
// register a single click listener on the map and show a popup
// based on WMS GetFeatureInfo
var panoramica="";

map.on('singleclick', function (evt) {
    //console.log(panoramica);
    document.getElementById("panel_atr").style.display = "none";
   // document.getElementById("tablaatributos").style.display = "none";
    
    var viewResolution = map.getView().getResolution();
    var url = wmsSource[0].getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, map.getView().getProjection(),
            {'INFO_FORMAT': infoFormat}
    );
    var url2 = wmsSource[1].getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, map.getView().getProjection(),
            {'INFO_FORMAT': infoFormat}
    );
    var url3 = wmsSource[2].getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, map.getView().getProjection(),
            {'INFO_FORMAT': infoFormat}
    );
    var tamañopantalla = screen.width>800;  
    if (url2 && document.getElementById("medidas").style.display == "none") {
        $.ajax({
            url: url,
            beforeSend: function () {
            if (tamañopantalla==true){
                putgif();}
                else{
                    document.getElementById("carga3").style.display = "block";  
                }
            },
            success: function (data) {	
                //console.log(data);
                var features = format[0].readFeatures(data);
                try{
                var temp1 = features["0"].actualEventTarget_.actualEventTarget_.geometryName_;
                    }
                catch (err) {
                    var temp ="nogeom";
                }
                document.getElementById("equipamiento").style.display = "none";

                $("#tipo_elemento").change(function() {
                    console.log($(this).val())
                    if($(this).val() === "equipamientos") {
                        document.getElementById("equipamiento").style.display = "block";           
                    }
                    else{
                        document.getElementById("equipamiento").style.display = "none";          
                    }
                });

                if (temp1 == "geom") {
                    var feature = features[0];
                    var values = feature.getProperties();
                    codigo_ant = values.codigo_ant;
                    panoramica = values.nombre;
                    var ph = values.cod_ph;
                    //var registro = search("soledad:buscar_registros_soledad", codigo_ant);
                    var datosipu = search("soledad:datosipu", codigo_ant);
                    var zhg = search("soledad:zhg", codigo_ant);
                    var captura = search("soledad:captura", codigo_ant);

                    try {
                    var direccion = datosipu[0][0];
                    }
                    catch (error) {
                    var direccion = "Sin Información";
                    }
                    try {
                    var codigocat = datosipu[0][1];
                    }
                    catch (error) {
                    var codigocat = "Sin Información";
                    }
                    try {
                    var codigocatant = datosipu[0][2];
                    }
                    catch (error) {
                    var codigocatant = "Sin Información";
                    }
                    try {
                    var matric = datosipu[0][3];
                    }
                    catch (error) {
                    var matric = "Sin Información";
                    }
                    try {
                    var propiet = datosipu[0][4];
                    }
                    catch (error) {
                    var propiet = "Sin Información";
                    }          
                    try {
                    var documento = datosipu[0][5];
                    }
                    catch (error) {
                    var documento = "Sin Información";
                    }
                    try {
                    var avaluo = "$ "+datosipu[0][7];
                    }
                    catch (error) {
                    var avaluo = "Sin Información";
                    }
                    
                    try {
                    var areat = datosipu[0][8] + 'M2';
                    }
                    catch (error) {
                    var areat = "Sin Información";
                    }
                    try {
                    var areac = datosipu[0][9]+ 'M2';
                    }
                    catch (error) {
                    var areac = "Sin Información";
                    }
                    try {
                    var valorm2 = "$ "+zhg[0][0];
                    }
                    catch (error) {
                    var valorm2 = "Sin Información";
                    }

                    try {
                        var npisos = captura[0][0];
                        if(npisos=="" || npisos == null || npisos== undefined){
                            npisos = "Sin Información";
                        };
                    }
                    catch (error) {
                    var npisos = "Sin Información";
                    }
                    try {
                        var actEcon = captura[0][2];
                        if(actEcon == null || actEcon== undefined){
                            actEcon = "";
                        };
                    }
                    catch (error) {
                    var actEcon = "Sin Información";
                    }
                    try {
                    var destino = captura[0][1];
                    if(destino=="" || destino == null || destino== undefined){
                        destino = "Sin Información";
                    };
                    }
                    catch (error) {
                    var destino = "Sin Información";
                    }
                    try {
                        var mutacion = captura[0][3];
                        if(mutacion=="" || mutacion == null || mutacion== undefined){
                            mutacion = "Sin Información";
                        }
                        else if(mutacion=='cambioAreaConst'){
                            mutacion='cambio de área construida'
                        }
                        else if(mutacion=='sinnovedad'){
                            mutacion='Sin novedad'
                        }
                    }
                    catch (error) {
                    var mutacion = "Sin Información";
                    }
                    try {
                        var observacio = captura[0][4];
                        if(observacio=="Sin" || observacio=="" || observacio == null || observacio== undefined){
                            observacio = "Sin Información";
                        }
                    }
                    catch (error) {
                    var observacio = "Sin Información";
                    }
                    try {
                        var mixto = captura[0][5];
                        if(mixto == null || mixto== undefined){
                            mixto = "";
                        };
                    }
                    catch (error) {
                    var mixto = "";
                    }
                    try {
                        var areaMutada = captura[0][6];
                        if(areaMutada == "" || areaMutada == null || areaMutada== undefined){
                            areaMutada = "";
                        }
                        else {
                            areaMutada = areaMutada + 'm2';
                        }
                    }
                    catch (error) {
                    var areaMutada = "";
                    }
                    try {
                    var sobretasa = captura[0][7];
                    if(sobretasa == "" || sobretasa == null || sobretasa== undefined){
                        sobretasa = "Sin Información";
                    }
                    }
                    catch (error) {
                    var sobretasa = "Sin Información";
                    }
                        
                    
                    if (ph >= 800) {
                   
                        var table = document.getElementById("tblatt");
                        document.getElementById("tblatt").style.visibility = "visible";
                        document.getElementById("tblatt").style.display = "initial";
                        document.getElementById("tblatt").style.height = "auto";
                        document.getElementById("panel_atr").style.visibility = "visible";
                        document.getElementById("panel_atr").style.display = "initial";
                        document.getElementById("panel_atr").style.height = "auto";

                        table.innerHTML = "";
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        cell1.colSpan = 2;
                        cell1.innerHTML = "<H5><b>PROPIEDAD HORIZONTAL</b></H5>";
                        var select = [];
                        var sel = [];
                        var imag = [];
                        var stv = [];
                        var ig = [];
                        for (i = 0; i < datosipu.length; i++) {
                            var tablaph = ("<table max-width=20 border=1 id='tablaph'>");
                            for (i = 0; i < datosipu.length; i++) {
                                //var req = {term: direccion[i], val:123};
                                dirg = direccion[i];
                                tablaph += ("<tr>");
                                try {
                                tablaph += ("<td id=tt" + i + "><b>" + datosipu[i][0] + "</b></td>");
                                }
                                catch (error) {
                                tablaph += ("<td id=tt" + i + "><b>Sin Información</b></td>");
                                }
                                tablaph += ("</tr>");
                            }
                            tablaph += ("</table>");
                        }
                        select[0] = "<b>Número de PH</b>";
                        select[1] = "<b>Direcciones</b>";
                        select[2] = "<b>Street View</b>";
                      /* sel[0] = datosipu.length;
                        sel[1] = tablaph;*/
                        sel[0] = datosipu.length;
                        sel[1] = tablaph;
                        stv[2] = document.createElement("a");
                        stv[2].id = "imgstreet";
                        stv[2].target = "marco";
                        stv[2].href = "street_view.html?coordenadas=" + values.geom.flatCoordinates;
                        stv[2].setAttribute("onclick", "open_streetview()");
                        ig[2] = document.createElement("img");
                        ig[2].src = "./imagenes/streetview.png";
                        for (i = 0; i < select.length; i++) {
                            row = table.insertRow(i + 1);
                            cell1 = row.insertCell(0);
                            cell2 = row.insertCell(1);
                            cell1.innerHTML = select[i];
                            if (i === 2) {
                                cell2.appendChild(stv[i]);
                                stv[i].appendChild(ig[i]);
                            } else {
                                cell2.innerHTML = sel[i];
                            }
                        }
                    //  console.log(direccion);
                        for (i = 0; i < datosipu.length; i++) {
                            var ell = document.getElementById("tt" + i);

                            var alg = "addressSource('tt" + i + "')";
                            ell.setAttribute("onclick", alg);
                            ell.value = datosipu[i][0];
                           // console.log(ell.value);
                            //ell.onclick = function(){addressSource(direccion[i]);};
                        }

                    } else {
                      	//TABLA CLICK EN PREDIOS
                        var table = document.getElementById("tblatt");
                        table.innerHTML = "";
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        cell1.colSpan = 2;
                        cell1.innerHTML = "<b>INFORMACION CATASTRAL</b>";
                        var select = [];
                        var sel = [];
                      
                    
                    	var row = tblatt.insertRow(1);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: #cccccc; border:0; margin:0;";
                        cell11.innerHTML = "<h8 style='padding:0px; margin:0px; font-weight:bold;'>1. NÚMERO DE PISOS EN LA FOTOGRAFÍA:</h8>";

                    
                        var row = tblatt.insertRow(2);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: white; border:0; margin:0;";
                        cell11.innerHTML = "<input type='number' min='0' class='form-control' id='numeropisos' name='numeropisos' placeholder='Ingrese el Número de Pisos que ve en la fotografía'>";

  						var row = tblatt.insertRow(3);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: #cccccc; border:0; margin:0;";
                        cell11.innerHTML = "<h8 style='padding:0px; margin:0px; font-weight:bold;'>2. DESTINO ECONÓMICO:</h8>";

  								 								
  						var row = tblatt.insertRow(4);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: white; border:0; margin:0;";
                        cell11.innerHTML = "<select class='form-control' id='destinofoto' name='destinofoto' style='text-align:left'><option value ='residencial' >Residencial</option><option value ='comercial'>Comercial</option><option value ='industrial'>Industrial</option><option value ='servicios'>Servicios</option><option value ='financiero'>Financiero</option><option value ='otro'>Otro</option><option value ='mixto'>Mixto</option></select>";
                        
                        
                        var row = tblatt.insertRow(5);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: white; border:0; margin:0;";
                        cell11.innerHTML = "<select class='form-control' id='actEcdropdown' name='actEcdropdown' style='text-align:left'></select>";
                        
                        var row = tblatt.insertRow(6);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: white; border:0; margin:0;";
                        cell11.innerHTML = "<input type='checkbox' class='custom-control-input' id='mixto1' name='mixto' style='display:inline-flex' value='Habitacional'><label class='custom-control-label' id='mixtol1'>Habitacional</label><input type='checkbox' class='custom-control-input' id='mixto2' name='mixto' style='display:inline-flex' value='Comercial'><label id='mixtol2' class='custom-control-label'>Comercial</label><input type='checkbox' class='custom-control-input' id='mixto3' name='mixto' style='display:inline-flex' value='Industrial'><label class='custom-control-label' id='mixtol3'>Industrial</label><input type='checkbox' class='custom-control-input' id='mixto4' name='mixto' style='display:inline-flex' value='Dotacional'><label class='custom-control-label' id='mixtol4'>Dotacional</label>";
                        
                        var row = tblatt.insertRow(7);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: white; border:0; margin:0;";
                        cell11.innerHTML = "<input type='checkbox' class='custom-control-input' id='otro' name='otro' style='display:inline-flex' value='si' checked><label class='custom-control-label' id='otrol'>Sobretasa</label>";

                        document.getElementById("actEcdropdown").style.display = "none";

                        function resetOtro(value){
                            document.getElementById("otro").style.display = value;
                            document.getElementById("otrol").style.display = value;
                        };

                        function resetMixto(value){
                            document.getElementById("mixto1").style.display = value;
                            document.getElementById("mixto2").style.display = value;
                            document.getElementById("mixto3").style.display = value;
                            document.getElementById("mixto4").style.display = value;
                            document.getElementById("mixtol1").style.display = value;
                            document.getElementById("mixtol2").style.display = value;
                            document.getElementById("mixtol3").style.display = value;
                            document.getElementById("mixtol4").style.display = value;
                        };
                        resetMixto("none");
                        resetOtro("none");

                        var jsonActEc = '{"activ_econo":[' +
                        '{"destEc":"comercial","id":"B1","nombre":"Alimentos de consumo humano, insumos agropecuarios, entre otros, exceptuando bebidas alcohólicas.","value":"Venta de alimentos de consumo humano (excepto bebidas alcohólicas), productos, insumos agropecuarios incluida la maquinaria agrícola, venta de textos escolares y libros (incluye cuadernos escolares); venta de medicamentos e implementos hospitalarios, tienda de víveres y abarrotes, graneros, carnicerías y salsamentarías, panaderías, fruterías, distribuidoras de productos lácteos, distribuidoras de carnes, pollos, pescados y mariscos, comercializadoras de cemento, venta de productos y materiales para la construcción." },' +
                        '{"destEc":"comercial","id":"B2","nombre":"Comercio de ocio, estético, cigarrerías y equipos suntuarios.","value": "Venta cigarrillos, licores y ranchos, venta de joyas, cosméticos, cristalería y demás equipos suntuarios, cristalería y demás artículos de lujo, tiendas y negocios que además de su actividad normal incluyan juegos y maquinitas." },' +
                        '{"destEc":"comercial","id":"B3","nombre":"Estaciones de servicio.","value":"Venta combustibles y derivados del petróleo, gas combustible, comercialización de vehículos nuevos y usados, venta de impresos, libros y revistas distintas a escolares."},'+
                        '{"destEc":"comercial","id":"B4","nombre":"Almacenes de Cadena u otros.","value":"Establecimientos que además de alimentos vendan otros productos como miscelánea, ropa, zapatos, juguetes, ferretería, electrodomésticos, artículos para el hogar." },' +
                        '{"destEc":"comercial","id":"B5","nombre":"Otras actividades comerciales.","value": "Demás actividades comerciales no clasificadas anteriormente" },' +
                        '{"destEc":"comercial","id":"E1","nombre":"Actividades industriales, comerciales y de servicios  contribuyente del régimen simplificado.","value":"Actividades industriales, comerciales y de servicios realizadas por contribuyentes del régimen simplificado." },'+
                        '{"destEc":"industrial","id":"A1","nombre":"Producción o transformación de alimentos de consumo humano, helados, producción papelería o textos.","value":"Producción o transformación de alimentos de consumo humano, excepto bebidas, producción de helados, cebadas, hielo, agua envasada o empacada, producción de papelería y textos."},'+
                        '{"destEc":"industrial","id":"A2","nombre":"Producción Agrícola, calzado, entre otros.","value":"Producción de alimentos de consumo animal, productos y materiales básicos para la agricultura y la ganadería, sustancias químicas, drogas y medicamentos, sacrificio y matanza de ganados, materiales para la construcción, producción de papel industrial y bolsas, calzado y prendas de vestir; producción de implementos médicos y hospitalarios, abonos y fertilizantes."},'+
                        '{"destEc":"industrial","id":"A3","nombre":"Actividades industriales no clasificadas anteriormente.","value":"Demás actividades industriales no clasificadas anteriormente."},'+
                        '{"destEc":"servicios","id":"C1","nombre":"Retroventas, moteles, amoblados entre otros.","value":"Expendio y distribución de bebidas alcohólicas, cafés, moteles, amoblados, residencias, casas de empeño o prenderías con pacto de retroventa."},'+
                        '{"destEc":"servicios","id":"C2","nombre":"Servicio de hoteles, aparta hoteles y resta.","value":"Servicio de hoteles, aparta hoteles y restaurantes."},'+
                        '{"destEc":"servicios","id":"C3","nombre":"Servicio de transporte, limpieza, inmobiliaria, vigilancia privada, entre otros.","value":"Servicio de transporte, individual y colectivo, servicios sociales y personales de : aseo, y limpieza, hospitales, odontología, agentes y corredores de seguros, fumigaciones, constructores y urbanizadores, publicidad e intermediación inmobiliaria, vigilancia privada, empleos temporales, heladerías, cafeterías, salones de té, estaderos que no venta de bebidas alcohólicas, telefonía y comunicaciones celulares, transmisión y procesamiento de datos, juegos de video, parqueaderos."},'+
                        '{"destEc":"servicios","id":"C4","nombre":"Servicios médicos, laboratorios y clínicas privadas.","value":"Servicios médicos, de laboratorio y clínicas privadas, educación de carácter privado, educación tecnológica privada y universitaria, servicio de recreación."},'+
                        '{"destEc":"servicios","id":"C5","nombre":"Actividades industriales no clasificadas anteriormente.","value":"Demás actividades industriales no clasificadas anteriormente."},'+
                        '{"destEc":"financiero","id":"D1","nombre":"Actividades de ahorro y crédito.","value":"Actividades de ahorro y crédito."},'+
                        '{"destEc":"financiero","id":"D2","nombre":"Demás actividades financieras.","value":"Demás actividades financieras."}]}';
                         
                        //on select destino económico
                          
                        $("#destinofoto").change(function() {
                            let dropdown = $('#actEcdropdown');
                            dropdown.empty();
    
                            dropdown.append('<option selected="true" disabled>Escoge una actividad Económica</option>');
                            dropdown.prop('selectedIndex', 0);
    
                            let defaultOption = document.createElement('option');
                            defaultOption.text = 'Seleccione';
    
                            dropdown.add(defaultOption);
                            dropdown.selectedIndex = 0;
    
                            obAct= JSON.parse(jsonActEc);

                            // function nombreActEc(actEcon){
                            //     let nombreAct;
                            //     if(actEcon==obAct.activ_econo[i].id){
                            //         nombreAct= obAct.activ_econo[i].nombre;
                            //     }
                            //     return nombreAct;
                            // };

                            function actEconomica(destinoEconomico){
                                let option;
    
                                for (i = 0; i < obAct.activ_econo.length; i++) {
                                    if(obAct.activ_econo[i].destEc==destinoEconomico){
                                        console.log('objeto comercial',i,obAct.activ_econo[i],destinoEconomico);
                                        dropdown.append($('<option></option>').attr('value', obAct.activ_econo[i].id).text(obAct.activ_econo[i].id+'. '+obAct.activ_econo[i].nombre));
                                        option = document.createElement('option');
                                        option.text = obAct.activ_econo[i].id;
                                        option.value = obAct.activ_econo[i].nombre;
                                        dropdown.add(option);
                                    }
                                    else{
                                        console.log('no entra a esta categoria');
                                    }
                                };
                                return null;
                            };

                            if($(this).val() === "comercial" || $(this).val() === "industrial" || $(this).val() === "servicios" || $(this).val() === "financiero") {
                                $('input:checkbox').removeAttr('checked');
                                document.getElementById("actEcdropdown").style.display = "block";
                                resetOtro("none");
                                resetMixto("none");
                                actEconomica($(this).val());                               
                            }
                            if($(this).val() === "mixto" ) {
                                $('input:checkbox').removeAttr('checked');
                                dropdown.empty();
                                document.getElementById("actEcdropdown").style.display = "none";
                                resetOtro("none");
                                resetMixto("inline-block");                                
                            }
                            if($(this).val() === "residencial" ) {
                                $('input:checkbox').removeAttr('checked');
                                dropdown.empty();
                                document.getElementById("actEcdropdown").style.display = "none";
                                resetOtro("none");
                                resetMixto("none");                              
                            }
                            else if($(this).val() === "otro" ) {
                                $('input:checkbox').removeAttr('checked');
                                document.getElementById("actEcdropdown").style.display = "none";
                                dropdown.empty();
                                resetMixto("none");
                                resetOtro("inline-flex");
                            }
                          });

                        
                        var row = tblatt.insertRow(8);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: #cccccc; border:0; margin:0;";
                        cell11.innerHTML = "<h8 style='padding:0px; margin:0px; font-weight:bold;'>4. MUTACIÓN CATASTRAL:</h8>";


                        var row = tblatt.insertRow(9);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: white; border:0; margin:0;";
                        cell11.innerHTML = "<select style='background-color: #white; color:black; font-size: 12px; border-top:0px; border-left:0px; border-right:0px; border-bottom:1px solid #62BAD3; text-align:center; width:100%; height:3em;' class='form-control' id='mutacion' name='mutacion'><option value ='sinnovedad'>Sin Novedad</option><option value ='Englobe'>Englobe</option><option value ='Desenglobe'>Desenglobe</option><option value ='cambioAreaConst'>Cambio de área construida</option></select>";
 
                        var row = tblatt.insertRow(10);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: white; border:0; margin:0;";
                        cell11.innerHTML = "<input type='number' step='any' min='0' class='form-control' id='areaMuta' name='areaMuta' placeholder='Ingrese el área construida'>";
                        
                        document.getElementById("areaMuta").style.display = "none";

                        $("#mutacion").change(function() {
                            if($(this).val() === "cambioAreaConst") {
                                document.getElementById("areaMuta").style.display = "block";            
                            }
                            else{
                                document.getElementById("areaMuta").style.display = "none";           
                            }
                        });

                        var row = tblatt.insertRow(11);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: #cccccc; border:0; margin:0;";
                        cell11.innerHTML = "<h8 style='padding:0px; margin:0px; font-weight:bold;'>5. OBSERVACIONES:</h8>";

 
                        var row = tblatt.insertRow(12);
                        var cell11 = row.insertCell(0);
                        cell11.colSpan = 2;
                        cell11.style = "background-color: white; border:0; margin:0;";
                        cell11.innerHTML = "<textarea class='form-control' id='observacionespredio' name='observacionespredio' style='background-color: #white; color:black; font-size: 12px; border-top:0px; border-left:0px; border-right:0px; border-bottom:1px solid #62BAD3; text-align:center; width:100%; height:3em;' placeholder='Diligencie cualquier tipo de información adicional'></textarea>";
                       
                    
                        var row = tblatt.insertRow(13);
                        var cell12 = row.insertCell(0);
                        cell12.colSpan = 2;
                        cell12.style = "background-color: white; border:0; margin:0;";
                        cell12.innerHTML = "<button id='editarinfo' name='editarinfo' onclick='agregarinfoprediocaptura();' class='btn btn-primary btn-lg'>Guardar</button>";                        
                        
                        //info catastral
                        select[0] = "<b>Dirección</b>";
                        select[1] = "<b>Codigo Catastral</b>";
                        select[2] = "<b>Matricula Inmobiliaria</b>";
                        select[3] = "<b>Avalúo</b>";
                        select[4] = "<b>Propietario</b>";
                        select[5] = "<b>Documento</b>";
                       // select[2] = "<b>Destino Ecónomico</b>";
                        select[6] = "<b>Área de Terreno</b>";
                        select[7] = "<b>Área Construida</b>";
                        select[8] = "<b>Valor M2</b>";

                        //info captura
                        select[9] = "<b>Número de Pisos</b>";
                        select[10] = "<b>Destino Económico Fotografia</b>";
                        select[11] = "<b>Sobretasa</b>";
                        select[12] = "<b>Mutación Catastral</b>";
                        select[13] = "<b>Observaciones</b>";
                        
                        sel[0] = direccion;
                        sel[1] = codigo_ant;
                        sel[2] = matric;
                        sel[3] = avaluo;
                        sel[4] = propiet;
                        sel[5] = documento;
                        //sel[2] = destino;
                        sel[6] = areat;
                        sel[7] = areac;
                        sel[8] = valorm2;
                        sel[9] = npisos;
                        sel[10] = destino +' '+mixto + actEcon;
                        sel[11] = sobretasa;
                        sel[12] = mutacion + areaMutada;
                        sel[13] = observacio;
                    
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
                        }
                    document.getElementById("botonminimizar").style.display = "block";
					   document.getElementById("panel_atr").style.display = "block";
                    var c = feature.values_.geom.flatCoordinates.length - 1;
                    for (var i = 0; i <= c; i = i + 3) {
                        var a = feature.values_.geom.flatCoordinates[i];
                        feature.values_.geom.flatCoordinates[i] = feature.values_.geom.flatCoordinates[i + 1];
                        feature.values_.geom.flatCoordinates[i + 1] = a;
                    }
                    feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
                    highlightfeaturespredios.setStyle(PredioStyle);
                    var markerSourcenoph = highlightfeaturespredios.getSource();
                    markerSourcenoph.clear();
                    markerSourcenoph.addFeature(feature);
                    
                }
            },
         complete: function(){
                if (tamañopantalla==true){
                quitgif(); }
                else{
                document.getElementById("carga3").style.display = "none";  
                   }
            }   
        });
    }
    
    if (url2 && document.getElementById("medidas").style.display == "none") {
    $.ajax({
            url: url2,
            beforeSend: function () {
            if (tamañopantalla==true){
                putgif();}
                else{
                    document.getElementById("carga3").style.display = "block";  
                }
            },
            success: function (data) {
                var features = format[1].readFeatures(data);
                try{
                var temp = features["0"].actualEventTarget_.actualEventTarget_.geometryName_;
                    }
                catch (err) {
                    var temp ="nogeom";
                }
                if (temp == "geom") {
                    document.getElementById('container3').innerHTML='';
                    document.getElementById('marco').style.display = 'block';
                    document.getElementById('container3').style.display = 'block';
                    var feature = features[0]
                    var features = format[1].readFeatures(data);
                    var values = feature.getProperties();
                    var marca = values.streetview;
                 //   console.log(marca);
                    marca1 = marca;
                    panorama1(marca);
					     panoramica = values.nombre;
                    var urlsv = "street_view.html?coordenadas=" + values.geom.flatCoordinates;
                    
                    //OPEN 3D GOOGLE MAPS
                    window.open(urlsv, target="marco"); 
                    //window.open(urlsv, "googlemaps","width=120,height=300,scrollbars=NO"); 
                    

                   var c = feature.values_.geom.flatCoordinates.length - 1;;
                    for (var i = 0; i <= c; i = i + 3) {
                        var a = feature.values_.geom.flatCoordinates[i];
                        feature.values_.geom.flatCoordinates[i] = feature.values_.geom.flatCoordinates[i + 1];
                        feature.values_.geom.flatCoordinates[i + 1] = a;
                    }
                    feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
                    highlightfeatures.setStyle(PuntoStyle);
                    var markerSourcenoph = highlightfeatures.getSource();
                    markerSourcenoph.clear();
                    markerSourcenoph.addFeature(feature);
                    
                }
            },
         complete: function(){
                if (tamañopantalla==true){
                quitgif(); }
                else{
                document.getElementById("carga3").style.display = "none";  
                   }
            }   
       
        });
    }
    
    if (url3 && document.getElementById("medidas").style.display == "none") {
        $.ajax({
            url: url3,
            beforeSend: function () {
            if (tamañopantalla==true){
                putgif();}
                else{
                    document.getElementById("carga3").style.display = "block";  
                }
            },
            success: function (data) {	
                //console.log(data);
                var features = format[2].readFeatures(data);
                try{
                var temp1 = features["0"].actualEventTarget_.actualEventTarget_.geometryName_;
                    }
                catch (err) {
                    var temp ="nogeom";
                }
                if (temp1 == "geom") {
                        var feature = features[0];
                        var values = feature.getProperties();
                        var table = document.getElementById("tblatt");
                        table.innerHTML = "";
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        cell1.colSpan = 2;
                        cell1.innerHTML = "<b>INFORMACION DEL OBJETO CAPTURADO</b>";
                        var select = [];
                        var sel = [];
                        var medicion = values.medicion;
                        var observaciones = values.observacio;
                        var tipo = values.tipo;
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
                        select[0] = "<b>Fotografía</b>";
                        select[1] = "<b>Tipo de Elemento</b>";
                        select[2] = "<b>Observaciones</b>";
                        select[3] = "<b>Altura</b>";
                        sel[0] = values.streetview;
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
                    
                    
                    
                    var c = feature.values_.geom.flatCoordinates.length - 1;;
                    for (var i = 0; i <= c; i = i + 3) {
                        var a = feature.values_.geom.flatCoordinates[i];
                        feature.values_.geom.flatCoordinates[i] = feature.values_.geom.flatCoordinates[i + 1];
                        feature.values_.geom.flatCoordinates[i + 1] = a;
                    }
                    feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
                    highlightfeatures.setStyle(PuntoStyle);
                    var markerSourcenoph = highlightfeatures.getSource();
                    markerSourcenoph.clear();
                    markerSourcenoph.addFeature(feature);
                    
                    

                    
                }
            },
         complete: function(){
                if (tamañopantalla==true){
                quitgif(); }
                else{
                document.getElementById("carga3").style.display = "none";  
                   }
            }   
        });
    }
    
    
});


//herramienta medir
var sketch;
var helpTooltipElement;
var helpTooltip;
var measureTooltipElement;
var measureTooltip;
var continueLineMsg = 'Click to continue drawing the line';
var source = new ol.source.Vector();
var draw; // global so we can remove it later
function addInteraction() {
    var type = 'LineString';
    draw = new ol.interaction.Draw({
        source: source,
        type: /** @type {ol.geom.GeometryType} */ (type),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
    });
    //map.addInteraction(draw);
    createMeasureTooltip();
    createHelpTooltip();
    var listener;
    draw.on('drawstart',
            function (evt) {
                // set sketch
                sketch = evt.feature;
                /** @type {ol.Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;
                listener = sketch.getGeometry().on('change', function (evt) {
                    var geom = evt.target;
                    var output;
                    output = formatLength(/** @type {ol.geom.LineString} */ (geom));
                    tooltipCoord = geom.getLastCoordinate();
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            }, this);
    draw.on('drawend',
            function (evt) {
                measureTooltipElement.className = 'tooltip tooltip-static';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                ol.Observable.unByKey(listener);
            }, this);
}

/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
}

/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
}

var wgs84Sphere = new ol.Sphere(6378137);
/**
 * format length output
 * @param {ol.geom.LineString} line
 * @return {string}
 */
var formatLength = function (line) {
    var length;
    length = Math.round(line.getLength() * 100) / 100;
    var output;
    if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
    } else {
        output = (Math.round(length * 100) / 100) + ' ' + 'm';
    }
    return output;
};
addInteraction();

