import Image from 'next/image'
import React from 'react'

const UserCard = ({type}: {type:string}) => {
  return (
    <div>
        <div className='flex justify-between'>
           <span>24/6/2026</span>
           <Image src="/more.png" alt="more"  height={30} width={30}/>
        </div>
        <span>1024</span>
        <span>{type}</span>
    </div>
  )
}

export default UserCard