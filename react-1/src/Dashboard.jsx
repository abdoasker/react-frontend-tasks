function Dashboard() {
    return(

        <div className="dashboard">
            <div className="sidebar">
                <h2><i className="fa-solid fa-grip"></i> Dashboard</h2>
                <ul>
                    <li><i className="fa-solid fa-house"></i> Home</li>
                    <li><i className="fa-solid fa-user"></i> Profile</li>
                    <li><i className="fa-solid fa-envelope"></i> Messages</li>
                    <li><i className="fa-solid fa-clock-rotate-left"></i> History</li>
                    <li><i className="fa-solid fa-list-check"></i> Tasks</li>
                    <li><i className="fa-solid fa-users"></i> Communities</li>
                    <br/><br/><br/>
                    <li><i className="fa-solid fa-gear"></i> Settings</li>
                    <li><i className="fa-solid fa-circle-question"></i> Support</li>
                    <li><i className="fa-solid fa-shield-halved"></i> Privacy</li>
                </ul>
            </div>
        </div>
    )
    
}

export default Dashboard