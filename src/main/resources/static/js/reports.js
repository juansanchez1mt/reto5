//let server = "http://140.238.152.87:8080";
let server = "http://localhost:8080";


function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url: server+"/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){

    let myTable="<table class='ui center aligned celled table'>";
    myTable+="<tr>";
    myTable+="<th>Estado</th>";
    myTable+="<th>Total</th>";
    myTable+="<th>Estado</th>";
    myTable+="<th>Total</th>";
    myTable+="</tr>";

     myTable+="<tr>";
        myTable+="<td>completadas</td>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>canceladas</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
     myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}










function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(server+"/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre);
    
        $.ajax({
            url: server+"/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }

    function pintarRespuestaDate(respuesta){


        let myTable="<table>";
        myTable+="<tr>";
          
        for(i=0;i<respuesta.length;i++){
        myTable+="<th>total</th>";
            
            myTable+="<td>"+respuesta[i].startDate+"</td>";
            myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
            myTable+="<td>"+respuesta[i].status+"</td>";
          
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);
        
    }

    function traerReporteClientes(){
        $.ajax({
            url: server+"/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }
    function pintarRespuestaClientes(respuesta){

        let myTable="<table class='ui center aligned celled table'>";
        myTable+="<tr>";
        myTable+="<th>Total</th>";
        myTable+="<th>Nombre Cliente</th>";
        myTable+="<th>Email</th>";
        myTable+="<th>Edad</th>";
     "</tr>";

        for(i=0;i<respuesta.length;i++){
            myTable+="<tr>";
            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
          
            myTable+="</tr>";
            
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
    }


    