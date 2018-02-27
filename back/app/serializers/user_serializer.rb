class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :role, :uid
end
