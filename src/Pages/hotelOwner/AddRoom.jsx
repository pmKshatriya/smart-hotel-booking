import React, { useState } from 'react'
import Title from '../../Components/Title'
import { assets } from '../../assets/assets'

const AddRoom = () => {

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free WiFi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false
    }
  })

  const [loading, setLoading] = useState(false)

  // FIX: onSubmit handler add kiya — pehle kuch nahi hota tha
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // TODO: API call yahan lagao room add karne ke liye
      const selectedAmenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      )
      const roomData = {
        roomType: inputs.roomType,
        pricePerNight: Number(inputs.pricePerNight),
        amenities: selectedAmenities,
        images: Object.values(images).filter(Boolean),
      }
      console.log('Room Data:', roomData)
    } catch (error) {
      console.error('Add room failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    // FIX: onSubmit handler form mein add kiya
    <form onSubmit={handleSubmit} className='px-6 py-8'>
      <Title
        align='left'
        font='outfit'
        title='Add Room'
        subTitle='Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.'
      />

      {/* Upload Area For Images */}
      <p className='text-gray-800 mt-10 font-medium'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key} className='cursor-pointer'>
            <img
              // FIX: max-h-13 → max-h-14 (valid Tailwind class)
              className='max-h-14 cursor-pointer opacity-80 hover:opacity-100 transition-opacity rounded'
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              // FIX: alt="" → meaningful alt text
              alt={images[key] ? `Room image ${key}` : "Upload room image"}
            />
            <input
              type="file"
              accept='image/*'
              id={`roomImage${key}`}
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      {/* Room Type and Price */}
      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>

        {/* Room Type */}
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4 font-medium'>Room Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) =>
              setInputs({ ...inputs, roomType: e.target.value })
            }
            // FIX: required add kiya
            required
            className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full outline-indigo-500'
          >
            <option value="" disabled>Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        {/* Price Per Night */}
        <div>
          <p className='mt-4 text-gray-800 font-medium'>
            Price <span className='text-xs text-gray-500'>/night</span>
          </p>
          <input
            type="number"
            placeholder='0'
            // FIX: min="0" add kiya — negative price nahi hona chahiye
            min="0"
            // FIX: required add kiya
            required
            className='border border-gray-300 mt-1 rounded p-2 w-24 outline-indigo-500'
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
          />
        </div>

      </div>

      {/* Amenities */}
      <p className='text-gray-800 mt-6 font-medium'>Amenities</p>
      {/* FIX: flex-col → flex-row flex-wrap (properly wrap hoga) */}
      {/* FIX: gap-3 add kiya — checkboxes chipke hue the */}
      <div className='flex flex-row flex-wrap gap-3 mt-2 text-gray-500 max-w-sm'>
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index} className='flex items-center gap-2'>
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity]
                  }
                })
              }
              className='cursor-pointer accent-indigo-500'
            />
            <label
              htmlFor={`amenities${index + 1}`}
              className='cursor-pointer select-none text-sm'
            >
              {amenity}
            </label>
          </div>
        ))}
      </div>

      {/* FIX: type="submit" add kiya */}
      {/* FIX: bg-primary → bg-indigo-500 (primary color defined nahi tha) */}
      <button
        type='submit'
        disabled={loading}
        className='bg-indigo-500 hover:bg-indigo-600 transition-colors text-white px-8 py-2 rounded mt-8 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
      >
        {loading ? 'Adding...' : 'Add Room'}
      </button>

    </form>
  )
}

export default AddRoom