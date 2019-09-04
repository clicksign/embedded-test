class Document < ApplicationRecord
  belongs_to :batch, optional: true

  def add_signer(signer)
    list_payload = {
      list: {
        document_key: key,
        signer_key: signer.key,
        sign_as: "sign"
      }
    }

    list_url = "#{batch.environment.endpoint}/api/v1/lists?access_token=#{batch.access_token}"
    response = RestClient.post list_url, list_payload.to_json, { content_type: :json, accept: :json }
  end
end
