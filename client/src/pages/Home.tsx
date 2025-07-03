import React from 'react';

const categories = [
  { name: 'Grocery', icon: '🥦' },
  { name: 'Home', icon: '🏠' },
  { name: 'Patio & Garden', icon: '🪴' },
  { name: 'Fashion', icon: '👗' },
  { name: 'Tech', icon: '💻' },
  { name: 'Baby', icon: '🍼' },
  { name: 'Toys', icon: '🧸' },
  { name: 'Health & wellness', icon: '💊' },
  { name: 'Personal Care', icon: '🧴' },
  { name: 'Beauty', icon: '💅' },
  { name: 'Auto & tires', icon: '🚗' },
];

const promoGrid = [
  {
    title: 'Deals start 7/8 at 12am ET',
    subtitle: 'Learn more',
    image: '/IMG/toyhub247com-revolutionizing-the-way-we-shop-for-toys1708045986.jpeg',
    bg: 'bg-blue-100',
    button: 'Walmart Deals',
    buttonClass: 'bg-blue-600 text-white',
  },
  {
    title: 'Save on La Roche-Posay Anthelios',
    subtitle: 'Shop now',
    image: '/IMG/AdobeStock_325684209-scaled.webp',
    bg: 'bg-yellow-50',
  },
  {
    title: 'Up to 40% off',
    subtitle: 'Shop now',
    image: '/IMG/jansport_typ79ru_right_pack_backpack_desert_1112260.jpg',
    bg: 'bg-yellow-100',
  },
  {
    title: 'Save on home appliances',
    subtitle: 'Shop now',
    image: '/IMG/LG-Article-Air-Conditioner-Energy-01-M.jpg',
    bg: 'bg-gray-100',
  },
];

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero and side cards */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left column */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <div className="rounded-lg shadow-sm p-4 bg-white flex flex-col items-center">
            <img src="/IMG/living-room-white-textured-rug-CiF-_0XRK7VA0sclpsCm2P-2000-6cf12aa58af6446586aaf4b48417b434.jpg" alt="Living Room" className="h-20 w-auto mb-2 rounded" />
            <h3 className="font-semibold text-lg mb-2 text-center">Summer home trends from $6</h3>
            <a href="#" className="text-blue-700 hover:underline text-sm">Shop home</a>
          </div>
          <div className="rounded-lg shadow-sm p-4 bg-white flex flex-col items-center">
            <img src="/IMG/toyhub247com-revolutionizing-the-way-we-shop-for-toys1708045986.jpeg" alt="Toys" className="h-20 w-auto mb-2 rounded" />
            <h3 className="font-semibold text-lg mb-2 text-center">Sabrina Carpenter—Man's Best Friend</h3>
            <a href="#" className="text-blue-700 hover:underline text-sm">Preorder now</a>
          </div>
        </div>
        {/* Hero banner */}
        <div className="md:col-span-2 flex flex-col items-center justify-center bg-blue-100 rounded-lg shadow-sm p-8 relative min-h-[260px]">
          <div className="absolute right-4 bottom-4 hidden md:block">
            <img src="/IMG/toyhub247com-revolutionizing-the-way-we-shop-for-toys1708045986.jpeg" alt="Promo" className="h-32 w-auto" />
          </div>
          <div className="z-10">
            <div className="text-xs text-blue-700 font-semibold mb-1">Get it in as fast as 1 hour*</div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">July 4th faves<br />from $1.98</h1>
            <button className="btn btn-outline border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-semibold px-6 py-2 mt-2">Shop now</button>
            <div className="mt-3 text-xs text-blue-700 font-semibold flex items-center gap-1">
              <span className="bg-yellow-300 text-blue-900 px-2 py-0.5 rounded-full font-bold">Express Delivery</span>
            </div>
          </div>
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <div className="rounded-lg shadow-sm p-4 bg-white flex flex-col items-center">
            <img src="/IMG/toyhub247com-revolutionizing-the-way-we-shop-for-toys1708045986.jpeg" alt="Jurassic World" className="h-20 w-auto mb-2 rounded" />
            <h3 className="font-semibold text-lg mb-2 text-center">New Jurassic World movie</h3>
            <a href="#" className="text-blue-700 hover:underline text-sm">Shop toys & more</a>
          </div>
          <div className="rounded-lg shadow-sm p-4 bg-white flex flex-col items-center">
            <img src="/IMG/AdobeStock_325684209-scaled.webp" alt="Beauty" className="h-20 w-auto mb-2 rounded" />
            <h3 className="font-semibold text-lg mb-2 text-center">Hot, new beauty from $10</h3>
            <a href="#" className="text-blue-700 hover:underline text-sm">Shop now</a>
          </div>
        </div>
      </div>
      {/* Promo grid */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {promoGrid.map((promo, i) => (
          <div key={i} className={`rounded-lg shadow-sm p-4 flex flex-col justify-between ${promo.bg}`}>
            <div>
              <h3 className="font-semibold text-lg mb-2">{promo.title}</h3>
              <a href="#" className="text-blue-700 hover:underline text-sm">{promo.subtitle}</a>
            </div>
            {promo.button && (
              <button className={`mt-4 px-4 py-2 rounded-full font-semibold ${promo.buttonClass}`}>{promo.button}</button>
            )}
            {promo.image && (
              <img src={promo.image} alt={promo.title} className="h-20 w-auto mt-4 self-end" />
            )}
          </div>
        ))}
      </div>
      {/* Category row */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center min-w-[80px]">
              <div className="text-3xl mb-1">{cat.icon}</div>
              <div className="text-xs font-semibold text-gray-700 whitespace-nowrap">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Save on a bedroom refresh */}
      <div className="container mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Save on a bedroom refresh</h2>
          <div className="text-gray-700 mb-4">Only $148</div>
          <button className="btn btn-primary w-max">Shop now</button>
        </div>
        <div className="flex justify-center items-center">
          <img src="/IMG/SPR-dark-green-bedroom-ideas-6830669-hero-01-0b788dc25f2a47b090ad7636999c8e5b.jpg" alt="Bedroom refresh" className="h-32 w-auto rounded-lg" />
        </div>
      </div>
      {/* Flash deals grid placeholder */}
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-xl font-bold mb-4">Flash Deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Placeholder cards */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-3 flex flex-col items-center">
              <div className="bg-gray-200 h-24 w-full rounded mb-2 flex items-center justify-center overflow-hidden">
                <img src={i === 0 ? '/IMG/LG-Article-Air-Conditioner-Energy-01-M.jpg' : i === 1 ? '/IMG/jansport_typ79ru_right_pack_backpack_desert_1112260.jpg' : i === 2 ? '/IMG/SPR-dark-green-bedroom-ideas-6830669-hero-01-0b788dc25f2a47b090ad7636999c8e5b.jpg' : i === 3 ? '/IMG/living-room-white-textured-rug-CiF-_0XRK7VA0sclpsCm2P-2000-6cf12aa58af6446586aaf4b48417b434.jpg' : i === 4 ? '/IMG/toyhub247com-revolutionizing-the-way-we-shop-for-toys1708045986.jpeg' : '/IMG/AdobeStock_325684209-scaled.webp'} alt="Product" className="h-20 w-auto" />
              </div>
              <div className="font-semibold text-sm mb-1">Product Name</div>
              <div className="text-blue-700 font-bold mb-1">$19.99</div>
              <button className="btn btn-primary w-full">Add</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 