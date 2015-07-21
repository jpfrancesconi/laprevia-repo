/**
 * Implements hook_menu().
 */
function muro_menu() {
  var items = {};
  items['muro'] = {
    title: 'Muro',
    page_callback: 'muro_page',
    options:{
        transition: 'pop',
        reloadPage: true
    },
    pageshow: 'muro_pageshow'
  };
  return items;
}

/**
 * The page callback to display the view.
 */
function muro_page() {
  try {
    var content = {};

    var header = [];
  	//header.push({data: 'id'});
  	//header.push({data: 'Subject'});
  	var rows = [];
  	var content = {};
  	content['muro_table'] = {
   		theme: 'table',
    	header: header,
    	rows: rows,
    	attributes: {
      		id: 'muro_table',
      		style: 'width: 100%;'
    	}
  	}, 
    content['logout'] ={
      theme: 'button_link',
      text: t('Salir'),
        path:'user/logout',
        attributes:{
          //onclick: 'getInfoForLogin();'
        },
          options:{
          reloadPage:true
        }
    };
  	return content;
  }
  catch (error) { console.log('muro_page - ' + error); }
}

/**
 * Pageshow callback.
 */
function muro_pageshow() { 
	try{
  	//var path_to_view = 'muro';
  	views_datasource_get_view_result('muro', {
      success: function(data) { 
        if (data.nodes.length > 0) {
        	var items = [];
          	$.each(data.nodes, function(index, object){
            	var u = object.node; 
                // picture o avatar del usuario que publico el contenido
                items.push([l('<img src='+ u.iuser.src +' style="float: left; width: 15%; border-radius: 50%"></img>', 'perfil_de_usuario/' + u.aid)]);
                // Nombre del Usuario que publico el contenido
                //items.push(['<a href="perfil_de_usuario/' + u.aid+'" style="text-decoration: none;">'+ u.nombre +'</a>']);
                items.push([l(''+u.nombre, 'perfil_de_usuario/' + u.aid, { attributes: { 'style': 'text-decoration: none;' } })]);
                // Tiempo desde que se publico el contenido
                items.push(['<p style="font-size: 10px;">Hace: '+u.fecha+'</p>']);
                // Imagen o estado del contenido
              	items.push([l('<img src='+ u.foto.src +' style="width: 100%; height:50%;"></img>', 'perfil_de_usuario/' + u.id)]);
                                
                if(u.votos.indexOf("you") > -1){
                  items.push(['<input type="checkbox" checked onclick="votar(this, '+u.nid+', '+u.numVotos+',1);"> <b><span id="'+u.nid+'_nv">Me Gusta - ('+ u.numVotos +')</span></b></input>']);
                } else {
                  items.push(['<input type="checkbox" onclick="votar(this, '+u.nid+', '+u.numVotos+',0);"> <b><span id="'+u.nid+'_nv">Me Gusta ('+ u.numVotos +')</span></b></input>']);
                }

                // Cantidad de comentarios del contenido y la posibilidad de agregar uno
                //items.push(['<a style="margin-left: 10px; color: #000000;">'+u.clink+' ('+u.ccomentarios+')</a>']);
                items.push([l(''+u.clink+' ('+u.ccomentarios+')', 'node/' + u.nid, { attributes: { 'style': 'text-decoration: none; margin-left: 10px; color: #000000;' } })]);

            });
        	io_armar_muro("#muro_table", items);
        }
      }
  	});
	} catch (error) {
            console.log(
              'muro_pageshow - success - ' + error
            );
          }
}

//Funcion que incrementa o decrementa la cantidad de me gusta que tenga una publicación
function votar(a, nodoId, n, modo) {
    //modo = 1 estaba chequeado por el usuario
    //modo = 0 NO estaba chequeado por el usuario

    _theme_rate_template_thumbs_up_onclick(a, 'node', nodoId, 'vote');
    
    //recuperamos el tag html
    var table_css_selector = '#'+nodoId+'_nv';
    var texto = "";

    $(table_css_selector).html('');
    if(modo == 1)
    {
      if(!a.checked)
        n = n-1;
    } else if (modo == 0) {
      if(a.checked)
        n = n+1;
    }

    texto = "Me Gusta ("+ n +")";
    //$('<p>').html(texto).appendTo($(table_css_selector));
    //$(table_css_selector).rebuild();
    $(table_css_selector).text( texto );
}