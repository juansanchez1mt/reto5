package ciclo3.retos.backend.crudrepositorio;

import org.springframework.data.repository.CrudRepository;

import ciclo3.retos.backend.entidades.Category;

public interface CategoryCrudRepository extends CrudRepository<Category,Integer> {
    
}
