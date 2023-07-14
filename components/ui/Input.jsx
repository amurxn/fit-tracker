import React from "react"
import Image from "next/image"

const Input = ({type, id, name, placeholder, icon}) => {
  return (
    <div className="relative w-full">
      <Image
        src={`/${icon}.svg`}
        alt="Icon"
        width={20}
        height={20}
        className="absolute left-4 top-1/2 transform -translate-y-1/2"
      />
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="bg-gray py-4 px-12 rounded-xl w-full placeholder-lightGray focus:outline-none font-medium"
      />
    </div>
  )
}

export default Input
