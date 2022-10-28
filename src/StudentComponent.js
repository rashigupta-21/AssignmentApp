import React, { Component } from "react";
import './index.css';

class StudentComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            user: {},
            loading: false
        }
    }

    // This function is responsible for input field change
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // THis function is used to call the api and fetch the JSON response
    onSubmit = (e) => {
        e.preventDefault();
        fetch("https://api.genderize.io?name=" + this.state.firstname)
            .then((res) => res.json())
            .then((res) => {
                console.log('res=>', res);
                this.setState({ firstname: '', user: res });
            }).catch(e => {
                console.log('error=>', e);
            })
    }

    render() {
        const { firstname, country, errors } = this.state;
        return (
            <div>
                <div classname='container'>
                    <div classs='row'>
                        <div class='column2'>
                            <div classname='form-body'>
                                <h1>Find Probability of Person's Gender </h1>
                                <form onSubmit={this.onSubmit}>
                                    <div classname='form-box'>
                                        <label>Name: </label>
                                        <input placeholder='Name' name='firstname' classname='form-control'
                                            type='text' value={firstname} onChange={this.onChange} pattern="[A-Za-z]+" required />
                                    </div>
                                    <br></br>
                                    <button type="submit" className="submitButton">Submit</button>
                                    <br></br>
                                </form>
                                <div className="userDetails" >
                                    {
                                        this.state.user !== null &&
                                        <div>
                                        <span classname="userName">Name : {JSON.stringify(this.state.user.name)}</span>
                                    <div classname="nameProbability">Probability: {JSON.stringify(this.state.user.probability)}</div>
                                    </div>
                                    } 
                                    {
                                        this.state.user === null && <span> Type any name to find gender Probability. </span>
                                    }   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default StudentComponent