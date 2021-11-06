package ciclo3.retos.backend.repositorios;

//import java.sql.Date;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ciclo3.retos.backend.crudrepositorio.ReservationCrudRepository;
import ciclo3.retos.backend.custom.ContadorClientes;
import ciclo3.retos.backend.entidades.Client;
import ciclo3.retos.backend.entidades.Reservation;


@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll(){return(List<Reservation>) reservationCrudRepository.findAll();}

    public Optional<Reservation> getReservation(int id){
        return  reservationCrudRepository.findById(id);
    } 

    public Reservation save(Reservation reservation){

        return reservationCrudRepository.save(reservation);
    } 

    public void delete (Reservation reservation){ reservationCrudRepository.delete(reservation);}


    public List<Reservation>ReservationStatus(String status){
        return reservationCrudRepository.findAllByStatus(status);


    }

    public List<Reservation> ReservationTiempoRepositorio(Date a, Date b){
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(a, b);
    }

    public List<ContadorClientes> getClientesRepositorio(){
        List<ContadorClientes> res =new ArrayList<>();
        List<Object[]> report = reservationCrudRepository.countTotalReservationsByClient();
        for(int i=0; i<report.size(); i++){

            res.add(new ContadorClientes((long)report.get(i)[1],(Client) report.get(i)[0]));
        }

        return res;
        
    }

}
