import React ,{ Component} from 'react';
import TutorialDataService from '../service/tutorialService';

class AddTutorial extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             id:null,
             title: '',
             description: '',
             published: false,
             submitted: false,
             errors:{
                 title:'',
                 description:''
             },
             touched:{
                 title:false,
                 description:false
             }
        }
    }

    handleBlur = (field)  =>{

        this.setState({
            touched: {
                ...this.state.touched,
                [field]: true
            }
        })
    }


    handleChange = (event) => {
        const {name,value} = event.target
        const errors = this.state.errors

        if(name === 'title'){
            errors.title = this.state.title.length === 0 ?  'Field should not be empty' : '';
        }
        if(name === 'description'){
            errors.description = this.state.description.length === 0 ?  'Field should not be empty' : '';
        }

        this.setState({ errors, [name]:value  })
    }
    
    saveTutorial = () => {

        var data = {
            title : this.state.title,
            description : this.state.description
        }        

        TutorialDataService.create(data)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        published: response.data.published,
                        submitted : true
                    });
                    console.log(response.data);
                })
                .catch(error =>console.error(error))
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        console.log(`${this.state.title} ${this.state.description}`)
    }


    addTutorial = () => {
        this.setState({
            id: null,
            title: '',
            description: '',
            published: false,
            submitted: false
        })
    }

    render() {

        const {errors,title,description,touched} = this.state
        const isEnabled = title.length>0 && description.length>0
        return (
        <div className="submit-form">
                    {this.state.submitted ? (
                        <div>
                            <h5>You have successfully submitted</h5>
                            <button className="btn btn-success" onClick={this.addTutorial}>Add</button>
                        </div>
                    ):(
                    <div>
                        <form onSubmit={ this.handleSubmit }>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control"
                            id="title"
                            name="title"
                            value={this.state.title}
                            onBlur={()=>this.handleBlur("title") }
                            onChange={this.handleChange}
                            noValidate
                            />
                            {errors.title  && <span style={{color:'#ff0000'}}>{errors.title}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control"
                            id="description"
                            name="description"
                            value={this.state.description}
                            onBlur={()=> this.handleBlur("description")}
                            onChange={this.handleChange}
                            noValidate
                            />
                             {errors.description  && <span style={{color:'#ff0000'}}>{errors.description}</span>}
                        </div>
                        <button type="submit" className="btn btn-success" disabled={!isEnabled} onClick={this.saveTutorial}>Submit</button>
                        </form>
                    </div>
                    )}
                </div>
        );
    }
}

export default AddTutorial