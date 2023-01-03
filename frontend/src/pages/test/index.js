import happy from '../../image/happiness.png'

function Test() {

    function onTabClick(evt) {
        setLineStyle(evt.target)
    
        let current = document.getElementsByClassName("active");
        console.log(current);
        current[0].className = current[0].className.replace("active", "");
        evt.target.className += " active";
    }

    function setLineStyle(tab) {
        let line = document.querySelector('.inner');
        line.style.left = tab.offsetLeft  + "px";
        line.style.width = tab.clientWidth + "px";
    }

    return <main className="wrap-screen">
        <div className="container">
            <nav className="nav">
                <div>Home</div>
                <div>Home</div>
                <div>Home</div>
            </nav>

            <div className="split-1">
                <div className="task-layout">
                    <section className="cards">
                        <Card name="Assigned"/>
                        <Card name="Custom"/>
                        <Card name="Completed"/>
                    </section>

                    <div className="flex-between" style={{"marginTop": "30px"}}>
                        <h3>My Project</h3>
                        <button className="btn-2">
                            <span className="plus">&#43;</span>
                            Add Project
                        </button>
                    </div>

                    <div className="task-type">
                        <span className="pointer active" onClick={onTabClick}>Assigned</span>
                        <span className="pointer" onClick={onTabClick}>Completed</span>
                    </div>

                    <div className="outer">
                        <div className="inner"></div>
                    </div>

                    <div className="projects">
                        <Project/>
                        <Project/>
                        <Project/>
                        <Project/>
                    </div>
                </div>

                <div className="recently">
                    <div>Card1</div>
                </div>
            </div>
        </div>
    </main>
}

function Card(props) {
    return <div className="card">
        <div className="info">
            <div className="avatar"><img src={happy}/></div>
            <span className="title">{props.name} Project</span>
            <span className="dot-3">&#8942;</span>
        </div>
    </div>
}

function Project() {
    return <div className="project">
        <div className="flex-center gap-1 flex-between">
            <div className="flex-center gap-1">
                <div className="avatar"><img src={happy}/></div>
                <div>
                    <h4>Web Project</h4>
                    <span className="sub">Build a task manager project</span>
                </div>
            </div>
            
            <div className="flex">
                <div className="circular-image">
                    <img src="https://thispersondoesnotexist.com/image" alt="" className="circular-image" />
                </div>
                <div className="circular-image">
                    <img src="https://thispersondoesnotexist.com/image" alt="" className="circular-image" />
                </div>
                <div className="circular-image">
                    <img src="https://thispersondoesnotexist.com/image" alt="" className="circular-image" />
                </div>
                <div className="circular-image">
                    <img src="https://thispersondoesnotexist.com/image" alt="" className="circular-image" />
                    <div className="overlay"></div>
                    <div className="z3">10+</div>
                </div>
            </div>

            <div className="progress">
                <div className="flex-between">
                    <h4>Progress</h4>
                    <span>70%</span>
                </div>
                <div className="bar">
                    <div className="percent"></div>
                </div>
            </div>
        </div>
    </div>
}

function TaskManager() {
    return <div className="manager">

    <form className="search-container" action="//llamaswill.tumblr.com/search">
        <input id="search-box" type="text" className="search-box" name="q" />
    </form>

    </div>
}

export default Test