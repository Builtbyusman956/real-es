import PropertyGrid from "../components/PropertyGrid";

const sampleProperties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    price: "25,000,000",
    location: "Lekki, Lagos",
    verified: true,
    risk: "Low"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560448070-c0f3f7f03414?auto=format&fit=crop&w=800&q=80",
    price: "15,000,000",
    location: "Ibadan, Oyo",
    verified: false,
    risk: "High"
  }
];

const Browse = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8">Browse Properties</h1>
      <PropertyGrid properties={sampleProperties} />
    </div>
  );
};

export default Browse;