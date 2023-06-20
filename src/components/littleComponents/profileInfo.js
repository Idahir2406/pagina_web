import React from 'react'

export const ProfileInfo = () => {
  return (
    <div className="flex flex-col bg-gray-100 rounded-md p-5 max-w-sm gap-1">
          <div>
            <h1 className="text-2xl font-semibold">Direcciones</h1>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <p className="text-gray-500">Calle</p>
              <p className="text-gray-500">Número</p>
            </div>
          </div>
        </div>
  )
}
