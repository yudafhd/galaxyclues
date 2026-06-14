import { ImageOff } from 'lucide-react'
import { useState } from 'react'
import type { ImgHTMLAttributes, ReactNode } from 'react'

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'className'> & {
  wrapperClassName?: string
  imageClassName?: string
  fallback?: ReactNode
}

export default function Image({
  alt,
  wrapperClassName = 'aspect-video',
  imageClassName = 'object-cover',
  fallback,
  loading = 'lazy',
  decoding = 'async',
  onLoad,
  onError,
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative overflow-hidden rounded-box bg-base-300 ${wrapperClassName}`}>
      {!isLoaded && !hasError && <div className="skeleton absolute inset-0 rounded-none" aria-hidden="true" />}

      {hasError ? (
        fallback ?? (
          <div className="absolute inset-0 grid place-items-center text-base-content/45">
            <ImageOff aria-hidden="true" size={28} />
          </div>
        )
      ) : (
        <img
          {...props}
          alt={alt}
          loading={loading}
          decoding={decoding}
          className={`h-full w-full transition-opacity duration-300 ${imageClassName} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={(event) => {
            setIsLoaded(true)
            onLoad?.(event)
          }}
          onError={(event) => {
            setHasError(true)
            onError?.(event)
          }}
        />
      )}
    </div>
  )
}
