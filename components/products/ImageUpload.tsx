'use client'

import { CldUploadWidget } from "next-cloudinary"
import { ImageUp, X } from 'lucide-react'
import { useState } from "react"
import Image from "next/image"
import { getImagePath } from "@/src/utils"

export default function ImageUpload({image} : {image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState('')

    const handleSuccess = (result: any, { widget }: { widget: any }) => {
        if (result.event === 'success') {
            widget.close()
            setImageUrl(result.info.secure_url)
        }
    }

    const handleRemove = () => {
        setImageUrl('')
    }

    return (
        <div className="space-y-4">
            <label className="text-gray-200 font-medium mb-2 flex items-center">
                <ImageUp className="mr-2" size={20} />
                Imagen del Producto
            </label>
            <CldUploadWidget
                onSuccess={handleSuccess}
                uploadPreset="foodtrack"
                options={{
                    maxFiles: 1
                }}
            >
                {({open}) => (
                    <div className="relative">
                        <div 
                            onClick={() => open()}
                            className={`relative cursor-pointer transition p-10 border-2 border-dashed border-gray-600 rounded-lg flex flex-col justify-center items-center gap-4 text-gray-400 bg-gray-800 hover:bg-gray-700 ${imageUrl ? 'h-64' : ''}`}
                        >
                            {imageUrl ? (
                                <Image 
                                    fill
                                    style={{objectFit: 'cover'}}
                                    src={imageUrl}
                                    alt="Imagen de Producto"
                                    className="rounded-lg"
                                />
                            ) : (
                                <>
                                    <ImageUp size={50} />
                                    <p className="text-lg font-semibold">Haz clic para subir o arrastra una imagen</p>
                                    <p className="text-sm">SVG, PNG, JPG o GIF (Max. 800x400px)</p>
                                </>
                            )}
                        </div>
                        {imageUrl && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                                aria-label="Remover imagen"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                )}
            </CldUploadWidget>
            {image && !imageUrl && (
                <div className="space-y-2 text-center">
                    <label>Imagen actual:</label>
                    <div className="relative w-64 h-64 mx-auto">
                        <Image 
                            fill
                            src={getImagePath(image)}
                            alt="Imagen Prodcto"
                            style={{objectFit: 'cover'}}
                        />
                    </div>

                </div>
            )}
            <input 
                type="hidden"
                name="image"
                defaultValue={imageUrl ? imageUrl : image}
            />
        </div>
    )
}