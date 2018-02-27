class ApplicationController < ActionController::Base
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :null_session

  def paginate(data)
    current_page = params[:page] || 1
    paginated_data = data.page(current_page)

    render json: paginated_data, meta: {
      current: current_page,
      total: paginated_data.total_count,
      total_page: (paginated_data.total_count / 25.0).ceil
    }, adapter: :json
  end

  private
  def user_not_authorized
    render json: { errors: [message: "You are not authorized to perform this action"] }, status: :unauthorized
  end

end
