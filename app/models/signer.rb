class Signer < ApplicationRecord
  belongs_to :environment

  attr_accessor :access_token

  before_create :generate_signer

  def generate_signer
    signer_url = "#{environment.endpoint}/api/v1/signers?access_token=#{access_token}"

    signer_payload = {
      signer: {
        email: email,
        phone_number: "11999999999",
        auths: [
          "email"
        ],
        delivery: "email",
        name: "John Doe",
        has_documentation: false
      }
    }

    response = RestClient.post signer_url, signer_payload.to_json, { content_type: :json, accept: :json }
    json = JSON.parse response

    self.key = json['signer']['key']
  end
end
