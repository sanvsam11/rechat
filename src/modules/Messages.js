import React, {useState} from 'react'
import Message from './Message'
export default function Messages({Messages}){
    return(
        <ul id="messages">{Messages.map(msg=><Message message={msg}/>)}</ul>
    )
}