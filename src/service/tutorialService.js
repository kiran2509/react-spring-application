
import http from '../http-axios';   

class TutorialDataService{

    getAll(){
        
        return http.get(`tutorials`)
    }

    get(id){
        return http.get(`/tutorial/${id}`);
    }

    create(tutorial){
        return http.post("/tutorials",tutorial);
    }

    update(id,tutorial){
        return http.put(`/tutorial/${id}`,tutorial);
    }

    delete(id){
        return http.delete(`/tutorial/${id}`);
    }

    deleteAll(){
        return http.delete("/tutorials")
    }

    findByTitle(title){
        return http.get(`/tutorials?title=${title}`);
    }
}

export default new TutorialDataService();