import Link from 'next/link';
import { Apartment } from '../types/Apartment';

interface ApartmentCardProps {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  return (
    <Link href={`/apartments/${apartment.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 w-full bg-gray-200">
          {apartment.imageUrl ? (
            <img
              src={apartment.imageUrl}
              alt={apartment.unitName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl">🏢</span>
            </div>
          )}
          {!apartment.isAvailable && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Sold
            </div>
          )}
          {apartment.isAvailable && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Available
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {apartment.unitName}
          </h3>

          {/* Project and Unit Number */}
          <div className="text-sm text-gray-600 mb-3">
            <p className="font-semibold">{apartment.project}</p>
            <p>Unit: {apartment.unitNumber}</p>
          </div>

          {/* Details */}
          <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
            <div className="flex items-center gap-1">
              <span>🛏️</span>
              <span>{apartment.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🚿</span>
              <span>{apartment.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📏</span>
              <span>{apartment.area} m²</span>
            </div>
          </div>

          {/* Description Preview */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
            {apartment.description}
          </p>

          {/* Price */}
          <div className="mt-auto pt-3 border-t border-gray-200">
            <p className="text-2xl font-bold text-blue-600">
              {apartment.price.toLocaleString()} EGP
            </p>
            <p className="text-xs text-gray-500">Floor: {apartment.floor}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}