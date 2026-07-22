import React, { useState } from 'react'
import { format, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { addToImportant, removeFromImportant } from '@/redux/importantMeetSlice';
import axios from 'axios';



function ShowMeetings({id, title, date}) {
    
    const displayDate = date ? format(parseISO(date), "PPP 'at' p") : "No date set";

    const importantItems = useSelector((state) => state.important.items);
    const dispatch = useDispatch();

    const isAlreadyImportant = importantItems.some(item => item.id === id);

    let url = 'https://frontend-cohort-84c1e-default-rtdb.asia-southeast1.firebasedatabase.app/'

    function handleAddToImportant(){
        axios.put(`${url}important/${id}.json`, { id, title, date }).then(()=>{
            dispatch(addToImportant({ id, title, date }))
            alert(`${title} added to important`)
        })
    }

    function handleRemoveFromImportant(){
        axios.delete(`${url}important/${id}.json`)
            .then(() => {
                dispatch(removeFromImportant(id));
                alert(`${title} removed from important`);
            })
    }
    
  return (
    <>
        <div className='max-w-xl mx-auto mt-12 border border-neutral-200 py-4 px-5 rounded-lg shadow-sm bg-white flex justify-between items-center'>
            <div>
                <h3 className="font-semibold text-lg text-neutral-800">{title}</h3>
                <div className="flex items-center gap-2 mt-2 text-neutral-500 text-sm">
                    <span>⏰</span>
                    <p>{displayDate}</p>
                </div>
            </div>
            <div>
                {/* <button onClick={handleAddToImportant} className='bg-blue-100 px-2 py-0.5 rounded-lg text-xs'>{important ? 'Important' : 'Add To Important'}</button> */}
                <button 
                    onClick={isAlreadyImportant ? handleRemoveFromImportant : handleAddToImportant} 
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        isAlreadyImportant 
                            ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                >
                    {isAlreadyImportant ? '❌ Remove Important' : '⭐ Add To Important'}
                </button>
            </div>
        </div>
    </>
  )
}

export default ShowMeetings
