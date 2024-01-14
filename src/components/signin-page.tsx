import Head from 'next/head'
import 
{
  FaGoogle, 
  FaRegEnvelope
} from 'react-icons/fa';

import{MdLockOutline} from 'react-icons/md';


export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=' bg-white flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <div className='bg-black rounded-2xl shadow-2xl flex w-2/3 max-w-4xl '>
          <div className='w-3/5 p-5 bg-#00203FFF'>
            <div className='text-left font-bold'>
              <span className='text-lime-500'>Project</span>Finder
            </div>

            <div className='py-10'>
              <h2 className='text-3xl font-bold text-lime-500 mb'>
                Sign in to Account
                </h2>
              <div className='border-2 w-12 border-lime-500 inline-block mb-2'></div>
              {/* Socila login section */}
              <div className='flex justify-center my-2'>
              

                <a href="#" className='border-2 border-white rounded-full p-3 mx-1'>
                  <FaGoogle className='text-sm'/>
                </a>
              </div>

              <p className='text-white my-3'>Login with e-mail</p>
              <div className='flex flex-col items-center'>
                <div className='bg-gray-600 w-64 p-2 flex items-center mb-3 '>
                  <FaRegEnvelope className='text-white mr-2'/>
                <input type="email" name="email" placeholder='Email' className='bg-transparent outline-none text-sm flex-1'/>  
                </div>

                <div className='bg-gray-600 w-64 p-2 flex items-center mb-3'>
                  <MdLockOutline className='text-white mr-2'/>
                <input type="password" name="password" placeholder='Password' className='bg-transparent outline-none text-sm flex-1'/>  
                </div>

                <div className='flex justify-between w-64 mb-5'>
                  <label className='flex items-center text-xs'><input type='checkbox' name='remember' className='mr-1'/>Remember me</label>
                  <a href="#" className='text-xs'>Forgot Password?</a>
                </div>
                <a href="#" className='border-2 border-lime-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-lime-500'>Sign In</a>
              </div>

            </div>

            
            </div>{/*sign in section*/ }


          <div className='w-2/5 bg-lime-500 rounded-tr-2xl rounded-br-2xl py-36 px-12'>
            <h2 className='text-2xl font-bold mb-2'>Hello, Buddy!</h2>
            <div className='border-2 w-12 border-white inline-block mb-2'></div>
            <p className='mb-10'>Fill up the Details.</p>
            <a href="#" className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-lime-500'>Sign Up</a>
          
            </div>{/*sign up section*/}
        </div>
      </main>
    </div>
  );
}
