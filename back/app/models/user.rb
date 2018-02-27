class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable, :validatable

  include DeviseTokenAuth::Concerns::User

  enum role: [:regular, :manager, :admin], _prefix: :is

  has_many :timezones

  scope :regulars,    -> { where(role: :regular) }
  scope :managers,    -> { where(role: :manager) }
  scope :admins,      -> { where(role: :admin) }

end
