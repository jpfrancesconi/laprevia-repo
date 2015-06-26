/**
* Pagina que muestra el detalle de perfil del usuarios seleccionado
*/

/**
 * Implements hook_menu().
 */
function perfil_de_usuario_menu() {
  var items = {};
  items['perfil_de_usuario/%'] = {
    title: 'Perfil',
    page_callback: 'perfil_de_usuario_page',
    options:{
        transition: 'pop',
        reloadPage: true
    },
    pageshow: 'perfil_de_usuario_pageshow',
    page_arguments: [1]
  };
  return items;
}

/**
 * Page callback para mostrar la Vista.
 */
function perfil_de_usuario_page(par) {
  try {
    var content = {};
    content['perfil_de_usuario'] = {
      theme: 'view',
      format: 'unformatted_list',
      path: 'perfil_de_usuario/'+ par, /* the path to the view in Drupal */
      row_callback: 'perfil_de_usuario_list_row',
      
      attributes: {
        id: 'perfil_list_view'
      }
    };
    return content;
  } catch (error) { console.log( 'perfil_de_usuario_page - ' + error ); }
}

/**
 * El row callback para mostrar una fila simple.
 */
function perfil_de_usuario_list_row(view, row) {
  try {
    var content = '';

      //'texto':  ,
      //'foto': l('<img src='+ row.imagen.src +' style="border-radius: 100%;"></img>', 'perfil_de_usuario/' + row.uid, {transition:'flip'}, {reloadPage:true})

    content = '<p>Hola</p>' + '<img src='+ row.imagen.src +' style="border-radius: 100%;"></img>';
  
    return content;
    //return l(row.name, 'node/' + row.uid);
  }
  catch (error) { console.log('perfil_de_usuario_list_row - ' + error); }
}

/**
 * Pageshow callback.
 */
function perfil_de_usuario_pageshow() {  
  try{
	
  } catch (error) { console.log( 'perfil_de_usuario_pageshow - success - ' + error ); }
}
