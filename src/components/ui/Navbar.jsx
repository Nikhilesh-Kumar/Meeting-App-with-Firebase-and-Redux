import React from 'react'
import { useRef, useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


function Navbar() {
    let url = 'https://frontend-cohort-84c1e-default-rtdb.asia-southeast1.firebasedatabase.app/'
    const [date, setDate] = useState();
    const titleInput = useRef(null)

    function handleSubmit(){
        axios.post(`${url}meet.json`,{
            title: titleInput.current.value,
            date: date,
        }
        ).then(()=>{
                console.log('data saved')
        })
    }




  return (
    <div>
        <div className="border-b border-neutral-100 py-3">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link to="/">Codekaro Meetings</Link>
            <div className="flex gap-4 items-center">
                <Link to="/previous">Past Meetings</Link>
                <Sheet>
                    <SheetTrigger render={<Button variant="outline">Add Meeting</Button>} />
                    {/* <Button variant="outline">Add Meeting</Button> */}
                    {/* </SheetTrigger> */}
                    <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Meeting</SheetTitle>
                        <SheetDescription>
                        Create new meeting with your members. Click save when you&apos;re done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                        <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Title</Label>
                        <Input ref={titleInput} id="sheet-demo-name" placeholder="Meeting Title" />
                        </div>
                        <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">Date</Label>
                        {/* <Input id="sheet-demo-username" placeholder="Meeting date" /> */}
                            <Popover>
                                <PopoverTrigger
                                    render={
                                    <Button
                                        variant="outline"
                                        data-empty={!date}
                                        className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                                    />
                                    }
                                >
                                    <CalendarIcon />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={date} onSelect={setDate} />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <SheetFooter>
                        <Button onClick={handleSubmit}>Add Meeting</Button>
                        <SheetClose render={<Button variant="outline">Close</Button>} />
                        {/* <Button variant="outline">Close</Button> */}
                        {/* </SheetClose> */}
                    </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;
