import React from 'react'
import axios from 'axios'

class Login extends React.Component {
    
    async logout() {
        await axios.get("http://localhost:9000/logout").finally(function() {
            window.location = '/login';
        });

    }

    render() {

        this.logout()

      return (
          <div className="container">
              <div className="row">
                  <div className="col-12 text-center" style={{ marginTop:"50px"}}>
                      <h3>Please wait...</h3>
                  </div>
              </div>
          </div>
        )
    }

}

export default Login