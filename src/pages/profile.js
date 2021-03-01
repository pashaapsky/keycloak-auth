import React from 'react';
import Header from "../containers/Header";

function Profile(props) {

    return (
        <>
            <Header/>

            <div className="wrapper">
                <h1>WELCOME Profile</h1>

                <main className="main">
                    <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, tempora.</p>
                </main>
            </div>
        </>
    );
}

export default Profile;