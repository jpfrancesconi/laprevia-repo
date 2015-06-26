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
       
    var div_atributos = {
      id: 'perfil_content'+par,
      style: 'width: 100%; height: 300px;'
    };

    content['perfil'] = {
      markup: '<div ' + drupalgap_attributes(div_atributos) + '></div>'
    };
    content['like'] = {
      theme: 'button',
      text: 'Like',
      attributes: {
        style:"float:left; width: 30%;",
        id:"like",
        onclick: "drupalgap_alert('Like enviado!');"
      }
    };
    
    content['chat'] = {
      theme: 'button',
      text: 'Chat',
      attributes: {
        style:"float:right; width: 30%;",
        id:"chat",
        onclick: "drupalgap_alert('Esta chica es mucho para vos!');"
      }
    };
    return content;
  } catch (error) { console.log( 'perfil_de_usuario_page - ' + error ); }
}

//content = '<p>Hola</p>' + '<img src='+ row.imagen.src +' style="border-radius: 100%;"></img>';

/**
 * Pageshow callback.
 */
function perfil_de_usuario_pageshow(par) {  
  try{
    var css_selector =  '#perfil_content'+par;

    views_datasource_get_view_result('perfil_de_usuario/'+ par, {
      success: function(data) {
        if (data.users.length > 0) {
           $(css_selector).html('');
            $.each(data.users, function(index, object){
              var u = object.user; 
                //items.push([u.uid, l(u.name, 'node/' + u.uid)]);
                
                $('<p style="font-size: 20px; float:left; width: 100%;">').html(u.name+', '+u.uid+' años').appendTo($(css_selector));
                //$('<div id="imagen-usuario" style="float:left;">').html('<a href="fotos_de_usuario/'+ u.uid +'"><img src='+ u.imagen.src +' style="width: 100%; "></img></a>').appendTo($(css_selector));
                $('<div id="imagen-usuario" style="float:left;">').html(l('<img src='+ u.imagen.src +' style="width: 100%;"></img>', 'fotos_de_usuario/' + u.uid)).appendTo($(css_selector));
                

                //items.push([l('<img src='+ u.imagen.src +' style="border-radius: 100%;"></img>', 'perfil_de_usuario/' + u.uid)]);
                //$('<div class="like" style="width: 70px; height: 100px;float:right; background-color:red;">').html(l('LIKE', 'galeria_de_usuarios')).appendTo($(css_selector));
                //$('<div class="galeria" style="width: 70px; height: 100px;float:right; background-color:green;">').html('').appendTo($(css_selector));
                
            })
            $(css_selector).rebuild();
          //io_drupalgap_table_populate("#usuarios_table", items);
        }
      }
    });
	
  } catch (error) { console.log( 'perfil_de_usuario_pageshow - success - ' + error ); }
}


/*

content['perfil_de_usuario'] = {
      theme: 'view',
      format: 'unformatted_list',
      path: 'perfil_de_usuario/'+ par, 
      row_callback: 'perfil_de_usuario_list_row',
      
      attributes: {
        id: 'perfil_list_view'
      }
    };
    return content;

*/