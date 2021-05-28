import React, { Component } from 'react'
import TutorialDataService from '../service/tutorialService';


class EditTutorial extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             currentTutorial : {
                 id:null,
                 title:'',
                 description: '',
                 published: false
             },
             message:''
        }
    }
    
    getTutorial = (id) =>{
        TutorialDataService.get(id)
                .then(response =>{
                    this.setState({
                       currentTutorial: response.data
                    })
                    console.log(response.data)
                })
                .catch(error =>{
                    console.log(error)
                })
    }

    componentDidMount(){
        this.getTutorial(this.props.match.params.id);
    }

    onChangeTitle = (event) =>{   
        
        this.setState( prevState => ({
            currentTutorial : {
                ...prevState.currentTutorial,
                title : event.target.value
            }
        }))
    }

    onChangeDescription = (event) =>{
        this.setState( prevState => ({
            currentTutorial : {
                ...prevState.currentTutorial,
                description : event.target.value
            }
        }))
    }

  
    updatePublished = (status) => {
        let data ={
            id: this.state.currentTutorial.id,
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
            published: status
        }

        TutorialDataService.update(data.id,data)
                        .then( response =>{
                            this.setState( prevState => ({
                                currentTutorial:{
                                    ...prevState.currentTutorial,
                                    published: status
                                }
                            }))
                            console.log(response.data)
                        })
                        .catch(error =>{
                            console.log(error)
                        })

    }

    updateTutorial =() =>{
        let id = this.state.currentTutorial.id
        let tutorial = this.state.currentTutorial
        TutorialDataService.update(id, tutorial)
                    .then(response =>{
                        console.log(response.data)
                        this.setState({
                            message : "Data updated successfully"
                        })
                    })
                    .catch(error => console.log(error))
    }

    deleteTutorial =() =>{
        let id = this.state.currentTutorial.id
        TutorialDataService.delete(id)
                        .then(response =>{
                            console.log(response.data)
                            this.props.history.push('/tutorials')
                        })
    }


    render() {

        const { currentTutorial } = this.state
        return (
            <div>
                {currentTutorial ?(
                    <div className="edit-form">
                        <h4>Tutorial</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control"
                                    value={currentTutorial.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" className="form-control"
                                    value={currentTutorial.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label>Status:</label> 
                                {currentTutorial.published ? "Published": "Pending"}
                            </div>
                        </form>

                        <p>{this.state.message}</p>
                        {currentTutorial.published ? (
                            <button className="badge badge-primary mr-2"
                                    onClick={() => this.updatePublished(false)}    
                            >
                            Unpublish
                            </button>
                        ):(
                            <button className="badge badge-primary mr-2"
                                    onClick={() => this.updatePublished(true)}
                            >
                            Publish   
                            </button>
                        )}

                        <button type="submit" className="badge badge-success"
                                onClick={this.updateTutorial}>
                            Update</button> {"   "}                     
                        <button className="badge badge-danger mr-2" 
                                onClick={this.deleteTutorial}>
                        Delete</button>
                    </div>
                ):(
                    <div>
                        <p>Click on any Tutorial</p>
                    </div>
                )}
            </div>
        )
    }
}

export default EditTutorial
