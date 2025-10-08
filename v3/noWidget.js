class noWidget {
  #origin = window.location.hostname;
  #baseUrl;
  #loader = 'Carregando Widget...';
  #mounted = false;
  #wrapper = null;
  #requiredFields = {};
  #documentKeys = [];

  constructor(uuid, env = 'production', options = { domain: '.clicksign.com', show_files: false, pdf: false }) {
    let subDomain = env;
    let baseDomain = options.domain;

    if (env === 'production') {
      subDomain = 'app';
    } else if (/staging\d+/.test(env)) {
      subDomain = env.match(/\d+/)[0];
      baseDomain = '.clicksign.dev';
    }

    this.#baseUrl = `https://${subDomain}${baseDomain}/notarial/embedded_signature/signatures/${uuid}`;
    this.options = options;
  }

  mount({ containerId }) {
    this.#wrapper = document.getElementById(containerId);

    if (this.#wrapper === null) {
      this.#mounted = false;
      throw new Error("It's not possible to render widget.");
    }

    this.#wrapper.innerHTML = this.#loader;
    this.#getDocuments(this.#wrapper);
    this.#mounted = true;
  }

  attach(event, elID, method) {
    const el = document.getElementById(elID);
    el.addEventListener(event, method);
  }

  async sign(info) {
    if (!this.#mounted) { throw new Error('Widget not mounted.'); }
    if (this.#requiredFields) { this.#validateFields(info); }

    try {
      const response = await fetch(`${this.#baseUrl}/sign`, {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Origin': this.#origin,
          'Content-Type': 'application/json'
        }
      });

      const responseText = await response.text();
      if (response.status === 200 && !responseText) {
        return { status: 'success' };
      }

      if (!responseText) {
        throw new Error('Empty response from server');
      }

      let data = JSON.parse(responseText);

      if (data.status === 'error') {
        throw data.error;
      }

      return data;
    } catch (error) {
      console.error("Verifique os parâmetros da requisição e tente novamente.", error);
      throw error;
    }
  }

  injectLoader(el) {
    this.#loader = el;
  }

  getDocumentKeys() {
    return this.#documentKeys;
  }

  #validateFields(info) {
    const { signature } = info;
    if (!signature) { throw new Error("Object signature is required."); }
    if (!signature.signer) { throw new Error("Object signature.signer is required."); }

    const requiredAttributes = Object.keys(this.#requiredFields)
      .filter((field) => this.#requiredFields[field]);

    if (!(requiredAttributes.every((attr) => signature.signer[attr]))) {
      throw new Error(`Can't sign without required fields.️ ${requiredAttributes}`);
    }
  }

  #createDocumentLink(doc, strMatch) {
    let filename = this.options.pdf ? doc.pdf_name : doc.name;
    let download_url = this.options.pdf ? doc.pdf_url : doc.original_url;

    let docLink = document.createElement('a');
    docLink.innerHTML = strMatch && `${strMatch[1]}`;
    docLink.className = 'cs-acceptance-preview';
    docLink.setAttribute('download', 'true');
    docLink.textContent = filename;
    docLink.href = download_url;

    return docLink;
  }

  async #getDocuments(wrapper) {
    try {
      const response = await fetch(`${this.#baseUrl}/documents`, {
        headers: {
          'Origin': this.#origin,
          'Content-Type': 'application/json',
        },
      });

      const responseText = await response.text();
      if (!responseText) {
        throw new Error('Empty response from server');
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse JSON:', responseText);
        throw new Error('Invalid JSON response from server');
      }

      const { documents, error, required_fields } = data;

      if (!documents) { throw new Error(error.message); }

      this.#requiredFields = required_fields;
      this.#documentKeys = documents.map(doc => doc.key);
      wrapper.innerHTML = '';

      this.#hideNonRequiredFields();

      const regex = /\(\((.[^\)\)]*)\)\)/g;

      documents.forEach((doc) => {
        const docLink = this.#createDocumentLink(doc);
        wrapper.appendChild(docLink);
      });
    } catch (error) {
      console.error('Failed to get content:', error);
      wrapper.innerHTML = 'Falha ao carregar documentos.';
    }
  }

  #hideNonRequiredFields() {
    const fields = {
      name: document.getElementById('name').closest('.field'),
      documentation: document.getElementById('cpf-field-container'),
      birthday: document.getElementById('birthdate-field-container')
    };

    for (const fieldName in fields) {
      if (fields.hasOwnProperty(fieldName)) {
        const fieldElement = fields[fieldName];
        if (fieldElement && !this.#requiredFields[fieldName]) {
          fieldElement.classList.add('hidden-field');
        } else if (fieldElement) {
          fieldElement.classList.remove('hidden-field');
        }
      }
    }
  }
}
