/**
 * Implements hook_menu().
 */
function fotos_de_usuario_menu() {
  var items = {};
  items['fotos_de_usuario/%'] = {
    title: 'Galería',
    page_callback: 'fotos_de_usuario_page',
    options:{
        transition: 'pop',
        reloadPage: true
    },
    pageshow: 'fotos_de_usuario_pageshow',
    page_arguments: [1]
  };
  return items;
}

/**
 * The page callback to display the view.
 */
function fotos_de_usuario_page(par) {
  try {
    var content = {};

    var header = [];
  	//header.push({data: 'id'});
  	//header.push({data: 'Subject'});
  	var rows = [];
  	var content = {};
  	content['fotos_table'] = {
   		theme: 'table',
    	header: header,
    	rows: rows,
    	attributes: {
      		id: 'fotos_table',
      		style: 'width: 100%'
    	}
  	}; 
  	return content;
  }
  catch (error) { console.log('fotos_de_usuario_page - ' + error); }
}

/**
 * Pageshow callback.
 */
function fotos_de_usuario_pageshow(par) { 
	try{
  	//var path_to_view = 'fotos_de_usuario';
  	views_datasource_get_view_result('fotos_de_usuario/' + par, {
      success: function(data) { 
        if (data.nodes.length > 0) {
        	var items = [];
          	$.each(data.nodes, function(index, object){
            	var u = object.node; 
              	//items.push([u.uid, l(u.name, 'node/' + u.uid)]);
              	items.push([l('<img src='+ u.foto.src +' style="width: 100%;"></img>', 'perfil_de_usuario/' + u.uid)]);
            });
        	drupalgap_table_populate("#fotos_table", items);
        }
      }
  	});
	} catch (error) {
            console.log(
              'fotos_de_usuario_pageshow - success - ' + error
            );
          }
}
