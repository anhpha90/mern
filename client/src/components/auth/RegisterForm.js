import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
const RegisterForm = () => {
  const {registerUser} = useContext(AuthContext)


  //Local state
  const [registerForm, setRegisterForm] = useState({
    username:'',
    password:'',
    confirmpass:''
  })

const[alert, setAlert] = useState(null)

  const{username, password, confirmpass} =registerForm


  const onChangeRegisterForm = event => setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })
const register = async event => {
  event.preventDefault()
  if(password !== confirmpass){
    setAlert({type:'danger', message:'Pass khong khop'})
    setTimeout(() => setAlert(null),5000)
    return 
  }
try{
  const registerData = await registerUser(registerForm)
  if(!registerData.success){
    setAlert({  type:'danger', message: registerData.message })
    setTimeout(() =>setAlert(null),5000)
  }
}
catch(error){
console.log(error)
}

 
}

  return (
    <>
  <Form className='my-4' onSubmit={register}>
  <AlertMessage info={alert}/>
  <Form.Group>
  <Form.Control type='text' placeholder='username' name='username' required value={username}  onChange={onChangeRegisterForm}/>
  </Form.Group>
  <Form.Group>
  <Form.Control type='password' placeholder='password' name='password' required value={password} onChange={onChangeRegisterForm}/>
  </Form.Group>
  <Form.Group>
  <Form.Control type='password' placeholder='Confirm password' name='confirmpass' required  value={confirmpass} onChange={onChangeRegisterForm}/>
  </Form.Group>
  <Button variant='success' type='submit'>Register</Button>
  </Form>
 <p>
 Already have an account<Link to='/login'>
 <Button variant='info' size='sm' className='ml-2'>Login</Button>
 </Link>
 
 </p>
 </>
  )
}

export default RegisterForm