import React from 'react'
import { TITLE, DETAILS, Details, DESCRIPTION, SUBHEADER } from '../data';
import { Link } from 'react-router-dom';

function Home() {
  return (
<>
  {/* component */}
  <div className="bg-white  font-sans flex mt-6 justify-center overflow-y-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left ">
        <div className="">
          <div className="text-center flex-col items-center justify-center">
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
              <span className="text-green-600">{TITLE.slice(0,5)}</span>
              <span className="">{TITLE.slice(5)}</span>
              <p className="text-zinc-700 md:block text-xl lett">{SUBHEADER}</p>
            </h1>
          </div>
          <p className="text-base mt-4 text-gray-600 sm:text-xl lg:text-lg xl:text-xl text-center">
          {DESCRIPTION}
          </p>
          <div className="mt-8 flex justify-center items-center">
            <Link to="/image-detection" className="inline-flex items-center text-white bg-green-500 justify-center rounded-md text-base font-mediumring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-7 py-2 w-full sm:w-auto">
              Image Detection
            </Link>
            <Link to="/real-time-detection" className="inline-flex hover:ring-gray-400 hover:bg-gray-100 items-center justify-center rounded-md text-basefont-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ringfocus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accenthover:text-accent-foreground h-12 px-7 py-2 mt-0 w-full sm:mt-0 sm:ml-3 sm:w-auto">
              Real Time Detection
            </Link>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <div className="flex flex-wrap justify-center text-center mb-6">
            <div className="w-full lg:w-6/12 px-4">
              <h1 className="text-gray-900 text-3xl font-bold">Meet the Team</h1>
            </div>
          </div>
          <div className="flex flex-wrap w-full justify-center gap-4">
            
            {Details.map((det)=>(
              <div className="flex flex-col text-center ">
                <div className="inline-block mb-4 relative shrink-0 rounded-[.95rem]">
                  <img className="inline-block shrink-0 rounded-[.95rem] w-[150px] h-[150px]" src={det.src} alt="avarat image"  />
                </div>
                <div className="text-center">
                  <Link to="#" className="text-dark font-semibold hover:text-primary text-[1rem] transition-colors duration-200 ease-in-out" >
                  {det.name}
                  </Link>
                  <span className="block font-light text-muted">{det.title}</span>
                </div>
              </div>    
            ))}
          </div>
        </div>
    </div>
  </div>
</>

  )
}

export default Home