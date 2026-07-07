import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-full flex justify-between items-center '>
        <div className='hidden ga-2 justify-center items-center  md:flex'>
            <Image src="./search.png" alt='search' height={30} width={30}/>
            <input type="text" placeholder='Search...' />
        </div>
        <div>
            <Image alt='chat' src="./mail.png" width={30} height={30} />
            <div>
                  <Image alt='chat' src="./mail.png" width={30} height={30} />
            </div>
        </div>
    </div>
  )
}

export default Navbar