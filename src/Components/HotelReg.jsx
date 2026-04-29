import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
// FIX: cities import add kiya — pehle use ho raha tha bina import ke (runtime error)

// FIX: setShowHotelReg prop accept kiya — modal open/close ka mechanism
const HotelReg = ({ setShowHotelReg }) => {

  // FIX: useState add kiya — form data store karne ke liye
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    city: '',
  })

  const [loading, setLoading] = useState(false)

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  // FIX: onSubmit handler add kiya — form submit pe kaam karega
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // TODO: API call yahan lagao hotel register karne ke liye
      console.log('Hotel Registration Data:', formData)
      // Success hone par modal band karo
      if (setShowHotelReg) setShowHotelReg(false)
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    // FIX: z-100 → z-[100] (valid Tailwind arbitrary value)
    <div className='fixed top-0 bottom-0 left-0 right-0 z-[100] flex items-center justify-center bg-black/70'>
      <form
        onSubmit={handleSubmit}
        className='flex bg-white rounded-xl max-w-4xl w-full max-md:mx-2'
      >

        {/* Left Image */}
        <img
          src={assets.regImage}
          alt="hotel registration"
          className='w-1/2 rounded-xl hidden md:block object-cover'
        />

        {/* Right Form Content */}
        <div className='relative flex flex-col items-center md:w-1/2 w-full p-8 md:p-10'>

          {/* FIX: Close icon par onClick handler add kiya */}
          <img
            src={assets.closeIcon}
            alt="close"
            onClick={() => setShowHotelReg && setShowHotelReg(false)}
            className='absolute top-4 right-4 h-4 w-4 cursor-pointer hover:opacity-70 transition-opacity'
          />

          {/* Title */}
          <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

          {/* Hotel Name */}
          <div className='w-full mt-4'>
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              type="text"
              id='name'
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter hotel name"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* Phone */}
          <div className='w-full mt-4'>
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>
            {/* FIX: type="text" → type="tel" */}
            {/* FIX: pattern validation add kiya */}
            <input
              id='contact'
              type="tel"
              value={formData.contact}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              pattern="[+]?[0-9\s\-]{7,15}"
              title="Please enter a valid phone number"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* Address */}
          <div className='w-full mt-4'>
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>
            <input
              id='address'
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>

          {/* Select City */}
          <div className='w-full mt-4 max-w-60 mr-auto'>
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            {/* FIX: value + onChange add kiya for controlled component */}
            <select
              id="city"
              value={formData.city}
              onChange={handleChange}
              className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light'
              required
            >
              {/* FIX: defaultValue fix — pehla option disabled rakha taaki user select karne par majboor ho */}
              <option value="" disabled>Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* FIX: type="submit" add kiya button mein */}
          <button
            type="submit"
            disabled={loading}
            className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

        </div>
      </form>
    </div>
  )
}

export default HotelReg