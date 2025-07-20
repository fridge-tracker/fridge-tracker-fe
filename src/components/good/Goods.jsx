import Good from "./Good.jsx";
import ReactPaginate from "react-paginate";
import apiClient, {ENDPOINTS} from "../../api/apiClient.js";
import {toast} from "react-toastify";
import React, {useCallback, useEffect, useState} from "react";
import Listings from "../Listings.jsx";
import PageTitle from "../PageTitle.jsx";
import {useNavigate} from "react-router-dom";

const Goods = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({page: 0, size: 5, totalPageNumber: 0, totalElements: 0, content: []});
    const {page, size, totalPageNumber, totalElements, content} = data;
    const [pageToGo, setPageToGo] = useState(page);
    const [pageCount, setPageCount] = useState(totalPageNumber);
    const [rerender, setRerender] = useState(false);
    const navigate = useNavigate();
    const fetchData = useCallback(() => {
        return apiClient.get(ENDPOINTS.GOODS.GET_OVERVIEW(pageToGo, size))
            .then((response) => {
                return {success: 'true', data: response.data};
            })
            .catch((error) => {
                toast.error(error.response?.data?.detail || 'Failed to load goods');
                return {success: 'false'};
            });
    }, [pageToGo, size]);


    useEffect(() => {
        fetchData().then((response) => {
            setData(response.data);
            setPageCount(totalPageNumber);
            setLoading(false)
            setRerender(false);
        });
    }, [rerender,totalPageNumber,fetchData])

    const handleClick = (event) => {
        fetchData().then((response) => {
            setPageToGo(event.selected);
            setData(response.data);
            setPageCount(totalPageNumber);
        })
    }

    if(loading) return (
        <div>Loading...</div>
    )
    return (
        <div className="goods-container">
            <PageTitle title={`Total goods stored in the fridge: ${totalElements}`}></PageTitle>
            <button className="styledButton" onClick={()=>navigate("/addGood")}>Add Good</button>
            <Listings
                items={content}
                childProps="data"
                rerender={setRerender}
            >
                <Good ></Good>
            </Listings>
            <ReactPaginate
                breakLabel={"..."}
                nextLabel={">"}
                onPageChange={handleClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLinkClassName={"nav-link"}
                nextLinkClassName={"nav-link"}
                previousLabel={"<"}
                containerClassName={"pagination"}
            />
        </div>
    );
}

export default Goods;