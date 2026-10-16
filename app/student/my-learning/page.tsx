'use client'
import Navbar from '../../../components/Navbar'
import React from 'react'
import Course from '../Course';


const MyLearning = () => {
 const  isloading =false;
 const myLearningCourses=[];
  return (
    <section className=''>
       <Navbar />
      <div className='max-w-4xl mx-auto my-10 px-4 md:px-0'>
     
        <h1 className='text-3xl  font-bold text-center mb-10'>My Learning</h1>
        {
          isloading ? (
   <MyLearningSkeleton/>
          ):myLearningCourses.length === 0 ? (<p>You are not enrolled in any courses</p>):(
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>{[1,2].map((course, index) => <Course key={index} />)}   </div>
          )
        }
    </div>
    </section>
  )
}

export default MyLearning


const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);