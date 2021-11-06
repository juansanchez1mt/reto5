package ciclo3.retos.backend.servicios;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ciclo3.retos.backend.custom.ContadorClientes;
import ciclo3.retos.backend.custom.StatusReservas;
import ciclo3.retos.backend.entidades.Reservation;
import ciclo3.retos.backend.repositorios.ReservationRepository;


@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        
        return reservationRepository.getAll();
    
    }

    public Optional<Reservation> getReservation(int id){

        return reservationRepository.getReservation(id);
    }

    public Reservation save (Reservation reservation){

        if (reservation.getIdReservation()==null){

            return reservationRepository.save(reservation);

        } else{

            Optional<Reservation> e= reservationRepository.getReservation(reservation.getIdReservation());
            if(e.isEmpty()){

                return reservationRepository.save(reservation);
            }else {

                return reservation;
            }

        }
    }

    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation()!=null){
            Optional<Reservation>g=reservationRepository.getReservation(reservation.getIdReservation());
            if(!g.isEmpty()){
                if(reservation.getStartDate()!=null){
                    g.get().setStartDate(reservation.getStartDate());
                } if(reservation.getDevolutionDate()!=null){
                    g.get().setDevolutionDate(reservation.getDevolutionDate());
                }if(reservation.getStatus()!=null){
                    g.get().setStatus(reservation.getStatus());
                }if(reservation.getDevolutionDate()!=null){
                    g.get().setDevolutionDate(reservation.getDevolutionDate());
                }if(reservation.getBike()!=null){
                    g.get().setBike(reservation.getBike());
                }if(reservation.getClient()!=null){
                    g.get().setClient(reservation.getClient());
                }if(reservation.getScore()!=null){
                    g.get().setScore(reservation.getScore());
                }

                return reservationRepository.save(g.get());

            }
        }
        return reservation;

    }


    public boolean deleteReservation(int id){
        Boolean d= getReservation(id).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
        return d;
    }



    public StatusReservas getRepStatusRes(){

    List<Reservation>completed = reservationRepository.ReservationStatus("completed");
    List<Reservation>cancelled = reservationRepository.ReservationStatus("cancelled");
    return new StatusReservas(completed.size(),cancelled.size());

    }

    public List<Reservation> reporteTiempoServicio (String datoA, String datoB){
        SimpleDateFormat parser = new SimpleDateFormat ("yyyy-MM-dd");
        
        Date datoUno = new Date();
        Date datoDos = new Date();
        
        try{
            datoUno = parser.parse(datoA);
            datoDos = parser.parse(datoB);
        }catch(ParseException evt){
            evt.printStackTrace();
        }if(datoUno.before(datoDos)){
            return reservationRepository.ReservationTiempoRepositorio(datoUno, datoDos);
        }else{
            return new ArrayList<>();
        }


    }

    
    public List<ContadorClientes> reporteClientesServicio(){
    return reservationRepository.getClientesRepositorio();

    }


}
