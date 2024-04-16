import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import { SubmitErrorHandler, SubmitHandler, set, useForm } from 'react-hook-form';
import useAuth from '../../Helpers/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../../types/LoginForm';




const Login = () => {
  const {register, reset, handleSubmit, watch, formState: {errors}} = useForm<LoginForm>({
    defaultValues: {}
  })
  const password = watch('password', '')
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const submitUp: SubmitHandler<LoginForm> = data => {
    const user = {
      name: data.name,
      email:data.email,
      password:data.password,
    }
    localStorage.setItem('user', JSON.stringify(user)); 
    setSignUp(false);
    reset()
    
    
  }
  const SignInUser = JSON.parse(localStorage.getItem('user') || '{}');
  
  const UserToken = localStorage.getItem('UserToken')
  if(UserToken) {
    setAuth(true)
    navigate(from, { replace: true });
  }
  
  
  
  const submitIn: SubmitHandler<LoginForm> = data => {
    localStorage.setItem('UserToken','true')
    
  }
  const error: SubmitErrorHandler<LoginForm> = data => {
    
  }
  const [signUp, setSignUp] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false)
  const [emailSend, setEmailSend] = useState(false)
  const [emailSendValue, setEmailSendValue] = useState('')
  const handleSignUpClick = () => {
    setSignUp(true);
  };

  const handleSignInClick = () => {
    setSignUp(false);
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleEmailSend = (emailSend:boolean) => {
    setEmailSend(true);
  }


  const submitForgot: SubmitHandler<LoginForm> = email => {
      console.log(email.forgotEmail);
      handleEmailSend(true)
      setEmailSendValue(email.forgotEmail)
      

    
  }

  return (
    <>
    <div className={styles.LoginContainer}>
      {forgotPassword?(
        <div className={styles.ResetPasswordForm}>
          <form onSubmit={handleSubmit(submitForgot)} className={styles.ResetPasswordLabel}>
            <h3 className={styles.ResetPasswordTitle}>reset password</h3>
            {emailSend?(
              <>
              <div className={styles.SendEmail}>
                <p>You will receive an email <span><b>{emailSendValue}</b></span> with a link to reset your password!</p>
              </div>
              <p><b>Email</b></p>
              <input 
                type='email'
               placeholder='Your email'
               value={emailSendValue}
               disabled
               
               />
               <Link to='/'><button className={styles.LoginBtn}>go to home</button></Link>
              </>
              
            ):(
              <>
              <p><b>Email</b></p>
              <input 
                type='email'
               placeholder='Your email'
               {...register('forgotEmail')}
               />
              <button className={styles.LoginBtn}>reset</button>  
              </> 
            )}
           
        </form>
        </div>
      ):( 
        <div className={styles.LoginForm}>
         <div className={styles.LoginItems}>
          <div onClick={handleSignInClick} className={signUp ? '' : styles.active}><p>sign IN</p></div>
          <div onClick={handleSignUpClick} className={signUp ? styles.active : ''}><p>sign UP</p></div>
        </div> 
        {signUp ? (
            <form onSubmit={handleSubmit(submitUp, error)} className={styles.LoginLabel}>
            <p><b>Name</b></p>
            <input placeholder='Your name' type="text" {...register('name', {required:true })} />
            {errors.name && <span className={styles.LoginFormErrors}>{errors.name.message}</span>}
            <p><b>Email</b></p>
            <input placeholder='Your email' type="text" {...register('email', {required:true, pattern: {
              value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, message:'Enter valid email'
            }})} />
             {errors.email && <span className={styles.LoginFormErrors}>{errors.email.message}</span>}
            <p><b>Password</b></p>
            <input id='password' placeholder='Your password' type="password" {...register('password', {required:true, minLength:{value:8, message:'Password must have at least 8 characters'} }) } />
            {errors.password && <span className={styles.LoginFormErrors}>{errors.password.message}</span>}
            <p><b>Confirm password</b></p>
            <input id='confirmPassword' placeholder='Confirm your password' type="password" {...register('confirmPassword', {required:true, validate:value => value === password || 'Password mismatch'})} />
            {errors.confirmPassword && <span className={styles.LoginFormErrors}>{errors.confirmPassword.message}</span>}
            <button type='submit' className={styles.LoginBtn}>sign Up</button>
          </form>
          ) : (
            <form onSubmit={handleSubmit(submitIn, error)} className={styles.LoginLabel}>
            <p><b>Email</b></p>
            <input placeholder='Your email' type="text" {...register('SignInEmail', {required:true, validate: value => value === SignInUser.email || 'email is not correct ', pattern: {
              value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, message:'Enter valid email'
            }})} />
              <span className={styles.LoginFormErrors}>{errors.SignInEmail?.message}</span>
             {errors.email && <span className={styles.LoginFormErrors}>{errors.email.message}</span>}
            <p><b>Password</b></p>
            <input  placeholder='Your password' type="password" {...register('SignInPassword', {required:true, validate: value => value === SignInUser.password || 'password is not correct ' })} />
              <span className={styles.LoginFormErrors}>{errors.SignInPassword?.message}</span>
            <span onClick={handleForgotPassword} className={styles.Link}><span>Forgot password ?</span></span>
            <button type='submit' className={styles.LoginBtn}>sign in</button>
       
          </form>
          )}
        </div>
      )}
    </div>
    </>
  )
}

export default Login
