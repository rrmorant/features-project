import { useState } from "react";
import { useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

export default function ImageSlider({ url, limit = 5, page = 1 }) {
	const [images, setImages] = useState([]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [errorMsg, setErrorMsg] = useState(null);
	const [loading, setLoading] = useState(false);

async function fetchImages(getUrl) {
  try {
    setLoading(true);

    // Make an asynchronous request to the specified URL with page and limit parameters
    const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
    
    // Convert the response data to JSON format
    const data = await response.json();

    if (data) {
      // Update the images state with the fetched data
      setImages(data);
      setLoading(false);
    }
  } catch (e) {
    // Set the errorMsg state with the error message
    setErrorMsg(e.message);
    setLoading(false);
  }
}

	function handlePrevious() {
		setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
	}

	function handleNext() {
		setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
	}

	useEffect(() => {
		if (url !== "") fetchImages(url);
	}, [url]);

	console.log(images);

	if (loading) {
		return <div>Loading data ! Please wait</div>;
	}

	if (errorMsg !== null) {
		return <div>Error occured ! {errorMsg}</div>;
	}

	return (
		<div className="container">
			<BsArrowLeftCircleFill
				onClick={handlePrevious}
				className="arrow arrow-left"
			/>
			{images && images.length
				? images.map((ImageItem, index) => (
						<img
							key={ImageItem.id}
							alt={ImageItem.download_url}
							src={ImageItem.download_url}
							className={
								currentSlide === index
									? "current-image"
									: "current-image hide-current-image"
							}
						/>
				  ))
				: null}
			<BsArrowRightCircleFill
				onClick={handleNext}
				className="arrow arrow-right"
			/>
			<span className="circle-indicators">
				{images && images.length
					? images.map((_, index) => (
							<button
								key={index}
								className={
									currentSlide === index
										? "current-indicator"
										: "current-indicator inactive-indicator"
								}
								onClick={() => setCurrentSlide(index)}></button>
					  ))
					: null}
			</span>
		</div>
	);
}
