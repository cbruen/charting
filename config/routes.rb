Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'
  get '/data', to: 'home#data'
  post '/home/upload', to: 'home#upload'
end
