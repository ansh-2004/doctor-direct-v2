// import React from "react";
// import Brand_1 from "../../../Assets/Brand_1.png";
// import Brand_2 from "../../../Assets/Brand_2.png";
// import Brand_3 from "../../../Assets/Brand_3.png";
// import Brand_4 from "../../../Assets/Brand_4.png";
// import Brand_5 from "../../../Assets/Brand_5.png";

// const Brands = () => {
//   return (
//     <div className="flex justify-between my-[5rem] mx-8 items-center opacity-50">
//       <img src={Brand_1} className="h-6" />
//       <img src={Brand_2} className="h-7" />
//       <img src={Brand_3} className="h-5" />
//       <img src={Brand_4} className="h-7" />
//       <img src={Brand_5} className="h-6" />
//     </div>
//   );
// };

// export default Brands;

import React from "react";
import Brand_1 from "../../../Assets/Brand_1.png";
import Brand_2 from "../../../Assets/Brand_2.png";
import Brand_3 from "../../../Assets/Brand_3.png";
import Brand_4 from "../../../Assets/Brand_4.png";
import Brand_5 from "../../../Assets/Brand_5.png";

const Brands = () => {
	const brandLogos = [
		{ src: Brand_1, alt: "Brand 1" },
		{ src: Brand_2, alt: "Brand 2" },
		{ src: Brand_3, alt: "Brand 3" },
		{ src: Brand_4, alt: "Brand 4" },
		{ src: Brand_5, alt: "Brand 5" },
	];

	return (
		<div className="container px-4 mx-auto my-12 sm:my-16 md:my-20 lg:my-24">
			<div className="grid grid-cols-2 gap-4 opacity-50 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6 md:gap-8 lg:gap-12 place-items-center">
				{brandLogos.map((brand, index) => (
					<div
						key={index}
						className="flex items-center justify-center w-full max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px]"
					>
						<img
							src={brand.src}
							alt={brand.alt}
							className="object-contain w-full h-8 transition-all duration-300 sm:h-9 md:h-10 lg:h-12 hover:scale-110 hover:opacity-100"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Brands;
