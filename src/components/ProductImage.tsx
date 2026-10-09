import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`product-image image-fallback ${className}`} role="img" aria-label={alt}>
        <span>Image unavailable</span>
      </div>
    );
  }

  return <img className={`product-image ${className}`} src={src} alt={alt} onError={() => setFailed(true)} />;
}
