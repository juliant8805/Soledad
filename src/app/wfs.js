var photosphereG = "";
var r = "";
var coordG = [];
var eG = [];
function mapviewer(photosphere, e){
    //console.log(PSV);
photosphereG = photosphere;
eG = e;
var formatWFS = new ol.format.WFS();
var formatGML = new ol.format.GML({
    featureNS: 'http://35.226.110.153:8081/geoserver/soledad',
    featureType: 'wfs_point',
    srsName: 'EPSG:3857'
});       
var xs = new XMLSerializer();
var interaction;
var interactionSelectPointerMove = new ol.interaction.Select({
    condition: ol.events.condition.pointerMove
});
var interactionSelect = new ol.interaction.Select({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#FF2828'
        })
    })
}); 
puntosedicion.setVisible(true);
interaction = new ol.interaction.Draw({
type: 'Point',
source: layerWFS.getSource()
});
//map.addInteraction(interaction); 
            document.getElementById("panel_atr_update").style.display = "block";
           
}
