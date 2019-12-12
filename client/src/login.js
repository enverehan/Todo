import React from 'react'
import axios from 'axios'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.alert_class = 'hide';
        this.alert_text  = '';

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    async handleSubmit(event) {
        event.preventDefault();

        var data = {
            username: this.state.username,
            password: this.state.password,
        }

        const response = await axios.post("http://localhost:9000/login", data );

        if( response.data.type === true ) {
            this.alert_class = 'alert-success';
            this.alert_text  = response.data.message;

            window.location = '/board';
        } else {
            this.alert_class = 'alert-danger';
            this.alert_text  = response.data.message;

            // Reset the password
            this.setState({password: ''});

        }

    }

    render() {
      return (
        <div className="container">
            <div className="row justify-content-center">
            <div className="col-4 align-self-center" style={{marginTop:"100px", border:"1px solid #cecece", padding:"30px"}}>
                <h2 className="text-center">Please Login</h2><br /><br />

                <div className={ "alert " + this.alert_class}>{this.alert_text}</div>

                <form onSubmit={this.handleSubmit} id="login-cont">

                <div className="input-group-prepend mb-3">
                    <div>
                    <span className="input-group-text">@</span>
                    </div>
                    <input className="form-control" type="text" placeholder="Username" name="username"
                        value={this.state.username} onChange={this.handleChange} />
                </div>

                <div className="input-group-prepend mb-3">
                    <div>
                    <span className="input-group-text">@</span>
                    </div>
                    <input className="form-control" type="password" placeholder="Password" name="password"
                        value={this.state.password} onChange={this.handleChange} />
                </div>

                <div className="text-center">
                    <button className="btn btn-primary" id="sign-in-btn">Login</button>
                </div>

                </form>
            </div>
            </div>
        </div>
        )
    }

}

export default Login