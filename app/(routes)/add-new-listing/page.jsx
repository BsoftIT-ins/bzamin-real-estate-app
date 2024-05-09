"use client"
import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch';
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'



const AddNewListing = () => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();

  const {user}=useUser();

  const nextHandler=async()=>{
    console.log(selectedAddress, coordinates);
    
    const { data, error } = await supabase
    .from('bzameen_database')
    .insert([
      {address: selectedAddress, 
        coordinates: coordinates, 
        createdBy:user?.primaryEmailAddress.emailAddress
      },
    ])
    .select();
    
    if(data){
      console.log("New data Added,", data);
    }
    if(error){
      console.log("Error");
    }

  }
  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
    <div className='p-10 flex flex-col gap-5 items-center justify-center'>
        <h2 className='font-bold text-2xl'>Add New Listing</h2>
        <div className='p-5 w-full rounded-lg border shadow-md flex flex-col gap-5'>
            <h2 className='text-grey-500'>Eneter Address which you want to list</h2>
            <GoogleAddressSearch
            selectedAddress={(value)=>setSelectedAddress(value)}
            setCoordinates={(value)=>setCoordinates(value)}
            />
            <Button
            disabled={!selectedAddress || !coordinates}
            onClick={nextHandler}
            >Next</Button>
        </div>
    </div>
    </div>
  )
}

export default AddNewListing;