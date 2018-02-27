class Api::TimezonesController < ApplicationController
  respond_to :json

  before_action :authenticate_user!
  before_action :set_timezone, only: [:update, :destroy, :show]

  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    filter = "%#{(params[:filter] || '').downcase}%"
    paginate(policy_scope(Timezone).where('lower(name) like ? or lower(city) like ?', filter, filter))
  end

  def show
    authorize @timezone
    render json: @timezone
  end

  def create
    if timezone_params[:user_id]
      @timezone = Timezone.new(timezone_params)
    else
      @timezone = current_user.timezones.new(timezone_params)
    end
    authorize @timezone

    if @timezone.save
      render json: @timezone, status: :created #201
    else
      render json: { errors: @timezone.errors }, status: :unprocessable_entity
    end
  end

  def update
    authorize @timezone
    if @timezone.update(timezone_params)
      render json: @timezone
    else
      render json: { errors: @timezone.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @timezone
    destroyed = @timezone.destroy
    render json: { user_id: destroyed.id }, status: :accepted #202
  end

  private
  def set_timezone
    @timezone = Timezone.find(params[:id])
  end

  def timezone_params
    params.permit(:name, :city, :difference, :user_id)
  end
end
