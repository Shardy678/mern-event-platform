// import React from 'react'
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import { Category } from '@mui/icons-material'
// import CategoryCard from './CategoryCard'

// const categories = [
//   { id: '1', title: 'Music', icon: <Category /> },
//   { id: '2', title: 'Sports', icon: <Category /> },
//   { id: '3', title: 'Arts', icon: <Category /> },
//   { id: '4', title: 'Science', icon: <Category /> },
//   { id: '5', title: 'Technology', icon: <Category /> },
//   { id: '6', title: 'History', icon: <Category /> },
//   { id: '7', title: 'Literature', icon: <Category /> },
//   { id: '8', title: 'Travel', icon: <Category /> },
// ]

// const CategoryCarousel = ({ selectedCategory, onCategoryChange }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//     ],
//   }

//   const handleCategoryClick = (title) => {
//     // Toggle the category selection
//     if (selectedCategory === title) {
//       onCategoryChange('All') // Deselect if the same category is clicked again
//     } else {
//       onCategoryChange(title)
//     }
//   }

//   return (
//     <div className="w-full py-6">
//       <Slider {...settings}>
//         {categories.map((category) => (
//           <div key={category.id} className="px-4">
//             <CategoryCard
//               title={category.title}
//               icon={category.icon}
//               isActive={category.id === selectedCategory}
//               onClick={() => handleCategoryClick(category.title)}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   )
// }

// export default CategoryCarousel
