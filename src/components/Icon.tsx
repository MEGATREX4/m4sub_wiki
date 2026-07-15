interface IconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export default function Icon({ name, size = 16, className = "", color }: IconProps) {
  // 1. Safety check: If name is missing or not a string, return null or a placeholder
  if (!name || typeof name !== 'string') {
    console.error("Icon component received an invalid name:", name);
    return <div style={{ width: size, height: size }} className={className} />;
  }

  // HackerNoon Pixel Icons
  if (name.startsWith('hn-')) {
    return (
      <i 
        className={`hn ${name} ${className}`} 
        style={{ 
          fontSize: `${size}px`, 
          color: color || 'inherit',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} 
      />
    );
  }

  // Minecraft textures or custom images
  const isUrl = name.startsWith('http') || name.includes('/');
  const src = isUrl ? name : `https://mc.nerothe.com/img/1.21.11/minecraft_${name}.png`;

  return (
    <img
      src={src}
      alt={name}
      className={`image-pixelated object-contain flex-shrink-0 ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        imageRendering: 'pixelated'
      }}
    />
  );
}
