import { useNavigate } from "react-router-dom";

function CategoryCard({ cat }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (cat.link) navigate(cat.link);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group w-full max-w-sm"
    >
      <div
        className="h-48 bg-center bg-cover"
        style={{ backgroundImage: `url("${cat.imageUrl}")` }}
      ></div>
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-xl font-bold text-[#111618] mb-2 text-center">{cat.title}</h3>
        <button className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
          SHOP NOW
        </button>
      </div>
    </div>
  );
}

export default function Explore() {
  const categories = [
    {
      title: "DIARY",
      imageUrl: "https://th.bing.com/th/id/OSK.HEROYeXAVJkpUhbzwfZSLTVavNxcuAiBlYC11vqRLgZ8NqQ?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
      link: "/products/category/1",
    },
    {
      title: "CHEESE",
      imageUrl: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg",
      link: "/products/category/2",
    },
    {
      title: "YOGURT",
      imageUrl: "https://images.pexels.com/photos/5945660/pexels-photo-5945660.jpeg",
      link: "/products/category/3",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center">
      {categories.map((cat, index) => (
        <CategoryCard
          key={index}
          cat={cat}
        />
      ))}
    </div>
  );
}
