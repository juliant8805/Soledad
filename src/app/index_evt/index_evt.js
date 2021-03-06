
function guardar_wfs() {
	var viewParamsStr = viewparamsToStr({
        query: photosphereG
    }); 
    console.log(viewParamsStr);
   var tempname = "soledad:buscar_foto";
   var temp = "streetview";
   var wfsParams = {
                service: 'WFS',
                version: '2.0.0',
                request: 'GetFeature',
                typeName: tempname,
                outputFormat: 'application/json',
                srsname: 'EPSG:3857',
                viewparams: viewParamsStr
            };
   var url15 = 'http://35.226.110.153:8081/geoserver/';
   
   $.ajax({
        url: url15+"ows?",
        data: wfsParams,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var geojson = new ol.source.GeoJSON({
                object: data
            });   
            var arr = [];
               geojson.forEachFeature(function (feat) {
                    arr.push({
                        label: feat.get(temp),
                        value: feat.get(temp),
                        feature: feat
                        /*direccionoriginal: consultaregistro.direccionoriginal,
                        codigooriginal: consultaregistro.codigooriginal*/
                    });
                });
                
            var feat = arr[0].feature;
            var view = map.getView();
            var values = feat.values_;
            var geom = feat.getGeometry();
            var coord = values.geometry.flatCoordinates;
            var heading = 270 - feat.values_.heading;
            var heading = heading * (Math.PI/180);
            //var lat = parseInt(eG.latitude) * parseInt(10);
            
            if (eG.texture_y < 500 || eG.texture_y > 2960){
                alert("<br>Fuera de rango de captura, por favor seleccione una fotografía que este mejor ubicada respecto al objeto<br><br>");
            }
            
            else{
            var long = eG.longitude;
            var tempx = 2800 - eG.texture_y;
            //var r = 0.0175438 * tempx;
            var r = 0.0162601626016 * tempx;
             //var r = 8;
             //var r = 40 - (eG.viewer_y / 10);
             //var a = e.longitude - Math.PI/6;
            //console.log(r);
             var a = eG.longitude - heading;
             var tipo = document.getElementById('tipo_elemento').value;
            //  if(tipo == 'avisosyletreros' && r>5){
            //      r = 5;
            //  }
            
             var xpan = r * Math.cos(a).toFixed(4);
             var ypan = r * Math.sin(a).toFixed(4);
            // Math.PI
            var coord1 = coord[0];
            //var coord1 = coord1 + parseInt(long);
            var coord1 = coord1 - xpan;
            var coord2 = coord[1];
            var coord2 = coord2 + ypan
            coord = [coord1, coord2];
            coordG = coord;
            //console.log(coord);
            //console.log(feat.values_.geometry.flatCoordinates[0]);
            feat.values_.geometry.flatCoordinates[0] = coord1;
            feat.values_.geometry.flatCoordinates[1] = coord2;
            var transf = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
            //console.log(transf);
            var transf1 = (transf[1]);
            var transf2 = (transf[0]);
            var transf = [transf[1], transf[0], 0];
           // view.setCenter(geom.getFirstCoordinate());
           // view.setZoom(18);
            
           /* if (tipo == 'poste'){
            highlightt.setStyle(markStylePoste);
            }
            else if (tipo == 'arbol'){
             highlightt.setStyle(markStyleArbol);   
            }
            else if (tipo == 'antena_telecomunicaciones'){
             highlightt.setStyle(markStyleAntena);   
            }
            else if (tipo == 'avisosyletreros'){
             highlightt.setStyle(markStyleAvisos);   
            }
            else if (tipo == 'senalizacion'){
             highlightt.setStyle(markStyleSenalizacion);   
            }
            else {
             highlightt.setStyle(markStyle);  
            }*/
            //console.log(highlightt.setStyle(markStyle));
            highlightt.setStyle(markStyle);
            var markerSource = highlightt.getSource();
            //console.log(markerSource);
            //markerSource.clear();
            markerSource.addFeature(feat); 
        }
  
var fotopan = search("soledad:buscar_foto", photosphereG);
var payload = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:soledad="http://soledad" xmlns:gml="http://www.opengis.net/gml"><wfs:Insert><soledad:wfs_point><soledad:geom><gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#3857"><gml:coordinates decimal="." cs="," ts=" ">' + coordG + '</gml:coordinates></gml:Point></soledad:geom></soledad:wfs_point></wfs:Insert></wfs:Transaction>';             
puntosedicion.getSource().updateParams({'STYLES': '', 'CQL_FILTER': "10=10"});
$.ajax('http://35.226.110.153:8081/geoserver/soledad/ows', {
        type: 'POST',
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: payload,
        success: function (xml) {
            },
                error: function (xml) {
                        console.log(url15,'error');
            }
        }).done(function() {
                sourceWFS.clear();
    });
//console.log(coordG);    
    
var id_wfs = search("soledad:id_wfs");
var tipo = document.getElementById('tipo_elemento').value;
//var nombrepublicidad = document.getElementById('nombrepublicidad').value;
var equip = document.getElementById('equipamiento').value;

var observaciones = document.getElementById('observaciones').value;
var lat_img = eG.latitude;
var long_img = eG.longitude;
//var id_mark = eG.target.childNodes[1].attributes["0"].value;
var texture_x = eG.texture_x;
var texture_y = eG.texture_y;
var viewer_x = eG.viewer_x;
var viewer_y = eG.viewer_y;


var payload2 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:soledad="http://soledad" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="soledad:wfs_point"><wfs:Property><wfs:Name>streetview</wfs:Name><wfs:Value>' + photosphereG +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>tipo</wfs:Name><wfs:Value>' + tipo +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>equip</wfs:Name><wfs:Value>' + equip +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>nombrepublicidad</wfs:Name><wfs:Value>' + '' +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>observacio</wfs:Name><wfs:Value>' + observaciones +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>latitud_r</wfs:Name><wfs:Value>' + lat_img +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>longitud_r</wfs:Name><wfs:Value>' + long_img +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>style</wfs:Name><wfs:Value>' + tipo +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>texture_x</wfs:Name><wfs:Value>' + texture_x +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>texture_y</wfs:Name><wfs:Value>' + texture_y +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>viewer_x</wfs:Name><wfs:Value>' + viewer_x +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>viewer_y</wfs:Name><wfs:Value>' + viewer_y +'</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsNull><ogc:PropertyName>streetview</ogc:PropertyName></ogc:PropertyIsNull></ogc:Filter></wfs:Update></wfs:Transaction>';                 
$.ajax(url15+'soledad/ows', {
        type: 'POST',
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: payload2,
        success: function (xml) {
            },
                error: function (xml) {
                        console.log('error');
            }
        }).done(function() {
                sourceWFS.clear();
        });
document.getElementById("panel_atr_update").style.display = "none";          
            
     }
    });  
//console.log(fotopan);
}

function cancelar_wfs() {
document.getElementById("panel_atr_update").style.display = "none";
//console.log(marker.$el.id);
     //console.log(PSV);
    //PSV.clearMarkers();
}


function downloadwfs() {
var ventana = window.open(url15+"soledad/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=soledad:wfs_point&maxFeatures=500&outputFormat=SHAPE-ZIP");
//ventana.close();
alert("<br>La capa descargada corresponde a los elementos capturados desde la plataforma Web y se encuentran en formato Shape File<br>");
}


function agregarinfoprediocaptura() {
var npisos = document.getElementById('numeropisos').value;
var destino = document.getElementById('destinofoto').value;
var actEcon = document.getElementById('actEcdropdown').value;
var areaCons = document.getElementById('areaMuta').value;
var sobretasa=$("input[name='otro']:checked").val();

if(destino=='otro'){
    if(sobretasa==undefined){
        sobretasa='no';
    }
    console.log(sobretasa);
}
else{
    sobretasa='';
};


var checkvalue = [];
$.each($("input[name='mixto']:checked"), function(){            
    checkvalue.push($(this).val());
    checkvalue.join(", ");
});
                            
console.log(checkvalue,npisos,destino,actEcon,mutacion,observaciones,areaCons,otro);

var mutacion = document.getElementById('mutacion').value;
var observaciones = document.getElementById('observacionespredio').value;

var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:soledad="http://soledad" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="soledad:predios_street_view_captura"><wfs:Property><wfs:Name>npisos</wfs:Name><wfs:Value>' + npisos +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>destino</wfs:Name><wfs:Value>' + destino +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>act_econo</wfs:Name><wfs:Value>' + actEcon +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>mutacion</wfs:Name><wfs:Value>' + mutacion +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>area_constr</wfs:Name><wfs:Value>' + areaCons +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>mixto_dest</wfs:Name><wfs:Value>' + checkvalue +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>sobretasa</wfs:Name><wfs:Value>'+ sobretasa +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>observacio</wfs:Name><wfs:Value>' + observaciones +'</wfs:Value></wfs:Property><wfs:Property><wfs:Name>editor</wfs:Name><wfs:Value>pruebas</wfs:Value></wfs:Property><wfs:Property><wfs:Name>hallazgos</wfs:Name><wfs:Value>capturado</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>codigo_ant</ogc:PropertyName><ogc:Literal>' + codigo_ant + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';             

$.ajax('http://35.226.110.153:8081/geoserver/soledad/ows', {
        type: 'POST',
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: payload3,
        success: function (xml) {
            },
                error: function (xml) {
                        console.log('error');
            }
        }).done(function() {
                sourceWFS.clear();
    }); 
    console.log(payload3);
    predio.getSource().updateParams({'STYLES': 'predios_hallazgos_captura'});
    alert("Información guardada exitosamente</br>");  
}

