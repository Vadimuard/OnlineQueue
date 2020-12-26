const submitBtn = document.getElementById("submitBtn")
const form = document.getElementById("form")


window.onload = async () => {
    const timenotes = await fetch("/timenotes")
    laodTimeNotes(await timenotes.json())
}

const laodTimeNotes = (timenotes) => {
    timenotes.map(tn => {
        id = `${tn.day}time${tn.time}`
        const el = document.getElementById(id)
        const parent = el.parentElement
        parent.className += " radio-group__unavailable"
        el.disabled = true
    })
}

form.addEventListener('submit', async (ev) => {
    const radios = document.getElementsByName("radio")
    for (let i = 0; i < radios.length; i++) {
        r = radios[i]
        if (r.checked) {
            const r_id = r.id
            const [day, time] = r_id.split("time")
            await fetch("/timenotes", {
                method: "POST",
                body: JSON.stringify({ day, time }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }
})