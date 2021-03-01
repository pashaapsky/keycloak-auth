import React from 'react';
import Header from "../containers/Header";

function Home(props) {
    return (
        <>
            <Header/>

            <div className="wrapper">
                <h1>WELCOME HOME</h1>

                <main className="main">
                    <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, tempora.</p>
                </main>
            </div>
        </>
    );
}

export default Home;