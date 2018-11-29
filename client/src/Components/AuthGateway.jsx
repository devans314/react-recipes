import React, { Component } from 'react';

//Login handlers: handle login, handle registration, if user status is 200, set state

class AuthGateway extends Component {

    render() {
        return (
        <div>
            <h1>Please Login or Register</h1>

            <h3>Login</h3>
            <form onSubmit={this.props.handleLogin}>
                <input type="text" name="username" onChange= {this.props.handleInput} />
                    <br/>
                <input type="text" name="password" onChange= {this.props.handleInput} />
                    <br/>
                <button type="submit">Submit</button>
            </form>
                <br/>
                <br/>

            <h3>Register</h3>
            <form onSubmit={this.props.handleRegistration}>
                <input type="text" name="username" onChange= {this.props.handleInput} />
                    <br/>
                <input type="text" name="password" onChange= {this.props.handleInput} />
                    <br/>
                <button type="submit">Submit</button>
            </form>
                <br/>
                <br/>
        </div>
            )
    }
}
export default AuthGateway;