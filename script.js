(function () {
  const emailInput = document.getElementById('email')
  const errorContainer = document.getElementById('error')
  const form = document.getElementById('form')
  const submitButton = document.getElementById('button')

  const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i

  form.addEventListener('submit', async e => {
    e.preventDefault()
    errorContainer.innerText = ''
    const email = emailInput.value || ''
    console.log(email)

    if (!emailReg.test(email)) {
      errorContainer.innerText = 'Please enter a valid email.'
      return
    }
    try {
      const res = await fetch('https://4m3oz8vv09.execute-api.us-east-1.amazonaws.com/default/mindmeet-relaunch-mailing-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })
      const json = await res.json()
      if (res.status !== 200) {
        errorContainer.innerText = json.error
        return
      }
  
      submitButton.disabled = true
      emailInput.setValue('')
    } catch (e) {
      errorContainer.innerText = 'Could not reach server.'
      return
    }
  })
})()
