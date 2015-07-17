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
      		style: 'width: 100%'
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
              	//items.push([u.uid, l(u.name, 'node/' + u.uid)]);
              	items.push([l('<img src='+ u.foto.src +' style="width: 100%;"></img>', 'perfil_de_usuario/' + u.id)]);
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
