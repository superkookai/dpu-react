
function NavBar(){
    return (
        <div className="container rounded d-flex align-items-center justify-content-between p-4" style={{background:'skyblue'}}>
            <a className="text-dark fs-3 text-decoration-none" href={'/'}>Product Management System</a>
            <ul className="nav">
                <li className="nav-item"><a className="nav-link text-dark fs-4" href={'/'}>Home</a></li>
                <li className="nav-item"><a className="nav-link text-dark fs-4" href={'/about'}>About Us</a></li>
            </ul>
        </div>
    );
}

export default NavBar;