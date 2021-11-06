package ciclo3.retos.backend.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ciclo3.retos.backend.entidades.Category;
import ciclo3.retos.backend.repositorios.CategoryRepository;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll(){
        
        return categoryRepository.getAll();
    
    }

    public Optional<Category> getCategory(int id){

        return categoryRepository.getCategory(id);
    }

    public Category save (Category category){

        if (category.getId()==null){

            return categoryRepository.save(category);

        } else{

            Optional<Category> e= categoryRepository.getCategory(category.getId());
            if(e.isEmpty()){

                return categoryRepository.save(category);
            }else {

                return category;
            }

        }
    }

    public Category update(Category category){
        if(category.getId()!=null){
            Optional<Category>g=categoryRepository.getCategory(category.getId());
            if(!g.isEmpty()){
                if(category.getName()!=null){
                    g.get().setName(category.getName());
                } if(category.getDescription()!=null){
                    g.get().setDescription(category.getDescription());
                }
                return categoryRepository.save(g.get());

            }
        }
        return category;

    }


    public boolean deleteCategory(int id){
        Boolean d= getCategory(id).map(category -> {
            categoryRepository.delete(category);
            return true;
        }).orElse(false);
        return d;
    }

}
