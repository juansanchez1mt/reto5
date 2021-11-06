package ciclo3.retos.backend.entidades;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity

@Table(name = "reservation")

public class Reservation  implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReservation;
    private Date startDate;
    private Date devolutionDate;
    private String status = "created";

    @ManyToOne
    @JoinColumn(name = "bikeId")
    @JsonIgnoreProperties("reservations")
    private Bike bike;

    @ManyToOne
    @JoinColumn(name = "clientId")
    @JsonIgnoreProperties({"reservations","messages"})
    private Client client;

    private String score;
    /**
     * método get getIdReservation
     */
    public Integer getIdReservation() {
        return idReservation;
    }
    /**
     * método set getIdReservation
     */
    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }
    /**
     * método get getStartDate
     */
    public Date getStartDate() {
        return startDate;
    }
    /**
     * método set StartDate
     */
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
    /**
     * método get DevolutionDate
     */
    public Date getDevolutionDate() {
        return devolutionDate;
    }
    /**
     * método set DevolutionDate
     */
    public void setDevolutionDate(Date devolutionDate) {
        this.devolutionDate = devolutionDate;
    }
    /**
     * método get status
     */
    public String getStatus() {
        return status;
    }
    /**
     * método set status
     */
    public void setStatus(String status) {
        this.status = status;
    }
    /**
     * método get bike
     */
    public Bike getBike() {
        return bike;
    }
    /**
     * método set bike
     */
    public void setBike(Bike bike) {
        this.bike = bike;
    }
    /**
     * método get client
     */
    public Client getClient() {
        return client;
    }
    /**
     * método set client
     */
    public void setClient(Client client) {
        this.client = client;
    }
    /**
     * método get score
     */
    public String getScore() {
        return score;
    }
    /**
     * método set score
     */
    public void setScore(String score) {
        this.score = score;
    }



}
