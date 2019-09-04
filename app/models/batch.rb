class Batch < ApplicationRecord
  has_many :documents
  belongs_to :environment

  after_create :create_documents

  attr_accessor :documents_amount, :signer, :access_token

  FILE_PATH = File.join(Rails.root, 'public', 'small.pdf')

  def create_documents
    documents_amount.to_i.times do |i|
      document_url = "#{environment.endpoint}/api/v1/documents?access_token=#{access_token}"

      response = RestClient.post document_url, document_payload(i).to_json, { content_type: :json, accept: :json }
      json = JSON.parse response

      document = self.documents.create(key: json['document']['key'])

      document.add_signer(signer)
    end


    generate_batch_at_api
  end


  def generate_batch_at_api
    batch_url = "#{environment.endpoint}/api/v1/batches?access_token=#{access_token}"

    response = RestClient.post batch_url, batch_payload.to_json, { content_type: :json, accept: :json }
    json = JSON.parse response

    self.key = json['batch']['key']
    self.save
  end

  private

  def batch_payload
    {
      batch: {
        signer_key: signer.key,
        document_keys: documents.pluck(:key),
        summary: true
      }
    }
  end

  def document_payload(index)
    file = File.new(FILE_PATH)
    content_base64 = Base64.encode64(file.read)

    {
      document: {
        path: "/sample-#{index}-#{Time.zone.now.to_i}.pdf",
        deadline_at: 30.days.from_now,
        auto_close: true,
        locale: "pt-BR",
        content_base64: "data:application/pdf;base64,#{content_base64}"
      }
    }
  end
end
