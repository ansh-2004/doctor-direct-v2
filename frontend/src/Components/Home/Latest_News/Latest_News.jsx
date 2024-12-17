import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Latest_News = () => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [newsToShow, setNewsToShow] = useState([]);

	const fetchData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=e45e76a0de0d408aabcae2ee84ca4de8"
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const fetchedData = await response.json();
			setData(fetchedData.articles);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (data) {
			const filteredNews = data.filter(
				(article) => article.urlToImage !== null
			);
			setNewsToShow(filteredNews);
		}
	}, [data]);

	const [currentIndex, setCurrentIndex] = useState(0);

	const prevSlide = () => {
		const isFirst = currentIndex === 0;
		const newIndex = isFirst ? newsToShow.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = () => {
		const isLast = currentIndex === newsToShow.length - 1;
		const newIndex = isLast ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[500px]">
				<div className="w-16 h-16 border-t-4 border-teal-500 rounded-full animate-spin"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-10 text-center text-red-500">
				Error loading news: {error.message}
			</div>
		);
	}

	if (newsToShow.length === 0) {
		return (
			<div className="p-10 text-center text-gray-500">No news available</div>
		);
	}

	return (
		<div className="mt-12">
			<h2 className="mb-10 text-3xl font-bold text-center md:text-4xl text-sky-700">
				Latest Health News
			</h2>

			<div className="container relative px-4 py-8 mx-auto bg-blue-200 group">
				<div className="max-w-5xl mx-auto overflow-hidden bg-white shadow-lg rounded-3xl">
					<div className="flex flex-col items-center p-6 md:flex-row md:p-10">
						{/* Image Container */}
						<div className="w-full mb-6 md:w-1/2 md:mb-0 md:mr-8">
							<img
								src={newsToShow[currentIndex].urlToImage}
								alt={newsToShow[currentIndex].title}
								className="w-full h-[250px] md:h-[350px] object-cover rounded-2xl shadow-md"
							/>
						</div>

						{/* News Content */}
						<div className="w-full space-y-4 md:w-1/2">
							<h3 className="text-xl font-bold md:text-2xl text-cyan-700 line-clamp-2">
								{newsToShow[currentIndex].title}
							</h3>
							<p className="text-sm text-gray-600 md:text-base line-clamp-4">
								{newsToShow[currentIndex].description}
							</p>
							<a
								href={newsToShow[currentIndex].url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block px-4 py-2 text-white transition-colors bg-teal-500 rounded-full hover:bg-teal-600"
							>
								Read More
							</a>
						</div>
					</div>

					{/* Navigation Dots */}
					<div className="flex justify-center pb-4 space-x-2">
						{newsToShow.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-3 h-3 rounded-full transition-colors ${
									index === currentIndex ? "bg-teal-500" : "bg-gray-300"
								}`}
							/>
						))}
					</div>
				</div>

				{/* Navigation Arrows */}
				<button
					onClick={prevSlide}
					className="absolute p-2 transition-colors -translate-y-1/2 rounded-full shadow-md top-1/2 left-4 md:left-10 bg-white/50 hover:bg-white/75"
				>
					<BsChevronCompactLeft size={30} className="text-sky-700" />
				</button>
				<button
					onClick={nextSlide}
					className="absolute p-2 transition-colors -translate-y-1/2 rounded-full shadow-md top-1/2 right-4 md:right-10 bg-white/50 hover:bg-white/75"
				>
					<BsChevronCompactRight size={30} className="text-sky-700" />
				</button>
			</div>
		</div>
	);
};

export default Latest_News;
