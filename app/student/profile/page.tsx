'use client'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { getProfilePhotoUrl, getUserProfile, type UserProfile, updateUserProfile } from '../../service/api'
import Course from '../Course'

const ProfilePage = () => {
    const enrolledCourses=[1,2,3];
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [updateError, setUpdateError] = useState('');


    useEffect(() => {
        let cancelled = false;

        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
                if (!cancelled) {
                    setUserProfile(profile);
                    setUpdatedName(profile.name);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                if (!cancelled) {
                    setProfileError('Could not load your profile. Please log in again.');
                }
            } finally {
                if (!cancelled) {
                    setIsProfileLoading(false);
                }
            }
        };
        fetchUserProfile();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!userProfile) return;

        const name = updatedName.trim();
        if (!name) {
            setUpdateError('Name is required.');
            return;
        }

        if (selectedPhoto && selectedPhoto.size > 5 * 1024 * 1024) {
            setUpdateError('Profile photo must be 5 MB or smaller.');
            return;
        }

        if (name === userProfile.name && !selectedPhoto) {
            setIsEditOpen(false);
            return;
        }

        setIsSaving(true);
        setUpdateError('');
        try {
            const updatedUser = await updateUserProfile({
                name,
                photo: selectedPhoto ?? undefined,
            });
            setUserProfile(updatedUser);
            setUpdatedName(updatedUser.name);
            setSelectedPhoto(null);
            setIsEditOpen(false);
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message
                : undefined;
            setUpdateError(
                typeof message === 'string'
                    ? message
                    : 'Could not update your profile. Please try again.'
            );
        } finally {
            setIsSaving(false);
        }
    };

  return (
    <div className='max-w-4xl mx-auto px-4  my-24'>
        <h1 className='text-2xl font-bold text-center  md:text-left mb-10'>PROFILE</h1>
        <section className='flex flex-col md:flex-row items-center md:items-start  gap-8 my-5'>
            <div className='flex flex-col items-center gap-3'>
                 <Avatar className='w-24 h-24 md:w-32 md:h-32 mb-4'>
                  <AvatarImage src={userProfile?.photo ? getProfilePhotoUrl(userProfile.photo) : undefined} />
                  <AvatarFallback>{userProfile?.name?.slice(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
            </div>
           <section className=''>
            {profileError && (
                <p role='alert' className='mb-3 text-sm text-red-500'>{profileError}</p>
            )}
            <div >
                <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                   Name: 
                   <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{userProfile?.name || (isProfileLoading ? 'Loading...' : '—')}</span>
                </h1>
            </div>
              <div >
                <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                   Email: 
                   <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{userProfile?.email || (isProfileLoading ? 'Loading...' : '—')}</span>
                </h1>
            </div>
              <div >
                <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                   Role: 
                   <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{userProfile?.role || (isProfileLoading ? 'Loading...' : '—')}</span>
                </h1>
            </div>
            <Dialog
                open={isEditOpen}
                onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (open && userProfile) {
                        setUpdatedName(userProfile.name);
                        setSelectedPhoto(null);
                        setUpdateError('');
                    }
                }}
            >
                <DialogTrigger render={<Button size='sm' className='mt-2' disabled={isProfileLoading || !userProfile} />}>
                    Edit Profile
                </DialogTrigger>
                <DialogContent>
                    <form onSubmit={handleSaveProfile}>
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                                Update your name and choose a profile photo file to upload.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='profile-name'>Name</Label>
                                <Input
                                    id='profile-name'
                                    type='text'
                                    value={updatedName}
                                    onChange={(event) => setUpdatedName(event.target.value)}
                                    placeholder='Your name'
                                    className='col-span-3'
                                    required
                                    maxLength={100}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='profile-photo'>Profile photo</Label>
                                <Input
                                    id='profile-photo'
                                    type='file'
                                    accept='image/jpeg,image/png,image/webp,image/gif'
                                    onChange={(event) => setSelectedPhoto(event.currentTarget.files?.[0] ?? null)}
                                    className='col-span-3'
                                />
                            </div>
                            {selectedPhoto && (
                                <p className='text-sm text-muted-foreground'>
                                    Selected: {selectedPhoto.name}
                                </p>
                            )}
                        </div>
                        {updateError && (
                            <p role='alert' className='mb-4 text-sm text-red-500'>
                                {updateError}
                            </p>
                        )}
                        <DialogFooter>
                            <Button type='submit' disabled={isSaving}>
                                {isSaving ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Please wait...
                                    </>
                                ) : (
                                    'Save changes'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
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
                        enrolledCourses.map((course) => <Course key={course} />
                            
                        )
                    )
                }
            </div>
        </section>
    </div>
  )
}

export default ProfilePage