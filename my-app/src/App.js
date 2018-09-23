import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from "react-router-dom";
import axios from "axios";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { currentuser: null };
	}

	componentWillMount() {
		// check if localStorage has a currentuser and set state 
		// if (typeof localStorage.getItem('currentuser') !== 'undefined') {
		//   this.setState({ currentuser: localStorage.getItem('currentuser') });
		// }
	}

  logout = () => {
  	// call logout endpoint
  	axios.get('http://localhost:5000/logout')
  		.then((response) => {
  			// response should be null/empty
  			console.log(JSON.stringify(response, undefined, 2));
  			this.setState({
  				currentuser: null
  			});
  		})
  		.catch((error) => {
  			window.alert('Ocorreu um erro de logout');
  		});
  }

  login = (data) => {
  	// data = {email:'name',password:'secret'}
  	console.log(JSON.stringify(data));
  	//call login endpoint and set currentuser
  	axios({
      method: 'post',
      url: 'http://localhost:5000/login', 
      data: {
        email: data.email,
        password: data.password
      }
  	})
  		.then((res) => {
        var user = res.data;
        if (res.status === 200) {
          console.log(JSON.stringify(user, undefined, 2));
          this.setState({
            currentuser: {
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              personal_phone: user.personal_phone,
              _id: user._id
            }
          });
        }
        else if (res.status === 400) {
          window.alert('Não encontramos esse email registrado. Por favor, crie uma conta.')
        }
        else if (res.status === 404) {
          window.alert('Ocorreu um erro de validação, certifique-se que a senha foi inserida corretamente.')
        };
  		})
  		.catch((error) => {
        console.log(error);
  			window.alert('Ocorreu um erro de autenticação');
  		});
  }

  signUp = (newUser) => {
  	// data = {email:'email',first_name:'first_name',last_name:'last_name,personal_phone:'personal_phone,password:'password'}
  }

  updateUser = (user) => {
  	// update user data
  }

  updatePassword = (data) => {
  	// data = {oldpassword:'oldpass',newpassword:'newpass'}
  }

  render() {
  	return (
  		<Router>
  			<div>
  				<Route exact path="/" render={props => <Login user={this.state.currentuser} onLogin={this.login} />} />
  				<Route path="/signup" component={Signup} />
  				<Route exact path="/user/:id" render={props => <GetUser user={this.state.currentuser} onLogout={this.logout} />} />
  				<Route exact path="/user/:id/edit" render={props => <EditUser user={this.state.currentuser} onUpdateUser={this.updateUser} />} />
  				<Route exact path="/user/:id/edit_password" render={props => <EditPassword user={this.state.currentuser} onUpdatePasword={this.updatePassword} />} />
  			</div>
  		</Router>
  	);
  }
}

// SignUp screen
const Signup = () => <h3>Signup</h3>;

// GetUser screen
class GetUser extends Component {
	render() {
		if (this.props.user) {
			return (
				<div>
					<h3>GetUser</h3>
					<button onClick={() => { this.props.onLogout(); }}>logout</button>
				</div>);
		} else {
			return <Redirect to='/' />;
		}
	}
};

// EditUser Screen
const EditUser = (props) => {
	console.log('edituser');
	console.log(JSON.stringify(props.user));
	if (props.user) {
		return (<h3>EditUser</h3>);
	} else {
		return <Redirect to='/' />;
	}
};

// EditPassword Screen
const EditPassword = (props) => {
	console.log('editPassword');
	console.log(JSON.stringify(props.user));
	if (props.user) {
		return (<h3>EditPassword</h3>);
	} else {
		return <Redirect to='/' />;
	}
};

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: null, password: null };
	}
  handleChange = (event) =>{
  	let target = event.target;
  	let value = target.value;
  	let name = target.name;
  	this.setState({[name]: value});
  }

  render() {
  	if (this.props.user) {
  		console.log(JSON.stringify(this.props.user, undefined, 2));
  		const getUser = '/user/' + this.props.user._id;
  		console.log(getUser);
  		return <Redirect to={getUser} />;
  	} else {
  		return (
  			<div>
  				<input name='email' label='email' onChange={this.handleChange}></input>
  				<input name='password' label='password' onChange={this.handleChange}></input>
  				<button onClick={() => { this.props.onLogin({ email: this.state.email, password: this.state.password }); }}>Log in</button>
  			</div>
  		);
  	}
  };
};


export default App;