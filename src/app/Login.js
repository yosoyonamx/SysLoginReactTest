import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 mx-auto">
          <div className="card mt-4 text-center">
            <div className="card-header">
              <h1>Inicia Session</h1>
            </div>
            <img
              src="/img/jhonatan-logo.jpg"
              className="mx-auto d-block m-4 rounded-circle logo"
              alt="Logo"
            />
            <div className="card-body">
              <form action="/user/signin" method="POST">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Correo"
                    autofocus
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Contraseña"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
