class MembersController < ApplicationController
  before_action :set_member, only: [:show, :edit, :update]

  def index
    @members = Member.all
  end

  def show
  end

  def create
    @member = Member.new(members_params)
    @member.family = current_user.family
    if @member.save!
      redirect_to family_path(current_user.family), notice: "Member created succesfully ! Welcome !"
    else
      render :new, status: :unprocessable_entity
    end
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

  def set_member
    @member = Member.find(params[:id])
  end

  def members_params
    params.require(:member).permit(:name, :zipcode, :birthday)
  end

end
