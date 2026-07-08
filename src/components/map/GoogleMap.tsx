import { useMemo } from 'react';

interface GoogleMapProps {
  locations: Array<{
    lat: number;
    lng: number;
    name?: string;
    address?: string;
  }>;
  height?: string;
}

export default function GoogleMap({ locations, height = '400px' }: GoogleMapProps) {
  const mapSrc = useMemo(() => {
    if (!locations.length) return '';

    const center = locations[0];
    const markers = locations
      .map(
        (loc) =>
          `color:0x059669|${loc.lat},${loc.lng}(${encodeURIComponent(loc.name || '')})`
      )
      .join('&markers=');

    return `https://maps.google.com/maps?q=${center.lat},${center.lng}&z=10&output=embed&markers=${markers}`;
  }, [locations]);

  if (!mapSrc) {
    return (
      <div className="w-full bg-slate-100 rounded-3xl flex items-center justify-center" style={{ height }}>
        <p className="text-slate-500 text-sm">No map data available</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-lg" style={{ height }}>
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map"
      />
    </div>
  );
}