function giropsv(giropsv) {
    var heading = fotopan2[0][3];
    console.log(heading);
    var feat = new ol.Feature({
        geometry: new ol.geom.Point(res)
    });
    //console.log(feat);
    //feat.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    var geom = feat.getGeometry();
    var view = map.getView();
    view.setCenter(geom.getFirstCoordinate());
    view.setZoom(19);
    var markerSource = highlightfeatures.getSource();
    markerSource.clear();

    function styleGiroPSV(style1,style2,style3,style4,style5,style6,style7,style8){
        if (giropsv >= 0 && giropsv <= 0.78539) {
            highlightfeatures.setStyle(style1);
        } else if (giropsv >= 0.78540 && giropsv <= 1.57079) {
            highlightfeatures.setStyle(style2);
        } else if (giropsv >= 1.57080 && giropsv <= 2.35618) {
            highlightfeatures.setStyle(style3);
        } else if (giropsv >= 2.35619 && giropsv <= 3.14157) {
            highlightfeatures.setStyle(style4);
        } else if (giropsv >= 3.14158 && giropsv <= 3.92697) {
            highlightfeatures.setStyle(style5);
        } else if (giropsv >= 3.92698 && giropsv <= 4.71236) {
            highlightfeatures.setStyle(style6);
        } else if (giropsv >= 4.71237 && giropsv <= 5.49775) {
            highlightfeatures.setStyle(style7);
        } else if (giropsv >= 5.49776 && giropsv <= 6.283186) {
            highlightfeatures.setStyle(style8);
        } 
    };
   
	if (heading >= 0 && heading <= 90) {
        styleGiroPSV(psvgiroStyle3,psvgiroStyle4,psvgiroStyle5,psvgiroStyle6,psvgiroStyle7,psvgiroStyle8,psvgiroStyle9,psvgiroStyle2)
    }  
    else if (heading >= 91 && heading <= 180) {
        styleGiroPSV(psvgiroStyle5,psvgiroStyle6,psvgiroStyle7,psvgiroStyle8,psvgiroStyle9,psvgiroStyle2,psvgiroStyle3,psvgiroStyle4)
    }  
    else if (heading >= 181 && heading <= 270) {
        styleGiroPSV(psvgiroStyle7,psvgiroStyle8,psvgiroStyle9,psvgiroStyle2,psvgiroStyle3,psvgiroStyle4,psvgiroStyle5,psvgiroStyle6)
    }
    else if (heading >= 271 && heading <= 360) {
        styleGiroPSV(psvgiroStyle9,psvgiroStyle2,psvgiroStyle3,psvgiroStyle4,psvgiroStyle5,psvgiroStyle6,psvgiroStyle7,psvgiroStyle8)
    }
    markerSource.addFeature(feat);	
}

function mostrar(consulta) {
//document.getElementById('barra_direccion').style.display = 'none';
    document.getElementById('barra_sitio').style.display = 'none';
    //document.getElementById('barra_propietario').style.display = 'none';
    document.getElementById('barra_barrio').style.display = 'none';
    document.getElementById('barra_codigo').style.display = 'none';
    //document.getElementById('barra_busqueda_direccion').style.display = 'none';
    //document.getElementById('barra_busqueda_matricula').style.display = 'none';
    document.getElementById('barra_matricula').style.display = 'none';
    document.getElementById('barra_comuna').style.display = 'none';
    document.getElementById('barra_localidad').style.display = 'none';
    document.getElementById('barra_manzana').style.display = 'none';
    document.getElementById('barra_direccion').style.display = 'none';
    document.getElementById('direccion').value = "";
    document.getElementById('address1').value = "";
    //document.getElementById('nombre_propietario').value = "";
    document.getElementById('barrio').value = "";
    document.getElementById('codigo').value = "";
    document.getElementById('comuna').value = "";
    document.getElementById('localidad').value = "";
    document.getElementById('manzana').value = "";
    document.getElementById('matricula').value = "";
    document.getElementById('direccion').value = "";
    if (consulta === 'consulta_direccion') {
        document.getElementById('barra_direccion').style.display = 'block';
        //localidad.setVisible(false);
        manzana.setVisible(false);
        barrio.setVisible(false);
    } else if (consulta === 'consulta_sitio') {
        document.getElementById('barra_sitio').style.display = 'block';
        //localidad.setVisible(false);
        manzana.setVisible(false);
        barrio.setVisible(false);
    } else if (consulta === 'consulta_propietario') {
        document.getElementById('barra_propietario').style.display = 'block';
    } else if (consulta === 'consulta_barrio') {
        document.getElementById('barra_barrio').style.display = 'block';
        barrio.setVisible(true);
        //localidad.setVisible(false);
        predio.setVisible(false);
        manzana.setVisible(false);
        // map.getView().fitExtent(barrio.getExtent(), map.getSize());
    } else if (consulta === 'consulta_codigo') {
        document.getElementById('barra_codigo').style.display = 'block';
    } else if (consulta === 'consulta_matricula') {
        document.getElementById('barra_matricula').style.display = 'block';
    } else if (consulta === 'consulta_comuna') {
        document.getElementById('barra_comuna').style.display = 'block';
    } else if (consulta === 'consulta_localidad') {
        document.getElementById('barra_localidad').style.display = 'block';
        //localidad.setVisible(true);
        barrio.setVisible(false);
        predio.setVisible(false);
        manzana.setVisible(false);
        map.getView().fitExtent(barrio.getExtent(), map.getSize());
    } else if (consulta === 'consulta_manzana') {
        document.getElementById('barra_manzana').style.display = 'block';
        //localidad.setVisible(false);
        barrio.setVisible(false);
        //manzana.setVisible(true);
        map.getView().fitExtent(barrio.getExtent(), map.getSize());
    }
}

function mostrartotem(consulta) {
    function resetItems(){
        document.getElementById("inputsitiototem").value = "";
        document.getElementById("inputmanzanatotem").value = "";
        document.getElementById("inputlocalidadtotem").value = "";
        document.getElementById("inputbarriototem").value = "";
        document.getElementById("inputdirecciontotem").value = "";
    };
    function showItems(item1,item2,item3,item4,item5,item6,item7,item8,item9){
        document.getElementById('inputlocalidadtotem').style.display = item1;
        document.getElementById('inputmanzanatotem').style.display = item2;
        document.getElementById('inputsitiototem').style.display = item3;
        document.getElementById('inputbarriototem').style.display = item4;
        document.getElementById('inputdirecciontotem').style.display = item5;
        document.getElementById('consultas_totem').style.display = item6;
        document.getElementById('exp1').style.display = item7;
        document.getElementById('buscar_dir').style.display = item8;
        var x = document.getElementById(item9);
        x.play();
    };
    if (consulta == 'direcciontotem') {
        resetItems();
        showItems('none','none','none','none','block','block','block','block',"audiodireccion")
    } else if (consulta == 'referencia') {
        resetItems();
        showItems('none','none','block','none','none','block','none','none',"audiorefcatastral")
    } else if (consulta == 'sitiototem') {
        resetItems();
        showItems('none','none','block','none','none','block','none','none',"audiositio")
    } else if (consulta == 'localidad') {
        resetItems();
        showItems('block','none','none','none','none','block','none','none',"audiolocalidad")
    } else if (consulta == 'barrio') {
        resetItems();
        showItems('none','none','none','block','none','block','none','none',"audiobarrio")
    } else if (consulta == 'manzana') {
        resetItems();
        showItems('none','block','none','none','none','block','none','none',"audiomanzana")
    } else if (consulta == 'barriototem') {
        resetItems();
        document.getElementById('exp1').style.display = 'none';
        document.getElementById('buscar_dir').style.display = 'none';
        document.getElementById('inputdirecciontotem').style.display = 'none';
        document.getElementById('inputsitiototem').style.display = 'none';
        document.getElementById('inputlocalidadtotem').style.display = 'none';
        document.getElementById('inputbarriototem').style.display = 'none';
        document.getElementById('menu_totemp').style.display = 'none';
        document.getElementById('menumanzanatotem').style.display = 'none';
        document.getElementById('menubarriototem').style.display = 'block';
        document.getElementById("volver").style.display = 'block';
        // document.getElementById('inputmanzanatotem').style.display = 'block';
        // document.getElementById('consultas_totem').style.display = 'block';
        //var x = document.getElementById("audiomanzana");
        //x.play();
    } else if (consulta == 'manzanatotem') {
        resetItems();
        document.getElementById('exp1').style.display = 'none';
        document.getElementById('buscar_dir').style.display = 'none';
        document.getElementById('inputdirecciontotem').style.display = 'none';
        document.getElementById('inputsitiototem').style.display = 'none';
        document.getElementById('inputlocalidadtotem').style.display = 'none';
        document.getElementById('inputbarriototem').style.display = 'none';
        document.getElementById('menu_totemp').style.display = 'none';
        document.getElementById('menumanzanatotem').style.display = 'block';
        document.getElementById("volver").style.display = 'block';
        // document.getElementById('inputmanzanatotem').style.display = 'block';
        // document.getElementById('consultas_totem').style.display = 'block';
        //var x = document.getElementById("audiomanzana");
        //x.play();
    } else if (consulta == 'prediototem') {
        resetItems();
        document.getElementById('inputlocalidadtotem').style.display = 'none';
        document.getElementById('inputmanzanatotem').style.display = 'none';
        document.getElementById('inputsitiototem').style.display = 'none';
        document.getElementById('inputbarriototem').style.display = 'none';
        document.getElementById('menu_totemp').style.display = 'none';
        document.getElementById('buscar_ref').style.display = 'none';
        document.getElementById('menu_predio').style.display = 'block';
        document.getElementById("volver").style.display = 'block';
        //document.getElementById('submenuprediototem').style.display = 'block';
        //document.getElementById('inputdirecciontotem').style.display = 'block';
        //document.getElementById('consultas_totem').style.display = 'block';
    } else if (consulta == 'direcciontotemp') {
        document.getElementById('menu_predio').style.display = 'none';
        document.getElementById('submenuprediototem').style.display = 'none';
        document.getElementById('inputdirecciontotem').style.display = 'none';
        document.getElementById('menu_totemp').style.display = 'none';
        document.getElementById('consultas_totem').style.display = 'none';
        document.getElementById('consultas_totemp').style.display = 'block';
    } else if (consulta == 'sitiototemp') {
        resetItems();
        document.getElementById('exp1').style.display = 'none';
        document.getElementById('buscar_dir').style.display = 'none';
        document.getElementById('inputdirecciontotem').style.display = 'none';
        document.getElementById('inputsitiototem').style.display = 'none';
        document.getElementById('inputlocalidadtotem').style.display = 'none';
        document.getElementById('inputbarriototem').style.display = 'none';
        document.getElementById('menu_totemp').style.display = 'none';
        document.getElementById('menumanzanatotem').style.display = 'none';
        document.getElementById('menubarriototem').style.display = 'none';
        document.getElementById('menusitiostotem').style.display = 'block';
        document.getElementById("volver").style.display = 'block';
    }
}

