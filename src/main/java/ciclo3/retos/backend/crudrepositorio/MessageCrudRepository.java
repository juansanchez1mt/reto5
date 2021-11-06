package ciclo3.retos.backend.crudrepositorio;

import org.springframework.data.repository.CrudRepository;

import ciclo3.retos.backend.entidades.Message;

public interface MessageCrudRepository extends CrudRepository <Message,Integer> {
    
}
