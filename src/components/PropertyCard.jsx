import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
        
        {/* Property Image */}
        <img
          src={property.image}
          alt={property.location}
          className="w-full h-48 object-cover"
        />

        {/* Property Details */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">₦{property.price}</h3>
          <p className="text-gray-500 text-sm mb-2">{property.location}</p>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                property.verified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {property.verified ? "Verified" : "Not Verified"}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
              {property.risk} Risk
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default PropertyCard;