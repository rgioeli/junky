"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BsCamera2,
  BsImage,
  BsX,
  BsXCircleFill,
  BsXSquareFill,
} from "react-icons/bs";
import { v4 as uuid } from "uuid";

const Page = () => {
  const categories = [
    "Appliances",
    "Apps & Games",
    "Arts, Crafts, & Sewing",
    " Automotive Parts & Accessories",
    "Baby",
    "Beauty & Personal Care",
    "Books",
    "CDs & Vinyl",
    "Cell Phones & Accessories",
    "Clothing, Shoes and Jewelry",
    "Collectibles & Fine Art",
    "Computers",
    "Electronics",
    "Garden & Outdoor",
    "Grocery & Gourmet Food",
    "Handmade",
    "Health, Household & Baby Care",
    "Home & Kitchen",
    "Industrial & Scientific",
    "Kindle",
    "Luggage & Travel Gear",
    "Movies & TV",
    "Musical Instruments",
    "Office Products",
    "Pet Supplies",
    "Sports & Outdoors",
    "Tools & Home Improvement",
    "Toys & Games",
    "Video Games",
  ];

  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleKeywords = (e) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const handleAddKeyword = (e) => {
    if (keywords.length >= 10) {
      return setError("10 keywords is the max");
    } else if (keywords.length < 9 && error) {
      setError("");
    }

    if (!keyword.trim().length) {
      setKeyword("");
      return setError("Keyword can't be blank");
    }

    setKeywords((prevState) => [
      ...prevState,
      { id: uuid(), keyword: keyword.toLowerCase() },
    ]);
  };

  const handleExit = (id) => {
    setKeywords(keywords.filter((word) => word.id !== id));
  };

  const handlePhotos = (e) => {
    if (!e.target.files[0]) return;
    setImagesPreview((prevState) => [
      ...prevState,
      { id: uuid(), src: e.target.files[0] },
    ]);
  };

  const handleDeletePreviewImages = (id) => {
    setImagesPreview((prevState) => prevState.filter((prev) => prev.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", imagesPreview[0].src);

    const request = await fetch("/api/listing/photos", {
      body: formData,
      method: "POST",
    });

    const response = await request.json();
    console.log(response);
  };

  useEffect(() => {
    setKeyword("");
  }, [keywords]);

  return (
    <div className="bg-white p-3">
      <h1 className="text-purple-900 font-medium">Create Listing</h1>
      <form action="">
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex flex-col">
            <div>
              <p className="text-sm">Upload Images</p>
              <label className="text-sm cursor-pointer" htmlFor="image-upload">
                <div className="border-2 border-[#333] w-min p-10 mt-2 rounded-md">
                  <BsCamera2 size={35} color="#333" />
                </div>
              </label>
              <input
                type="file"
                id="image-upload"
                onChange={handlePhotos}
                hidden
              />
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {imagesPreview &&
                imagesPreview.map((image) => (
                  <div key={image.id} className="h-20 w-20 relative">
                    <BsXSquareFill
                      color="white"
                      className="absolute -top-1 -right-1 z-10 cursor-pointer"
                      size={20}
                      onClick={() => handleDeletePreviewImages(image.id)}
                    />
                    <Image
                      alt={"Not Found"}
                      src={URL.createObjectURL(image.src)}
                      fill
                    />
                  </div>
                ))}
            </div>
          </div>
          <label className="text-sm mt-2" htmlFor="title">
            Title
          </label>
          <input
            className="p-2 flex-1 border-2 rounded-md outline-none"
            type="text"
            id="title"
            placeholder="Give your listing a title"
          />
          <label className="text-sm" htmlFor="description">
            Description
          </label>
          <textarea
            className="p-2 flex-1 border-2 rounded-md outline-none resize-none"
            type="text"
            id="description"
            rows={4}
            placeholder="Describe what you're selling"
          />
          <div className="flex flex-col">
            <label className="text-sm py-2" htmlFor="category">
              Category
            </label>
            <select className="p-2 flex-1 border-2 rounded-md outline-none resize-none">
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <label className="text-sm mt-2" htmlFor="keywords">
            Keywords
          </label>
          <p className="text-sm text-purple-900">
            List of words that buyers can search for to find your product
          </p>
          <div className="flex gap-2">
            <input
              className="p-2 flex-1 border-2 rounded-md outline-none max-w-lg w-full"
              type="text"
              id="keywords"
              value={keyword}
              onChange={handleKeywords}
              placeholder="Shape, color, style, function, etc."
            />
            <button
              onClick={handleAddKeyword}
              type="button"
              className="bg-purple-900 py-2 px-5 rounded-md text-white"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            {keywords.map((word) => (
              <div className="flex border-2 p-2" key={word.id}>
                <p>{word.keyword}</p>
                <BsX
                  className="cursor-pointer"
                  size={25}
                  onClick={() => handleExit(word.id)}
                />
              </div>
            ))}
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-purple-900 py-2 px-5 rounded-md text-white"
        >
          Done with listing
        </button>
      </form>
    </div>
  );
};

export default Page;
