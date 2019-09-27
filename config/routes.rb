Rails.application.routes.draw do
  root to: "environments#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post 'api/v1/clicksign/callback' => 'documents#callback'

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
