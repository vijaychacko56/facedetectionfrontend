import React from 'react';
import { Redirect } from 'react-router';

class  Signin extends React.Component {

	constructor(props){
		super(props);
		this.state={
			signInEmail:'',
			signInPassword:'',
			loggedIn:false
		}
		//This below is very new
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
		
	}

	onChangeEmail =(event) =>{
		this.setState({signInEmail:event.target.value})
	}

	onChangePassword =(event)=>{
			this.setState({signInPassword:event.target.value})
	}

onSubmitSignIn = ()=>{
	const emailIn = this.state.signInEmail;
	const passIn = this.state.signInPassword;
	console.log(emailIn,passIn);
	fetch('https://pacific-depths-37571.herokuapp.com/signin',{
		method:'post',
		headers:{'Content-Type': 'application/json'},
		body: JSON.stringify({
			email: emailIn,
			password: passIn
		})
	}).then(response=> response.json()).then(data=>{
		if(data.id){
			console.log("inside success");
			this.props.loadUser(data);
			this.setState({loggedIn:true});
			// below rerouting did work but they refreshed the page and all user data from signin component returned to it from the API gets lost in App. using redirect instead keeps the data.
			//window.history.pushState(null, '', '/app');
			//document.location.href = '/app';
			
		}
	}).catch(err => {console.log('failed to fetch api')})
}
	render(){
	const { loggedIn } = this.state;
     if (loggedIn) {
       return <Redirect to='/app'/>;
     }
     return(
	<article className='br2 ba dark-gray shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center'>
		<main className="pa4 black-80">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="ph0 mh0 fw6 clip">Sign In</legend>
		      <div className="mt3">
		        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
		        <input className="b pa2 input-reset ba bg-transparent" onChange={this.onChangeEmail} type="email" name="email-address"  id="email-address"/>
		      </div>
		      <div className="mt3">
		        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
		        <input className="b pa2 input-reset ba bg-transparent"  onChange={this.onChangePassword} type="password" name="password"  id="password"/>
		      </div>
		    </fieldset>
		     <div >
     			 <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSubmitSignIn} type="submit" value="Sign in"/>
    		</div>
		    <a href="/signup" className="f6 link dim black db">Sign up</a>
		</main>
	</article>
);
	}


}
export default Signin;