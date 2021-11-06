package ciclo3.retos.backend.servicios;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import ciclo3.retos.backend.entidades.Client;
import ciclo3.retos.backend.repositorios.ClientRepository;


@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll(){
        
        return clientRepository.getAll();
    
    }

    public Optional<Client> getClient(int id){

        return clientRepository.getClient(id);
    }

    public Client save (Client client){

        if (client.getIdClient()==null){

            return clientRepository.save(client);

        } else{

            Optional<Client> e= clientRepository.getClient(client.getIdClient());
            if(e.isEmpty()){

                return clientRepository.save(client);
            }else {

                return client;
            }

        }
    }

    public Client update(Client client){
        if(client.getIdClient()!=null){
            Optional<Client>g=clientRepository.getClient(client.getIdClient());
            if(!g.isEmpty()){
               if(client.getEmail()!=null){
                    g.get().setEmail(client.getEmail());
                }if(client.getPassword()!=null){
                    g.get().setPassword(client.getPassword());
                }if(client.getName()!=null){
                    g.get().setName(client.getName());
                }  if(client.getAge()!=null){
                    g.get().setAge(client.getAge());
                }if(client.getMessages()!=null){
                    g.get().setMessages(client.getMessages());
                }if(client.getReservations()!=null){
                    g.get().setReservations(client.getReservations());
                }


                return clientRepository.save(g.get());

            }
        }
        return client;

    }


    public boolean deleteClient(int id){
        Boolean d= getClient(id).map(client -> {
            clientRepository.delete(client);
            return true;
        }).orElse(false);
        return d;
    }
}