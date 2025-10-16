Rails.application.routes.draw do
   devise_for :users, path: "api/v1/users", path_names: {
    sign_in: "login",
    sign_out: "logout",
    registration: "signup"
  },
  controllers: {
    sessions: "api/v1/users/sessions",
    registrations: "api/v1/users/registrations"
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  # KELCIE, NOTE
  # optimized routes :
  #   channelgroup#show should show its channels
  #   channel#show should show its posts
  #   post#show should show its comments
  #   user#show should show their posts

  namespace :api do
    namespace :v1 do
      get "/itchdata" => "itchdata#index"
      get "/rawgdata" => "rawgdata#index"
      
      resources :users
      
      resources :channelgroups, shallow: true do
        resources :channels, shallow:true do
          resources :posts, shallow:true do
            resources :comments
          end
        end
      end
      
    end
  end

end
