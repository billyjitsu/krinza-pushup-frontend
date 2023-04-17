import React from 'react'

function Intro() {
  return (
    <>
    <div className=" text-gray-500 font-inter">
    <div>
      <h1
        className="px-8 mt-16 pt-64 mb-4 text-5xl font-extrabold leading-tight text-center text-white xl:text-6xl "
      >
        The<span className="text-indigo-700 "> Krinza </span>10 Push Challenge
      </h1>
      <p className="max-w-xl mx-auto mb-8 text-xl text-center xl:max-w-2xl text-white">
        10 push ups. 45 days. Haters vs. Belivers. Which are you?
      </p>
      <div className="flex flex-col justify-center max-w-xs mx-auto mb-12 sm:max-w-full sm:flex-row">
        <button className=" bg-blue-500 hover:bg-red-600 rounded-full px-12 py-2 text-white font-bold">
            Hater
        </button>
        <p className="text-white md:pt-1 mr-5 ml-5"> or </p>
        <button
            className=" bg-blue-500 hover:bg-red-600 rounded-full px-12 py-2  text-white font-bold"
        >
            Believer
        </button>
      </div>
      <p className="max-w-xl mx-auto mb-8 text-xl text-center xl:max-w-2xl text-white">
        Built by friends at <a  href="https://www.developerdao.com/">Developer DAO</a>.
      </p>
      </div>
      </div>
    </>
  )
}

export default Intro