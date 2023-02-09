import axios from 'axios'

// Create a new user
export const register = abc => {
    return (
        axios.post('https://the-swell-back-i7o00030s-draosi.vercel.app/auth/register', {
        username : abc.username,
        first_name: abc.first_name,
        last_name: abc.last_name,
        street: abc.street,
        city: abc.city,
        zip_code: abc.zip_code,
        country: abc.country,
        email: abc.email,
        password: abc.password,
        level: abc.level, 
        image: abc.image,
        role: abc.role
    })
    .then(res => console.log('Registered'))
    .catch(err => console.log(err))
    )
}

// Check if the user exist in the database and if so, sends back its token
export const login = user => {
    return axios.post('https://the-swell-back-i7o00030s-draosi.vercel.app/auth/login', {
        email : user.email,
        password : user.password
    })
    .then(res => {
        console.log(res.headers.get('auth-token'))
        localStorage.setItem('usertoken', res.data) // sets a usertoken into the localstorage coming from res.data
        return res.data
    }) 
    .catch(err => console.error(err))
}