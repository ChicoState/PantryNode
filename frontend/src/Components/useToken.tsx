
export default function getToken() {
        const token = localStorage.getItem('token');
        if (token){
            return token
        }
        return null;
}