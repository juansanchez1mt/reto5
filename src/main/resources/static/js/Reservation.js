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
/*
function ValidarFechas(){
   var fechainicial = document.getElementById("#startDate").value;
   var fechafinal = document.getElementById("#devolutionDate").value;

   if(Date.parse(fechafinal) < Date.parse(fechainicial)) {

   alert("La fecha final debe ser mayor a la fecha inicial");
   
}
}*/

//Manejador "POST"
function agregarReservation() {

    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos son obligatorios")
    }else{
        var f1 = new Date($("#startDate").val()); //31 de diciembre de 2015
        var f2 = new Date($("#devolutionDate").val());

        if(f2<f1){
            alert("La fecha de Devolucion no puede ser menor a la fecha Inicial")
        }else{ 
            let elemento = {
                startDate: $("#startDate").val(),
                devolutionDate: $("#devolutionDate").val(),
                status: $("#status").val(),
                bike: {id:$("#select-bike").val()},
                //client: $("#status").val(),
                client:{idClient: +$("#select-client").val()},
                
            }

            let dataToSend = JSON.stringify(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: server+"/api/Reservation/save",
                data: dataToSend,
                datatype: "json",

                success: function (response) {
                    console.log(response);
                    //Limpiar Campos
                    $("#resultado5").empty();
                    $("#startDate").val("");
                    $("#devolutionDate").val("");
                    $("#status").val("");
                    $("#select-bike").val("");
                    $("#select-client").val("");
                    
                    //$("#status").val("");

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se guardo Correctamente!")
                }
            });
        }
   }
}



function listarReservation(){
    $.ajax({
        url: server+"/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaReservation(response);
        }
    });
}

function pintarRespuestaReservation(response){
   
    let myTable="<table class='ui center aligned celled table'>";
    myTable+="<tr>";
        myTable+="<td>Fecha Inicio</td>";
        myTable+="<td>fecha Devolucion</td>";
        myTable+="<td>Estado</td>";
        myTable+="<td>Bike</td>";
        myTable+="<td>Cliente</td>";
     "</tr>";
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>"+response[i].startDate+"</td>";
        myTable+="<td>"+response[i].devolutionDate+"</td>";
        myTable+="<td>"+response[i].status+"</td>";
        myTable+="<td>"+response[i].bike.name+"</td>";
        myTable+="<td>"+response[i].client.name+"</td>";
        myTable+='<td><button  class="ui red button" onclick="borrarReservation(' + response[i].idReservation + ')">Borrar</button></td>';
        //myTable+='<td><button  onclick="cargarDatosReservation(' + response[i].idReservation + ')">Consultar</button></td>';
        myTable+='<td><button class="ui yellow button" onclick="actualizarReservation(' + response[i].idReservation + ')">Actualizar</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaReservation").html(myTable);
}


//Manejador DELETE
function borrarReservation(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:server+"/api/Reservation/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaReservation").empty();

                alert("Se ha eliminado correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Capturar informacion para Actualizar
function cargarDatosReservation(id) {
    $.ajax({
        dataType: 'json',
        url: server+"/api/Reservation/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#startDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#status").val(item.status);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function actualizarReservation(idElemento) {
    
    //if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
    //    alert("Todos los campos deben estar llenos")
   // }else{
/*
   var band1=false;
   var band2=false;
   var band3=false;
   var band4=false;
   var band5=false;

   var mensaje='';

   var campos=Array();

    if($("#startDate").val()==''){
        band1=true;
        campos.push('Fecha');
    }
    if($("#devolutionDate").val()==''){
        band2=true;
        campos.push('Devolucion');
    }
    if($("#status").val()==''){
        band3=true;
        campos.push('Estado');
    }
    if($("#select-client").val()==''){
        band5=true;
        campos.push('Cliente');
    }
    if(campos.length>0){
        if(campos.length>1){
            mensaje+='Los campos';
        }else{
            mensaje+='El campo';
        }
        var i=0;
        for(i=0;i<campos.length;i++){
            if(i==0){
                mensaje += ' '+campos[i];
            }else{
                mensaje += ', '+campos[i];
            }  
        }
        mensaje += ' son obligatorios para actualizar';
    }*/
    

  //  if(!(band1||band2||band3||band4||band5)){  
        let elemento = {
            idReservation: idElemento,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val()!= '' ?  $("#status").val(): null,
            //skate:{id: +$("#select-partyroom").val()},
            //client:{idClient: $("#select-client").val()},
            //bike:{id: $("#select-bike").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url: server+"/api/Reservation/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaReservation").empty();
                alert("Se ha actualizado correctamente!")

                //Limpiar Campos
                $("#resultado5").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se actualizo correctamente")
            }
        });
   /* }else{
        alert(mensaje);
    }*/
   // }
}