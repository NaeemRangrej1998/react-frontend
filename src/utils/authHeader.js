import React from 'react'

export default function authHeader() {
    const accessToken = localStorage.getItem('accessToken');

    console.log("Bearer", accessToken);

    if (accessToken) {
        return { Authorization: 'Bearer ' + accessToken };
    } else {
        return {};
    }
}