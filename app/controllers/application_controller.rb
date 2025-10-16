class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # sign_up = POST /users
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :username ])

    # account_update = PATCH /users/:id
    # devise_parameter_sanitizer.permit(:account_update, keys: [ :username ])
  end
end
