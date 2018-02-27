class Timezone < ApplicationRecord
  belongs_to :user

  validates_presence_of :user, :name, :city, :difference
  validates :name, uniqueness: { scope: :user }
  validates :difference, numericality: { greater_than: -12, less_than_or_equal_to: 14 }
  # Some countries have +14, +13 timezones
  # +14 : Kiribati, Line Islands
  # +13 : Samoa, Tonga, Tokelau (New Zealand)

  scope :by_user, -> (user) { where(user_id: user.id) }

  def user_name
    user.try(:name)
  end

  def formatted_difference
    is_minus = difference / difference.abs == -1
    "#{is_minus ? '- ' : '+ '}#{difference.abs.to_i.to_s.rjust(2, '0')}:#{difference%1==0.5?'30':'00'}"
  end

  def current_time
    (Time.now.utc + difference.to_f.hours).strftime('%Y-%m-%d %H:%M')
  end
end
