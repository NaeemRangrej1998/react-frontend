export const setTokenInLocalStorage=(token)=>{
    localStorage.setItem('accessToken', token);
}

export const getTokenFromLocalStorage=(accessToken)=>{
    localStorage.getItem('accessToken');
}

export const setUserRoleInLocalStorage=(role)=>{
    localStorage.setItem('role', role);
}

export const getUserRoleFromLocalStorage=()=>{
    localStorage.getItem('role');
}

export const isUserAuthenticatedAsAdmin=()=>{
    let userRole = localStorage.getItem('role');
    console.log(userRole);
    return userRole === 'ADMIN';
}

export const Logout=()=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('role')

}