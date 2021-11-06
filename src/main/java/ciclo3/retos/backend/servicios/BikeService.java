package ciclo3.retos.backend.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ciclo3.retos.backend.entidades.Bike;


import ciclo3.retos.backend.repositorios.BikeRepository;


@Service
public class BikeService {
    @Autowired
    private BikeRepository bikeRepository;

    public List<Bike> getAll(){
        
        return bikeRepository.getAll();
    
    }

    public Optional<Bike> getBike(int id){

        return bikeRepository.getBike(id);
    }
    

    public Bike save (Bike bike){

        if (bike.getId()==null){
            return bikeRepository.save(bike);

        } else{

            Optional<Bike> e= bikeRepository.getBike(bike.getId());
            if(e.isEmpty()){

                return bikeRepository.save(bike);
            }else {

                return bike;
            }

        }
    }


    public Bike update(Bike bike){
        if(bike.getId()!=null){
            Optional<Bike>g=bikeRepository.getBike(bike.getId());
            if(!g.isEmpty()){
                if(bike.getName()!=null){
                    g.get().setName(bike.getName());
                }if(bike.getBrand()!=null){
                    g.get().setBrand(bike.getBrand());
                } if(bike.getYear()!=null){
                    g.get().setYear(bike.getYear());
                }  if(bike.getDescription()!=null){
                    g.get().setDescription(bike.getDescription());
                }if(bike.getCategory()!=null){
                    g.get().setCategory(bike.getCategory());
                }
                return bikeRepository.save(g.get());

            }
        }
        return bike;

    }


    public boolean deleteBike(int id){
        Boolean d= getBike(id).map(bike -> {
            bikeRepository.delete(bike);
            return true;
        }).orElse(false);
        return d;
    }








}
