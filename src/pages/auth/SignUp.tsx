import { Button } from 'primereact/button'
import ButtonImage from '@/components/button/ButtonImage'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoGithub from '@/assets/github.png'
import LogoGoogle from '@/assets/google.png'

type SignUpProps = {}
const SignUp: React.FC<SignUpProps> = ({}) => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      <main>
        <section className='relative w-full h-full py-20 min-h-screen'>
          <div
            className='absolute top-0 w-full h-full bg-g1ray-800 bg-no-repeat bg-full'
            style={{
              backgroundImage: "url('/img/register_bg_2.png')"
            }}
          ></div>
          <div className='container mx-auto px-2 h-full'>
            <div className='flex content-center items-center justify-center h-full'>
              <div className='w-full xl:w-4/12 lg:w-6/12'>
                <Card className='shadow-lg'>
                  <div className='rounded-t mb-0 px-6 py-6'>
                    <div className='text-center mb-3'>
                      <h6 className='text-gray-500 text-sm font-bold'>Sign up with</h6>
                    </div>
                    <div className='btn-wrapper text-center'>
                      <ButtonImage srcImage={LogoGithub} alt='Logo Github' label='Github' />
                      <ButtonImage srcImage={LogoGoogle} alt='Logo Google' label='Google' />
                    </div>
                    <hr className='mt-6 border-b-1 border-gray-300' />
                  </div>
                  <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                    <div className='text-gray-400 text-center mb-3 font-bold'>
                      <small>Or sign up with credentials</small>
                    </div>
                    <form>
                      <div className='relative w-full mb-3'>
                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2' htmlFor='email'>
                          Email
                        </label>
                        <InputText placeholder='Email' id='email' className='w-full rounded-lg' />
                      </div>
                      <div className='relative w-full mb-3'>
                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2' htmlFor='first_name'>
                          First Name
                        </label>
                        <InputText id='first_name' placeholder='First Name' className='w-full rounded-lg' />
                      </div>
                      <div className='relative w-full mb-3'>
                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2' htmlFor='last_name'>
                          Last Name
                        </label>
                        <InputText id='last_name' placeholder='Last Name' className='w-full rounded-lg' />
                      </div>

                      <div className='relative w-full mb-3'>
                        <label className='block uppercase text-gray-600 text-xs font-bold mb-2' htmlFor='password'>
                          Password
                        </label>
                        <span className='p-input-icon-right w-full'>
                          <i
                            className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                            onClick={togglePasswordVisibility}
                          />
                          <InputText
                            placeholder='Password'
                            className='w-full rounded-lg'
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </span>
                      </div>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-gray-600 text-xs font-bold mb-2'
                          htmlFor='password_confirm'
                        >
                          Password Confirm
                        </label>
                        <span className='p-input-icon-right w-full'>
                          <i
                            className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                            onClick={togglePasswordVisibility}
                          />
                          <InputText
                            placeholder='Password'
                            className='w-full rounded-lg'
                            id='password_confirm'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </span>
                      </div>
                      <div>
                        <label className='inline-flex items-center cursor-pointer mt-2'>
                          <input
                            id='customCheckLogin'
                            type='checkbox'
                            className='form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
                          />
                          <span className='ml-2 text-sm text-gray-600'>I agree with the Privacy Policy</span>
                        </label>
                      </div>

                      <div className='text-center mt-4'>
                        <Button className='w-full rounded-lg' label='Register' severity='secondary' raised />
                      </div>
                    </form>
                    <div className='flex flex-wrap mt-6 relative'>
                      <div className='w-1/2 text-right'>
                        <div className='text-center'>
                          <span className='text-xs'>
                            You have an account yet?
                            <Link to='/signin' className='text-blue-500'>
                              Sign In
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default SignUp
