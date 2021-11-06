package ciclo3.retos.backend.entidades;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;




@Entity

@Table(name = "bike")
 
/**
 * @Clase Bike 
 */
public class Bike implements Serializable {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**
     * atributo id
     */
    private Integer id;
    /**
     * atributo name
     */
    private String name;
    /**
     * atributo brand
     */
    private String brand;
    /**
     * atributo year
     */
    private Integer year;
    /**
     * atributo description
     */
    private String description;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    @JsonIgnoreProperties("bikes")

    /**
     * atributo category
     */
    private Category category;

    /**
     * atributo messages
     */
    @OneToMany(cascade = {CascadeType.ALL},mappedBy = "bike")
    @JsonIgnoreProperties({"bike","client"})
    private List<Message> messages;


    /**
     * atributo reservations
     */
    @OneToMany(cascade = {CascadeType.ALL},mappedBy = "bike")
    @JsonIgnoreProperties({"bike","client"})
    private List<Reservation> reservations;
    

    /**
     * método get id
     */
    public Integer getId() {
        return id;
    }
    /**
     * método set id
     */
    public void setId(Integer id) {
        this.id = id;
    }
    /**
     * método get name
     */

    public String getName() {
        return name;
    } 
    /**
    * método set name
    */
    public void setName(String name) {
        this.name = name;
    }
    /**
     * método get brand
     */
    public String getBrand() {
        return brand;
    }
     /**
     * método set brand
     */
    public void setBrand(String brand) {
        this.brand = brand;
    }
    /**
     * método get year
     */
    public Integer getYear() {
        return year;
    }
    /**
     * método set year
     */
    public void setYear(Integer year) {
        this.year = year;
    }
    /**
     * método get description
     */
    public String getDescription() {
        return description;
    }
    /**
     * método set description
     */
    public void setDescription(String description) {
        this.description = description;
    }
    /**
     * método get identficador
     */
    public Category getCategory() {
        return category;
    }

        /**
     * método set category
     */

    public void setCategory(Category category) {
        this.category = category;
    }
    /**
     * método get identficador
     */
    public List<Message> getMessages() {
        return messages;
    }
    /**
     * método set messages
     */
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
    /**
     * método get identficador
     */

    public List<Reservation> getReservations() {
        return reservations;
    }
    /**
     * método set reservations
     */
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }



}
