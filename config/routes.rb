Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'
  get '/data', to: 'home#data'
  post '/home/upload', to: 'home#upload'
  get '/download/:id', to: 'home#download'
  resources :charts
  resources :pages, only: [:show]
  get '/pages/find', to: 'pages#find', as: 'find_page'
end
