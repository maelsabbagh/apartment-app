'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apartmentApi } from '@/app/services/apartment-api';
import { Apartment } from '@/app/types/Apartment';

export default function ApartmentDetails() {
  const params = useParams();
  const router = useRouter();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApartment();
  }, [params.id]);

  const fetchApartment = async () => {
    setLoading(true);
    setError(null);
    try {
      const id = parseInt(params.id as string);
      const response = await apartmentApi.getApartmentById(id);
      setApartment(response.data);
    } catch (err) {
      setError('Failed to load apartment details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading apartment details...</p>
        </div>
      </div>
    );
  }

  if (error || !apartment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error || 'Apartment not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
          >
            ← Back to Apartments
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image */}
          <div className="relative h-64 md:h-96 w-full bg-gray-200">
            {apartment.imageUrl ? (
              <img
                src={apartment.imageUrl}
                alt={apartment.unitName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-6xl">🏢</span>
              </div>
            )}
            {!apartment.isAvailable && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
                Sold
              </div>
            )}
            {apartment.isAvailable && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
                Available
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8">
            {/* Title and Price */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {apartment.unitName}
                </h1>
                <p className="text-xl text-gray-600">
                  {apartment.project}
                </p>
                <p className="text-lg text-gray-500 mt-1">
                  Unit: {apartment.unitNumber}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-4xl font-bold text-blue-600">
                  ${apartment.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl mb-2">🛏️</p>
                <p className="text-2xl font-bold text-gray-800">{apartment.bedrooms}</p>
                <p className="text-sm text-gray-600">Bedrooms</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl mb-2">🚿</p>
                <p className="text-2xl font-bold text-gray-800">{apartment.bathrooms}</p>
                <p className="text-sm text-gray-600">Bathrooms</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl mb-2">📏</p>
                <p className="text-2xl font-bold text-gray-800">{apartment.area}</p>
                <p className="text-sm text-gray-600">m² Area</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-3xl mb-2">🏢</p>
                <p className="text-2xl font-bold text-gray-800">{apartment.floor}</p>
                <p className="text-sm text-gray-600">Floor</p>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {apartment.description}
              </p>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {apartment.isAvailable ? 'Available' : 'Sold'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Listed Date</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(apartment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            {apartment.isAvailable && (
              <div className="mt-8">
                <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200">
                  Contact Agent
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}