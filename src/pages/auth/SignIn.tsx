import { Button } from 'primereact/button'
import ButtonImage from '@/components/button/ButtonImage'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ErrorMessage from '@/components/message/ErrorMessage'
import { signIn as signInApi } from '@/apis/auth.api'
import { useMutation } from '@tanstack/react-query'
import { SignInInRequest } from '@/types/auth.type'
import { isAxiosError } from '@/utils/utils'
import { Checkbox } from 'primereact/checkbox'
import { saveTokenAuth } from '@/utils/auth'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import LogoGithub from '@/assets/github.png'
import LogoGoogle from '@/assets/google.png'
import { useAuth } from '@/hooks/useAuth'
import { signIn } from '@/contexts/auth/reducers'
import { ApiResponse } from '@/types/app'
import { FloatLabel } from 'primereact/floatlabel'

interface SignInProps {}
const schemaSignInValidation = yup.object({
  email: yup.string().required().max(100),
  password: yup.string().required().min(8)
})
type FormError =
  | {
      [key in keyof SignInInRequest]: string
    }
  | undefined

const SignIn: React.FC<SignInProps> = ({}) => {
  const navigate = useNavigate()
  const { dispatch } = useAuth()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState<boolean | undefined>(false)
  const signInMutation = useMutation({
    mutationFn: (body: SignInInRequest) => {
      return signInApi(body)
    },
    mutationKey: ['login']
  })
  const errorForm: FormError = useMemo(() => {
    const error = signInMutation.error
    if (isAxiosError<{ error: FormError }>(error)) {
      return error.response?.data.error
    }
    return undefined
  }, [signInMutation.error])
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<SignInInRequest>({
    resolver: yupResolver(schemaSignInValidation),
    mode: 'onChange'
  })
  const onSubmit = (body: SignInInRequest) => {
    if (isValid) {
      signInMutation.mutate(body, {
        onSuccess: (res) => {
          if (res?.status === 200) {
            const { accessToken, refreshToken, user } = res?.data
            saveTokenAuth(accessToken, refreshToken, user.id)
            dispatch(signIn({ user }))
            toast.success('Login successfully!')
            navigate('/')
          }
        },
        onError: (error) => {
          if (isAxiosError<ApiResponse>(error)) {
            if (error?.response?.data?.message) {
              toast.error(error?.response?.data?.message)
            } else {
              toast.error(error.message)
            }
          }
        }
      })
    }
  }
  return (
    <div className='text-center w-full mt-10'>
      <h2 className='font-semibold text-3xl'>HE THONG HERON</h2>
      <div className='flex justify-center mt-10'>
        <img
          src='https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg'
          alt='abc'
          className='w-1/2'
        />
        <div className='w-1/2 p-5'>
          <h3 className='font-semibold text-xl'>DANG NHAP</h3>
          <div className='mt-5'>
            <FloatLabel>
              <InputText id='username' className='w-full' value={''} onChange={() => console.log(123)} />
              <label htmlFor='username' className='flex gap-x-2'>
                <i className='pi pi-user'></i>
                Tai khoan
              </label>
            </FloatLabel>
          </div>
          <div className='mt-5'>
            <FloatLabel>
              <InputText id='username' className='w-full' value={''} onChange={() => console.log(123)} />
              <label htmlFor='username' className='flex gap-x-2'>
                <i className='pi pi-key'></i>Mat khau
              </label>
            </FloatLabel>
          </div>

          <div className='flex items-center justify-start mt-3 gap-x-2'>
            <Checkbox onChange={() => console.log(123)} checked={true}></Checkbox>
            <p className='text-base font-light'>Nho dang nhap thong tin</p>
          </div>
          <Button className='block w-full mt-5 rounded-xl'>Dang Nhap</Button>
          <Button className='block w-full mt-5 rounded-xl'>Dang Ky</Button>
          <div className='text-blue-400 hover:text-blue-600 cursor-pointer mt-5'>
            <a href='/forget-password'>Quen mat khau</a>
          </div>
          <div className='flex mt-5 gap-x-5 justify-center'>
            <ButtonImage srcImage={LogoGithub} alt='Logo Github' label='Github' className='rounded-full' />
            <ButtonImage srcImage={LogoGoogle} alt='Logo Google' label='Google' className='rounded-full' />
            <ButtonImage srcImage={LogoGoogle} alt='Logo Google' label='Google' className='rounded-full' />
          </div>
        </div>
      </div>
    </div>
  )
  // return (
  //   <>
  //     <main>
  //       <section className='relative w-full h-full py-40 min-h-screen'>
  //         <div
  //           className='absolute top-0 w-full h-full bg-gr1ay-300 bg-no-repeat bg-full'
  //           style={{
  //             backgroundImage: "url('/img/register_bg_2.png')"
  //           }}
  //         ></div>
  //         <div className='container mx-auto px-4 h-full bg-white'>
  //           <div className='flex content-center items-center justify-center h-full'>
  //             <div className='w-full xl:w-4/12 lg:w-6/12'>
  //               <Card className='shadow-lg'>
  //                 <div className='rounded-t mb-0 px-6 py-6'>
  //                   <div className='text-center mb-3'>
  //                     <h6 className='text-gray-500 text-sm font-bold'>Sign in with</h6>
  //                   </div>
  //                   <div className='btn-wrapper text-center'>
  //                     <ButtonImage srcImage={LogoGithub} alt='Logo Github' label='Github' />
  //                     <ButtonImage srcImage={LogoGoogle} alt='Logo Google' label='Google' />
  //                   </div>
  //                   <hr className='mt-6 border-b-1 border-gray-300' />
  //                 </div>
  //                 <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
  //                   <div className='text-gray-400 text-center mb-3 font-bold'>
  //                     <small>Or sign in with credentials</small>
  //                   </div>
  //                   <form onSubmit={handleSubmit(onSubmit)}>
  //                     <div className='relative w-full mb-3'>
  //                       <label className='block uppercase text-gray-600 text-xs font-bold mb-2' htmlFor='email'>
  //                         Email
  //                       </label>
  //                       <InputText
  //                         placeholder='Email'
  //                         id='email'
  //                         className='w-full rounded-lg'
  //                         {...register('email', { required: true, maxLength: 100 })}
  //                       />
  //                       {errors?.email && <ErrorMessage message={errors?.email?.message} />}
  //                       {errorForm?.email && <ErrorMessage message={errorForm?.email} />}
  //                     </div>

  //                     <div className='relative w-full mb-3'>
  //                       <label className='block uppercase text-gray-600 text-xs font-bold mb-2' htmlFor='password'>
  //                         Password
  //                       </label>
  //                       <span className='p-input-icon-right w-full'>
  //                         <i
  //                           className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
  //                           onClick={togglePasswordVisibility}
  //                         />
  //                         <InputText
  //                           {...register('password', { required: true, minLength: 8 })}
  //                           placeholder='Password'
  //                           className='w-full rounded-lg'
  //                           id='password'
  //                           type={showPassword ? 'text' : 'password'}
  //                           value={password}
  //                           onChange={(e) => setPassword(e.target.value)}
  //                         />
  //                         {errors?.password && <ErrorMessage message={errors?.password?.message} />}
  //                         {errorForm?.password && <ErrorMessage message={errorForm?.password} />}
  //                       </span>
  //                     </div>
  //                     <div>
  //                       <label className='inline-flex items-center cursor-pointer mt-2'>
  //                         <Checkbox onChange={(e) => setRemember(e.checked)} checked={remember as boolean}></Checkbox>
  //                         <span className='ml-2 text-sm text-gray-600'>Remember me</span>
  //                       </label>
  //                     </div>

  //                     <div className='text-center mt-4'>
  //                       <Button
  //                         type='submit'
  //                         className='w-full rounded-lg'
  //                         loading={isSubmitting}
  //                         label='Sign In'
  //                         severity='secondary'
  //                         raised
  //                       />
  //                     </div>
  //                   </form>
  //                   <div className='flex flex-wrap mt-6 relative items-center'>
  //                     <div className='w-1/3 text-xs'>
  //                       <Link to='/forgot-password' className='text-blue-500'>
  //                         Forgot Password
  //                       </Link>
  //                     </div>
  //                     <div className='w-2/3 text-right'>
  //                       <span className='text-xs'>
  //                         Don’t have an account yet?
  //                         <Link to='/signup' className='text-blue-500'>
  //                           Sign Up
  //                         </Link>
  //                       </span>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </Card>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //     </main>
  //   </>
  // )
}

export default SignIn
