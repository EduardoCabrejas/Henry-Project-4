/* eslint-disable @next/next/no-img-element */
import React, { useEffect ,useRef, useState } from 'react';
import './zoom.css';

interface ZoomImageProps {
  src: string;
  alt: string;
}

const ZoomImage: React.FC<ZoomImageProps> = ({ src, alt }) => {
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const lensRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isLargeScreen || !imageRef.current || !lensRef.current || !resultRef.current ) return;

    const rect = imageRef.current.getBoundingClientRect();
    const lensWidth = lensRef.current.offsetWidth;
    const lensHeight = lensRef.current.offsetHeight;
    let x = e.clientX - rect.left - lensWidth / 2;
    let y = e.clientY - rect.top - lensHeight / 2;

    // Asegurar que el lente no se salga de la imagen
    if (x > rect.width - lensWidth) x = rect.width - lensWidth;
    if (x < 0) x = 0;
    if (y > rect.height - lensHeight) y = rect.height - lensHeight;
    if (y < 0) y = 0;

    setLensPosition({ x, y });

    const backgroundX = (x / rect.width) * imageRef.current.naturalWidth;
    const backgroundY = (y / rect.height) * imageRef.current.naturalHeight;

    setBackgroundPosition({ x: backgroundX, y: backgroundY });
  };

  return (
    <div className="zoom-container" onMouseMove={handleMouseMove}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        width={400}
        height={400}
      />
      {isLargeScreen && (
        <>
          <div
            ref={lensRef}
            className="zoom-lens"
            style={{ left: `${lensPosition.x}px`, top: `${lensPosition.y}px` }}
          ></div>
          <div
            ref={resultRef}
            className="zoom-result"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `-${backgroundPosition.x}px -${backgroundPosition.y}px`,
              backgroundSize: `${imageRef.current?.naturalWidth}px ${imageRef.current?.naturalHeight}px`
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default ZoomImage;
