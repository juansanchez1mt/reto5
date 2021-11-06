package ciclo3.retos.backend.crudrepositorio;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import ciclo3.retos.backend.entidades.Reservation;

public interface ReservationCrudRepository extends CrudRepository <Reservation,Integer>{
    


    public List<Reservation>findAllByStatus(String status);

    public List<Reservation>findAllByStartDateAfterAndStartDateBefore(Date dateOne,Date dateTwo);
        
    @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c GROUP BY c.client order by COUNT(c.client)DESC")

    public List<Object[]> countTotalReservationsByClient();

}
