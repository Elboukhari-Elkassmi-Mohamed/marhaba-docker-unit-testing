import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../Pages/Login'
import { BrowserRouter as Router } from 'react-router-dom'


describe('Login', () => {

    test('should login page be rendred', () => { 
        render(
            <Router>
                <Login />
            </Router>
        )
        const email = screen.getByPlaceholderText(/Email/)
        const pwd = screen.getByPlaceholderText(/Password/)
        
        expect(email).toBeInTheDocument()
        expect(pwd).toBeInTheDocument()
    })
})