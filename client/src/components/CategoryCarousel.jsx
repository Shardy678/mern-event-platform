import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from 'react-slick';
import { Category } from '@mui/icons-material';

const categories = [
  { id: '1', title: 'Music', icon: <Category /> },
  { id: '2', title: 'Sports', icon: <Category /> },
  { id: '3', title: 'Arts', icon: <Category /> },
  { id: '4', title: 'Arts', icon: <Category /> },
  { id: '5', title: 'Arts', icon: <Category /> },
  { id: '6', title: 'Arts', icon: <Category /> },
  { id: '7', title: 'Arts', icon: <Category /> },
  { id: '8', title: 'Arts', icon: <Category /> },
];

const CategoryCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="w-full py-6">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.id} className="px-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4 flex items-center justify-center">
                <div className="text-3xl text-gray-600">
                  {category.icon}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-center text-gray-800">
                  {category.title}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
