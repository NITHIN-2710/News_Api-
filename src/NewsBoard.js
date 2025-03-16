import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

export default function NewsBoard() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            const apiKey = '92419721321a4e94b92e40fe705c5774';
            if (!apiKey) {
                setError(new Error('API key is missing'));
                setLoading(false);
                return;
            }

            const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Log fetched data
                setArticles(data.articles);
            } catch (error) {
                console.error('Fetching error:', error); // Log error
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <h2 className='text-center'>
                Modern <span className="badge text-dark bg-danger">News</span>
            </h2>
            <div className="row">
                {articles.length === 0 ? (
                    <div>No articles found</div>
                ) : (
                    articles.map((news, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                            <NewsItem
                                title={news.title}
                                description={news.description}
                                src={news.urlToImage}
                                url={news.url}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
