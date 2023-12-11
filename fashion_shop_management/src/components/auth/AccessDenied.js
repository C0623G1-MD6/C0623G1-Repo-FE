import React from 'react';

function AccessDenied() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="container my-5">
                        <div className="access-denied-container mt-5">
                            <h2>Access Denied</h2>
                            <p>You do not have sufficient permissions to access this page.</p>
                        </div>
                    </div>
                </div>
            </div>


        </>

    );
}

export default AccessDenied;
