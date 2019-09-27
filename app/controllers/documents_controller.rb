class DocumentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :log_payload_received

  def callback
    @document = Document.find_by(key: params[:document][:key])

    if @document.present?
      head :ok
    else
      head :not_found
    end
  end

  private

  def log_payload_received
    Rails.logger.info("Hook Payload #{params.inspect}")
  end
end
