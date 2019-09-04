class SignersController < ApplicationController
  before_action :set_environment

  def new
    @signer = Signer.new
  end

  def create
    signer = @environment.signers.new(signer_params.merge(access_token: params[:access_token]))

    if signer.save
      redirect_to @environment
    else
      render :new
    end
  end

  private

  def signer_params
    params.require(:signer).permit(:email)
  end

  def set_environment
    @environment = Environment.find(params[:environment_id])
  end
end
