//let server = "http://140.238.152.87:8080";
let server = "http://localhost:8080";
function traerInformacionCategorias() {
    $.ajax({
        url: server+"/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
    
}

function pintarRespuesta(respuesta) {

    /*let myTable="<table class='ui celled table'>
    
    "; */
    //let myTable = "<table class='ui celled table'>" + "<tr><th>NAME<th>DESCRIPTION</tr>"+;//
    let myTable = "<table class='ui center aligned celled table'>" + "<thead><tr><th>NAME</th><th>DESCRIPTION</th><th colspan='3'>MENU</th></tr></thead>"

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        //myTable += "<td>" + respuesta[i].brand + "</td>";
        //myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td> <button class='ui yellow button' onclick=' actualizarInformacionCategorias(" + respuesta[i].id + ")'>Actualizar</button>";
        myTable += "<td> <button class='ui red button' onclick='borrarCategoria(" + respuesta[i].id + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacionCategorias() {
	if($("#Cname").val().length == 0 || $("#Cdescription").val().length == 0 ){
        alert("Todos los campos deben estar llenos")
    }else{
    let var2 = {
        name: $("#Cname").val(),
        description: $("#Cdescription").val()
    };

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),

        url: server+"/api/Category/save",


        success: function (response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");


        }
    });
	}
}

function actualizarInformacionCategorias(idElemento) {
	

    let myData = {
        id: idElemento,
        name: $("#Cname").val()!= '' ?  $("#Cname").val(): null,
        description: $("#Cdescription").val()!= '' ?  $("#Cdescription").val(): null

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: server+"/api/Category/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategorias();
            alert("se ha Actualizado correctamente la categoria")
        }
    });



}



function borrarCategoria(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: server+"/api/Category/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            traerInformacionCategorias();
            alert("Se ha Eliminado.")
        }
    });

}


