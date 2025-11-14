Rails.application.config.assets.configure do |env|
  env.css_compressor = nil if env.respond_to?(:css_compressor=)
end
