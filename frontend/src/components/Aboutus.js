import React from 'react'
import { Details } from '../data';
function Aboutus() {

  return (
    <div className="flex justify-center min-h-screen bg-white py-2">
    <div className="flex flex-col">
      <div className="flex flex-col mt-4">
        {/* Meet the Team */}
        <div className="container max-w-7xl px-4">
          {/* Section Header */}
          <div className="flex flex-wrap justify-center text-center mb-10">
            <div className="w-full lg:w-6/12 px-4">
              {/* Header */}
              <h1 className="text-gray-900 text-4xl font-bold mb-2">Meet the Team</h1>
            </div>
          </div>
          {/* Team Members */}
          <div className="flex flex-wrap">
          {Details.map((detail) => (
             <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
             <div className="flex flex-col">
               <a href="#" className="mx-auto">
                 <img className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100" src={detail.src} />
               </a>
               <div className="text-center mt-6">
                 <h1 className="text-gray-900 text-xl font-bold mb-1">{detail.name}</h1>
                 <div className="text-gray-700 font-light mb-2">{detail.name}</div>
               </div>
             </div>
           </div>
          ))}
          </div>
        </div>
      </div>
    </div>

    <div className="mt-16 ml-6 sm:mt-24 lg:mt-0 lg:col-span-5">
      <div className="mt-12 ml-8">
        <div className="grid grid-cols-[auto,1fr]  gap-6 sm:gap-6 xl:gap-8">
          <div className="text-center sm:flex sm:items-center sm:justify-center">
            <div className="sm:flex-shrink-0">
              <div className="flow-root">
                <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparenhover:bg-primary/80 inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 bg-green-100 rounded-full">
                  Guide
                </div>
                <div className="mt-4 flex justify-center space-x-3">
                  
                  <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <img className="aspect-square h-full w-full" alt="" src={Details[0]["src"]}/>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center sm:flex sm:items-center sm:justify-center">
            <div className="sm:flex-shrink-0">
              <div className="flow-root">
                <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparenhover:bg-primary/80 inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5  bg-green-100 rounded-full">
                  Team Members
                </div>
                <div className="mt-4 flex justify-center space-x-3">
                  {Details.map((det)=>(
                  <span className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <img className="aspect-square h-full w-full" alt="" src={det.src}/>
                    <span>{det.name}</span>
                  </span>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          
    </div>

  </div>
  
  )
}

export default Aboutus