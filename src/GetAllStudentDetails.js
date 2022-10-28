import React, { Component } from "react";
import './index.css';
import swal from 'sweetalert';
import Countries from './assets/countries.json'


class GetAllStudentDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            userData: null,
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
        fetch("https://api.nationalize.io/?name=" + this.state.name)
            .then((res) => res.json())
            .then((res) => {
                console.log('res.country=>', res.country);

                for (let i = 0; i < res.country.length; i++) {
                    let resItem = res.country[i];
                    console.log('resItem=>', resItem);
                    let countryName = Countries.data.find(country => resItem.country_id === country.Code)
                    console.log('countrName=>', countryName);
                    resItem["countrName"] = countryName ? countryName.Name : resItem.country_id;
                }
                this.setState({ name: '', userData: res.country, loader: false });
            }).catch(e => {
                console.log('error=>', e);
            })
    }

    render() {
        return (
            <div>
                <div classname='container'>
                    <div classs='row'>
                        <div class='column2'>
                            <div classname='form-body'>
                                <h1>Find Probability of Person's Nationality </h1>
                                <form onSubmit={this.onSubmit}>
                                    <div classname='form-box'>
                                        <label>Name: </label>
                                        <input placeholder='Name' name='name' classname='form-control'
                                            type='text' value={this.state.name} onChange={this.onChange} pattern="[A-Za-z]+" required />
                                    </div>
                                    <br></br>
                                    <button type="submit" className="submitButton">Submit</button>
                                    <br></br>
                                </form>
                                <div className="userDetails">
                                    {
                                        !this.state.loading && this.state.userData !== null && this.state.userData.length > 0 &&
                                        <div >
                                            {
                                                this.state.userData.map(user =>
                                                    <React.Fragment classname='userDetails'>
                                                        <div>
                                                            <span >Country: {user.countrName}</span>
                                                            <span className="nameProbability">    Probability: {user.probability}</span></div>
                                                    </React.Fragment>)
                                            }
                                        </div>
                                    }
                                    {
                                        this.state.loading && this.state.userData !== null && this.state.userData.length > 0 &&
                                        <h3 >Data Loading ..
                                        </h3>
                                    }

                                    {
                                        this.state.userData === null && <span> Type any name to find nationality. </span>
                                    }
                                    {
                                        this.state.userData !== null && this.state.userData.length == 0 && <span> No Data found.. </span>
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

export default GetAllStudentDetails