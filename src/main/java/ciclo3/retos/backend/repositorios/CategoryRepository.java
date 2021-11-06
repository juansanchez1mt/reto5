package ciclo3.retos.backend.repositorios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ciclo3.retos.backend.crudrepositorio.CategoryCrudRepository;
import ciclo3.retos.backend.entidades.Category;

@Repository
public class CategoryRepository {
    @Autowired
    private CategoryCrudRepository categoryCrudRepository;

    public List<Category> getAll(){return(List<Category>) categoryCrudRepository.findAll();}

    public Optional<Category> getCategory(int id){
        return  categoryCrudRepository.findById(id);
    } 

    public Category save(Category category){

        return categoryCrudRepository.save(category);
    } 

    public void delete (Category category){ categoryCrudRepository.delete(category);}

}
