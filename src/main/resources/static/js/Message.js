//let server = "http://140.238.152.87:8080";
let server = "http://localhost:8080";

function autoInicioRelacionCliente(){
    
    $.ajax({
        url: server+"/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}



function autoInicioMensajes(){
    console.log("se esta ejecutando")
    $.ajax({
        url: server+"/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            pintarRespuestaMensajes(respuesta);
        }
    
    })

}

function autoInicioRelacionBike(){
    
    $.ajax({
        url: server+"/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-bike");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}


function pintarRespuestaMensajes(respuesta){
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>ID</th><th>MENSAJE</th><th>CLIENTE</th><th>BICICLETA</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        let messageText = respuesta[i].messageText? respuesta[i].messageText : null;
        let clienteName = respuesta[i].client? respuesta[i].client.name : null;
        myTable+="<tr>";
        myTable+="<td>"+ respuesta[i].idMessage +"</td>";
        myTable+="<td>"+ messageText +"</td>";
        myTable+="<td>"+ clienteName + "</td>";
        myTable+="<td>"+ respuesta[i].bike.name +"</td>";
        myTable+="<td> <button class='ui yellow button' onclick=' actualizarInformacionMessage("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button class='ui red button' onclick='borrarMessage("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMensajes").html(myTable);
}




function guardarInformacionMessage(){
    if ($("#messagetext").val().length==0 || $("#select-client").val().length==0 || $("#select-bike").val().length==0){

        alert("Todos los campos son obligatorios");
    }else{
    
    
    let var2 = {
        
        messageText:$("#messagetext").val(),
        client:{idClient: +$("#select-client").val()},
        bike: {id:$("#select-bike").val()},

     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url: server+"/api/Message/save",
       
        
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

function actualizarInformacionMessage(idElemento){
    if ($("#select-client").val().length==0 ){

        alert("Por favor seleccione un cliente");
    }else{
    let myData={
        idMessage:idElemento,
        messageText:$("#messagetext").val() != '' ?  $("#messagetext").val(): null,
        client:{idClient: +$("#select-client").val()},

    


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: server+"/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#messagetext").val("");
           
            autoInicioMensajes();
            alert("se ha Actualizado correctamente el Mensaje")
        }
    });
    }
}

function borrarMessage(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: server+"/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioMensajes();
            alert("Se ha Eliminado.")
        }
    });

}