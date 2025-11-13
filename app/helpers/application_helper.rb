module ApplicationHelper
  def calculate_age(birthdate)
    return 0 unless birthdate

    today = Date.today
    age = today.year - birthdate.year
    age -= 1 if today.month < birthdate.month || (today.month == birthdate.month && today.day < birthdate.day)
    age
  end

  def format_date_fr(date)
    return "" unless date
    date.strftime("%d/%m/%Y")
  end

  def member_avatar_gradient(index)
    gradients = [
      "linear-gradient(135deg,rgba(81,162,255,1) 0%,rgba(21,93,252,1) 100%)",
      "linear-gradient(135deg,rgba(194,122,255,1) 0%,rgba(152,16,250,1) 100%)",
      "linear-gradient(135deg,rgba(5,223,114,1) 0%,rgba(0,166,62,1) 100%)",
      "linear-gradient(135deg,rgba(255,159,67,1) 0%,rgba(255,99,71,1) 100%)",
      "linear-gradient(135deg,rgba(255,107,129,1) 0%,rgba(255,48,79,1) 100%)"
    ]
    gradients[index % gradients.length]
  end
end
