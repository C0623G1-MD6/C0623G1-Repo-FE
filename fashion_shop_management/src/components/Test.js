import React from 'react';

function Test() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return (
            <div>Bạn chưa đăng nhập</div>
        );
    }
    return (
        <div>Bạn đã đưng nhập</div>
    );
}

export default Test;