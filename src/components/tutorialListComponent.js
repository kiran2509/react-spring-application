
import React,{Component} from 'react';
import TutorialDataService from '../service/tutorialService'
import { Link } from 'react-router-dom';


class TutorialList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             tutorials:[],
             currentTutorial: null,
             currentIndex: -1,
             searchTitle: ""
        }
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
    }
    
    componentDidMount(){
        this.retrieveTutorials();
    }

    retrieveTutorials () {
        TutorialDataService.getAll()
            .then(response => {
                this.setState({ 
                    tutorials: response.data
                })
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    changeTitle = (event) =>{
        this.setState({ searchTitle: event.target.value})
    }

    searchByTitle = () =>{

        TutorialDataService.findByTitle(this.state.searchTitle)
                .then(response =>{
                    this.setState({ 
                        tutorials: response.data
                    });
                    console.log(response.data);
                })
                .catch(error => console.log(error))
    }

    setActiveTutorial = (tutorial,index) =>{
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        })
    }

    refreshList = () =>{
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        })

    }

    removeTutorials = () =>{

        TutorialDataService.deleteAll()
            .then(response =>{
               console.log(response.data);
               this.refreshList();
            })
            .catch(error => console.log(error))
    }


    render() {

        const { tutorials, currentTutorial,currentIndex,searchTitle } = this.state
            return (
                <div className="list row">
                  <div className="col-md-8">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={this.changeTitle}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={this.searchByTitle}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h4>Tutorials List</h4>
          
                    <ul className="list-group">
                      {tutorials &&
                        tutorials.map((tutorial, index) => (
                          <li
                            className={
                              "list-group-item " +
                              (index === currentIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveTutorial(tutorial, index)}
                            key={index}
                          >
                            {tutorial.title}
                          </li>
                        ))}
                    </ul>
                    <button
                      className="m-3 btn btn-sm btn-danger"
                      onClick={this.removeAllTutorials}
                    >
                      Remove All
                    </button>
                  </div>
                  <div className="col-md-6">
                    {currentTutorial ? (
                      <div>
                        <h4>Tutorial</h4>
                        <div>
                          <label>
                            <strong>Title:</strong>
                          </label>{" "}
                          {currentTutorial.title}
                        </div>
                        <div>
                          <label>
                            <strong>Description:</strong>
                          </label>{" "}
                          {currentTutorial.description}
                        </div>
                        <div>
                          <label>
                            <strong>Status:</strong>
                          </label>{" "}
                          {currentTutorial.published ? "Published" : "Pending"}
                        </div>
          
                        <Link
                          to={"/tutorials/" + currentTutorial.id}
                          className="badge badge-warning"
                        >
                          Edit
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                      </div>
                    )}
                  </div>
                </div>
              );
    }
}

export default TutorialList;