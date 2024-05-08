"use client"

import { MapPin } from 'lucide'
import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const GoogleAddressSearch=()=> {
  return (
    <div className='flex gap-2 items-center w-full'>  
    <MapPin className='h-10 w-10 p-2 rounded-full text-primary bg-purple-200' />    
    <GooglePlacesAutocomplete  
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
    selectProps={{
        placeholder: 'Search Property Address',
        isClearable:true,
        className:'w-full',
        onChange:(place)=>{
            console.log(place);
        }
    }}
  />
  </div>
  )
}

export default GoogleAddressSearch;