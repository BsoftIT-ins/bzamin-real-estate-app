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
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "sonner";

const EditListing = ({ params }) => {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && verifyUserRecord();
  },[user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from('bzameen_database')
      .select('*')
      .eq('createdBy', user?.primaryEmailAddress.emailAddress)
      .eq('id', params.id);

    if (data?.length <= 0) {
      router.replace('/');
    }
  };

  const onSubmitHandler = async (formValue) => {
    const { data, error } = await supabase
      .from('bzameen_database')
      .update(formValue)
      .eq('id', params.id)
      .select();

    if (data) {
      console.log(data);
      toast('Update listing and published');
    }
  };

  
  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-2xl">
        Enter more details about your listing
      </h2>

      <Formik
      initialValues={{ type: "", propertyType: "" }}
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
                  <RadioGroup
                  onValueChange={(values) => console.log = values}
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
                  onValueChange={(e) => console.log = e}
                                  
                  name="propertyType">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Property Type" />
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
                  <Input type="number" placeholder="Ex.2" name="bedroom" onchange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Bathroom</h2>
                  <Input type="number" placeholder="Ex.2" name="bathroom" onchange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Built In</h2>
                  <Input type="number" placeholder="Ex.2" name="builtIn" onchange={handleChange}/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Parking</h2>
                  <Input type="number" placeholder="Ex.2" name="parking" onchange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Plot Size (Sq.Ft)</h2>
                  <Input type="number" placeholder="Ex.2" name="plotSize" onchange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Area (Sq.Ft)</h2>
                  <Input type="number" placeholder="Ex.2" name="area" onchange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">Selling Price ($)</h2>
                  <Input type="number" placeholder="400000" name="price" onchange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-grey-500">HOA (Per Month) ($)</h2>
                  <Input type="number" placeholder="100" name="hoa" onchange={handleChange}/>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-10">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-grey-500">Description</h2>
                  <Textarea
                    placeholder="Type your message here..."
                    name="description"
                  />
                </div>
              </div>
              <div className="flex gap-7 justify-end mt-5">
                <div>
                  <Button type="submit" variant="outline">
                    Save
                  </Button>
                </div>
                <Button type="submit">Save & Publish</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditListing;
