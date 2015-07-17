/**
 * Implements hook_menu().
 */
function galeria_de_usuarios_menu() {
  var items = {};
  items['galeria_de_usuarios'] = {
    title: 'Usuarios',
    page_callback: 'galeria_de_usuarios_page',
    pageshow: 'galeria_de_usuarios_pageshow'
  };
  return items;
}

/**
 * The page callback to display the view.
 */
function galeria_de_usuarios_page() {
  try {
    var content = {};
       
    var div_atributos = {
      id: 'galeria',
      class: 'galeria'
    };

    content['perfil'] = {
      markup: '<div ' + drupalgap_attributes(div_atributos) + '></div>'
    }; 

  	return content;
  }
  catch (error) { console.log('galeria_de_usuarios_page - ' + error); }
}

/**
 * Pageshow callback.
 */
function galeria_de_usuarios_pageshow() { 
	try{
  	//var path_to_view = 'galeria_de_usuarios';
  	views_datasource_get_view_result('galeria_de_usuarios', {
      success: function(data) { 
        if (data.users.length > 0) {
        	var items = [];
          	$.each(data.users, function(index, object){
            	var u = object.user; 
              	//items.push([l('<p style="border-radius: 100%;">'+ u.name +'</p>', 'perfil_de_usuario/' + u.uid)]);
              	//items.push([l('<img src='+ u.imagen.src +' style="border-radius: 100%;"></img>', 'perfil_de_usuario/' + u.uid)]);5
            	items.push([l('<img src='+ u.imagen.src +' style="border: solid 1px #FFFFFF; border-radius: 0%; width:100%; height:100%; z-index: -1;"></img><a href="#" style="position:absolute; left: 0%; bottom:4%; background-color: white; font-family: Source Sans Pro, sans-serif; font-size: 12px; text-decoration:none; color:#000000; border-radius: 0%;">&nbsp;'+ u.name +'</a>', 'perfil_de_usuario/' + u.uid)]);
            });
        	//io_drupalgap_table_populate("#usuarios_table", items);
          io_armar_galeria("#galeria", items);
        }
      }
  	});
	} catch (error) {
            console.log(
              'galeria_de_usuarios_pageshow - success - ' + error
            );
          }
}
