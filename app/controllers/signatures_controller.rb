class SignaturesController < ApplicationController
  def new
    @batch = Batch.find_by(key: params[:key])
  end
end
