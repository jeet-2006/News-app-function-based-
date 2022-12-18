import NewsItem from "./NewsItem"
import React, { useEffect, useState } from 'react'
import Spinner from "./Spinner"
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState([]);
    News.defaultProps = {
        country: 'in',
        pageSize: 10,
        category: 'general'
    }
    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    const updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(30);
        const data = await fetch(url);
        props.setProgress(60);
        const parsedData = await data.json();
        props.setProgress(100);
        setArticles(parsedData.articles);
        setLoading(false);
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line 
    }, []);

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        const data = await fetch(url);
        const parsedData = await data.json();
        setTotalResults(parsedData.totalResults);
        setArticles(articles.concat(parsedData.articles))
    }
    console.log(articles)
    return (
        <div>
            <h1 className="text-center top-headlines">NewsFire - Top {props.category} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((ele, idx) => {
                            return <div className="col-md-4 center my-3" key={ele.url + idx}>
                                <NewsItem newsData={ele} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default News