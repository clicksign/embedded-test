Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :environments
  resources :signers

  resources :batches do
    collection do
      post :generate
    end
  end

  resources :documents
  resources :signatures
end
