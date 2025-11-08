export const LoginData = {
    validUser: {
        username: 'Admin',
        password: 'admin123'
    },
    invalidUser: {
        username: 'xxxxx',
        password: 'admin123'
    },
    invalidPassword: {
        username: 'Admin',
        password: 'xxxxx'
    },
    emptyUser: {
        username: '',
        password: 'admin123'
    },
    emptyPassword: {
        username: 'Admin',
        password: ''
    },
    emptyBoth: {
        username: '',
        password: ''
    },
    uppercaseUserPass: {
        username: 'ADMIN',
        password: 'ADMIN123'
    }
}
