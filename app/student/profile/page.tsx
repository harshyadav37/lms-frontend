'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

import React from 'react'
import Course from '../Course'

const page = () => {
    const isLoading = false;
    const enrolledCourses=[1,2,3];
  return (
    <div className='max-w-4xl mx-auto px-4  my-24'>
        <h1 className='text-2xl font-bold text-center  md:text-left mb-10'>PROFILE</h1>
        <section className='flex flex-col md:flex-row items-center md:items-start  gap-8 my-5'>
            <div className='flex flex-col items-center gap-3'>
                 <Avatar className='w-24 h-24 md:w-32 md:h-32 mb-4'>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
           <section className=''>
            <div >
                <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                   Name: 
                   <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>harsh yadav lms</span>
                </h1>
            </div>
              <div >
                <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                   Email: 
                   <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>harsh@example.com</span>
                </h1>
            </div>
              <div >
                <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                   Role: 
                   <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>Student</span>
                </h1>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size='sm' className='mt-2'>Edit Profile</Button>

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label>Name</Label>
                            <Input type="text" placeholder="harsh yadav lms" className="col-span-3" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label>Email</Label>
                            <Input type="email" placeholder="harsh@example.com" className="col-span-3" /> 
                        </div>
                         <div className='grid grid-cols-4 items-center gap-4'>
                            <Label>Profile</Label>
                            <Input type="file" accept='image/*' className="col-span-3" /> 
                        </div>

                    </div>
                    <DialogFooter>
                        <Button disabled={isLoading}>
                        {
isLoading ? ( <>
  <Loader2 className="animate-spin mr-2 h-4 w-4" /> Please wait...</>
  
) : (
    <Button>Save changes</Button>
)
                        }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            </section>
        </section>

        <section>
            <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                Courses you are enrolled in
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-4 my-5'>
                   {/* Course cards would go here */}
                {
                    enrolledCourses.length === 0 ? (
                        <p>You are not enrolled in any courses</p>
                    ) : (
                        enrolledCourses.map((course ,index) => <Course/>
                            
                        )
                    )
                }
            </div>
        </section>
    </div>
  )
}

export default page