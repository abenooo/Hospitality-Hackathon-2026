'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type Props = Omit<ImageProps, 'src'> & { src: string };

export default function AppImage({ src, alt, onError, ...rest }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={(e) => {
        setImgSrc('/assets/images/no_image.png');
        onError?.(e);
      }}
    />
  );
}
