class MembersController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :set_family, only: [:index, :new, :create]
  before_action :set_member, only: [:show, :edit, :update, :destroy]

  def index
    @members = Member.all
  end

  def show
  end

  def new
    @member = @family.members.new
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

  def update
    if @member.update(member_params)
      redirect_to family_members_path(@member.family), notice: "Membre mis à jour avec succès"
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

  def destroy
    family = @member.family
    @member.destroy
    redirect_to family_members_path(family), notice: "Membre supprimé."
  end

  private

  def set_family
    @family = Family.find(params[:family_id])
  end

  def set_member
    @member = Member.find(params[:id])
  end

  def members_params
    params.require(:member).permit(:name, :zipcode, :birthday)
  end

end
