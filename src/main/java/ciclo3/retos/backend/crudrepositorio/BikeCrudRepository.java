package ciclo3.retos.backend.crudrepositorio;

import org.springframework.data.repository.CrudRepository;

import ciclo3.retos.backend.entidades.Bike;

public interface BikeCrudRepository extends CrudRepository<Bike,Integer> {
    
}
