import React from 'react';

export default function NewsItem({ title, description, src, url }) {
    return (
        <div>
            <div className="card bg-dark text-light mb-3">
                {src && <img src={src} className="card-img-top" alt="..." />}
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">More</a>
                </div>
            </div>
        </div>
    );
}
