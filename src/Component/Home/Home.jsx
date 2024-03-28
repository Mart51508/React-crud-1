import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MainContext } from "../Context/MainContext";

function Home() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  

  const {
    GetListUsers,
    Data,
    setData,
    Filter,
    IsLoading,
    page,
    setPage,
    totalUsers,
    Limit,
  } = useContext(MainContext);


  useEffect(() => {
    GetListUsers();
}, [page , totalUsers]);
  const handleFilter = (value) => {
    const res = Filter.filter((Name) =>
      `${Name.firstName} ${Name.lastName}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setData(res);
  };


  const totalPages = Math.ceil(totalUsers / Limit);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  async function DeleteRow(id) {
    try {
      const { data } = await axios.delete(
        `https://dummyapi.io/data/v1/user/${id}`,
        {
          headers: { "app-id": "64fc4a747b1786417e354f31" },
        }
      );
      if (data) {
        toast.error("Your contact is deleted now !");
      } else {
        toast.error("This is an error!");
      }
      GetListUsers();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {IsLoading ? (
        <div className=" d-flex justify-content-center align-items-center bg-body-tertiary vh-100">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <div className="container ">
          <div className="container my-5 rounded-1 border border-1 border-white py-3">
            <div className="w-75 m-auto">
              <input
                type="search"
                className="form-control rounded-pill my-5 px-3 py-2"
                placeholder="Search By Name.."
                onChange={(e) => {
                  handleFilter(e.target.value);
                }}
              />
            </div>
            <div className="div d-flex justify-content-end">
              <Link to="Contact" className="text-white text-decoration-none">
                <Button variant="primary rounded-pill">
                  {" "}
                  + Add New Contact
                </Button>
              </Link>
            </div>
            {Data?.map((Contact) => {
              return (
                <div className="row  text-white align-items-center centeralize">
                  <div className="offset-sm-1 col-sm-3 col-md-2 ">
                    {Contact.picture ? (
                      <img
                        src={Contact?.picture}
                        alt=""
                        className="image-width my-3 p-1 rounded-circle "
                      />
                    ) : (
                      <img
                        alt=""
                        src="https://th.bing.com/th/id/OIP.GeEEvvh1bNc8fdvZsq4gQwHaHa?rs=1&pid=ImgDetMain"
                        className="image-width my-3 p-1 rounded-circle "
                      />
                    )}
                  </div>
                  <div className="col-sm-4 col-md-6  my-3 p-3 ">
                    <p className="fw-bold text-capitalize">
                      {Contact?.firstName} {Contact?.lastName}
                    </p>
                    <span className="numberColor">01020331213</span>
                  </div>
                  <div className="col-sm-2 d-flex justify-content-between my-3 p-3">
                    <Link to={`/Update/${Contact.id}`}>
                      <button
                        onClick={handleShow}
                        className="btn bg-white mx-2 height"
                      >
                        <i className="fa-regular fa-pen-to-square text-primary "></i>
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        DeleteRow(Contact.id);
                      }}
                      className="btn bg-white mx-2 height"
                    >
                      <i className="fa-solid fa-trash text-danger"></i>
                    </button>
                  </div>
                  <hr className="w-75 m-auto heightHr" />
                </div>
              );
            })}
            <div className="text-white d-flex justify-content-end mt-5 pt-3">
              <button
                onClick={handlePrevPage}
                className="btn border-0 bg-transparent"
                disabled={page === 0}
              >
                <i className="fa-solid fa-chevron-left text-white"></i>
              </button>
              <span className="my-1">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                className="btn border-0 bg-transparent"
                disabled={page === totalPages - 1}
              >
                <i className="fa-solid fa-chevron-right text-white"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
