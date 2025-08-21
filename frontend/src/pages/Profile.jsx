import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Profile = () => {
  const { currentUser } = useContext(ShopContext)

  if (!currentUser) {
    return (
      <div className='mt-10'>
        <p className='text-center'>No user data available. Please login.</p>
      </div>
    )
  }

  return (
    <div className='mt-10'>
      <Title text1={'My'} text2={'Profile'} />
      <div className='mt-6'>
        <p><b>Name:</b> {currentUser.name}</p>
        <p className='mt-2'><b>Email:</b> {currentUser.email}</p>
      </div>
    </div>
  )
}

export default Profile
