class TimezoneSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :difference, :formatted_difference, :user_id, :user_name, :current_time
end
