import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from'yup'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MainContext } from '../Context/MainContext';

function Update() {
  const {GetListUsers , selectedImage , changingImage}=useContext(MainContext)
 const {id}= useParams()
 const Nav=  useNavigate()
    

       const initialValues={firstName: "",
       lastName: "",
       phoneNumber:"",
       email: "",
       picture:""}
   
       const validationSchema = Yup.object().shape({
           lastName: Yup.string().required('Last Name is required'),
           firstName: Yup.string().required('First Name is required'),
           phoneNumber: Yup
               .string()
               .matches(/^(?:01)(?:0|1|2|5)\d{8}$/, 'Invalid Egyptian phone number')
               .required('Phone number is required'),
              
       })
   
    const MyForm = useFormik({
           initialValues,
           onSubmit:Update,
           validationSchema
       })

       async function Update(values) {
        try {
            const { data } = await axios.put(
                `https://dummyapi.io/data/v1/user/${id}`,
                values,
                {
                    headers: { 'app-id': '64fc4a747b1786417e354f31' }
                }
            );
            GetListUsers()
            Nav('/')
          if(data){
            toast.success('Your contact updated successfully!');
          }
            else{
              toast.error('This is an error!');
            }
            return data
        } catch (error) {
            console.log(error);
        }
    }
   
   
  
    return (
        <>

<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="container ">
            <form >
                <div className=" row bg-white p-md-5 rounded-4 w-75 m-auto">
                  <div className="col-md-12 text-center">
                    {selectedImage?<div>
                    <img
                    src={selectedImage}
                    alt=""
                    className="image-width rounded-circle border-0"
                    />
                    </div>:''}
                    <label htmlFor="picture"  className="upload py-3">Upload Image</label>
                    <input
                     onBlur={MyForm.handleBlur}
                     value={MyForm.values.picture}
                      type="file"
                      accept="image/jpeg , image/png , image/jpg"
                      id="picture"
                      name="picture"
                      className="d-none"
                      onChange={changingImage}
                      
                    />

                  </div>

                  <div className=" col-md-12 col-lg-6 my-2">
                    <input
                      onBlur={MyForm.handleBlur}
                      value={MyForm.values.lastName}
                      onChange={MyForm.handleChange}
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control rounded-pill px-3 my-2"
                      placeholder="Please , Enter Your LastName"
                    />

                    {MyForm.errors.lastName && MyForm.touched.lastName ? (
                      <div className="alert alert-danger">
                        {MyForm.errors.lastName}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className=" col-md-12 col-lg-6 my-2">
                    <input
                      onBlur={MyForm.handleBlur}
                      value={MyForm.values.firstName}
                      onChange={MyForm.handleChange}
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control rounded-pill px-3 my-2"
                      placeholder="Please , Enter Your FirstName"
                    />

                    {MyForm.errors.firstName && MyForm.touched.firstName ? (
                      <div className="alert alert-danger">
                        {MyForm.errors.firstName}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className=" col-md-12 col-lg-6 my-2">
                    <input
                      onBlur={MyForm.handleBlur}
                      value={MyForm.values.phoneNumber}
                      onChange={MyForm.handleChange}
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-control rounded-pill px-3 my-2"
                      placeholder="Please , Enter Your Phone Number"
                    />
                    {MyForm.errors.phoneNumber && MyForm.touched.phoneNumber ? (
                      <div className="alert alert-danger">
                        {MyForm.errors.phoneNumber}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className=" col-md-12 col-lg-6 my-2">
                    <input
                      onBlur={MyForm.handleBlur}
                      value={MyForm.values.email}
                      onChange={MyForm.handleChange}
                      type="email"
                      id="email"
                      disabled={true}
                      name="email"
                      className="form-control rounded-pill px-3 my-2"
                      placeholder="Please , Enter Your Email"
                    />
                  </div>
                  <div className="d-flex justify-content-between my-2 ">
            <Button variant="secondary" >
              <Link className='text-white text-decoration-none' to={'/'}>Cancel</Link>
            </Button>

            <Button disabled={!(MyForm.dirty && MyForm.isValid)} variant="primary" onClick={MyForm.handleSubmit}>
              Save
            </Button>
          </div>
                </div>
              </form>
            </div>
    </div>

          
        </>
    )
}

export default Update