function menu_principal() {
// document.getElementById('botones').style.display = 'block';
    document.getElementById('submenu').style.display = 'block';
    document.getElementById('cerrar_submenu').style.display = 'block';
    document.getElementById('lupa_pequeña').style.display = 'block';
    document.getElementById('boton_capas').style.display = 'block';
    document.getElementById('boton_principal').style.display = 'none';
}

function menu_consultas() {
    /*document.getElementById('busqueda_personalizada').style.display = 'block';
     document.getElementById('cerrar_submenu_cafe').style.display = 'block';
     document.getElementById('cerrar_submenu_verde').style.display = 'none';*/
    document.getElementById('botones').style.display = 'block';
    document.getElementById('herramientas').style.display = 'none';
    //document.getElementById('transicion_capas').style.display = 'none';

    /*if (document.getElementById('botones').style.display === "" || document.getElementById('botones').style.display === "none"){
     var ca = document.cookie.split('=');
     var select = select_query("SELECT * FROM usuario WHERE usuario ='" + ca[0] + "' AND contrasena ='" + ca[1] + "' AND estado='t';");
     console.log(select[0][8]);
     if(select[0][7]==='f'){
     document.getElementById('predios_actualizacion').style.display = 'none';
     document.getElementById('oficial_vs_AAA').style.display = 'none';
     document.getElementById('oficial_vs_AAA_uso').style.display = 'none';
     document.getElementById('disponibilidad_AAA').style.display = 'none';
     document.getElementById('transmetro').style.display = 'none';
     document.getElementById('espacio_publico').style.display = 'none';
     document.getElementById('Nomenclatura Domiciliaria').style.display = 'none';
     }
     } else
     {*/


    //document.getElementById('submenu').style.display = 'none';

    //}      
}

function herramientas() {
    /*document.getElementById('mensaje').style.display = 'none';
     document.getElementById('busqueda_personalizada').style.display = 'none';*/
    document.getElementById('botones').style.display = 'none';
    // document.getElementById('cerrar_submenu_cafe').style.display = 'none';
    document.getElementById('herramientas').style.display = 'block';
    /*document.getElementById('transicion_capas').style.display = 'block';
     document.getElementById('cerrar_submenu_verde').style.display = 'block';*/
}

function limpiar_consulta() {
    globalstyle = "sinconsulta";
    
    predio.setVisible(true);
	 predio.getSource().updateParams({'STYLES': 'predios_hallazgos_captura'});
    document.getElementById('panel_atr').style.display = 'none';
    document.getElementById('botoncerrarstreetview').style.display = 'none';
    document.getElementById('botonmostrarstreetview').style.display = 'none';
     
    var markerSource = highlight.getSource();
    var markerSource2 = highlightt.getSource();
    var markerSource3 = highlightfeatures.getSource();
    var markerSource4 = highlightfeaturespredios.getSource();
   
    markerSource.clear();
    markerSource2.clear();
    markerSource3.clear();
    markerSource4.clear();
   
    
    document.getElementById("marco").style.display = "none";
    document.getElementById("container3").style.display = "none";
    
    document.getElementById("botonocultarpanelatributos").style.display = "none";
    document.getElementById("botonminimizar").style.display = "none";
    document.getElementById("botonmaximizar").style.display = "none";
    document.getElementById("botonmostrarpanelatributos").style.display = "none";
    document.getElementById("botonmostrarstatistics").style.display = "none";
   
    
    
   
        //predio.getSource().updateParams({'STYLES': 'predios_sin_consulta_cucuta'});

}
function busqueda_personalizada() {
    if (document.getElementById('personalizada').style.display === "" || document.getElementById('personalizada').style.display === "none")
    {
        document.getElementById('personalizada').style.display = 'block';
        document.getElementById('personalizada1').style.display = 'block';
        document.getElementById('personalizada2').style.display = 'block';
        document.getElementById('rango_area').style.display = 'block';
        document.getElementById('tipo_construccion').style.display = 'block';
        document.getElementById('estrato').style.display = 'block';
    } else
    {
        document.getElementById('personalizada').style.display = 'none';
        document.getElementById('personalizada1').style.display = 'none';
        document.getElementById('personalizada2').style.display = 'none';
        document.getElementById('barra_busqueda_matricula').style.display = 'none';
        //document.getElementById('barra_busqueda_direccion').style.display = 'none';
        document.getElementById('barra_codigo').style.display = 'none';
        document.getElementById('rango_area').style.display = 'none';
        document.getElementById('tipo_construccion').style.display = 'none';
        document.getElementById('estrato').style.display = 'none';
    }
}
function busqueda(id) {
//document.getElementById('barra_busqueda_direccion').style.display = 'none';
    document.getElementById('barra_busqueda_matricula').style.display = 'none';
    document.getElementById('barra_codigo').style.display = 'none';
    document.getElementById('barra_alineamiento').style.display = 'none';
    document.getElementById('barra_predioshasusos').style.display = 'none';
    document.getElementById('matricula').value = "";
    document.getElementById('direccion').value = "";
    document.getElementById('codigo').value = "";
    document.getElementById('cedul').value = "";
    document.getElementById('propietarios').value = "";
    document.getElementById('input_ladomanzana').value = "";
    document.getElementById('direccion_gestor').value = "";
    if (id === "propietar") {
        document.getElementById('direccion_gestor').style.display = 'none';
        document.getElementById('codigo').style.display = 'none';
        document.getElementById('cedul').style.display = 'none';
        document.getElementById('barra_codigo').style.display = 'block';
        document.getElementById('propietarios').style.display = 'block';
    } else if (id === "cedula") {
        document.getElementById('direccion_gestor').style.display = 'none';
        document.getElementById('propietarios').style.display = 'none';
        document.getElementById('codigo').style.display = 'none';
        document.getElementById('barra_codigo').style.display = 'block';
        document.getElementById('cedul').style.display = 'block';
    } else if (id === "personalizada1") {
        document.getElementById('barra_busqueda_matricula').style.display = 'block';
    } else if (id === "personalizada2") {
        document.getElementById('direccion_gestor').style.display = 'none';
        document.getElementById('propietarios').style.display = 'none';
        document.getElementById('cedul').style.display = 'none';
        document.getElementById('barra_codigo').style.display = 'block';
        document.getElementById('codigo').style.display = 'block';
    } else if (id === "alineamiento") {
        document.getElementById('barra_alineamiento').style.display = 'block';
    } else if (id === "Usos_Permitidos") {
        document.getElementById('barra_predioshasusos').style.display = 'block';
    } else if (id === "boton_geocoder") {
        document.getElementById('propietarios').style.display = 'none';
        document.getElementById('cedul').style.display = 'none';
        document.getElementById('codigo').style.display = 'none';
        document.getElementById('barra_codigo').style.display = 'block';
        document.getElementById('direccion_gestor').style.display = 'none';
        document.getElementById('tabladir').style.display = 'block';
    }
}

function ocultarpanelatributosaaa() {
    document.getElementById('mensaje').style.display = 'none';
    document.getElementById('tablaatributospuntosaaa').style.display = 'none';
    document.getElementById('botonmaximizarpuntosaaa').style.display = 'block';
}
function mostrarpanelatributosaaa() {
    document.getElementById('mensaje').style.display = 'none';
    document.getElementById('tablaatributospuntosaaa').style.display = 'block';
    document.getElementById('botonmaximizarpuntosaaa').style.display = 'none';
}


function cerrar_menu() {
    document.getElementById('mensaje').style.display = 'none';
    document.getElementById('botones').style.display = 'none';
    document.getElementById('barra_codigo').style.display = 'none';
    // document.getElementById('barra_busqueda_direccion').style.display = 'none';
    document.getElementById('barra_busqueda_matricula').style.display = 'none';
    document.getElementById('cerrar_submenu').style.display = 'none';
    document.getElementById('cerrar_submenu_cafe').style.display = 'none';
    document.getElementById('cerrar_submenu_verde').style.display = 'none';
    document.getElementById('boton_capas').style.display = 'none';
    document.getElementById('submenu').style.display = 'none';
    document.getElementById('boton_principal').style.display = 'block';
    document.getElementById('lupa_pequeña').style.display = 'none';
    document.getElementById('busqueda_personalizada').style.display = 'none';
    document.getElementById('transicion_capas').style.display = 'none';
    document.getElementById('herramientas').style.display = 'none';
}
/*$(document).ready(function () {
    $('#marco').load(function () {
        $(this).contents().find("img").css({'height': '970px', 'width': '572px'});
        //$(this).contents().find("img").css({'background-color':'red','font-weight':'bolder','color':'white'});
    });
});*/
function open_streetview() {
    document.getElementById('marco').style.display = 'block';
    document.getElementById('botoncerrarstreetview').style.display = 'block';
}

