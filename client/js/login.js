const $ = (id) => {
    return document.getElementById(id)
}

const form = $('signInForm')
const authError = $('authError')


const isEmpty = (str) => {
    return str.length < 4
}

const isInputValid = (...inputs) => {
    for (let i = 0; i < inputs.length; i++) {
        if (isEmpty(inputs[i])) {
            return false
        }
    }
    return true
}

const showError = (errorStr) => {
    authError.className = "auth-body-error display"
    authError.innerText = errorStr
}

form.addEventListener('submit', async ev => {
    ev.preventDefault()
    const usernameInp = $("username")
    const passwordInp = $("passwd")
    const username = usernameInp.value
    const password = passwordInp.value
    if (isInputValid(username, password)) {
        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const isLoggedIn = await res.json()
        if (isLoggedIn) {
            document.cookie = `username=${username}`
            window.location.href = "/"
        } else {
            showError("Користувач з таким username не існує")
        }
    } else {
        showError("Введені дані некоректні")
    }
})