package ciclo3.retos.backend.repositorios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ciclo3.retos.backend.crudrepositorio.BikeCrudRepository;
import ciclo3.retos.backend.entidades.Bike;

@Repository
public class BikeRepository  {
    @Autowired
    private BikeCrudRepository bikeCrudRepository;

    public List<Bike> getAll(){return(List<Bike>) bikeCrudRepository.findAll();}

    public Optional<Bike> getBike(int id){
        return  bikeCrudRepository.findById(id);
    } 

    public Bike save(Bike bike){

        return bikeCrudRepository.save(bike);
    } 

    public void delete (Bike bike){bikeCrudRepository.delete(bike);}



}
