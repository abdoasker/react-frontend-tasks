// import img1 from "./assets/img1.jpg";
function Navbar() {
    return(

        <div className="navbar">
            <div className="top-bar">
                <div className="search-box">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search..."/>
                </div>
                <div className="profile-sec">
                    <i className="fa-regular fa-bell"></i>
                    <img src="/img1.jpg" alt="profile"/>
                    <span>Morgan Oakley</span>
                </div>
            </div>
            <div className="bar">
                <div className="bar-left">
                    <img src="/img1.jpg" alt=""/>
                    <div>
                        <p>Hi there,</p>
                        <h3>Morgan Oakley (@morgan)</h3>
                    </div>
                </div>
                <div className="bar-buttons">
                    <button>New</button>
                    <button>Upload</button>
                    <button>Share</button>
                </div>
            </div>

            <div className="main">
                <section style={{ marginRight: "10px" }}>
                    <h2>Your Projects</h2>
                    <div className="projects">
                        <div className="card">
                            <div>
                                <h3>Super Cool Project</h3>
                                <p>Sed tempus ut lacus dolor sit amet consectetur, adipisicing elit. Earum optio
                                    architecto ipsam tenetur id saepe, inventore mollitia ipsa ducimus</p>
                            </div>
                            <div className="card-icons">
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-eye"></i>
                                <i className="fa-solid fa-code-branch"></i>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <h3>Super Cool Project</h3>
                                <p>Sed tempus ut lacus dolor sit amet consectetur, adipisicing elit. Earum optio
                                    architecto ipsam tenetur id saepe, inventore mollitia ipsa ducimus</p>
                            </div>
                            <div className="card-icons">
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-eye"></i>
                                <i className="fa-solid fa-code-branch"></i>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <h3>Super Cool Project</h3>
                                <p>Sed tempus ut lacus dolor sit amet consectetur, adipisicing elit. Earum optio
                                    architecto ipsam tenetur id saepe, inventore mollitia ipsa ducimus</p>
                            </div>
                            <div className="card-icons">
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-eye"></i>
                                <i className="fa-solid fa-code-branch"></i>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <h3>Super Cool Project</h3>
                                <p>Sed tempus ut lacus dolor sit amet consectetur, adipisicing elit. Earum optio
                                    architecto ipsam tenetur id saepe, inventore mollitia ipsa ducimus</p>
                            </div>
                            <div className="card-icons">
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-eye"></i>
                                <i className="fa-solid fa-code-branch"></i>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <h3>Super Cool Project</h3>
                                <p>Sed tempus ut lacus dolor sit amet consectetur, adipisicing elit. Earum optio
                                    architecto ipsam tenetur id saepe, inventore mollitia ipsa ducimus</p>
                            </div>
                            <div className="card-icons">
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-eye"></i>
                                <i className="fa-solid fa-code-branch"></i>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <h3>Super Cool Project</h3>
                                <p>Sed tempus ut lacus dolor sit amet consectetur, adipisicing elit. Earum optio
                                    architecto ipsam tenetur id saepe, inventore mollitia ipsa ducimus</p>
                            </div>
                            <div className="card-icons">
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-eye"></i>
                                <i className="fa-solid fa-code-branch"></i>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="right-side">
                    <h2>Announcement</h2>
                    <div className="section">
                        <div className="announcement">
                            <strong>Site Maintenance</strong>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                            <br/>
                            <hr/><br/>
                        </div>
                        <div className="announcement">
                            <strong>Community Share Day</strong>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
                            <br/>
                            <hr/><br/>

                        </div>
                        <div className="announcement">
                            <strong>Updated Privacy Policy</strong>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <br/>
                            <hr/><br/>

                        </div>
                    </div>
                    <h2>Trending</h2>
                    <div className="section">
                        <div className="trending-item">
                            <img src="/img1.jpg" alt=""/>
                            <div className="txt-trending">
                                <span>@tegan</span>
                                <p>World Peace Builder</p>
                            </div>
                        </div>
                        <div className="trending-item">
                            <img src="/img1.jpg" alt=""/>
                            <div className="txt-trending">
                                <span>@tegan</span>
                                <p>World Peace Builder</p>
                            </div>
                        </div>
                        <div className="trending-item">
                            <img src="/img1.jpg" alt=""/>
                            <div className="txt-trending">
                                <span>@tegan</span>
                                <p>World Peace Builder</p>
                            </div>
                        </div>
                        <div className="trending-item">
                            <img src="/img1.jpg" alt=""/>
                            <div className="txt-trending">
                                <span>@tegan</span>
                                <p>World Peace Builder</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Navbar