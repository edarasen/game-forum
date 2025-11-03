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
      resources :users, only: [ :show, :update, :destroy ]

      resources :channelgroups, shallow: true do
        resources :channels, shallow:true do
          resources :posts, shallow:true do
            resources :comments
          end
        end
      end

      resources :reports, only: [:index, :show, :create, :destroy]
      patch "/reports/archive/:id" => "reports#archive"

      namespace :admins do
        get "/show_all" => "users#show_all"
        patch "/ban/:id" => "users#ban"
        patch "/reactivate/:id" => "users#reactivate_user"
        delete "/nuke/:id" => "users#nuke_user"
        patch "/approve_mod/:id" => "users#approve_moderator"
        patch "/reject_mod/:id" => "users#reject_moderator"
        resources :users, only: [ :show, :update, :create ]
      end
      namespace :moderators do
        get "/show_all" => "users#show_all"
        patch "/ban/:id" => "users#ban"
        patch "/reactivate/:id" => "users#reactivate_user"
        delete "/nuke/:id" => "users#nuke_user"
        resources :users, only: [ :show, :update, :create ]
      end
    end
  end
end
