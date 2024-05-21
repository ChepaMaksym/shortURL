import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function CreateShortURL()
{
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          await axios.post('https://localhost:7043/api/urlShortener', {
            originalUrl: event.target.fullUrl.value
          });
        } catch (error) {
          console.error(error);
        }
      };
    
      return (
        <>
          <h1>URL Shrinker</h1>
          <form onSubmit={handleSubmit} className="my-4 form-inline">
            <input 
              required 
              placeholder="Url" 
              type="url" 
              name="fullUrl" 
              id="fullUrl" 
              className="form-control col mr-2" 
            />
            <button type="submit" className="btn btn-success mt-3">Shrink</button>
          </form>
        </>
      );
}