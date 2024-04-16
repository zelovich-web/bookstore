import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, set, useForm } from 'react-hook-form';
import styles from './Profile.module.css'
import { ProfileForm } from '../../types/ProfileForm';
const Profile:React.FC = () => {

  

  const {register, reset, watch, handleSubmit, formState: {errors}} = useForm<ProfileForm>({
    defaultValues: {
      password: '',
      newPassword:'',
      confirmPassword: '',
    }
  })

  const newPassword = watch('newPassword', '')
  const UserInfo = JSON.parse(localStorage.getItem('user') || '{}');
  
  const submit: SubmitHandler<ProfileForm> = data => {
    if (data.name.length > 0) {
      UserInfo.name = data.name;
    }
  
    if (data.email.length > 0) {
      UserInfo.email = data.email;
    }
  
    if (data.newPassword.length > 0) {
      UserInfo.password = data.newPassword;
    }
  
    localStorage.setItem('user', JSON.stringify(UserInfo));
    
  }
  const error: SubmitErrorHandler<ProfileForm> = data => {
      
  }
  const handleCancel = () => {
    reset();
  }
  

  return (
    <>
      <div className={styles.ProfileWrapp}>
      <Link to='/'><svg className={styles.Arrow} width="42" height="14" viewBox="0 0 42 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.00116 0.998965C8.00116 1.25897 7.90116 1.50897 7.71116 1.70897L3.41116 5.99897L41.0012 5.99897C41.5512 5.99897 42.0012 6.44896 42.0012 6.99896C42.0012 7.54896 41.5512 7.99896 41.0012 7.99896L3.41116 7.99896L7.71116 12.289C8.10116 12.679 8.10116 13.319 7.71116 13.709C7.32116 14.099 6.68116 14.099 6.29116 13.709L0.291162 7.70896C0.201162 7.61896 0.131162 7.50896 0.0811621 7.38896C0.0611621 7.33896 0.0411621 7.29896 0.0411621 7.24896C-0.00883789 7.08896 -0.00883789 6.90896 0.0411621 6.74896C0.0411621 6.69896 0.0611621 6.65897 0.0811621 6.60896C0.131162 6.48897 0.201162 6.37896 0.291162 6.28896L6.29116 0.288965C6.68116 -0.101035 7.32116 -0.101035 7.71116 0.288965C7.90116 0.488965 8.00116 0.738965 8.00116 0.998965Z" fill="#313037"/>
            </svg>
          </Link>
          <h2 className={styles.ProfileTitle}>Account</h2>
          <h3 className={styles.ProfileSubTitle}>profile</h3>
          <form onSubmit={handleSubmit(submit, error)} className={styles.ProfilePersonForm}>
                <div>
                
                <b><p className={styles.InputLabel}>Name</p></b>
                <input
                {...register(`name`)} 
                defaultValue={UserInfo.name}
                  type="text" className={styles.ProfileInput} />
                </div>
                <div>
               <b> <p className={styles.InputLabel}>Email</p></b>
                <input
                 type="text" className={styles.ProfileInput}
                 {...register(`email`, {pattern: {value:/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, message:'Enter valid email'}})} 
                defaultValue={UserInfo.email}
                
                 />
                 <span className={styles.ProfileFormErrors}>{errors.email?.message}</span>
                </div>
          </form>
          <h3 className={styles.ProfileSubTitle}>Password</h3>
          <form onSubmit={handleSubmit(submit)} className={styles.ProfilePasswordForm}>
          <span className={styles.ProfileFormErrors}>{errors.password?.message}</span>  
            <b><p className={styles.InputLabel}>Password</p></b>
            <input type="password"  className={styles.ProfileInput}
             {...register(`password`,{required:'Enter password', validate: value => value === UserInfo.password || 'Incorrect password'})}  
             placeholder='Enter password'
            />
              

              <div className={styles.VerstkaKruto}>
              <div >
              
              <b><p className={styles.InputLabel}>New password</p></b>
              <input type="password" className={styles.ProfileInput}
               {...register(`newPassword`, {minLength:{value:8, message:'Password must have at least 8 characters'}})} 
               placeholder='New password'
               />
               <span className={styles.ProfileFormErrors}>{errors.newPassword?.message}</span> 
              </div>
              

              <div>
              <b><p className={styles.InputLabel}>Confirm new password</p></b>
              <input type="password" className={styles.ProfileInput}
                {...register(`confirmPassword`, {validate:value => newPassword === value || 'Password mismatch' })} 
                placeholder='Confirm new password'  
               />
               <span className={styles.ProfileFormErrors}>{errors.confirmPassword?.message}</span>
              </div>
              </div>
              <hr />
                <div className={styles.ProfileBtns}>
                   <button type="submit" className={styles.ProfileBtnChange}>Save changes</button>
                   <button type='button' onClick={handleCancel}  className={styles.ProfileBtnCancel}>cancel</button>
                </div>
          </form>
          
      </div>

    </>
  )
}

export default Profile;
