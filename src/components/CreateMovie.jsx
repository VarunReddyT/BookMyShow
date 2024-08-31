import React, { useState } from 'react';
import axios from 'axios';

const MovieRegisterForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    language: '',
    genre: '',
    director: '',
    trailer: '',
    description: '',
    duration: '',
    startDate: '',
    endDate: '',
    releaseDate: '',
    cast: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/movie/movieregister', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Movie saved successfully:', response.data);
    } catch (error) {
      console.error('There was an error saving the movie!', error);
    }
  };

  return (
    <div className="min-h-screen p-6  flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Register a new movie</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="image">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      id="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="language">Language</label>
                    <input
                      type="text"
                      name="language"
                      id="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="genre">Genre</label>
                    <input
                      type="text"
                      name="genre"
                      id="genre"
                      value={formData.genre}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="director">Director</label>
                    <input
                      type="text"
                      name="director"
                      id="director"
                      value={formData.director}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="trailer">Trailer URL</label>
                    <input
                      type="text"
                      name="trailer"
                      id="trailer"
                      value={formData.trailer}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="h-20 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="duration">Duration (mins)</label>
                    <input
                      type="number"
                      name="duration"
                      id="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="releaseDate">Release Date</label>
                    <input
                      type="date"
                      name="releaseDate"
                      id="releaseDate"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="cast">Cast</label>
                    <input
                      type="text"
                      name="cast"
                      id="cast"
                      value={formData.cast}
                      onChange={handleChange}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                    />
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register Movie</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieRegisterForm;