contfot = 0;

function onVrViewLoad() {
    console.log(panoramica);
  //window.addEventListener('load', onVrViewLoad);
  document.getElementById('vrview').style.display = 'block';
  var dirurl = "http://35.226.110.153/imagenes/prueba.jpg";  
  contfot = contfot + 1;
  console.log(contfot);
  if (contfot <2){
      var vrView = new VRView.Player('#vrview', {
      width: 550,
      height: 480,
      image: dirurl,
      //is_debug: true,
      //is_vr_off: true,
      //is_autopan_off: true,
      default_yaw: 0,
      is_stereo: false
     });
    }
    else{    
        vrView.setContentInfo({
        image: dirurl,
        preview: dirurl,
        is_stereo: false
  });  
        
        
      /*  
      vrView.setContentInfo('#vrview', {
      image: dirurl,
      preview:dirurl,
      is_stereo: false
    });*/
   }   
}

/*
 function close_streetview() {
 console.log(algo);
 //console.log(algo);
 //algo = 'none';
 //document.getElementById('marco').style.display = 'none';
 }*/
function lista() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function medir() {
   document.getElementById("boton_medir_off").style.display = "none";
   document.getElementById("boton_medir").style.display = "block";
   document.getElementById("medidas").style.display = "block"; 
    
    var wgs84Sphere = new ol.Sphere(6378137);
     var source = new ol.source.Vector();

      var vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: '#ffcc33'
            })
          })
        })
      });
    

    
    
      var sketch;
      var helpTooltipElement;
      var helpTooltip;
      var measureTooltipElement;
      var measureTooltip;
      var continuePolygonMsg = 'Click para añadir punto';
      var continueLineMsg = 'Click para añadir punto';
      var pointerMoveHandler = function(evt) {
        if (evt.dragging) {
          return;
        }
        /** @type {string} */
          
        var helpMsg = 'Click para añadir punto';

        if (sketch) {
          var geom = (sketch.getGeometry());
          if (geom instanceof ol.geom.Polygon) {
           var helpMsg = continuePolygonMsg;
          } else if (geom instanceof ol.geom.LineString) {
            helpMsg = continueLineMsg;
          }
        }

        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);
        if(document.getElementById("medidas").style.display == "block"){
        helpTooltipElement.classList.remove('hidden');
       }
      };


     

      map.on('pointermove', pointerMoveHandler);

      map.getViewport().addEventListener('mouseout', function() {
        helpTooltipElement.classList.add('hidden');
      });

      var typeSelect = document.getElementById('medidas');
      //var draw; // global so we can remove it later
      /*var formatLength = function(line) {
      var length = ol.Sphere.getLength(line);
      var output;
        if (length > 100) {
          output = (Math.round(length / 1000 * 100) / 100) +
              ' ' + 'km';
        } else {
          output = (Math.round(length * 100) / 100) +
              ' ' + 'm';
        }
        return output;
      };*/
    
    
    var formatLength = function (line) {
    var length;
    length = Math.round(line.getLength() * 100) / 100;
    var output;
    /*if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
    } else {*/
        output = (Math.round(length * 100) / 100) + ' ' + 'm';
    //}
    return output;
};
    
    

      var formatArea = function(polygon) {
      var area;
          area = Math.round(polygon.getArea() * 100) / 100;
        var output;
       /* if (area > 10000) {
          output = (Math.round(area / 1000000 * 100) / 100) +
              ' ' + 'km<sup>2</sup>';
        } else {*/
          output = (Math.round(area * 100) / 100) +
              ' ' + 'm<sup>2</sup>';
      //  }
        return output;
      };

     
      function addInteraction() { 
          var radioSelect = $('input[name=gender]:checked', '#medidas').val();
          var type = (radioSelect == 'area' ? 'Polygon' : 'LineString');
          draw = new ol.interaction.Draw({
          source: source,
          type: type,
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
        map.addInteraction(draw);

        createMeasureTooltip();
        createHelpTooltip();

        var listener;
        draw.on('drawstart',
            function(evt) {
              // set sketch
              sketch = evt.feature;

              /** @type {ol.Coordinate|undefined} */
              var tooltipCoord = evt.coordinate;

              listener = sketch.getGeometry().on('change', function(evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                  output = formatArea(geom);
                  tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                  output = formatLength(geom);
                  tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
              });
            }, this);

        draw.on('drawend',
            function() {
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


      /**
       * Let user change the geometry type.
       */
      typeSelect.onchange = function() {
        map.removeInteraction(draw);
        addInteraction();
      };

      addInteraction(); 
    
   // var vector = highlightfeatures.getSource();
    
    
}

function medir_off() {
    //console.log(draw);
    map.removeInteraction(draw);
    draw.values_.active = false;
    document.getElementById("boton_medir").style.display = "none";
    document.getElementById("boton_medir_off").style.display = "block";  
    document.getElementById("medidas").style.display = "none";  
}


function abrir_manual() {
    if (modulo == 'catastro') {
        window.open('./documentos/manual_catastro.pdf', '_blank');
        /* window.open(
         'http://35.184.3.4/gesstor/documentos/manual_catastro.pdf',
         '_blank' // <- This is what makes it open in a new window.
         );*/
    } else if (modulo == 'planeacion') {
        window.open('./documentos/manual_misional_planeacion.pdf', '_blank', 'fullscreen=yes');
        /*'http://35.184.3.4/gesstor/documentos/manual_misional_planeacion.pdf',
         '_blank' // <- This is what makes it open in a new window.
         );*/
    } else if (modulo == 'planeacionmisional') {
        window.open('./documentos/manual_misional_planeacion.pdf', '_blank', 'fullscreen=yes');
        /*'http://35.184.3.4/gesstor/documentos/manual_misional_planeacion.pdf',
         '_blank' // <- This is what makes it open in a new window.
         );*/
    } else if (modulo == 'sui') {
        window.open('./documentos/manual_sui.pdf', '_blank', 'fullscreen=yes');
        /* window.open(
         'http://35.184.3.4/gesstor/documentos/manual_sui.pdf',
         '_blank' // <- This is what makes it open in a new window.
         );*/
    } else if (modulo == 'hacienda') {
        window.open('./documentos/manual_hacienda.pdf', '_blank', 'fullscreen=yes');
        /*window.open(
         'http://35.184.3.4/gesstor/documentos/manual_hacienda.pdf',
         '_blank' // <- This is what makes it open in a new window.
         );*/
    }
}


// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    try {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdoforwns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    } catch (err) {
    }
};
function marcado() {
    if (document.getElementById("termin").checked === true) {
        document.getElementById('completo').style.display = 'none';
    } else {
        alert("Debes aceptar los términos y condiciones");
        return false;
    }
}

function changeImage(id) {
    if (id === "icono_matricula") {
        document.getElementById('icono_matricula').style = "background:url('./imagenes/botones_consultas/buscar_matricula/matricula_inmobiliaria.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "icono_direccion") {
        document.getElementById('icono_direccion').style = "background:url('./imagenes/buscar_direccion.png'); background-color:#adad32; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "icono_codigo") {
        document.getElementById('icono_codigo').style = "background:url('./imagenes/botones_consultas/buscar_codigo/codigo.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "cedula") {
        document.getElementById('cedula').style = "background:url('./imagenes/botones_consultas/buscar_cedula/cedula.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "propietario") {
        document.getElementById('propietario').style = "background:url('./imagenes/botones_consultas/buscar_propietario/propietario.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Rango Area Terreno") {
        document.getElementById('Rango Area Terreno').style = "background:url('./imagenes/botones_consultas/rango_area_terreno/rango_area_terreno.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Tipo Construccion") {
        document.getElementById('Tipo Construccion').style = "background:url('./imagenes/botones_consultas/propiedad_horizontal/propiedad_horizontal.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Distrito vs Prestadores AAA") {

        /* document.getElementById('Distrito vs Prestadores AAA').style = "background:url('./imagenes/botones_consultas/base_distrito_prestadores/base_distrito_prestadores.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";*/
    } else if (id === "metrotel") {
        document.getElementById('metrotel').style = "background:url('./imagenes/consultar_estratificacion_metrotel.png'); background-color:#326f32; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Tipo de Contribuyente") {
        document.getElementById('Tipo de Contribuyente').style = "background:url('./imagenes/botones_consultas/tipo_contribuyente/tipo_contribuyente.png'); background-color:#6fb76f; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "predios_exentos_2016") {
        document.getElementById('predios_exentos_2016').style = "background:url('./imagenes/consultar_predios_exentos.png'); background-color:#adad32; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "estratificacion_oficial") {
        document.getElementById('estratificacion_oficial').style = "background:url('./imagenes/botones_consultas/estratificacion_oficial/estratificacion_oficial.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "predios_construidos") {
        document.getElementById('predios_construidos').style = "background:url('./imagenes/botones_consultas/lotes_no_construidos/lotes_no_construidos.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "oficial_vs_AAA") {
        document.getElementById('oficial_vs_AAA').style = "background:url('./imagenes/oficial_vs_AAA.png'); background-color:#adad32; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
        document.getElementById('oficial_vs_AAA').value = 0;
    } else if (id === "oficial_vs_AAA_uso") {
        document.getElementById('oficial_vs_AAA_uso').style = "background:url('./imagenes/oficial_vs_AAA_destino.png'); background-color:#326f32; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
        document.getElementById('oficial_vs_AAA_uso').value = 0;
    } else if (id === "disponibilidad_AAA") {
        document.getElementById('disponibilidad_AAA').style = "background:url('./imagenes/disponibilidad_servicios_AAA.png'); background-color:#006600; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
        document.getElementById('disponibilidad_AAA').value = 0;
    } else if (id === "uso_electricaribe") {
        document.getElementById('uso_electricaribe').style = "background:url('./imagenes/botones_consultas/uso_electricaribe/uso_electricaribe.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "transmetro") {
        document.getElementById('transmetro').style = "background:url('./imagenes/botones_consultas/transmetro/transmetro.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "espacio_publico") {
        document.getElementById('espacio_publico').style = "background:url('./imagenes/botones_consultas/espacio_publico/espacio_publico.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Nomenclatura Domiciliaria") {
        document.getElementById('Nomenclatura Domiciliaria').style = "background:url('./imagenes/estandarizada.png'); background-color:#326f32; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Calidad Construcciones") {
        document.getElementById('Calidad Construcciones').style = "background:url('./imagenes/botones_consultas/calidad_construccion/calidad_construccion.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Rango Area Construccion") {
        document.getElementById('Rango Area Construccion').style = "background:url('./imagenes/botones_consultas/rango_area_construccion/rango_area_construccion.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Avaluo Catastral") {
        document.getElementById('Avaluo Catastral').style = "background:url('./imagenes/botones_consultas/avaluo_catastral/avaluo_catastral.png'); background-color:#adad32; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Tipo Propietario") {
        document.getElementById('Tipo Propietario').style = "background:url('./imagenes/botones_consultas/tipo_propietario/tipo_propietario.png'); background-color:#b7b7b7; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
        document.getElementById('Avaluo Catastral').value = 0;
    } else if (id === "Conflicto Uso del Suelo") {
        document.getElementById('Conflicto Uso del Suelo').style = "background:url('./imagenes/Conflictos_Uso_Suelo.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Area Proteccion Urbanistica") {
        document.getElementById('Area Proteccion Urbanistica').style = "background:url('./imagenes/botones_consultas/proteccion_urbanistica/proteccion_urbanistica.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Tipo de Zona") {
        document.getElementById('Tipo de Zona').style = "background:url('./imagenes/Tipo_Zona.png'); background-color:#326f32; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Tipo de Amenaza") {
        document.getElementById('Tipo de Amenaza').style = "background:url('./imagenes/botones_consultas/tipo_amenaza/tipo_amenaza.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
        document.getElementById('Tipo de Amenaza').value = 0;
    } else if (id === "Estructura Ecologica Principal") {
        document.getElementById('Estructura Ecologica Principal').style = "background:url('./imagenes/botones_consultas/estructura_ecologica/estructura_ecologica.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "alineamiento") {
        document.getElementById('alineamiento').style = "background:url('./imagenes/botones_consultas/alineamiento/alineamiento.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Usos_Permitidos") {
        document.getElementById('Usos_Permitidos').style = "background:url('./imagenes/botones_consultas/usos_permitidos/usos_permitidos.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "plusvalia") {
        document.getElementById('plusvalia').style = "background:url('./imagenes/botones_consultas/plusvalia/plusvalia.png'); background-color:#b7b7b7; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Incremento Avaluo") {
        document.getElementById('Incremento Avaluo').style = "background:url('./imagenes/botones_consultas/incremento_avaluo/incremento_avaluo.png'); background-color:#b7b7b7; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Clasificacion_Uso") {
        document.getElementById('Clasificacion_Uso').style = "background:url('./imagenes/botones_consultas/clasificacion_uso/clasificacion_uso.png'); background-color:#93c993; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "predios_actualizacion") {
        document.getElementById('predios_actualizacion').style = "background:url('./imagenes/botones_consultas/conservacion/conservacion.png'); background-color:#b7b7b7; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Impuesto Camara") {
        document.getElementById('Impuesto Camara').style = "background:url('./imagenes/botones_consultas/industria_y_comercio/industria_y_comercio.png'); background-color:#b7b7b7; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    }
}

function normalImage(id) {
    if (id === "icono_matricula") {
        document.getElementById('icono_matricula').style = "background:url('./imagenes/botones_consultas/buscar_matricula/matricula_inmobiliaria.png'); background-color:#00AD41; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "icono_direccion") {
        document.getElementById('icono_direccion').style = "background:url('./imagenes/direccion.png'); background-color:#86B12D; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "icono_codigo") {
        document.getElementById('icono_codigo').style = "background:url('./imagenes/botones_consultas/buscar_codigo/codigo.png'); background-color:#86B12D; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "cedula") {
        document.getElementById('cedula').style = "background:url('./imagenes/botones_consultas/buscar_cedula/cedula.png'); background-color:#006D1B; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Rango Area Terreno") {
        document.getElementById('Rango Area Terreno').style = "background:url('./imagenes/botones_consultas/rango_area_terreno/rango_area_terreno.png'); background-color:#00AD41; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Tipo Construccion") {
        document.getElementById('Tipo Construccion').style = "background:url('./imagenes/botones_consultas/propiedad_horizontal/propiedad_horizontal.png'); background-color:#86B12D; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Distrito vs Prestadores AAA") {

        /*document.getElementById('Distrito vs Prestadores AAA').style = "background:url('./imagenes/botones_consultas/base_distrito_prestadores/base_distrito_prestadores.png'); background-color:#008E30; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";*/
    } else if (id === "metrotel") {
        document.getElementById('metrotel').style = "background:url('./imagenes/estratificacion_metrotel.png'); background-color:#008E30; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Tipo de Contribuyente") {
        document.getElementById('Tipo de Contribuyente').style = "background:url('./imagenes/botones_consultas/tipo_contribuyente/tipo_contribuyente.png'); background-color:#006D1B; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "predios_exentos_2016") {
        document.getElementById('predios_exentos_2016').style = "background:url('./imagenes/predios_exentos.png'); background-color:#86B12D; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "estratificacion_oficial") {
        document.getElementById('estratificacion_oficial').style = "background:url('./imagenes/botones_consultas/estratificacion_oficial/estratificacion_oficial.png'); background-color:#006D1B; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "predios_construidos") {
        document.getElementById('predios_construidos').style = "background:url('./imagenes/botones_consultas/lotes_no_construidos/lotes_no_construidos.png'); background-color:#006D1B; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "oficial_vs_AAA") {
        if (document.getElementById("oficial_vs_AAA").value === "Acueducto") {
            document.getElementById('oficial_vs_AAA').style = "background-color:#00AD41; min-height: 40px; border:0px; font-size:small;";
        } else if (document.getElementById("oficial_vs_AAA").value === "Alcantarillado") {
            document.getElementById('oficial_vs_AAA').style = "background-color:#00AD41; min-height: 40px; border:0px; font-size:small;";
        } else if (document.getElementById("oficial_vs_AAA").value === "Aseo") {
            document.getElementById('oficial_vs_AAA').style = "background-color:#00AD41; min-height: 40px; border:0px; font-size:small;";
        } else {
            document.getElementById('oficial_vs_AAA').style = "background:url('./imagenes/icono_diferencia_estratificacion.png'); background-color:#00AD41; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
        }
    } else if (id === "oficial_vs_AAA_uso") {
        if (document.getElementById("oficial_vs_AAA_uso").value === "Acueducto") {
            document.getElementById('oficial_vs_AAA_uso').style = "background-color:#a6a6a6; min-height: 40px; border:0px; font-size:small;";
        } else if (document.getElementById("oficial_vs_AAA_uso").value === "Alcantarillado") {
            document.getElementById('oficial_vs_AAA_uso').style = "background-color:#a6a6a6; min-height: 40px; border:0px; font-size:small;";
        } else if (document.getElementById("oficial_vs_AAA_uso").value === "Aseo") {
            document.getElementById('oficial_vs_AAA_uso').style = "background-color:#a6a6a6; min-height: 40px; border:0px; font-size:small;";
        } else {
            document.getElementById('oficial_vs_AAA_uso').style = "background:url('./imagenes/oficial_vs_AAA_destino.png'); background-color:#00AD41; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
        }
    } else if (id === "uso_electricaribe") {
        document.getElementById('uso_electricaribe').style = "background:url('./imagenes/botones_consultas/uso_electricaribe/uso_electricaribe.png'); background-color:#006D1B; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "disponibilidad_AAA") {
        if (document.getElementById("disponibilidad_AAA").value === "Acueducto") {
            document.getElementById('disponibilidad_AAA').style = "background-color:#008E30; min-height: 40px; border:0px;";
        } else if (document.getElementById("disponibilidad_AAA").value === "Alcantarillado") {
            document.getElementById('disponibilidad_AAA').style = "background-color:#008E30; min-height: 40px; border:0px; font-size:small;";
        } else if (document.getElementById("disponibilidad_AAA").value === "Aseo") {
            document.getElementById('disponibilidad_AAA').style = "background-color:#008E30; min-height: 40px; border:0px; font-size:small;";
        } else {
            document.getElementById('disponibilidad_AAA').style = "background:url('./imagenes/icono_disponibilidad.png'); background-color:#008E30; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
        }
    } else if (id === "transmetro") {
        document.getElementById('transmetro').style = "background:url('./imagenes/botones_consultas/transmetro/transmetro.png'); background-color:#00AD41; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "espacio_publico") {
        document.getElementById('espacio_publico').style = "background:url('./imagenes/botones_consultas/espacio_publico/espacio_publico.png'); background-color:#86B12D; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Nomenclatura Domiciliaria") {
        document.getElementById('Nomenclatura Domiciliaria').style = "background:url('./imagenes/icono_nomenclatura_estandarizada.png'); background-color:#00AD41; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Calidad Construcciones") {
        document.getElementById('Calidad Construcciones').style = "background:url('./imagenes/botones_consultas/calidad_construccion/calidad_construccion.png'); background-color:#00AD41; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Rango Area Construccion") {
        document.getElementById('Rango Area Construccion').style = "background:url('./imagenes/botones_consultas/rango_area_construccion/rango_area_construccion.png'); background-color:#86B12D; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Avaluo Catastral") {
        document.getElementById('Avaluo Catastral').style = "background:url('./imagenes/botones_consultas/avaluo_catastral/avaluo_catastral.png'); background-color:#008E30; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Tipo Propietario") {
        document.getElementById('Tipo Propietario').style = "background:url('./imagenes/botones_consultas/tipo_propietario/tipo_propietario.png'); background-color:#a6a6a6; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Conflicto Uso del Suelo") {
        document.getElementById('Conflicto Uso del Suelo').style = "background:url('./imagenes/icono_uso_actual.png'); background-color:#86B12D; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Area Proteccion Urbanistica") {
        document.getElementById('Area Proteccion Urbanistica').style = "background:url('./imagenes/icono_proteccion_urbanistica.png'); background-color:#a6a6a6; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Tipo de Zona") {
        document.getElementById('Tipo de Zona').style = "background:url('./imagenes/icono_zona_urbana.png');background-color:#006D1B; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Tipo de Amenaza") {
        if (document.getElementById("Tipo de Amenaza").value === "Inundacion") {
            document.getElementById('Tipo de Amenaza').style = "background-color:#86B12D; min-height: 40px; border:0px; font-size:small;";
        } else if (document.getElementById("Tipo de Amenaza").value === "Remosion") {
            document.getElementById('Tipo de Amenaza').style = "background-color:#86B12D; min-height: 40px; border:0px; font-size:small;";
        } else {
            document.getElementById('Tipo de Amenaza').style = "background:url('./imagenes/botones_consultas/tipo_amenaza/tipo_amenaza.png');background-color:#008E30; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
        }
    } else if (id === "Estructura Ecologica Principal") {
        document.getElementById('Estructura Ecologica Principal').style = "background:url('./imagenes/icono_estructura_ecologica.png'); background-color:#a6a6a6; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "alineamiento") {
        document.getElementById('alineamiento').style = "background:url('./imagenes/botones_consultas/alineamiento/alineamiento.png'); background-color:#00AD41; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Usos_Permitidos") {
        document.getElementById('Usos_Permitidos').style = "background:url('./imagenes/botones_consultas/usos_permitidos/usos_permitidos.png'); background-color:#86B12D; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "plusvalia") {
        document.getElementById('plusvalia').style = "background:url('./imagenes/botones_consultas/plusvalia/plusvalia.png'); background-color:#a6a6a6; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Incremento Avaluo") {
        document.getElementById('Incremento Avaluo').style = "background:url('./imagenes/botones_consultas/incremento_avaluo/incremento_avaluo.png'); background-color:#a6a6a6; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Clasificacion_Uso") {
        document.getElementById('Clasificacion_Uso').style = "background:url('./imagenes/botones_consultas/clasificacion_uso/clasificacion_uso.png'); background-color:#00AD41; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "predios_actualizacion") {
        document.getElementById('predios_actualizacion').style = "background:url('./imagenes/botones_consultas/conservacion/conservacion.png'); background-color:#006D1B; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "propietario") {
        document.getElementById('propietario').style = "background:url('./imagenes/botones_consultas/buscar_propietario/propietario.png'); background-color:#008E30; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    } else if (id === "Impuesto Camara") {
        document.getElementById('Impuesto Camara').style = "background:url('./imagenes/botones_consultas/industria_y_comercio/industria_y_comercio.png'); background-color:#a6a6a6; min-height: 40px; border:0px; background-repeat:no-repeat; background-position: 50%; min-height: 35px;";
    }
}

function comparacion_imagenes() {
    window.open(
            'http://104.197.185.151/calidad/control/comparacion_imagenes/map.control.swipe.html',
            '_blank' // <- This is what makes it open in a new window.
            );
}
function ocultarstreetview() {
    document.getElementById("marco").style.display = "none";
    document.getElementById("botoncerrarstreetview").style.display = "none";
    document.getElementById("botonmostrarstreetview").style.display = "block";
}
function mostrarstreetview() {
    document.getElementById("marco").style.display = "block";
    document.getElementById("botoncerrarstreetview").style.display = "block";
    document.getElementById("botonmostrarstreetview").style.display = "none";
    //document.getElementById('map').style.width = '70%';
}
function ocultarstatistics() {
    document.getElementById("botonmostrarstatistics").style.display = "block";
    document.getElementById("botonocultarstatistics").style.display = "none";
    document.getElementById("statistics").style.display = "none";
}
function mostrarstatistics() {
    document.getElementById("statistics").style.display = "block";
    document.getElementById("botonmostrarstatistics").style.display = "none";
    document.getElementById("botonocultarstatistics").style.display = "block";
    document.getElementById('mensaje').style.display = 'none';
}
function ocultarpanelatributos() {
    document.getElementById("panel_atr").style.display = "none";
    document.getElementById("botonmaximizar").style.display = "block";
    document.getElementById("botonocultarpanelatributos").style.display = "none";
    //document.getElementById("panel_atributos").style.display = "none";
    //document.getElementById("tablaatributos").style.display = "none";
}
function mostrarpanelatributos() {
    document.getElementById("panel_atr").style.display = "block";
    document.getElementById("botonmaximizar").style.display = "none";
    document.getElementById("botonocultarstatistics").style.display = "none";
    document.getElementById("statistics").style.display = "none";
    //document.getElementById("panel_atributos").style.display = "block";
    document.getElementById("tablaatributos").style.display = "block";
    document.getElementById("botonmostrarpanelatributos").style.display = "none";
    //document.getElementById("botonocultarpanelatributos").style.display = "block";
}

function mapposi(coord, giro) {
	 var heading2 = fotopan2[0][3];
    var coo = coord.toString(function () {
        return(this.lat(), this.lng());
    });
    var res = coo.substr(1, coo.length - 2).split(",");
    var a = res[0];
    res[0] = +res[1]+0.0000002;
    res[1] = +a-0.00007500;
    var feat = new ol.Feature({
        geometry: new ol.geom.Point(res)
    });
    feat.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    var geom = feat.getGeometry();
    var view = map.getView();
    view.setCenter(geom.getFirstCoordinate());
    view.setZoom(19);
    var markerSource = highlight.getSource();
    markerSource.clear();
    
    
   
    
  if (heading2 >=0 && heading2 <= 60){
     //var constg = heading2 - 30;
	  //var constg = (30 * heading2) / 204;  
	  var constg = heading2 - 35;     
     var girops = giro+constg;
     var girops = ((giro+constg) * Math.PI) / 180;
     PSV.rotate({latitude: 0.3, longitude: girops});
    }
  else if (heading2 >=61 && heading2 <= 90){
     var constg = heading2 - 120;
	  /*var constg = (120 * heading2) / 75;  
	  var constg = heading2 - constg; */   
     var girops = giro+constg;
     //console.log(girops);
     var girops = ((giro+constg) * Math.PI) / 180;
     PSV.rotate({latitude: 0.3, longitude: girops});  
    }
    else if (heading2 >=91 && heading2 <= 120){
     var constg = heading2 - 210;
	  /*var constg = (120 * heading2) / 75;  
	  var constg = heading2 - constg; */   
     var girops = giro+constg;
     //console.log(girops);
     var girops = ((giro+constg) * Math.PI) / 180;
     PSV.rotate({latitude: 0.3, longitude: girops});  
    }
    else if (heading2 >=121 && heading2 <= 170){
     var constg = heading2 - 300;
	  /*var constg = (120 * heading2) / 75;  
	  var constg = heading2 - constg; */   
     var girops = giro+constg;
     //console.log(girops);
     var girops = ((giro+constg) * Math.PI) / 180;
     PSV.rotate({latitude: 0.3, longitude: girops});  
    }
    else if (heading2 >=171 && heading2 <= 220){
     var constg = heading2 - 30;
	  /*var constg = (120 * heading2) / 75;  
	  var constg = heading2 - constg; */   
     var girops = giro+constg;
     //console.log(girops);
     var girops = ((giro+constg) * Math.PI) / 180;
     PSV.rotate({latitude: 0.3, longitude: girops});  
    }
    else if (heading2 >=221 && heading2 <= 270){
    	
     var constg = heading2 - 120;
	  /*var constg = (120 * heading2) / 75;  
	  var constg = heading2 - constg; */   
     var girops = giro+constg;
     //console.log(girops);
     var girops = ((giro+constg) * Math.PI) / 180;
     PSV.rotate({latitude: 0.3, longitude: girops});  
    }
    else if (heading2 >=271 && heading2 <= 300){	
     var constg = heading2 - 210;
	  /*var constg = (120 * heading2) / 75;  
	  var constg = heading2 - constg; */   
     var girops = giro+constg;
     //console.log(girops);
     var girops = ((giro+constg) * Math.PI) / 180;
     PSV.rotate({latitude: 0.3, longitude: girops});  
    }
    else if (heading2 >=301 && heading2 <= 350){
     var constg = heading2 - 300;
	  /*var constg = (120 * heading2) / 75;  
	  var constg = heading2 - constg; */   
     var girops = giro+constg;
     //console.log(girops);
     var girops = ((giro+constg) * Math.PI) / 180;
     PSV.rotate({latitude: 0.3, longitude: girops});  
    }
    else if (heading2 >=351 && heading2 <= 360){
     var constg = heading2 - 30;
	  /*var constg = (120 * heading2) / 75;  
	  var constg = heading2 - constg; */   
     var girops = giro+constg;
     //console.log(girops);
     var girops = ((giro+constg) * Math.PI) / 180;
     PSV.rotate({latitude: 0.3, longitude: girops});  
    }
    
    if (giro >= 348.75 && giro <= 11.25) {
        highlight.setStyle(street1);
        //PSV.rotate({latitude: 0.3, longitude: 2.0});
    } else if (giro >= 11.25 && giro <= 33.75) {
        highlight.setStyle(street2);
        //PSV.rotate({latitude: 0.3, longitude: 2.4});
    } else if (giro >= 33.75 && giro <= 56.25) {
        highlight.setStyle(street3);
        //PSV.rotate({latitude: 0.3, longitude: 2.8});
    } else if (giro >= 56.25 && giro <= 78.75) {
        highlight.setStyle(street4);
        //PSV.rotate({latitude: 0.3, longitude: 3.1});
    } else if (giro >= 78.75 && giro <= 101.25) {
        highlight.setStyle(street5);
        //PSV.rotate({latitude: 0.3, longitude: 3.6});
    } else if (giro >= 101.25 && giro <= 123.75) {
        highlight.setStyle(street6);
        //PSV.rotate({latitude: 0.3, longitude: 3.9});
    } else if (giro >= 123.75 && giro <= 146.25) {
        highlight.setStyle(street7);
        //PSV.rotate({latitude: 0.3, longitude: 4.3});
    } else if (giro >= 146.25 && giro <= 168.75) {
        highlight.setStyle(street8);
        //;PSV.rotate({latitude: 0.3, longitude: 4.6});
    } else if (giro >= 168.75 && giro <= 191.25) {
        highlight.setStyle(street9);
        //PSV.rotate({latitude: 0.3, longitude: 5.1});
    } else if (giro >= 191.25 && giro <= 213.75) {
        highlight.setStyle(street10);
        //PSV.rotate({latitude: 0.3, longitude: 5.3});
    } else if (giro >= 213.75 && giro <= 236.25) {
        highlight.setStyle(street11);
        //PSV.rotate({latitude: 0.3, longitude: 5.5});
    } else if (giro >= 236.25 && giro <= 258.75) {
        highlight.setStyle(street12);
        //PSV.rotate({latitude: 0.3, longitude: 0.107});
    } else if (giro >= 258.75 && giro <= 281.25) {
        highlight.setStyle(street13);
        //PSV.rotate({latitude: 0.3, longitude: 0.31});
    } else if (giro >= 281.25 && giro <= 303.75) {
        highlight.setStyle(street14);
        //PSV.rotate({latitude: 0.3, longitude: 0.64});
    } else if (giro >= 303.75 && giro <= 326.25) {
        highlight.setStyle(street15);
        //PSV.rotate({latitude: 0.3, longitude: 1.1});
    } else if (giro >= 326.25 && giro <= 348.75) {
        highlight.setStyle(street16);
        //PSV.rotate({latitude: 0.3, longitude: 1.4});
    }
    markerSource.addFeature(feat);
}
function cerrarbarrasconsultas() {
    document.getElementById("barra_alineamiento").style.display = "none";
    document.getElementById("barra_predioshasusos").style.display = "none";
}
function upd(validac) {
    var urlphp = 'http://35.184.79.25/charge.php?ref=' + validac;
    $.ajax({
        url: urlphp,
        dataType: 'jsonp',
        type: "GET",
        async: false,
        success: function () {}
    });
    $('#myModalC').modal('hide');
    alert("Solicitud aceptada, mañana se veran reflejados sus cambios");
}
function alertDGC(mensaje) {
    var dgcTiempo = 500
    var ventanaCS = '<div class="dgcAlert"><div class="dgcVentana"><div class="dgcCerrar"></div><div class="dgcMensaje">' + mensaje + '<img id="avat2" src="./avatar/avatar_02.gif">' + '<br><div class="dgcAceptar">Aceptar</div></div></div></div></div>';
    $('body').append(ventanaCS);
    var alVentana = $('.dgcVentana').height();
    var alNav = $(window).height();
    var supNav = $(window).scrollTop();
    $('.dgcAlert').css('height', $(document).height());
    $('.dgcVentana').css('top', ((alNav - alVentana) / 2 + supNav - 100) + 'px');
    $('.dgcAlert').css('display', 'block');
    $('.dgcAlert').animate({opacity: 1}, dgcTiempo);
    $('.dgcCerrar,.dgcAceptar').click(function (e) {
        $('.dgcAlert').animate({opacity: 0}, dgcTiempo);
        setTimeout("$('.dgcAlert').remove()", dgcTiempo);
    });
}
window.alert = function (message) {
    alertDGC(message);
};
function habilitar(id, value)
{
    if (document.getElementById(id).checked === true)
    {
        document.getElementById(value).style.display = "block";
    } else {
        document.getElementById(value).style.display = "none";
    }
}
function enviargesstor() {
    if (modulo === "gestor") {
        var archiv = document.getElementById("datfil0");
        var archivo = archiv.files;
        var archiv1 = document.getElementById("datfil1");
        var archivo1 = archiv1.files;
        if (!document.getElementById("raddir").value || !document.getElementById("radest").value || !document.getElementById("raduso").value || archivo.length !== 1 || archivo1.length !== 1) {
            //console.log("1");
            return false;
        } else {
            //console.log("2");
            chargegestor();
        }
        //alert("GESSTOR INFORMA:</br></br>La solicitud ###### fue radicada exitosamente");
    } else if (modulo === "planeacionmisional") {
        var postData = '<Transaction service="WFS" xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://35.184.3.4:8080/geoserver/schemas/wfs/1.1.0/wfs.xsd">\
                    <Update typeName="user:gestor">\
                        <Property>\
                            <Name>observacionesp</Name>\
                            <Value>' + document.getElementById('observation').value + '</Value>\
                        </Property>\
                        <Filter>\
                            <FeatureId fid="gestor.' + document.getElementById('titleedit').innerHTML.split('...')[1] + '"/>\
                        </Filter>\
                        <Property>\
                            <Name>planeacion</Name>\
                            <Value>true</Value>\
                        </Property>\
                        <Filter>\
                            <FeatureId fid="gestor.' + document.getElementById('titleedit').innerHTML.split('...')[1] + '"/>\
                        </Filter>\
                    </Update>\
                </Transaction>';
        rooturl = 'http://35.184.3.4:8080/geoserver/user/ows?';
        $.ajax({
            type: "POST",
            url: rooturl,
            dataType: "xml",
            async: false,
            contentType: "text/xml",
            data: postData,
            success: function (xml) {
                alert('Datos actualizados con exito');
            },
            error: function (xml) {
                alert('Los datos NO se actualizaron');
            }
        });
        var slc = search("preproduccion:selgestor");
        var cont = 0;
        //$('#notmsn').text(cont);
        for (i = 0; i < slc.length; i++) {
            if (slc[i][9] !== true) {
                cont = cont + 1;
            }
        }
        if (cont !== 0)
        {
            $('#notmsn').text(cont);
        }else{
            $('#notmsn').text('');
        }
        hideMe();
        document.getElementById('butt1').disabled=true;
    } else if (modulo === "catastro") {
        var postData = '<Transaction service="WFS" xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://35.184.3.4:8080/geoserver/schemas/wfs/1.1.0/wfs.xsd">\
                    <Update typeName="user:gestor">\
                        <Property>\
                            <Name>observacionesc</Name>\
                            <Value>' + document.getElementById('observation').value + '</Value>\
                        </Property>\
                        <Filter>\
                            <FeatureId fid="gestor.' + document.getElementById('titleedit').innerHTML.split('...')[1] + '"/>\
                        </Filter>\
                        <Property>\
                            <Name>catastro</Name>\
                            <Value>true</Value>\
                        </Property>\
                        <Filter>\
                            <FeatureId fid="gestor.' + document.getElementById('titleedit').innerHTML.split('...')[1] + '"/>\
                        </Filter>\
                    </Update>\
                </Transaction>';
        rooturl = 'http://35.184.3.4:8080/geoserver/user/ows?';
        $.ajax({
            type: "POST",
            url: rooturl,
            dataType: "xml",
            async: false,
            contentType: "text/xml",
            data: postData,
            success: function (xml) {
                alert('Datos actualizados con exito');
            },
            error: function (xml) {
                alert('Los datos NO se actualizaron');
            }
        });
        var slc = search("preproduccion:selgestor");
        var cont = 0;
        //$('#notmsn').text(cont);
        for (i = 0; i < slc.length; i++) {
            if (slc[i][8] !== true) {
                cont = cont + 1;
            }
        }
        if (cont !== 0)
        {
            $('#notmsn').text(cont);
        }else{
            $('#notmsn').text('');
        }
        highlight.getSource().clear();
        hideMe();
        document.getElementById('butt1').disabled=true;
    } else if (modulo === "hacienda") {
        var postData = '<Transaction service="WFS" xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://35.184.3.4:8080/geoserver/schemas/wfs/1.1.0/wfs.xsd">\
                    <Update typeName="user:gestor">\
                        <Property>\
                            <Name>observacionesh</Name>\
                            <Value>' + document.getElementById('observation').value + '</Value>\
                        </Property>\
                        <Filter>\
                            <FeatureId fid="gestor.' + document.getElementById('titleedit').innerHTML.split('...')[1] + '"/>\
                        </Filter>\
                        <Property>\
                            <Name>hacienda</Name>\
                            <Value>true</Value>\
                        </Property>\
                        <Filter>\
                            <FeatureId fid="gestor.' + document.getElementById('titleedit').innerHTML.split('...')[1] + '"/>\
                        </Filter>\
                    </Update>\
                </Transaction>';
        rooturl = 'http://35.184.3.4:8080/geoserver/user/ows?';
        $.ajax({
            type: "POST",
            url: rooturl,
            dataType: "xml",
            async: false,
            contentType: "text/xml",
            data: postData,
            success: function (xml) {
                alert('Datos actualizados con exito');
            },
            error: function (xml) {
                alert('Los datos NO se actualizaron');
            }
        });
        var slc = search("preproduccion:selgestor");
        var cont = 0;
        //$('#notmsn').text(cont);
        for (i = 0; i < slc.length; i++) {
            if (slc[i][10] !== true) {
                cont = cont + 1;
            }
        }
        if (cont !== 0)
        {
            $('#notmsn').text(cont);
        }else{
            $('#notmsn').text('');
        }
        highlight.getSource().clear();
        hideMe();
        document.getElementById('butt1').disabled=true;
    }
}
function comparacion()
{
    window.open('./control/comp/comp.html', '_blank');
}
function cerrardirec()
{
    document.getElementById("consultas_totem").style.display = "none";
    document.getElementById("exp1").style.display = "none";
}
function existeUrl(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status !== 404;
}
function listaprediototem() {
    document.getElementById("inputdirecciontotemp").value = "";
    document.getElementById("inputrefcatotemp").value = "";
    var x = document.getElementById("sel1").value;
    if (x === 'Busqueda por Dirección') {
        document.getElementById("buscar_ref").style.display = "block";
        document.getElementById("inputdirecciontotemp").value = "";
        document.getElementById("inputrefcatotemp").value = "";
        document.getElementById("inputrefcatotemp").value = "";
        document.getElementById("products").style.display = "none";
        document.getElementById("inputdirecciontotemp").style.display = "block";
        document.getElementById("inputrefcatotemp").style.display = "none";
        document.getElementById("inputrefcatotemp").style.display = "none";
    } else if (x === 'Busqueda por Referencia Catastral') {
        document.getElementById("inputdirecciontotemp").value = "";
        document.getElementById("inputrefcatotemp").value = "";
        document.getElementById("inputrefcatotemp").value = "";
        document.getElementById("inputdirecciontotemp").style.display = "none";
        document.getElementById("products").style.display = "none";
        document.getElementById("inputrefcatotemp").style.display = "block";
        document.getElementById("inputmatriculatotemp").style.display = "none";
    } else if (x === 'Busqueda por Matricula Inmobiliaria') {
        document.getElementById("inputdirecciontotemp").value = "";
        document.getElementById("inputrefcatotemp").value = "";
        document.getElementById("inputrefcatotemp").value = "";
        document.getElementById("inputdirecciontotemp").style.display = "none";
        document.getElementById("products").style.display = "none";
        document.getElementById("inputrefcatotemp").style.display = "none";
        document.getElementById("inputmatriculatotemp").style.display = "block";
    }
}
function cambiocatastro() {
    if (document.getElementById("panel_atr_totem_catastro").style.display == "block") {
        document.getElementById("panel_atr_totem_catastro").style.display = "none";
        //document.getElementById("pestc").style.backgroundColor = "#F0AD4E";
        document.getElementById("pesth").style.display = "block";
        document.getElementById("pestp").style.display = "block";
        document.getElementById("pestp").style.top = "0em";
        document.getElementById("pestc").style.top = "0em";
        document.getElementById("pesth").style.top = "0em";
    } else {
        document.getElementById("panel_atr_totem_catastro").style.display = "block";
        document.getElementById("pestc").style.top = "0em";
        document.getElementById("pestp").style.top = "8em";
        //document.getElementById("pestc").style.backgroundColor = "#F0AD4E";
        //document.getElementById("pesth").style.display = "none";
        //document.getElementById("pestp").style.display = "none";  
    }
    //document.getElementById("pestp").style.backgroundColor = "#a6a6a6";
    //document.getElementById("pesth").style.backgroundColor = "#a6a6a6";
    document.getElementById("panel_atr_totem_hacienda").style.display = "none";
    document.getElementById("panel_atr_totem_planeacion").style.display = "none";
}
function cambiohacienda() {
    if (document.getElementById("panel_atr_totem_hacienda").style.display == "block") {
        document.getElementById("panel_atr_totem_hacienda").style.display = 'none'
        document.getElementById("pestc").style.top = "0em";
        document.getElementById("pestp").style.top = "0em";
        document.getElementById("pesth").style.top = "0em";
        //document.getElementById("pesth").style.backgroundColor = "#5CB85C";
    } else {
        document.getElementById("panel_atr_totem_hacienda").style.display = "block";
        document.getElementById("pestc").style.top = "13.5em";
        document.getElementById("pestp").style.top = "13.5em";

        //document.getElementById("pesth").style.backgroundColor = "#5CB85C";
    }
    //document.getElementById("pestp").style.backgroundColor = "#a6a6a6";
    //document.getElementById("pestc").style.backgroundColor = "#a6a6a6";
    document.getElementById("panel_atr_totem_catastro").style.display = "none";
    document.getElementById("panel_atr_totem_planeacion").style.display = "none";
}
function cambioplaneacion() {
    if (document.getElementById("panel_atr_totem_planeacion").style.display == "block") {
        document.getElementById("panel_atr_totem_planeacion").style.display = "none";
        //document.getElementById("pestp").style.backgroundColor = "#A6A6A6";
        document.getElementById("pesth").style.display = "block";
        document.getElementById("pestc").style.display = "block";
        document.getElementById("pesth").style.top = "0em";
        document.getElementById("pestc").style.top = "0em";
        document.getElementById("pestp").style.top = "0em";
    } else {
        document.getElementById("panel_atr_totem_planeacion").style.display = "block";
        document.getElementById("panel_atr_totem_hacienda").style.display = "none";
        //document.getElementById("pestp").style.backgroundColor = "#639BB3";
        document.getElementById("pesth").style.display = "block";
        document.getElementById("pestc").style.display = "block";
        document.getElementById("pesth").style.top = "0em";
        document.getElementById("pestc").style.top = "0em";
        document.getElementById("pestp").style.top = "0em";
        //document.getElementById("pestp").style.top = "13em";
    }
    //document.getElementById("pesth").style.backgroundColor = "#a6a6a6";
    //document.getElementById("pestc").style.backgroundColor = "#a6a6a6";
    document.getElementById("panel_atr_totem_hacienda").style.display = "none";
    document.getElementById("panel_atr_totem_catastro").style.display = "none";
}
function menutotem() {
    document.getElementById("pestp").style.backgroundColor = "#a6a6a6";
    document.getElementById("pesth").style.backgroundColor = "#639BB3";
    document.getElementById("pestc").style.backgroundColor = "#a6a6a6";
    document.getElementById("panel_atr_totem").style.display = "block";
    document.getElementById("panel_atr_totem_catastro").style.display = "none";
    document.getElementById("inputdirecciontotemp").value = "";
    document.getElementById("volvertotem").style.display = "none";
    document.getElementById("menu_totemp").style.display = "block";
    document.getElementById("sel1").value = 'Seleccione el tipo de Busqueda';
    document.getElementById("inputdirecciontotemp").style.display = "none";
    document.getElementById("products").style.display = "block";
}
function enviarcorreo(ref) {
    //console.log(ref);
    //var dat = enviarRef(ref);
    //console.log(dat);
    document.getElementById("inputemail").value;
    var urls = "./mail/envio_mail.php";
    var req = new ajaxRequest();
    var url = urls + "?c=" + document.getElementById("inputemail").value + "&ref=" + ref;
    req.open("GET", url, false);
    req.send();
    alert("<br>La información fue enviada al correo electrónico:<br><br>" + document.getElementById("inputemail").value + "<br><br><br><br>");
}
function volvertotemboton() {
    document.getElementById("volver").style.display = "none";
    document.getElementById("menu_predio").style.display = "none";
    document.getElementById("menumanzanatotem").style.display = "none";
    document.getElementById("menubarriototem").style.display = "none";
    document.getElementById("menusitiostotem").style.display = "none";
    document.getElementById("menu_totemp").style.display = "block";
}

function ajaxRequest() {
    try {
        var request = new XMLHttpRequest();
    } catch (e1) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e2) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e3) {
                request = false;
            }
        }
    }
    return request;
}

function formatNumber(n) {
    n = String(n).replace(/\D/g, "");
    return n === '' ? n : Number(n).toLocaleString();
}

//funcion para capturar paramtros url
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var coordenadas = getParameterByName('coordenadas');
var ccc = coordenadas.split(",", 2);
try {
    eval("function initialize(){var fenway={lat:" + ccc[0] + ",lng:" + ccc[1] + "};panorama=new google.maps.StreetViewPanorama(document.getElementById('pano'),{position:fenway,pov:{heading:34,pitch:10},linksControl:false});panorama.addListener('position_changed',function(){window.parent.mapposi(panorama.getPosition(),panorama.getPov().heading);});panorama.addListener('pov_changed',function (){window.parent.mapposi(panorama.getPosition(),panorama.getPov().heading);});}");
    //panorama.addListener('position_changed', function() {alert("w"); var positionCell = document.getElementById('cerrar');positionCell.firstChild.nodeValue = panorama.getPosition() + '';});
} catch (err) {
}






