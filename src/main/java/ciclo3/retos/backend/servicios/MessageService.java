package ciclo3.retos.backend.servicios;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import ciclo3.retos.backend.entidades.Message;
//import ciclo3.retos.backend.repositorios.ClientRepository;
import ciclo3.retos.backend.repositorios.MessageRepository;


@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){
        
        return messageRepository.getAll();
    
    }

    public Optional<Message> getMessage(int id){

        return messageRepository.getMessage(id);
    }

    public Message save (Message message){

        if (message.getIdMessage()==null){

            return messageRepository.save(message);

        } else{

            Optional<Message> e= messageRepository.getMessage(message.getIdMessage());
            if(e.isEmpty()){

                return messageRepository.save(message);
            }else {

                return message;
            }

        }
    }

    public Message update(Message message){
        if(message.getIdMessage()!=null){
            Optional<Message>g=messageRepository.getMessage(message.getIdMessage());
            if(!g.isEmpty()){
                if(message.getMessageText()!=null){
                    g.get().setMessageText(message.getMessageText());
                } if(message.getBike()!=null){
                    g.get().setBike(message.getBike());
                }if(message.getClient()!=null){
                    g.get().setClient(message.getClient());
                }
                return messageRepository.save(g.get());

            }
        }
        return message;

    }


    public boolean deleteMessage (int id){
        Boolean d= getMessage(id).map(message -> {
            messageRepository.delete(message);
            return true;
        }).orElse(false);
        return d;
    }
}
