"use client"

import {useUser} from '@clerk/nextjs';


import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'),{ssr:false});
import 'react-quill-new/dist/quill.snow.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// import {CircularProgressbar} from'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css'

export default function CreatePostPage(){
  const {isSignedIn,user, isLoaded} = useUser()
  if(!isLoaded){
    return null;
  }
  if(isSignedIn && user.publicMetadata.isAdmin){
    return (
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>CreatePostPage</h1>
        <form className='flex flex-col gap-4' >
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput 
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
              onChange={(e) => setFormData({...FormData, title: e.target.value})}
            />
            <Select onChange={(e) => setFormData({...FormData, category: e.target.value})}>
              <option value='uncategorized'>Select a category</option>
              <option value='javascript'>Javascript</option>

              <option value='uncategorized'>React.js</option>
              <option value='uncategorized'>Next.js</option>
              
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between boorder-4 border-teal-400 border-dotted p-3">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              />
              <Button
                type='button'
                gradientDuoTone='purpleToBlue'
                size= 'sm'
                outline
                // onClick={handleUploadImage}
                // disabled={imageUploadProgress}
              >
                {/* {imageUploadProgress ? (
                  <div className='w-16 h-16'>
                    {/* <CircularProgressbar
                     value={imageUploadProgress}
                     text={`${imageUploadProgress || 0}%`} */}
                     {/* /> 
                  </div>
                ):(
                  'Upload Image'
                )} */}
                 'Upload Image'
              </Button>
          </div>

          {/* {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )} */}
          {FormData.image &&(
            <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'/>
          )}

          <ReactQuill
            theme='snow'
            placeholder='Write simething...'
            className='h-72 mb-12'
            required
            onChange={(value) => {
              setFormData({...formData, content: value});
            }}
            />

            <Button type="submit" gradientDuoTone="purpleToPink">
              Publish
            </Button>
        </form>
      </div>
    );
  }else{
    return(
      <h1 className='text-center text-3xl my-7 font-semibold'>
        You are not authorized to view this page
      </h1>
    )
  }
}