import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'

function UploadImg() {
  const [data, setData] = useState({
    title: '',
    description: '',
    coverImage: '',
    readingLevel: '',
    pages: [{ text: '', image: '' }],
  });
  const [showFields, setShowFields] = useState(true); // Toggle state

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setData({ ...data, coverImage: base64 });
  };

  const handlePageTextChange = (index, e) => {
    const newPages = [...data.pages];
    newPages[index] = { ...newPages[index], text: e.target.value };
    setData({ ...data, pages: newPages });
  };

  const handlePageImageUpload = async (index, e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    const newPages = [...data.pages];
    newPages[index] = { ...newPages[index], image: base64 };
    setData({ ...data, pages: newPages });
  };

  const handleAddPage = () => {
    setData({ ...data, pages: [...data.pages, { text: '', image: '' }] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/newbook', data)
      .then((response) => {
        console.log(response.data);
        // Handle successful response
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  const handleToggleFields = () => {
    setShowFields(!showFields);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  return (
    <div>
      <button className='toggle-form-button' type="button" onClick={handleToggleFields}>
        {showFields ? 'Hide Fields' : 'Add a Book'}
      </button>
      {showFields && (
        <form onSubmit={handleSubmit} className="form-container">
          <div>
            <input
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="input"
            />
          </div>
          <div>
            <textarea
              id="description"
              name="description"
              value={data.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="textarea"
            ></textarea>
          </div>
          <div className="select-container">
            <select
              id="readingLevel"
              name="readingLevel"
              value={data.readingLevel}
              onChange={handleInputChange}
              className="select"
            >
              <option value="">Select Reading Level</option>
              <option value="0-3">0-3 years old</option>
              <option value="4-6">4-6 years old</option>
              <option value="7-12">7-12 years old</option>
            </select>
          </div>
          <div>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept=".jpeg, .png, .jpg"
              onChange={handleCoverImageUpload}
              className="file-input"
            />
            <label htmlFor="coverImage" className="file-label">
              Choose Cover Image
            </label>
          </div>
          <div className="pages-container">
            {data.pages.map((page, index) => (
              <div key={index} className="page-container">
                <h3>Page {index + 1}</h3>
                <div>
                  <input
                    type="text"
                    id={`pageText${index}`}
                    name={`pageText${index}`}
                    value={page.text}
                    onChange={(e) => handlePageTextChange(index, e)}
                    placeholder="Page Text"
                    className="input"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    id={`pageImage${index}`}
                    name={`pageImage${index}`}
                    accept=".jpeg, .png, .jpg"
                    onChange={(e) => handlePageImageUpload(index, e)}
                    className="file-input"
                  />
                  <label htmlFor={`pageImage${index}`} className="file-label">
                    Choose Page Image
                  </label>
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddPage} className="add-page-button">
              Add Page
            </button>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
}  

export default UploadImg;