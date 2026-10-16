'use client'
import { Button } from '@base-ui/react'
import React from 'react'

const HeroSection = () => {
  return (
    <section className='relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center '>
<div className='max-w-3xl mx-auto'>
    <h1 className='text-4xl font-bold text-white mb-4'>Find the perfect online course for you</h1>
    <p className='text-lg text-gray-300 dark:text-gray-400 mb-8'>
      Discover thousands of courses from top instructors and institutions around the world.
    </p>
    <form action='' className='flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden shadow-lg overflow-hidden max-w-xl mx-auto mb-6'>
      <input
  type="text"
  placeholder="Search for courses..."
  className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
/>
<Button className='bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 px-6 py-3  dark:hover:bg-blue-700 text-white rounded-r-full '>Search</Button>
    </form>
    <Button className='bg-white dark:bg-gray-800 text-blue-600 text-medium hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white border border-gray-300 dark:border-gray-500 rounded-full py-1.5 px-4'>
      Explore Courses
    </Button>
</div>
    </section>
  )
}

export default HeroSection