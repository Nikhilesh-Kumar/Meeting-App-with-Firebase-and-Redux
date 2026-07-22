import React from 'react'
import ShowMeetings from './ShowMeetings';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setInitialImportant } from '@/redux/importantMeetSlice';


function Meetings() {
    let [meeting, setMeeting] = useState([]);
    
    const dispatch = useDispatch(); 
    
    let url = 'https://frontend-cohort-84c1e-default-rtdb.asia-southeast1.firebasedatabase.app/'


    useEffect(() => {
        axios.get(`${url}important.json`)
            .then((response) => {
                let loadImportantMeetings = [];
                if (response.data) {
                    for (let key in response.data) {
                        loadImportantMeetings.push({
                            id: response.data[key].id || key,
                            title: response.data[key].title,
                            date: response.data[key].date
                        });
                    }
                }
                dispatch(setInitialImportant(loadImportantMeetings));
            })
            .catch(err => console.error("Error loading initial important meetings:", err));
    }, [dispatch]); // Empty array dependency ensures this runs only ONCE on mount


    useEffect(()=>{
        axios.get(`${url}meet.json`).then((meets)=>{
        let meetings = []
        for(let key in meets.data){
              let meet = {
                id: key,
                ...meets.data[key]
              }
              meetings.push(meet);
            }
            setMeeting(meetings)
      })
    }, [])
  
  
  return (
    <div>
      {
        meeting.map(meet=> <ShowMeetings key={meet.id} id={meet.id} title={meet.title} date={meet.date} />)
      }
    </div>
  )
}

export default Meetings
