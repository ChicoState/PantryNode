import jwt_decode, { JwtPayload } from 'jwt-decode'

export function removeToken() {
    if (localStorage.getItem('token') === null)
        return false;
    localStorage.removeItem('token');
    return true;
}

export function getToken() {
        const token = localStorage.getItem('token');
        if (token){
            const decodedJwt = jwt_decode<JwtPayload>(token)
            if (decodedJwt){
                if (decodedJwt?.exp && decodedJwt.exp < Date.now() / 1000) {
                    removeToken();
                    return null;
                }
                return token
            }
            
        }
        return null;
}