Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:edit, :update , :index]
  resources :groups, only:[:create, :new, :edit, :update] do
    resources :messages, only:[:index, :create]
    
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
