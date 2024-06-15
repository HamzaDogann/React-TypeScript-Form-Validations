//Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Packages
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

// Styles
import './App.css';
import { FaCircleCheck } from "react-icons/fa6";

function App() {

  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const schema = z.object({
    firstName: z.string().min(1, 'First name is required').min(3, "First name must be at least 3 characters").max(25, "First name must be no more than 25 characters"),
    lastName: z.string().min(1, 'Last name is required').min(2, "Last name must be at least 2 characters").max(25, "Last name must be no more than 25 characters"),
    email: z.string().min(1, "Email is required").email('Invalid email address'),
    password: z.string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .max(16, 'Password must be no more than 16 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
    gender: z.enum(['Male', 'Female'], {
      errorMap: () => {
        return { message: 'Please choose a gender.' };
      }
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

  type FormFields = z.infer<typeof schema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormFields) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    reset();
    setIsRegisterSuccess(true);
    setTimeout(() => {
      setIsRegisterSuccess(false);
    }, 3000);
  };

  return (
    <>
      <div className='register-box'>
        <h2 className='text-align-center'>Register</h2>
        <hr />

        <form className='form-box' onSubmit={handleSubmit(onSubmit)}>
          {/* Firstname */}
          <input
            {...register("firstName")}
            type="text"
            placeholder='First name'
            className={errors.firstName ? 'error' : ''}
          />
          <span className='error-message'>
            {errors.firstName ? `${errors.firstName.message}` : ``}
          </span>

          {/* Lastname */}
          <input
            {...register("lastName")}
            type="text"
            placeholder='Last name'
            className={errors.lastName ? 'error' : ''}
          />
          <span className='error-message'>
            {errors.lastName ? `${errors.lastName.message}` : ``}
          </span>

          {/* Email */}
          <input
            {...register("email")}
            type="email"
            placeholder='Email'
            className={errors.email ? 'error' : ''}
          />
          <span className='error-message'>
            {errors.email ? `${errors.email.message}` : ``}
          </span>

          {/* Password */}
          <input
            {...register("password")}
            type="password"
            placeholder='Password'
            className={errors.password ? 'error' : ''}
          />
          <span className='error-message'>
            {errors.password ? `${errors.password.message}` : ``}
          </span>

          {/* Confirm Password */}
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder='Confirm Password'
            className={errors.confirmPassword ? 'error' : ''}
          />
          <span className='error-message'>
            {errors.confirmPassword ? `${errors.confirmPassword.message}` : ``}
          </span>

          {/* Gender */}
          <div className='flex-row-center'>
            <div className='flex-justify-center'>
              <span>Male</span>
              <input {...register("gender")} type="radio" value="Male" />
            </div>
            <div className='flex-justify-center' style={{ marginLeft: "15px" }}>
              <span>Female</span>
              <input {...register("gender")} type="radio" value="Female" />
            </div>
          </div>

          <span className='error-message'>
            {errors.gender ? `${errors.gender.message}` : ``}
          </span>

          {/* Submit Button */}
          <button className='submit-btn' type='submit'>
            {
              isSubmitting ? "Loading..." : "Register"
            }
          </button>
        </form>

      </div>

      {/* Success Modal */}
      <div className='success-modal-box' style={{ display: isRegisterSuccess ? 'flex' : 'none' }}>
        <div className='succes-modal flex-row-center'>
          <FaCircleCheck style={{ fontSize: "40px" }} />
          <p>Registration successful</p>
        </div>
      </div >
    </>
  )
}

export default App;
