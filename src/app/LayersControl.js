// Create layers instances

var geoserverUrl= 'http://35.226.110.153:8081/geoserver/soledad/';

var highlightfeatures = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});

var highlightfeaturespredios = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});


var streetmap = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    /*minResolution:2,
     maxResolution:20,*/
    name: 'Street Map'
});



var bing = new ol.layer.Tile({
    visible: false,
    source: new ol.source.BingMaps({
        key: 'LAx1oGVyN8TZwSTH1RC1~hnxyYFGev93MbI6hBUQOZQ~AjSJCfyU_TmBIhT5SRRpRIOBHVnA0zTKFRKEVuP-XHE3LAMKr-1ZcqtTq4YTRLds',
        imagerySet: 'Aerial'
    }), name: 'Satelite'
});


var predio = new ol.layer.Tile({
    
    visible: true,
  
    source: new ol.source.TileWMS({
        //url: 'http://35.184.176.7:8081/geoserver/soledad/wms',
        url: geoserverUrl+'wms',
        params: {LAYERS: 'soledad:predios_street_view_captura', STYLES: ''}
    }), name: 'Predios'
});

var recorrido = new ol.layer.Tile({ 
    visible: true,
    //preload: Infinity,
   
    source: new ol.source.TileWMS({
        url: geoserverUrl+'wms',
        params: {LAYERS: 'soledad:gesstorstreetviews', STYLES: ''}
    }), name: 'Recorrido'
});

var perimetro = new ol.layer.Tile({
   
    visible: true,

    source: new ol.source.TileWMS({
        url: geoserverUrl+'wms',
        params: {LAYERS: 'soledad:u_perimetro', STYLES: ''}
    }), name: 'Perimetro'
});

var construcciones = new ol.layer.Tile({
   
    visible: true,

    source: new ol.source.TileWMS({
        url: geoserverUrl+'wms',
        params: {LAYERS: 'soledad:u_construccion', STYLES: ''}
    }), name: 'Construcciones'
});



// WFS-T

var puntosedicion = new ol.layer.Tile({
    visible: true,
    source: new ol.source.TileWMS({
        url: geoserverUrl+'wfs',
        params: {LAYERS: 'soledad:wfs_point', STYLES: ''}
    }), name: 'Puntos Edición'
});



var sourceWFS = new ol.source.Vector({
    loader: function (extent) {
        $.ajax(geoserverUrl+'ows', {
            type: 'GET',
            data: {
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                typename: 'wfs_point',
                srsname: 'EPSG:3857',
                bbox: extent.join(',') + ',EPSG:3857'
            }
        }).done(function (response) {
            sourceWFS.addFeatures(formatWFS.readFeatures(response));
        });
    }, 
    //strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ()),
    strategy: ol.loadingstrategy.bbox,
    projection: 'EPSG:3857'
});


var layerWFS = new ol.layer.Vector({
    
  visible: true,
  source: sourceWFS,
  name: 'Puntos Edición'
    //style: countryStyle
});


var ortofotobarranquilla = new ol.layer.Tile({
	visible: true,
	//extent: [-8327260.364201, 1222858.919582, -8322258.496345, 1225741.130983],
	source: new ol.source.XYZ({
   url: "http://35.184.53.233:8081/dashboard/ortofoto/{z}/{x}/{y}.png"	
	}), name: 'Ortofoto'
});

var ortofoto2019 = new ol.layer.Tile({
	 visible: true,
	 opacity: 0,
	 source: new ol.source.XYZ({
	 	url: 'http://www.ideepsoledad.com/ortofoto/{z}/{x}/{y}.png',
	 	}), name: 'Ortofotografía 2019'
});



//CAPS GROUP

var layerOrtofoto = new ol.layer.Group({
layers: [ortofoto2019, highlightfeatures],
name: 'Ortofotografía 2019'
});

var layerCatastro = new ol.layer.Group({
    layers: [perimetro, puntosedicion, predio, construcciones, layerWFS, highlightfeatures, highlightfeaturespredios],
    name: 'Catastro'
});


var layerBase = new ol.layer.Group({
    layers: [bing, streetmap, highlightfeatures],
    name: 'Capas Base'
});


function buildLayerTree(layer) {
    var elem;
    var name = layer.get('name') ? layer.get('name') : "Group";
    if (name != 'Group') {
        if (layer.values_.visible == true && layer.get('name') != 'CAPAS') {
            var div = "<li data-layerid='" + name + "'>" + "<span><img src='image/" + layer.get('name') + ".jpg' alt='Smiley face' height='20' width='20' >" + layer.get('name') + "</span>" + "<i class='glyphicon glyphicon-check'></i> ";
        } else if (layer.get('name') == 'CAPAS') {
            var div = "<li data-layerid='" + name + "'>" + "<span><img src='image/" + layer.get('name') + ".png' alt='Smiley face' height='20' width='120' style='margin-top:0.5em; margin-left:1.5em'>" /*+ layer.get('name') */ + "</span>";
        } else {
            var div = "<li data-layerid='" + name + "'>" + "<span><img src='image/" + layer.get('name') + ".jpg' alt='Smiley face' height='20' width='20'>" + layer.get('name') + "</span>" + "<i class='glyphicon glyphicon-unchecked'></i> ";
        }
        if (layer.getLayers) {
            var sublayersElem = '';
            var layers = layer.getLayers().getArray(),
                    len = layers.length;
            for (var i = len - 2; i >= 0; i--) {
                sublayersElem += buildLayerTree(layers[i]);
            }
            elem = div + " <ul>" + sublayersElem + "</ul></li>";
        } else {
            elem = div + " </li>";
        }
        return elem;
    }
}
/**
 * Initialize the tree from the map layers
 * @returns {undefined}
 */
function initializeTree() {
    var elem = buildLayerTree(map.getLayerGroup());
    $('#layertree').empty().append(elem);
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    var longitud = $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch').length
    for (var i = 0; i < longitud; i++) {
        var colapse = $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch')[i];
        var colap = $(colapse).parent('li.parent_li').find(' > ul > li');
        colap.hide('fast');
    }
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
        }
        e.stopPropagation();
    });
}
/**
 * Finds recursively the layer with the specified key and value.
 * @param {ol.layer.Base} layer
 * @param {String} key
 * @param {any} value
 * @returns {ol.layer.Base}
 */
function findBy(layer, key, value) {
    if (layer.get(key) === value) {
        return layer;
    }
    // Find recursively if it is a group
    if (layer.getLayers) {
        var layers = layer.getLayers().getArray(),
                len = layers.length, result;
        for (var i = 0; i < len; i++) {
            result = findBy(layers[i], key, value);
            if (result) {
                return result;
            }
        }
    }
    return null;
}
$(document).ready(function () {
    initializeTree();
    // Handle opacity slider control
    $('input.opacity').slider().on('slide', function (ev) {
        var layername = $(this).closest('li').data('layerid');
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setOpacity(ev.value);
    });
    // Handle visibility control
    $('i').on('click', function () {
        var layername = $(this).closest('li').data('layerid');
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setVisible(!layer.getVisible());
        if (layer.getVisible()) {
            $(this).removeClass('glyphicon-unchecked').addClass('glyphicon-check');
        } else {
            $(this).removeClass('glyphicon-check').addClass('glyphicon-unchecked');
        }
    });
});
