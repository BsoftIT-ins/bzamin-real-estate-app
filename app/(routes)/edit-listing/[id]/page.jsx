"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function EditListing() {
  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-2xl">
        Enter more details about your listing
      </h2>
      <div className="p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
            <RadioGroup defaultValue="Sell">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Rent" id="Rent" />
                <Label htmlFor="Rent">Rent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Sell" id="Sell" />
                <Label htmlFor="Sell">Sell</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-2">
          <h2 className="text-lg text-slate-500">Property Type</h2>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single Family House">Single Family House</SelectItem>
                <SelectItem value="Town House">Town House</SelectItem>
                <SelectItem value="Condomoniumem">Condomonium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-grey-500">Bedroom</h2>
            <Input type='number' placeholder='Ex.2' name='Bedroom' />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-grey-500">Bathroom</h2>
            <Input type='number' placeholder='Ex.2' name='Bathroom' />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-grey-500">Builtin</h2>
            <Input type='number' placeholder='Ex.2' name='Builtin' />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-grey-500">Parking</h2>
            <Input type='number' placeholder='Ex.2' name='Parking' />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-grey-500">Plot Size (Sq.Ft)</h2>
            <Input type='number' placeholder='Ex.2' name='PlotSize' />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-grey-500">Area (Sq.Ft)</h2>
            <Input type='number' placeholder='Ex.2' name='Area' />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-grey-500">Selling Price ($)</h2>
            <Input type='number' placeholder='400000' name='sellingPrice' />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-grey-500">HOA (Per Month) ($)</h2>
            <Input type='number' placeholder='100' name='hoa' />
          </div>
          
        </div>
        <div className="mt-5 grid grid-cols-1 gap-10">
          <div className="flex gap-2 flex-col">
            <h2 className="text-grey-500">Description</h2>
            <Textarea placeholder='Type your message here...' name='description'/>
          </div>
        </div>
          <div className="flex gap-7 justify-end mt-5">
            <div>
            <Button>Save</Button>
            </div>
            <Button>Save & Publish</Button>
          </div>
      </div>
    </div>
  );
}

export default EditListing;
