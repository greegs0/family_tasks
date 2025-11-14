class MessagesController < ApplicationController
  def create
    @chat = current_user.chats.find(params[:chat_id])
    @family = @chat.family
    @Message = Message.new(message_params)
    @Message.chat = @chat
    @Message.role = "user"
    @anniversaires = @family.members.each do |member|
      member.birthday
    end

    @vaccines = @family.members.each do |member|
      member.birthday
    end

    if @Message.save!
      # J'instancie un nouveau chat RubyLLM
      @ruby_llm_chat = RubyLLM.chat
      # build_conversation_history
      # Je lui donne des instructions et je lui passe le message utilisateur- je stocke ça dans "response"
      response = @ruby_llm_chat.with_instructions(instructions).ask(@Message.content)
      @chat.messages.create(role: "assistant", content: response.content)
      # @chat.generate_title_from_first_message
      redirect_to family_path(@family)
    else
      render "chats/show"
    end
  end

  # def build_conversation_history
  #   @chat.messages.each do |msg|
  #     @ruby_llm_chat.add_message(msg)
  #   end
  # end

  private

  def message_params
    params.require(:message).permit(:content)
  end

  def challenge_context
    "Here is the context of the family: #{@anniversaires} and #{@vaccines}"
  end

  def instructions
    # SYSTEM_PROMPT + FAMILY_CONTEXT
   [Chat::SYSTEM_PROMPT, challenge_context, @anniversaires, @vaccines].compact.join("\n\n")
  end
  # Chat::SYSTEM_PROMPT, la constante du model de Chat.
end
