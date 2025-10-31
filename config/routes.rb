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

  namespace :api do
    namespace :v1 do
      get "/itchdata" => "itchdata#index"
      get "/rawgdata" => "rawgdata#index"
      patch "/apply_mod" => "users#apply_moderator"
      get "/latest" => "posts#latest"
      get "/search" => "search#search"
      get "/all_posts" => "users#posts"
      get "/channels/all" => "channels#all"
      get "/reports/archive" => "reports#show_archive"
      resources :users

      resources :channelgroups, shallow: true do
        resources :channels, shallow: true do
          resources :posts, shallow: true do
            resources :comments
          end
        end
      end

      resources :reports, only: [:index, :show, :create, :destroy]
      patch "/reports/archive/:id" => "reports#archive"

      namespace :admins do
        get "/show_reports" => "users#show_reports"
        get "/show_all" => "users#show_all"
        patch "/ban/:id" => "users#ban"
        patch "/approve_mod/:id" => "users#approve_moderator"
        resources :users
      end
      namespace :moderators do
        get "/show_reports" => "users#show_reports"
        patch "/ban/:id" => "users#ban"
        resources :users, only: [ :show, :update ]
      end
    end
  end
end
