//let server = "http://140.238.152.87:8080";
let server = "http://localhost:8080";
let categoriaList;
function traerInformacionBikes() {
    $.ajax({
        url: server+"/api/Bike/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {

    let myTable = "<table class='ui center aligned celled table'>" + "<thead><tr><th>BRAND</th><th>YEAR</th><th>NAME</th><th>DESCRIPTION</th><th>CATEGORIA</th><th colspan='3'>MENU</th></tr></thead>"

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].brand + "</td>";
        myTable += "<td>" + respuesta[i].year + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td>" + respuesta[i].category.name + "</td>";
        myTable += "<td> <button class='ui yellow button' onclick=' actualizarInformacionBikes(" + respuesta[i].id + ")'>Actualizar</button>";
        myTable += "<td> <button class='ui red button' onclick='borrarBikes(" + respuesta[i].id + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacionBikes() {

    var fecha = $("#Yearbk").val();
    var vector = Array();
    vector=fecha.split("-");
    //console.log(vector[0]);

    var catId = parseInt($("#select-client").val());
    var categoriad= {'id':catId};
    

	if($("#brandbk").val().length == 0 || $("#Yearbk").val().length == 0 ){
        alert("Todos los campos deben estar llenos")
    }else{
        let var2 = {
            brand: $("#brandbk").val(),
            year: vector[0],
            name: $("#Namebk").val(),
            description: $("#Descriptionbk").val(),
            category: categoriad
        };
        //console.log("datos",var2);
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),

            url: server+"/api/Bike/save",


            success: function (response) {
                //console.log(response);
                //console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload();
            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload();
                alert("No se guardo correctamente");
            }
        });
    }
}

function actualizarInformacionBikes(idElemento) {

  if($("#select-client").val() != ''){
    alert("La Categoria no se debe actualizar")
  }else{
  var fecha = $("#Yearbk").val();
  var vector = Array();
  vector=fecha.split("-");
  console.log(vector[0]);
	
  var catId = parseInt($("#select-client").val());
  var categoriad= {'id':catId};

    let myData = {
        id: idElemento,
        brand: $("#brandbk").val()!= '' ?  $("#brandbk").val(): null,
        year: vector[0]!= '' ?  vector[0]: null,
        name: $("#Namebk").val()!= '' ?  $("#Namebk").val(): null,
        description: $("#Descriptionbk").val()!= '' ?  $("#Descriptionbk").val(): null,
        //category: $("#select-client").val() != '' ?  categoriad : {'id':0},
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: server+"/api/Bike/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado1").empty();
            $("#brandbk").val("");
            $("#Yearbk").val("");
            $("#Namebk").val("");
            $("#select-client").val("");
            $("#Descriptionbk").val("");
            traerInformacionBikes();
            alert("Se ha actualizado correctamente la bike")
        }
    });

  }

}



function borrarBikes(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: server+"/api/Bike/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            traerInformacionBikes();
            alert("Se ha Eliminado.")
        }
    });

}


function autoInicioRelacionBike(){
    
    $.ajax({
        url: server+"/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            categoriaList=respuesta;
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
/*
function categoriaRelacionBike(cat){
    
    $.ajax({
        url: server+"/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $.each(respuesta, function (key, value) {
                if(value.id==cat){
                    console.log(value);
                    objeto = {id:value.id};
                }
            }); 
        }
    
    })
}
*/

