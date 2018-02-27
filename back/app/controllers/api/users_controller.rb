class Api::UsersController < ApplicationController
  respond_to :json

  before_action :authenticate_user!
  before_action :set_user, only: [:update, :destroy, :show]

  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    filter = "%#{(params[:filter] || '').downcase}%"
    data = policy_scope(User).where('lower(name) like ? or lower(email) like ?', filter, filter)
    data = data.where.not(id: current_user.id) unless params[:include_self].present?
    data = data.order(params[:sort]) if params[:sort]
    paginate(data)
  end

  def show
    authorize @user
    render json: @user
  end

  def create
    @user = User.new(user_params)
    authorize @user

    if @user.save
      render json: @user, status: :created #201
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end

  def update
    @user.assign_attributes(user_params)
    authorize @user

    if @user.save
      render json: @user
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @user
    destroyed = @user.destroy
    render json: { user_id: destroyed.id }, status: :accepted #202
  end

  private
  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:email, :name, :password, :role)
  end
end
