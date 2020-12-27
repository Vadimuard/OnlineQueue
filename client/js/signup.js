const $ = (id) => {
    return document.getElementById(id)
}

const form = $('signUpForm')
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
    const fullnameInp = $("fullname")
    const passwordInp = $("passwd")
    const username = usernameInp.value
    const fullname = fullnameInp.value
    const password = passwordInp.value
    if (isInputValid(username, fullname, password)) {
        const res = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ username, fullname, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const isRegistered = await res.json()
        if (isRegistered) {
            document.cookie = `username=${username}`
            window.location.href = "/"
        } else {
            showError("Користувач з таким username вже зареєстрований")
        }
    } else {
        showError("Введені дані не відповідають вимогам")
    }
})