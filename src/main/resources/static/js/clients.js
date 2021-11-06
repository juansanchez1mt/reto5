let server = "http://140.238.152.87:8080";
//let server = "http://localhost:8080";

function traerInformacionClientes(){
    $.ajax({
        url: server+"/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>EMAIL</th><th>PASSWORD</th><th>NAME</th><th>AGE</th><th colspan='3'>MENU</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button class='ui yellow button' onclick=' actualizarInformacionClientes("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button class='ui red button' onclick='borrarClientes("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function guardarInformacionClientes(){

    if($("#Clpassword").val().length == 0 || $("#Clname").val().length == 0  || $("#Clage").val().length == 0){
        alert("Los campos password, nombre y age deben estar llenos")
    }else{
    let var2 = {
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url: server+"/api/Client/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });
    }
}

function actualizarInformacionClientes(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#Clemail").val()!= '' ?  $("#Clemail").val(): null,
        password:$("#Clpassword").val()!= '' ?  $("#Clpassword").val(): null,
        name:$("#Clname").val()!= '' ?  $("#Clname").val(): null,
        age:$("#Clage").val()!= '' ?  $("#Clage").val(): null,
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: server+"/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            $("#idClient").val("");
            $("#Clemail").val(""),
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            traerInformacionClientes();
            alert("se ha Actualizado correctamente el cliente")
        }
    });

}



function borrarClientes(idElemento){
	console.log(idElemento);
    let myData={
        idClient: idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: server+"/api/Client/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            traerInformacionClientes();
            alert("Se ha Eliminado.")
        }
    });

}


