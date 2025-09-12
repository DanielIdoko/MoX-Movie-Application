import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'

const Modal = () => {
    return (
        <div className='w-60 h-16 p-2 flex items-center justify-center gap-2 fixed top-0 right-2 md:right-3 md:top-20 rounded-xl border-1 border-blue-950/10 bg-white/5 backdrop-blur-3xl z-50'>
            <AiFillCheckCircle className='text-green-700'/>
            <p className='text-small font-bold'
             style={{
                color: "#00aa23"
             }}>Movie Successfully Saved!</p>
        </div>
    )
}

export default Modal
