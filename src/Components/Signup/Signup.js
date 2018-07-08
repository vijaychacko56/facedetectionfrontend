import React from 'react';
import { Redirect } from 'react-router';

class Signup extends React.Component{
constructor(props){
		super(props);
		this.state={
			name:'',
			newEmail:'',
			newPassword:'',
			loggedIn:false
		}
		//This below is very new
		this.onChangeNewEmail = this.onChangeNewEmail.bind(this);
		this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
		this.onSubmitSignUp = this.onSubmitSignUp.bind(this);
		this.onChangeNewName = this.onChangeNewName.bind(this);
		
	}

	onChangeNewEmail = (event)=>{
		this.setState({newEmail:event.target.value})
	}

	onChangeNewPassword = (event) =>{
			this.setState({newPassword:event.target.value})
	}
	onChangeNewName =(event)=> {
			this.setState({name:event.target.value})
	}

onSubmitSignUp(){
	const that = this;
	const emailNew = this.state.newEmail;
	const passwordNew = this.state.newPassword;
	const newName = this.state.name;
	fetch('https://pacific-depths-37571.herokuapp.com/signup',{
		method:'post',
		headers:{'Content-Type': 'application/json'},
		body: JSON.stringify({
			name:newName,
			email: emailNew,
			password: passwordNew
		})
	}).then(response=> response.json()).then(data=>{
		if(data.id){
			console.log("inside success");
			that.props.loadUser(data);
			this.setState({loggedIn:true});
			//document.location.href = '/app';
		}
	}).catch(err => {console.log('failed to fetch api')})
}

render(){
	if(this.state.loggedIn){
		return <Redirect to='/app'/>
	}

	return(
	<article className='br2 ba dark-gray shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center'>
		<article className="pa4 black-80">
		  <div action="sign-up_submit" method="get" accept-charset="utf-8">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
		      <div className="mt3">
		        <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
		        <input onChange={this.onChangeNewName} className="b pa2 input-reset ba bg-transparent" type="name" name="name"  id="name"/>
		      </div>
		      <div className="mt3">
		        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
		        <input onChange={this.onChangeNewEmail} className="b pa2 input-reset ba bg-transparent" type="email" name="email-address"  id="email-address"/>
		      </div>
		      <div className="mt3">
		        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
		        <input onChange={this.onChangeNewPassword} className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password"/>
		      </div>
		    </fieldset>
		     <div >
     			 <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSubmitSignUp} type="submit" value="Sign Up"/>
    		</div>
		  </div>
		</article>
	</article>
	);
}

}

export default Signup;