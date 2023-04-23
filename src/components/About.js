import raidho from '../image/Raidho.png';

function About(){
    return (
        <div className="container text-center">
            <img src={raidho} style={{width:"700px"}}/>
            <h2>About Us</h2>
        </div>
    )
}

export default About;