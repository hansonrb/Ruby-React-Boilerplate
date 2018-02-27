class TimezonePolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    true
  end

  def update?
    user.is_admin? or record.user_id == user.id
  end

  def destroy?
    user.is_admin? or record.user_id == user.id
  end

  def show?
    user.is_admin? or record.user_id == user.id
  end

  class Scope < Scope
    def resolve
      if user.is_admin?
        scope.all
      else
        scope.by_user(user)
      end
    end
  end
end
