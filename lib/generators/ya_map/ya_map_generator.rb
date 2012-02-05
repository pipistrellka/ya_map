require 'rails/generators'
class YaMapGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('../templates', __FILE__)
  desc "This generator copy files"

  def copy_initializer_file
    copy_file "ya-map.js", "app/assets/javascripts/ya-map.js"
    copy_file "ya-map-api-key.yml", "config/ya-map-api-key.yml"
  end
end
