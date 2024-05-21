import React from 'react';
import { Link } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';

export default function UrlTable({ urls }) {  
    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Full URL</th>
              <th>Short URL</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((u, index) => (
              <tr key={index}>
                <td>{u.originalUrl}</td>
                <td>
                  <a href={`https://localhost:7043/api/urlShortener/${u.shortenedUrl}`} target="_blank" rel="noopener noreferrer">
                  {u.shortenedUrl}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
