import React, { useEffect } from 'react'
import { getAllUser } from './useReducer' 
import { useDispatch, useSelector } from 'react-redux'

export default function User() {
    // lấy data về dingf useSelector
    const data:any = useSelector(state=>state);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllUser());
    },[])
    console.log("1111",data);
  return (
    <div>User
        <h1>danh sách users</h1>
        <ul>
            {data.useReducer.users.map((user:any)=>{
                return <li key={user.id}>{user.name}</li>
            })}
        </ul>
    </div>
  )
}