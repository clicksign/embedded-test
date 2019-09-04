class BatchesController < ApplicationController
  ACCESS_TOKEN_STAGING = ENV['ACCESS_TOKEN_STAGING'] || 'a79596af-e6e1-44f3-8b25-e427840ed76a'

  before_action :set_environment

  def generate
    signer = @environment.signers.find(signer_params[:id])

    batch = @environment.batches.new(
      documents_amount: params[:documents_amount],
      signer: signer,
      access_token: params[:access_token])

    if batch.save
      redirect_to new_signature_path(key: batch.key)
    else
      render :new
    end
  end

  private

  def signer_params
    params.require(:signer).permit(:id)
  end

  def set_environment
    @environment = Environment.find(params[:environment_id])
  end
end
