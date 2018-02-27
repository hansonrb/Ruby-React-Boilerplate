class UserPolicy < ApplicationPolicy
  def index?
    user.is_admin? or user.is_manager?
  end

  def create?
    user.is_admin? or (user.is_manager? and !record.is_admin?)
  end

  def update?
    user.is_admin? or (user.is_manager? and !record.is_admin?) or record.id == user.id
  end

  def destroy?
    # cannot delete himself
    record.id != user.id && (user.is_admin? or (user.is_manager? and !record.is_admin?))
  end

  def show?
    user.is_admin? or (user.is_manager? and !record.is_admin?) or record.id == user.id
  end

  class Scope < Scope
    def resolve
      if user.is_admin?
        scope.all
      elsif user.is_manager?
        scope.where(role: [:manager, :regular])
      else
        scope.none
      end
    end
  end
end
