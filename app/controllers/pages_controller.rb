class PagesController < ApplicationController
  skip_before_action :authenticate_user!

  def home
  end

  def ai_assistant
    @family = current_user&.family || Family.first
  end

  def calendar
    @family = current_user&.family || Family.first
  end

  def vaccines
    @family = current_user&.family || Family.first
  end
end
