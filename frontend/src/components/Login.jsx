import React from 'react';
import '../assets/css/Login.css';
import axios from 'axios';
//servicios
//import { ApiUrl } from '../services/Apirest.js'

class Login extends React.Component {
    constructor(props){
        super(props);
       
    }

    state={
        form: {
            "username": "",
            "password": ""
        },
        error: false,
        errorMsg: "Error de prueba"
    }
    manejadorSubmit(e){
        e.preventDefault();
    }

    manejadorChange = async e =>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })

    }

    manejadorBoton =()=>{
        
        axios.post('http://localhost:3010/api/ingreso/', this.state.form)
        .then(response =>{
            console.log('respuesta del servidor : ',response.data.statusText);
            
            if(response.data.statusText === undefined){
                this.setState({
                    error: false,
                    errorMsg: ""
                });
                console.log(response.data)
                localStorage.setItem("token", response.data.token);

                if(response.data.rol === "administrador"){
                    this.props.history.push('/admin/dashboard');
                }
                if(response.data.rol === "gerencial"){
                    this.props.history.push('/gerencial/dashboard');
                }
                if(response.data.rol === "usuario"){
                    this.props.history.push('/dashboard');        
                }
            }else{      
                this.setState({
                    error: true,
                    errorMsg: response.data.Message
                })
            }
        })
        .catch(err => {
            console.log("Error: ", err);
            this.setState({
                error: true,
                errorMsg: "Error al conectar a la API"
            })
        }).finally(()=>{

        })
    }


    render() { 
        return (
            <React.Fragment>
                <div className="wrapper fadeInDown">
  <div id="formContent">
  
    <h1>Login</h1>

    <form onSubmit={this.manejadorSubmit}>
      <input type="text" id="login" className="fadeIn second" name="username" placeholder="login" onChange={this.manejadorChange}/>
      <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" onChange={this.manejadorChange}/>
      <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorBoton}/>
    </form>
   
    {   
    this.state.error === true &&
         <div className="alert alert-danger" role="alert">
         {this.state.errorMsg}
        </div>
    }
  

  </div>
</div>
            </React.Fragment>
        );
    }
}
 
export default Login;