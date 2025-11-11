class MembersController < ApplicationController
  def index
    @members = Member.all
  end

  def show
  end

  def new
    @member = Member.new
  end

  def update
    if @member.update(members_params)
      redirect_to member_path(@member)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @member.update(members_params)
      redirect_to member_path(@member)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_animal
    @member = Member.find(params[:id])
  end

  def animals_params
    params.require(:member).permit(:name, :zipcode, :birthday)
  end

end
