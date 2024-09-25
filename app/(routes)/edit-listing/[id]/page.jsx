"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Formik } from "formik";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import FileUpload from "../_components/fileUpload";
import { Loader } from "lucide-react";


const EditListing = ({ params }) => {
  
  const { user } = useUser();
  const router = useRouter();
  const [listing, setListing]=useState({})
  const [images, setImages]=useState([]);
  const [loading, setLoading]=useState(false);

  useEffect(() => {
    user && verifyUserRecord();
  },[user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from('bzameen_database')
      .select('*')
      .eq('createdBy', user?.primaryEmailAddress.emailAddress)
      .eq('id', params.id);

      if(data)
      {
        setListing(data[0]);
        console.log(listing);
      }
      

    if (data?.length <= 0) {
      router.replace('/');
    }
  };

  const onSubmitHandler = async (formValue) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bzameen_database')
      .update(formValue)
      .eq('id', params.id)
      .select();

    if (data) {
      console.log(data);
      toast('Update listing and published');
    }
    for(const image of images)
    {
      const file=image;
      const fileName=Date.now().toString();
      const fileExt=fileName.split('.').pop();
      const {data, error} = await supabase.storage
      .from('listingImages')
      .upload(`${fileName}`, file,{
        contentType:`image/${fileExt}`,
        upsert:false
      });
      if(error)
      {
        setLoading(false);
        toast("Error while uploading images");
      }
      else{
        
        const imageUrl=process.env.NEXT_PUBLIC_IMAGE_URL+fileName;
        
        const {data, error} = await supabase
        .from('listingImages')
        .insert([
          {url:imageUrl, listing_Id:params?.id}
        ])
        .select();
        if(error)
        {
          setLoading(false);
        }
      }
      setLoading(false);
    }
  };

  
  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-2xl">
        Enter more details about your listing
      </h2>

      <Formik
      initialValues={{ 
        type: "", 
        propertyType:"",
        profileImage:user?.imageUrl,
        fullName:user?.fullName

      }}
        onSubmit={(values) => {
          console.log(values);
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit })  => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">
                    Do you want to Sell or Rent{" "}
                  </h2>
                  <RadioGroup defaultValue={listing?.type}
                  onValueChange={(v) => values.type=v}
                    >
                    <div className="font-bold text-lg flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label className="font-bold text-lg" htmlFor="Sell">
                        Sell
                      </Label>
                    </div>
                    <div className=" flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label className="font-bold text-lg" htmlFor="Rent">
                        Rent
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Property Type</h2>
                  <Select
                  onValueChange={(e) => values.propertyType = e}
                                  
                  name="propertyType"
                  defaultValue={listing?.propertyType}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={listing?.propertyType?listing?.propertyType:"Select Property Type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">
                        Single Family House
                      </SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condomoniumem">Condomonium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Bedroom</h2>
                  <Input type="number" placeholder="Ex.2"
                  defaultValue={listing?.bedroom} name="bedroom" onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Bathroom</h2>
                  <Input type="number" placeholder="Ex.2" defaultValue={listing?.bathroom} name="bathroom" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Built In</h2>
                  <Input type="number" placeholder="Ex.2" defaultValue={listing?.builtIn} name="builtIn" onChange={handleChange}/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Parking</h2>
                  <Input type="number" placeholder="Ex.2" defaultValue={listing?.parking} name="parking" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Plot Size (Sq.Ft)</h2>
                  <Input type="number" placeholder="Ex.2" defaultValue={listing?.plotSize} name="plotSize" onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Area (Sq.Ft)</h2>
                  <Input type="number" placeholder="Ex.2" defaultValue={listing?.area} name="area" onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Selling Price ($)</h2>
                  <Input type="number" placeholder="400000" name="price" defaultValue={listing?.price} onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">HOA (Per Month) ($)</h2>
                  <Input type="number" placeholder="100" defaultValue={listing?.hoa} name="hoa" onChange={handleChange}/>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-grey-500">Description</h2>
                  <Textarea
                    placeholder="Type your message here..."
                    name="description" defaultValue={listing?.description}
                  />
                </div>
              </div>
              <div>
              <h2 className="font-lg text-grey-500 my-2">Property Image</h2>
                <FileUpload setImages={(value)=>setImages(value)}/>
              </div>

              <div className="flex gap-7 justify-end mt-5">
                <div>
                  <Button type="submit" variant="outline">
                    Save
                  </Button>
                </div>
                <Button disabled={loading} type="submit">
                {loading?<Loader className="animate-spin"/>:'Save & Publish'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditListing;
