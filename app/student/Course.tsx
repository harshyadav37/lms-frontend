'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Course = () => {
  return (
   <Card className='bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl shadow-lg transform hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden'>
    <div className='relative'>
        <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ771XEYszEKCR4P2k6lgll_ELJvzZymyautPjMInlXZA&s=10"
        className='w-full h-36 mt-[-24px] rounded-t-lg object-cover'
        alt="Course Image"
        />
    </div>
    <CardContent className='px-5 py-4 space-y-3'>
        <h1 className='hover:underline font-bold text-lg truncate'>Next.js complete course in hindi</h1>
     <section className='flex items-center justify-between'>
         <div className='flex items-center gap-3'>
                <Avatar className='w-8 h-8'>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className='font-medium text-sm'>Patel Mernstack</h1>
        </div>
        <Badge className='bg-blue-600 text-white px-2 py-1 text-sm rounded-full hover:bg-blue-200'> Beginner </Badge>
    </section>
    <div>
        <span>₹499</span>
    </div>
    </CardContent>
   </Card>
  )
}

export default Course