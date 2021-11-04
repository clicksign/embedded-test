function tokenlessWidget(uuid) {

  const origin = window.location.hostname
  const baseUrl = `https://sandbox.clicksign.com/api/v2/widget/${uuid}`

  let loader = 'Carregando Widget...'
  let mounted = false
  let wrapper = null
  let signed = false

  this.mount = ({containerId, textTemplate = 1}) => {
    wrapper = document.getElementById(containerId)

    if (wrapper === null) {
      mounted = false
      throw "It's not possible to render widget. 😵"
    }

    wrapper.innerHTML = loader
    getContent(wrapper, textTemplate)
    mounted = true
  }

  this.attach = (event, elID, method) => {
    const el = document.getElementById(elID)
    el.addEventListener(event, method)
  }

  this.sign = (info) => {
    if (!mounted) { throw 'Widget not mounted. 😵' }
    if (!signed) { throw "Can't sign without accept documents. 🤷🏻‍♂️" }

    const prom_data = fetch(`${baseUrl}/sign`, {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
          Origin: origin
        }
      })
      .then((response) => response.json())
      .then((data) => {
        switch (data.status) {
          case 'ok': return
          case 'error': throw data.error
          default: console.log("This shouldn't happend 🤭")
        }
      }
    )
    return prom_data
  }

  this.injectLoader = (el) => {
    loader = el
  }

  function addCheckboxEventListener() {
    const checkbox = document.getElementById('cs-checkbox-sign')
    checkbox.addEventListener('change', () => {
      signed = !signed
    })
  }

  function getContent(wrapper, contentId) {
    fetch(`${baseUrl}/content/${contentId}`, {
      headers: {
        Origin: origin
      }
    })
    .then(response => response.json())
    .then(({acceptance_text, documents, error}) => {
      if (!documents) { throw error.message }

      wrapper.innerHTML = ''

      let checkbox = document.createElement('input')
      let textWrapper = document.createElement('span')

      checkbox.type = 'checkbox'
      checkbox.id = 'cs-checkbox-sign'

      textWrapper.className = 'cs-acceptance-text'

      documents.forEach((document) => {
        const regex = /\(\((.[^\)\)]*)\)\)/
        const strMatch = acceptance_text.match(regex)

        let docLink = this.document.createElement('a')

        docLink.innerHTML = `${strMatch[1]}`
        docLink.className = 'cs-acceptance-preview'
        docLink.href = document.download_url
        docLink.setAttribute('download', true)
        acceptance_text = acceptance_text.replace(regex, docLink.outerHTML)
      })

      textWrapper.insertAdjacentHTML('afterbegin', acceptance_text)

      wrapper.append(checkbox)
      wrapper.append(textWrapper)
      addCheckboxEventListener()
    })
  }
}
