import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react'
import Nav from '../components/Nav';


function Profile() {

  const [data, setData] = useState([])
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const API_URL = `http://localhost:3001/api/${role}/me`
  const config = {
    headers: {
      Authorization :  'Bearer ' + token
    },
    withCredentials: true
  }

  useEffect(() => {
    async function Info(){
      try {
      const response = await axios.get(API_URL, config)
      setData(response.data)
      }catch(error){
        console.log(error);
      }
    }
    
    Info()
  }, );

  return (    
    <div>
      <Nav/>
    <section className="area-login">
            <div className="container  ">
              <div className="row d-flex justify-content-center align-items-center ">
                <div className="col col-lg-6 mb-4 mb-lg-0">
                  <div className="card mb-3" style={{borderRadius: '.5rem'}}>
                    <div className="row g-0">
                      <div className="col-md-4 gradient-custom text-center text-white" style={{borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem'}}>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid my-5" style={{width: '80px'}} />
                      
                        <h5>{data.username}</h5>
                        <p>Web Designer</p>
                        <i className="far fa-edit mb-5" />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body p-4">
                          <h6>Information</h6>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>Email</h6>
                              <p className="text-muted">{data.email}</p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6>Role</h6>
                              <p className="text-muted">{role}</p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6>Date de Creation</h6>
                              <p className="text-muted">{data.createdAt}</p>
                            </div>
                          </div>
                          {/* <h6>Projects</h6>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>Recent</h6>
                              <p className="text-muted">Lorem ipsum</p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6>Most Viewed</h6>
                              <p className="text-muted">Dolor sit amet</p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-start">
                            <a href="#!"><i className="fab fa-facebook-f fa-lg me-3" /></a>
                            <a href="#!"><i className="fab fa-twitter fa-lg me-3" /></a>
                            <a href="#!"><i className="fab fa-instagram fa-lg" /></a>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
          </section>
          </div>
        );
      }
   


export default Profile