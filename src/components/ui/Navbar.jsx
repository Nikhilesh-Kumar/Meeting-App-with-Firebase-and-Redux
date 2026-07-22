import React from 'react'
import { useRef, useState } from 'react';
import {Link} from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import { useNavigate } from "react-router-dom";




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
import { Calendar as CalendarIcon, Trash2  } from "lucide-react"
 
import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useSelector, useDispatch } from 'react-redux';
import { removeFromImportant } from '@/redux/importantMeetSlice';

function Navbar() {
    let url = 'https://frontend-cohort-84c1e-default-rtdb.asia-southeast1.firebasedatabase.app/'
    const [date, setDate] = useState();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const titleInput = useRef(null)

    const dispatch = useDispatch();
    const importantItems = useSelector((state) => state.important.items);

    function handleSubmit(){
        if (!titleInput.current?.value || !date) {
            alert("Please enter a title and select a date to save this meeting.");
        return;
    }
        axios.post(`${url}meet.json`,{
            title: titleInput.current.value,
            date: date,
        }
        ).then(()=>{
            console.log('data saved')
            resetForm(); // Clean up fields
            setIsOpen(false); // Close modal panel safely
            navigate("/showmeetings")
        })
        
    }

    function resetForm() {
        if (titleInput.current)titleInput.current.value = "";
        setDate(undefined);
    }


    function handleOpenChange(openState) {
        setIsOpen(openState);
        if (!openState) {
        resetForm(); // Silently clear data if they close/cancel based on mood
        }
    }

    function handleRemoveImportantFromNavbarDropdown(itemId, itemTitle){
        axios.delete(`${url}important/${itemId}.json`).then(()=>{
            dispatch(removeFromImportant(itemId));
            alert(`${itemTitle} removed from important`); 
        })
    }



  return (
    <div>
        <div className="border-b border-neutral-100 py-3">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link to="/" className='font-semibold'>Codekaro Meetings</Link>
            <div className="flex gap-4 items-center">
                <Link to="/previous" className='bg-black text-white hover:bg-neutral-800 text-sm font-medium h-9 px-4 inline-flex items-center rounded-lg transition-colors'>Past Meetings</Link>
                <Link to="/showmeetings" className='bg-black text-white hover:bg-neutral-800 text-sm font-medium h-9 px-4 inline-flex items-center rounded-lg transition-colors'>Go to Meetings</Link>
                
                <Popover>
                    <PopoverTrigger /* asChild */
                        render={<Button variant="outline" className="flex items-center gap-2 h-9 bg-black text-white hover:bg-neutral-800 hover:text-white">
                            ⭐ Important
                            {importantItems.length > 0 && (
                                <span className="bg-yellow-500 text-neutral-900 text-xs px-1.5 py-0.5 rounded-full font-bold">
                                    {importantItems.length}
                                </span>
                            )}
                        </Button>}
                        >
                        {/* <Button variant="outline" className="flex items-center gap-2 h-9">
                            ⭐ Important
                            {importantItems.length > 0 && (
                                <span className="bg-yellow-500 text-neutral-900 text-xs px-1.5 py-0.5 rounded-full font-bold">
                                    {importantItems.length}
                                </span>
                            )}
                        </Button> */}
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                        <div className="px-4 py-2 border-b border-neutral-100 font-semibold text-xs uppercase tracking-wider text-neutral-400 flex justify-between items-center">
                            <span>Important Meetings</span>
                        </div>

                        {importantItems.length === 0 ? (
                            <div className="px-4 py-6 text-center text-sm text-neutral-400 italic">
                                No important meetings saved.
                            </div>
                        ) : (
                            <div className="max-h-64 overflow-y-auto">
                                {
                                    importantItems.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className="px-4 py-3 hover:bg-neutral-50 flex justify-between items-center transition-colors border-b border-neutral-50 last:border-0"
                                        >
                                            <div className="truncate pr-2">
                                                <p className="font-medium text-sm text-neutral-800 truncate">{item.title}</p>
                                                <p className="text-xs text-neutral-400 mt-0.5 truncate">
                                                    {/* Formats display date cleanly within dropdown view */}
                                                    {item.date ? format(new Date(item.date), "MMM dd, yyyy") : 'No time set'}
                                                </p>
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="icon"
                                                className="h-7 w-7 text-neutral-400 hover:text-red-500 hover:bg-red-50"
                                                onClick={() => handleRemoveImportantFromNavbarDropdown(item.id, item.title)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </PopoverContent>
                </Popover>
                
                
                <Sheet open={isOpen} onOpenChange={handleOpenChange}>
                    <SheetTrigger render={<Button variant="outline">Add Meeting</Button>} className='bg-black text-white hover:bg-neutral-800 hover:text-white px-3 py-1 rounded-lg' />
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
