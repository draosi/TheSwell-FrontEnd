import {Routes, Route} from 'react-router-dom'
import App from './App'

const TheSwellRouter = () => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<App />}/>
                {/* <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/member" element={<Member />}/>
                <Route path="/survey" element={<Survey />}/>
                <Route path="/opinion" element={<Opinion />}/>
                <Route path="/comments" element={<Comments />}/> */}
                <Route path='*' element={<h1>404 ERROR</h1>} /> 
            </Routes>
        </div>
    )
}

export default TheSwellRouter